import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia, generateId } from "lucia";
import { sessionTable, userTable } from "./schema";
import { isValidEmail, isValidPassword } from "./validators";
import { Argon2id } from "oslo/password";
import db from "./db";
import { insertUser } from "./crud";

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);
export const auth = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: true, // set `Secure` flag in HTTPS
    },
  },
  getUserAttributes(attributes) {
    return {
      email: attributes.email,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof Lucia;
    DatabaseUserAttributes: {
      email: string;
    };
  }
}

export async function createUser(
  email: string,
  password: string,
): Promise<[string, string]> {
  if (!isValidEmail(email)) {
    return ["", "invalid email"];
  }
  if (!isValidPassword(password)) {
    return ["", "invalid password"];
  }

  const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);

  insertUser({
    id: userId,
    email,
    hashedPassword,
  });

  try {
  } catch (e) {
    return ["", "user already exists"];
  }

  return [userId, ""];
}
