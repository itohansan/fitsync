import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// public or private route
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-up(.*)",
  "/subscribe(.*)",
  "/api/webhook(.*)",
  "/api/check-subscription(.*)",
  "/personal(.*)",
]);

// signup
const isSignUpRoute = createRouteMatcher(["/sign-up(.*)"]);
// plan
const isPlanRoute = createRouteMatcher(["/plan(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const userAuth = await auth();
  const { userId } = userAuth;
  const { pathname, origin } = req.nextUrl;
  // console.log("Info", "pathname", pathname, "origin", origin, userId);
  // console.log(userAuth,req, "tgiu");

  // check is already on subscription actv
  if (pathname === "/api/check-subscription") {
    return NextResponse.next();
  }

  // redirect route if not public and if not signed-in
  if (!isPublicRoute(req) && !userId) {
    return NextResponse.redirect(new URL("/sign-up/", origin));
  }

  // redirect to plan if user is signed in
  if (isSignUpRoute(req) && userId) {
    return NextResponse.redirect(new URL("/plan", origin));
  }

  // check if  plan route,**cant use prisma in nextjs inside middleware, so make an api route that would give us curr sub stat
  if (isPlanRoute(req) && userId) {
    try {
      const response = await fetch(
        `${origin}/api/check-subscription?userId=${userId}`
      );
      const data = await response.json();
      if (!data.subscriptionActive) {
        return NextResponse.redirect(new URL("/subscribe", origin));
      }
    } catch (error: any) {
      return NextResponse.redirect(new URL("/subscribe", origin));
    }
  }
  return NextResponse.next();
});

// export const config = {
//   matcher: [
//     // Skip Next.js internals AND all static files (including .mp4!)
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|mp4|webm|ogg|mov)).*)",

//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// };

export const config = {
  matcher: [
    // Run middleware on everything EXCEPT static assets and Next.js internals
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:mp4|webm|ogg|png|jpg|jpeg|gif|svg|webp|ico|woff2?|ttf)).*)",
  ],
};
