import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { createMenuItem, listMenuItems, removeMenuItem, updateMenuItem } from "./db";

const menuInput = z.object({
  name: z.string().trim().min(1).max(140),
  description: z.string().trim().min(1).max(1000),
  price: z.string().trim().min(1).max(24),
  category: z.enum(["lattes", "matchas", "refreshers", "espresso", "pastries", "ice-cream"]),
  imageUrl: z.string().trim().max(500).optional(),
  isActive: z.number().int().min(0).max(1).optional(),
  sortOrder: z.number().int().min(0).optional(),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  menu: router({
    list: publicProcedure.query(() => listMenuItems(false)),
    adminList: adminProcedure.query(() => listMenuItems(true)),
    create: adminProcedure.input(menuInput).mutation(({ input }) => createMenuItem(input)),
    update: adminProcedure
      .input(menuInput.partial().extend({ id: z.number().int().positive() }))
      .mutation(({ input }) => {
        const { id, ...changes } = input;
        return updateMenuItem(id, changes);
      }),
    remove: adminProcedure
      .input(z.object({ id: z.number().int().positive() }))
      .mutation(({ input }) => removeMenuItem(input.id)),
  }),
});

export type AppRouter = typeof appRouter;
