import { describe, expect, it } from '@jest/globals';
import supertest from 'supertest';
import { createServer, rootRouter } from '../server';

describe('Basic Tests', () => {
  // Create a caller so we can call our tRPC functions.
  const caller = rootRouter.createCaller({
    session: undefined,
    user: undefined,
  });

  it('status check returns 200', async () => {
    await supertest(createServer())
      .get('/status')
      .expect(200)
      .then((res) => {
        expect(res.body.ok).toBe(true);
      });
  });

  it('should return 200 OK ', async () => {
    const res = await caller.app.helloWorld.getName('andreas');

    expect(res).toBe("Hello andreas! What's up?");
  });
});
