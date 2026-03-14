import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const email = req.nextauth.token?.email as string | undefined;
    const allowed = process.env.ALLOWED_EMAIL;
    if (email && email !== allowed) {
      // Authenticated but wrong account → send back to login with error
      const url = req.nextUrl.clone();
      url.pathname = "/devFaiq/login";
      url.searchParams.set("error", "AccessDenied");
      return NextResponse.redirect(url);
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Skip auth check for the login page itself
        if (req.nextUrl.pathname === "/devFaiq/login") return true;
        return !!token;
      },
    },
    pages: {
      signIn: "/devFaiq/login",
    },
  },
);

export const config = {
  matcher: ["/devFaiq/:path*", "/api/devFaiq/:path*"],
};
