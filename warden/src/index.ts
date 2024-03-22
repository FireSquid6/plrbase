import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { createUser } from "./auth";
import { createSession } from "./crud";
import { Argon2id } from "oslo/password";
import { getUserByEmail } from "./crud";
import type { Lucia } from "lucia";
import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";

export interface ApiContext {
  db: BunSQLiteDatabase;
  auth: Lucia;
  mode: "testing" | "production"; //testing mode is the same as development mode
}

// TODO: combine user and profile into one table

export function startApp(apiContext: ApiContext) {
  const app = new Elysia();
  app.use(cors());
  app.post(
    "/user",
    async (ctx) => {
      const { email, password } = ctx.body;

      const [id, error] = await createUser(apiContext, email, password);

      if (error) {
        ctx.set.status = 400;
        return error;
      }

      const session = await createSession(apiContext, id);

      ctx.set.status = 201;
      return {
        user: id,
        session: session.id,
      };
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    },
  );

  app.post(
    "/session",
    async (ctx) => {
      const { email, password } = ctx.body;

      const user = await getUserByEmail(apiContext, email);

      // is done to protect against timing attacks
      const userPassword = user.hashedPassword ?? "blahblahblah";

      const validPassword = await new Argon2id().verify(userPassword, password);

      if (!validPassword) {
        ctx.set.status = 400;
        return "invalid email or password";
      }

      const sesion = await createSession(apiContext, user.id);

      return {
        session: sesion.id,
      };
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    },
  );

  app.delete(
    "/session",
    async (ctx) => {
      // TODO
      // should delete all of the user's sessions
    },
    {
      body: t.Object({
        token: t.String(),
      }),
    },
  );

  app.listen(3000, () => {
    console.log("🔭 Warden is online and running on port 3000");
  });

  return app;
}
