import { initTRPC } from "@trpc/server";
import { ZodError } from "zod";
import * as trpcExpress from "@trpc/server/adapters/express";

// I will regret this
import type { AnyRouter } from "@trpc/server/unstable-core-do-not-import";

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
  return { inner: createContextInner({}) };
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

/**
 * Returns a TRPC router for express.
 * @param router TRPC router
 * @returns TRPC express middleware
 */
export const initalizeTRPCRouter = (router: AnyRouter) => {
  return trpcExpress.createExpressMiddleware({
    router,
    createContext,
  });
};
