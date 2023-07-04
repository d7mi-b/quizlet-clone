
import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { studysetRouter } from "./routers/studySet";
import { termRouter } from "./routers/term";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  studySet: studysetRouter,
  term: termRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
