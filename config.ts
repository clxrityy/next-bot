if (!process.env.NEXT_PUBLIC_APPLICATION_ID)
  throw new Error("APPLICATION_ID is not set");
if (!process.env.BOT_TOKEN) throw new Error("BOT_TOKEN is not set");
if (!process.env.PUBLIC_KEY) throw new Error("PUBLIC_KEY is not set");
if (!process.env.REGISTER_COMMANDS_KEY)
  throw new Error("REGISTER_COMMANDS_KEY is not set");

if (!process.env.CLIENT_SECRET) throw new Error("CLIENT_SECRET is not set");

if (!process.env.ENCRYPTION_KEY) throw new Error("ENCRYPTION_KEY not set")


export const CLIENT_APPLICATION_ID =
  process.env.NEXT_PUBLIC_APPLICATION_ID!;
export const BOT_TOKEN = process.env.BOT_TOKEN!;
export const PUBLIC_KEY = process.env.PUBLIC_KEY!;
export const REGISTER_COMMANDS_KEY = process.env.REGISTER_COMMANDS_KEY!;
export const CLIENT_SECRET = process.env.CLIENT_SECRET!;
export const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!;

export enum DISCORD_API_ROUTES {
  OAUTH2_TOKEN = "https://discord.com/api/v10/oauth2/token",
  OAUTH2_USER = "https://discord.com/api/v10/users/@me",
  OAUTH2_TOKEN_REVOKE = "https://discord.com/api/v10/oauth2/token/revoke",
}

export const REDIRECT_URI = process.env.NODE_ENV === "development" ? "http://localhost:3000/api/auth/discord/redirect" : "" // REPLACE WITH YOUR PRODUCTION/VERCEL URL