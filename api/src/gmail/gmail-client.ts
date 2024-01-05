import { google } from "googleapis";

import * as fs from "fs-extra";

import path from "path";

import credentials from "../../credentials.json";

const SCOPES = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.modify",
  "https://www.googleapis.com/auth/gmail.compose",
  "https://www.googleapis.com/auth/gmail.send",
];

const TOKEN_PATH = path.join(__dirname, "../token.json");

export const authorize = async () => {
  const tokenExists = await fs.exists(TOKEN_PATH);
  const token = tokenExists ? await fs.readFile(TOKEN_PATH, "utf8") : "";

  if (token) {
    authenticate(JSON.parse(token));
    return true;
  }

  return false;
};

export const getOAuth2Client = () => {
  const GOOGLE_CLIENT_ID = credentials.web.client_id;
  const GOOGLE_CLIENT_SECRET = credentials.web.client_secret;
  const GOOGLE_CALLBACK_URL = credentials.web.redirect_uris[0];

  const oAuth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL
  );
  return oAuth2Client;
};

export const getNewToken = async () => {
  const oAuth2Client = getOAuth2Client();

  return oAuth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: SCOPES,
  });
};

export const saveToken = async (token: any) => {
  await fs.writeFile(TOKEN_PATH, JSON.stringify(token));
};

const authenticate = (token: any) => {
  const oAuth2Client = getOAuth2Client();

  oAuth2Client.setCredentials(token);
  google.options({
    auth: oAuth2Client,
  });
};
