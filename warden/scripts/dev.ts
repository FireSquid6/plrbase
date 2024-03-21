import { getAuth } from "@/auth";
import { getDb } from "@/db";
import { App, type ApiContext } from "@/index";

const db = getDb("dev");
const context: ApiContext = {
  db,
  auth: getAuth(db),
};

App(context);
