import { Redis } from 'ioredis';
import { env } from './env';
import { logger } from './logger';

export const redis: Redis = new Redis(env.REDIS_URL!).on('error', (err) => {
  if (!env.REDIS_URL) {
    logger.warn('Redis URL not defined, aborting connection.');
    redis.disconnect();
  }
});

export async function checkForRedisConnection() {
  // Don't check if we're in a test env.
  if (process.env.NODE_ENV === 'test') {
    return;
  }

  if (redis.status !== 'ready') {
    return;
  }

  try {
    await redis.set('healthcheck', 1);
    await redis.get('healthcheck');
    await redis.del('healthcheck');
  } catch (err) {
    console.log(
      'Failed to connect to Redis. Please check your connection URL.',
    );
    process.exit(1);
  }
}
