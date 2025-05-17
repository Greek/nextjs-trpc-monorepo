import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import { ALLOWED_ORIGINS } from "./constants";
import * as schema from "../db/schema";

export const auth: ReturnType<typeof betterAuth> = betterAuth({
  basePath: "/auth",
  trustedOrigins: ALLOWED_ORIGINS,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
});
