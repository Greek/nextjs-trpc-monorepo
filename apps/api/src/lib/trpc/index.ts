import { initTRPC, TRPCError } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { ZodError } from 'zod';

import { auth } from '../auth';

interface CreateContextOptions {
  // Empty, add your own options here.
}

export function createContextInner(_opts: CreateContextOptions) {
  return {};
}

const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const headers = Object.entries(req.headers).reduce<Record<string, string>>(
    (acc, [key, value]) => {
      if (typeof value === 'string') {
        acc[key] = value;
      } else if (Array.isArray(value)) {
        acc[key] = value.join(', ');
      }
      return acc;
    },
    {},
  );

  const currSess = await auth.api.getSession({
    headers: new Headers(headers),
  });

  return {
    session: currSess?.session,
    user: currSess?.user,
  };
};
export type Context = Awaited<ReturnType<typeof createContext>>;

export const t = initTRPC.context<Context>().create({
  errorFormatter(opts) {
    const { shape, error } = opts;
    return {
      ...shape,
      data: {
        ...shape.data,
        validationError:
          error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use((opts) => {
  if (!opts.ctx.session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be signed in to do this.',
    });
  }

  return opts.next({ ctx: opts.ctx, input: opts.input });
});

/**
 * Returns a TRPC router for express.
 * @param router TRPC router
 * @returns TRPC express middleware
 */
export const initalizeTRPCRouter = (router: any) => {
  return trpcExpress.createExpressMiddleware({
    router,
    createContext,
  });
};
