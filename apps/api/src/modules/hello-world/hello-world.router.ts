import { z } from "zod";
import { initTRPC } from "@trpc/server";
import { HelloWorldModule } from "./hello-world.module";

export const t = initTRPC.create();
export const helloWorldRouter = t.router({
  getName: t.procedure.input(z.string().min(2)).mutation(async (opts) => {
    return HelloWorldModule.build().getName(opts.input);
  }),
});
