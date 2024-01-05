import { Hono } from "hono";
import { cors } from "hono/cors";
import { gmailAuthRoutes } from "./gmail/gmail-auth-routes";
import { gmailAuthMiddleware } from "./gmail/gmail-auth-middleware";
import { apiRoutes } from "./api/api-routes";

const app = new Hono();

app.use("/*", cors());
app.use("/api/*", gmailAuthMiddleware);

app.route("/", gmailAuthRoutes);

app.route("/api/", apiRoutes);

export default app;
