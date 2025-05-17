import { env } from "./env";

export const ALLOWED_ORIGINS = env.CORS_ALLOWED_ORIGINS?.split(",");
