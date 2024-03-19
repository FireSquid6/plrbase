import { eq } from "drizzle-orm";
import db from "./db";
import { userTable, type InsertUser } from "./schema";
import { auth } from "./auth";

export async function insertUser(user: InsertUser) {
  await db.insert(userTable).values(user);
}

export async function getUserByEmail(email: string) {
  const users = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email));
  return users[0];
}

export async function getUserById(id: string) {
  const users = await db.select().from(userTable).where(eq(userTable.id, id));
  return users[0];
}

export async function createSession(userId: string) {
  const session = await auth.createSession(userId, {});
  return session;
}
