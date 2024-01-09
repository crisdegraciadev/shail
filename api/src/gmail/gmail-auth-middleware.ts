import { Context, Env, Next } from "hono";
import { authorize } from "./gmail-client";

export const gmailAuthMiddleware = async (
  c: Context<Env, "/api/*">,
  next: Next
) => {
  try {
    const authenticated = await authorize();
    if (!authenticated) {
      throw "No Authenticated";
    }
    await next();
  } catch (error) {
    c.status(401);
    return c.json({ error });
  }
};
