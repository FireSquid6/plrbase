import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

export function getDb(real: boolean = true) {
  const sqlite = new Database(real ? "warden.db" : ":memory:");
  return drizzle(sqlite);
}
