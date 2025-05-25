import { protectedProcedure } from "@/lib/trpc";
import { inferProcedureBuilderResolverOptions } from "@trpc/server";

export class HelloWorldModule {
  constructor() {}

  public static build() {
    return new HelloWorldModule();
  }

  public getName(
    opts: inferProcedureBuilderResolverOptions<typeof protectedProcedure>
  ) {
    if (!opts.ctx.session) {
      return `Hello ${opts.input}! What's up?`
    }

    return `Hello ${opts.input}! What's up ${opts.ctx.user?.name}?`;
  }
}
