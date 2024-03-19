import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";
import { sessionTable, userTable } from "./schema";
import { BaseSQLiteDatabase } from "drizzle-orm/sqlite-core";

export function getAuth(db: BaseSQLiteDatabase<any, any, any>): Lucia {
  const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);
  const auth = new Lucia(adapter, {
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
  return auth;
}

declare module "lucia" {
  interface Register {
    Lucia: typeof Lucia;
    DatabaseUserAttributes: {
      email: string;
    };
  }
}
