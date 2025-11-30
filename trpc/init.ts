import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";
import SuperJSON from "superjson"; // 推荐使用 superjson 进行序列化

const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
});

const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "您必须登录才能执行此操作",
    });
  }
  return next({
    ctx: {
      user: ctx.user,
      session: ctx.session,
    },
  });
});

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const protectedProcedure = t.procedure.use(isAuthed);
