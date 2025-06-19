import { auth } from '@/lib/auth';
import { logger } from '@/lib/logger';
import { inferProcedureBuilderResolverOptions } from '@trpc/server';
import type { Request } from 'express';
import winston from 'winston';
import { protectedProcedure } from '../../lib/trpc';
export class HelloWorldModule {
  constructor(private logger: winston.Logger) {}

  public static build() {
    const _logger = logger.child({
      meta: { module: 'hello-world' },
    });
    return new HelloWorldModule(_logger);
  }

  public async getName(
    opts: inferProcedureBuilderResolverOptions<typeof protectedProcedure>,
  ) {
    const req = opts.ctx.req as Request;

    const freshSesh = await auth.api.getSession({
      headers: Object.assign(req.headers),
    });
    logger.info(freshSesh);

    if (!opts.ctx.session) {
      return `Hello ${opts.input}! What's up?`;
    }

    return `Hello ${opts.input}! What's up ${opts.ctx.user?.name}?\n\nYour request ID is ${opts.ctx.req.rid}`;
  }
}
