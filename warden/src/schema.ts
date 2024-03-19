import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
  id: text("id").primaryKey().notNull(),
  email: text("email").notNull(),
  hashedPassword: text("hashedPassword").notNull(),
});

// TOOD: the admins will be able to directly see the database
export const adminTable = sqliteTable("admin", {
  id: text("id").notNull().primaryKey(),
  email: text("email").notNull(),
  hashedPassword: text("hashedPassword").notNull(),
  emailVerified: text("emailVerified").notNull(),
});

export const profileTable = sqliteTable("profile", {
  id: text("id").notNull().primaryKey(),
  userId: text("userId").notNull(),
  username: text("username").notNull(),
  rating: integer("rating").notNull(),
});

export const matchesTable = sqliteTable("matches", {
  id: text("id").notNull().primaryKey(),
  userIds: text("userIds").notNull(),
});

export const serverTable = sqliteTable("server", {
  id: text("id").notNull().primaryKey(),
  token: text("token").notNull(),
});

export const sessionTable = sqliteTable("session", {
  id: text("id").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer("expiresAt").notNull(),
});
