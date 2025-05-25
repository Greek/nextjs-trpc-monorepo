import { z } from "zod";
import { initTRPC } from "@trpc/server";
import { HelloWorldModule } from "./hello-world.module";
import { protectedProcedure, publicProcedure } from "../../lib/trpc";

const t = initTRPC.create();
export const helloWorldRouter = t.router({
  getName: publicProcedure.input(z.string().min(2)).mutation(async (opts) => {
    return HelloWorldModule.build().getName(opts);
  }),
  protected_getName: protectedProcedure
    .input(z.string().min(2))
    .mutation(async (opts) => {
      return HelloWorldModule.build().getName(opts);
    }),
});
