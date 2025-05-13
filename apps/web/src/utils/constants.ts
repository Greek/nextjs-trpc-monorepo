const VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "";
const RAILWAY_STATIC_URL = process.env.RAILWAY_STATIC_URL
  ? `https://${process.env.RAILWAY_STATIC_URL}`
  : "";
const HEROKU_URL = process.env.HEROKU_APP_NAME
  ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`
  : "";
const RENDER_URL = process.env.RENDER_EXTERNAL_URL
  ? `https://${process.env.RENDER_EXTERNAL_URL}`
  : "";

export const BASE_URL =
  process.env.NEXT_PUBLIC_WEBAPP_URL ||
  VERCEL_URL ||
  RAILWAY_STATIC_URL ||
  HEROKU_URL ||
  RENDER_URL ||
  "http://localhost:3000";

export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export const APP_NAME = process.env.NEXT_PUBLIC_PRODUCT_NAME || "Your Product";

export const WEBSITE_URL =
  process.env.NEXT_PUBLIC_WEBSITE_URL || BASE_URL || "";

export const SUPPORT_MAIL_ADDRESS =
  process.env.NEXT_PUBLIC_SUPPORT_MAIL_ADDRESS || "";

export const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || "";

export const SENDER_ID = process.env.NEXT_PUBLIC_SENDER_ID || "";

export const SENDER_NAME =
  process.env.NEXT_PUBLIC_SENDGRID_SENDER_NAME || "";