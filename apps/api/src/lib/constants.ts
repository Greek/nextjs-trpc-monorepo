import { env } from './env';

export const ALLOWED_ORIGINS = env.CORS_ALLOWED_ORIGINS?.split(',');
export const MIN_PASSWORD_LENGTH = /.{8,}/;
export const MAX_PASSWORD_LENGTH = /.{128,}/;
