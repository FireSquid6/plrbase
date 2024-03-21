import { drizzle, type BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { Database } from "bun:sqlite";

export function getDb(database: string): BunSQLiteDatabase {
  const sqlite = new Database(`${database}.db`);
  const db = drizzle(sqlite);
  migrate(db, { migrationsFolder: `./${database}/migrations` });
  return db;
}
