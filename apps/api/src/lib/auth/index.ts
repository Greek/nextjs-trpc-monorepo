import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../../db";
import { ALLOWED_ORIGINS, MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from "../constants";
import { createAuthMiddleware } from "better-auth/api";
import * as schema from "../../db/schema";
import { validateSignupHook } from "./hooks";

export const auth: ReturnType<typeof betterAuth> = betterAuth({
  basePath: "/auth",
  trustedOrigins: ALLOWED_ORIGINS,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: Number(MIN_PASSWORD_LENGTH.source.split("").filter(Number)),
    maxPasswordLength: Number(MAX_PASSWORD_LENGTH.source.split("").filter(Number)),
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path == "/sign-up/email") {
        validateSignupHook(ctx.body?.password);
      }
    }),
  },
});
