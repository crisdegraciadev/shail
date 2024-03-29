import { Hono } from "hono";
import { getCurrentUser, getEmails } from "../gmail/gmail-services";

export const apiRoutes = new Hono();

apiRoutes.get("/emails", async (c) => {
  const parmas = c.req.query();
  const emails = await getEmails(parmas);

  return c.json({ emails });
});

apiRoutes.get("/me", async (c) => {
  const user = await getCurrentUser();
  return c.json({ user });
});
