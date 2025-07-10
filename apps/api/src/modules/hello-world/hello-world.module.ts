import { auth } from '@/lib/auth';
import { logger } from '@/lib/logger';
import httpContext from 'express-http-context';
import { GetNameProcedure } from './hello-world.types';

export class HelloWorldModule {
  constructor() {}

  public static build() {
    return new HelloWorldModule();
  }

  public async getName(opts: GetNameProcedure) {
    const req = opts.ctx.req;
    const freshSesh = await auth.api.getSession({
      headers: Object.assign(req.headers),
    });

    logger.info(`Logged session ${httpContext.get('rid')}`, {
      freshSesh,
    });

    if (!opts.ctx.session) {
      return `Hello ${opts.input}! What's up?`;
    }

    return `Hello ${opts.input}! What's up ${opts.ctx.user?.name}?\n\nYour request ID is ${httpContext.get('rid')}`;
  }
}
