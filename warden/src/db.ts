import { drizzle, type BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { Database } from "bun:sqlite";

export function getDb(): BunSQLiteDatabase {
  const sqlite = new Database(`warden.db`);
  const db = drizzle(sqlite);
  migrate(db, { migrationsFolder: `./migrations` });
  return db;
}
