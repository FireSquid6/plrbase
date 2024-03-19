import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { Database } from "bun:sqlite";

export function getDb(real: boolean = true) {
  const sqlite = new Database(real ? "warden.db" : ":memory:");
  const db = drizzle(sqlite);
  migrate(db, { migrationsFolder: "./migrations" });

  return db;
}
