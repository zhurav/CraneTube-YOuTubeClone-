import { initTRPC, TRPCError } from '@trpc/server';
import { cache, use } from 'react';
import superjson from 'superjson';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { ratelimit } from '@/lib/ratelimit';
// Context creation
// IMPORTANT: Make sure to `cache` this function
//            so that it's only called once per request

export const createTRPCContext = cache(async () => {
    /**
     * @see: https://trpc.io/docs/server/context
     */
    const { userId } = await auth();
    return { clerkUserId: userId };
});
export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
    /**
     * @see https://trpc.io/docs/server/data-transformers
     */
    transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;


export const protectedProcedure = t.procedure.use(async function isAuthed(opts) {
    const { ctx } = opts;

    if (!ctx.clerkUserId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    };
    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.clerkId, ctx.clerkUserId));
    if (!user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    };

    const { success } = await ratelimit.limit(user.id);
    if (!success) {
        throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
    };
    return opts.next({
        ctx: {
            ...ctx,
            user,
        }
    });

});
