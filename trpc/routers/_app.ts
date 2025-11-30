import { z } from "zod";
import { protectedProcedure, createTRPCRouter } from "../init";
export const appRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx }) => {
    return {
      id: ctx.user.id,
      name: ctx.user.name,
      email: ctx.user.email,
    };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
