import { auth } from '@/lib/auth';
import { inferProcedureBuilderResolverOptions } from '@trpc/server';
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
    const freshSesh = await auth.api.getSession({
      headers: Object.assign(opts.ctx.req.headers),
    });
    console.log(freshSesh);
    if (!opts.ctx.session) {
      return `Hello ${opts.input}! What's up?`;
    }

    return `Hello ${opts.input}! What's up ${opts.ctx.user?.name}?\n\nYour request ID is ${opts.ctx.req.rid}`;
  }
}
