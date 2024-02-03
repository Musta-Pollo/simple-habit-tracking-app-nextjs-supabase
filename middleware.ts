import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(`Middleware is running: ${user}`, user);

  // if user is signed in and the current path is / redirect the user to /dashboard
  if (user && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!user) {
    console.log(`User is not signed in: ${req.nextUrl.pathname}}`);
    if (["/", "/sign-in", "/sign-up"].includes(req.nextUrl.pathname)) {
      console.log("Return res");
      return res;
    } else {
      console.log("Redirect to /sign-in");
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
