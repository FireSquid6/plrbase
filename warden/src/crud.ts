import { eq } from "drizzle-orm";
import { userTable, type InsertUser } from "./schema";
import type { Context } from "elysia";
import type { ApiCotext } from ".";

export async function insertUser({ db }: ApiCotext, user: InsertUser) {
  await db.insert(userTable).values(user);
}

export async function getUserByEmail({ db }: ApiCotext, email: string) {
  const users = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email));
  return users[0];
}

export async function getUserById({ db }: ApiCotext, id: string) {
  const users = await db.select().from(userTable).where(eq(userTable.id, id));
  return users[0];
}

export async function createSession({ auth }: ApiCotext, userId: string) {
  const session = await auth.createSession(userId, {});
  return session;
}

export async function deleteSession({ auth }: ApiCotext, id: string) {
  await auth.invalidateSession(id);
}

export function getUserFromSessionId(
  { }: ApiCotext,
  sessionId: string,
  ctx: Context,
) {
  // TODO
}
