import { auth } from '@api/lib/auth';
import { ALLOWED_ORIGINS } from '@api/lib/constants';
import { toNodeHandler } from 'better-auth/node';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import express, { type Express } from 'express';

import httpContext from 'express-http-context';
import ruid from 'express-ruid';

import { env } from '@api/lib/env';
import { requestHeadersMiddleware } from '@api/lib/middleware/request-headers';
import { checkForRedisConnection } from '@api/lib/redis';
import { initalizeTRPCRouter, t } from '@api/lib/trpc';
import helloWorldRouter from '@api/modules/hello-world';

export const rootRouter = t.router({
  app: t.router({
    helloWorld: helloWorldRouter,
  }),
});

export const createServer = (): Express => {
  checkForRedisConnection();

  const app = express();

  // Enable CORS before all else, otherwise you'll have a bad time.
  app.use(
    cors({
      origin: ALLOWED_ORIGINS,
      credentials: true,
    }),
  );
  app.use(httpContext.middleware);
  app.use(ruid({ setInContext: true, setHeader: false }));
  Boolean(env.LOG_HEADERS) && app.use(requestHeadersMiddleware);

  // Authentication handler.
  app.all('/auth/{*splat}', toNodeHandler(auth));

  app.disable('x-powered-by');
  app.use(urlencoded({ extended: true }));
  app.use(json());

  app.get('/status', (req, res) => {
    res.status(200).json({ ok: true });
  });
  app.use('/internal', initalizeTRPCRouter(rootRouter));

  return app;
};

export type AppRouter = typeof rootRouter;
