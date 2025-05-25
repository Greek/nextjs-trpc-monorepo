import { inferProcedureBuilderResolverOptions } from "@trpc/server";
import { protectedProcedure } from "../../lib/trpc";

export class HelloWorldModule {
  constructor() {}

  public static build() {
    return new HelloWorldModule();
  }

  public getName(
    opts: inferProcedureBuilderResolverOptions<typeof protectedProcedure>
  ) {
    console.log(`[Session] ${JSON.stringify(opts.ctx.session)}`)
    console.log(`[User] ${JSON.stringify(opts.ctx.user)}`)

    if (!opts.ctx.session) {
      return `Hello ${opts.input}! What's up?`
    }

    return `Hello ${opts.input}! What's up ${opts.ctx.user?.name}?`;
  }
}

