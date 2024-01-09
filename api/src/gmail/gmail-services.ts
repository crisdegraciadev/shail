import { google } from "googleapis";

const gmail = google.gmail("v1");

export const getCurrentUser = async () => {
  const { data } = await gmail.users.getProfile({ userId: "me" });

  return data;
};

export const getEmails = async (params: Record<string, string>) => {
  const response = await gmail.users.messages.list({ userId: "me", ...params });

  const { messages } = response.data;

  return !messages
    ? []
    : Promise.all(messages?.map(async ({ id }) => await getEmail(id)));
};

export const getEmail = async (id: any) => {
  const { data } = await gmail.users.messages.get({
    id,
    userId: "me",
  });

  return data;
};
