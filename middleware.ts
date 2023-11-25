import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { token } = req.nextauth;

    if (
      pathname.startsWith("/") &&
      (token?.role === "PROJECT_MANAGER" || token?.role === "CHIEF_EDITOR")
    ) {
      const url = new URL("/home", req.url);
      return NextResponse.rewrite(url);
    } else if (pathname.startsWith("/") && token?.role === "TRANSLATOR") {
      const url = new URL("/translate", req.url);
      return NextResponse.rewrite(url);
    } else {
      const url = new URL("/", req.url);
      return NextResponse.rewrite(url);
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
export const config = { matcher: ["/", "/home", "/translate"] };
