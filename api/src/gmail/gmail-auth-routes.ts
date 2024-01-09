import { Hono } from "hono";
import {
  authorize,
  getNewToken,
  getOAuth2Client,
  saveToken,
} from "./gmail-client";

export const gmailAuthRoutes = new Hono();

gmailAuthRoutes.get("/gmailAuth", async (c) => {
  try {
    const authenticated = await authorize();

    // if not authenticated, request new token
    if (!authenticated) {
      const authorizeUrl = await getNewToken();
      return c.html(
        `<script>window.open("${authorizeUrl}", "_blank");</script>`
      );
    }

    return c.text("Authenticated");
  } catch (error) {
    return c.json({ error });
  }
});

gmailAuthRoutes.get("/oauth2Callback", async (c) => {
  try {
    // get authorization code from request
    const { code } = c.req.query();

    const oAuth2Client = getOAuth2Client();
    const result = await oAuth2Client.getToken(code);
    const tokens = result.tokens;

    await saveToken(tokens);

    console.log("Successfully authorized");

    return c.text("Successfully authorized");
  } catch (error) {
    return c.json({ error });
  }
});
