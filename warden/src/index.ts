import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

const app = new Elysia();
app.use(cors());

app.post("/user", (ctx) => { });

app.get("/user/:id", (ctx) => { });

app.post("/session", (ctx) => { });

app.listen(3000, () => {
  console.log("🔭 Warden is online and running on port 3000");
});
