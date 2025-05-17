import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { env } from "./env";
import * as schema from "../db/schema"

export const auth = betterAuth({
  trustedOrigins: [(env.CORS_ALLOWED_ORIGIN || "http://localhost:3000")],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema
  }),
  emailAndPassword: {
    enabled: true,
  },
});
