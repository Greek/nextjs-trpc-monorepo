import { drizzle } from 'drizzle-orm/node-postgres';
import { env } from '@/utils/env.mjs';

const db = drizzle(env.DATABASE_URI);