// starts the backend
// deletes the database on startup and re-seeds it
// do not run this on the production server
import { getAuth } from "@/auth";
import { getDb } from "@/db";
import { startApp, type ApiContext } from "@/index";
import fs from "fs";

fs.rmSync("dev.db");

const db = getDb();
const context: ApiContext = {
  db,
  auth: getAuth(db),
  mode: "testing",
};

startApp(context);
