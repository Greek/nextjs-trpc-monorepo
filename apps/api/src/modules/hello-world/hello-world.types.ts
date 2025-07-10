import { z } from 'zod';
import { Context } from '../../lib/trpc';

export const ZGetNameInput = z.string().min(2);
export type TGetNameInput = z.infer<typeof ZGetNameInput>;
export type GetNameProcedure = {
  input?: TGetNameInput;
  ctx: Context;
};
