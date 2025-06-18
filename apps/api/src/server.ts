import { toNodeHandler } from 'better-auth/node';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import express, { type Express } from 'express';
import { auth } from './lib/auth';
import { ALLOWED_ORIGINS } from './lib/constants';

// TRPC initializers and routers
import { initalizeTRPCRouter, t } from './lib/trpc';
import helloWorldRouter from './modules/hello-world';

export const rootRouter = t.router({
  app: t.router({
    helloWorld: helloWorldRouter,
  }),
});

export const createServer = (): Express => {
  const app = express();

  // Enable CORS before all else, otherwise you'll have a bad time.
  app.use(
    cors({
      origin: ALLOWED_ORIGINS,
      credentials: true,
    }),
  );

  // Authentication handler.
  app.all('/auth/{*splat}', toNodeHandler(auth));

  app.disable('x-powered-by');

  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.get('/status', (_, res) => res.status(200).json({ ok: true }));
  app.use('/internal', initalizeTRPCRouter(rootRouter));

  return app;
};

export type AppRouter = typeof rootRouter;
