import { json, urlencoded } from "body-parser";
import { ZodError } from "zod";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";

import * as trpcExpress from "@trpc/server/adapters/express";
import { initTRPC } from "@trpc/server";

// TRPC routers
import { helloWorldRouter } from "./modules/hello-world/hello-world.router";

interface CreateContextOptions {
  // Empty, add your own options here.
}

export async function createContextInner(_opts: CreateContextOptions) {
  return {};
}

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return {};
};


type Context = Awaited<ReturnType<typeof createContext>>;

export const t = initTRPC.context<Context>().create({
  errorFormatter(opts) {
    const { shape, error } = opts;
    return {
      ...shape,
      data: {
        ...shape.data,
        validationError:
          error.code === "BAD_REQUEST" && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  },
});

export const rootRouter = t.router({
  app: t.router({
    helloWorld: helloWorldRouter,
  }),
});

export const createServer = (): Express => {
  const app = express();

  app.disable("x-powered-by");
  if (process.env.NODE_ENV == "development") {
    app.use(morgan("dev"));
  } else {
    app.use(morgan("tiny"));
  }

  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use(cors());
  app.get("/status", (_, res) => res.status(200).json({ ok: true }));
  app.use(
    "/internal",
    trpcExpress.createExpressMiddleware({ router: rootRouter, createContext })
  );

  return app;
};

export type AppRouter = typeof rootRouter;
