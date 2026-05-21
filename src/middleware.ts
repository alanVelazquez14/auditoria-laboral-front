import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ token }) => !!token,
  },
  pages: {
    signIn: "/auth",
  },
});

export const config = {
  matcher: [
    "/home/:path*",
    "/applications/:path*",
    "/diagnostic/:path*",
    "/score/:path*",
    "/support/:path*",
    "/interviews/:path*",
    "/profile/:path*",
    "/completeProfile/:path*",
  ],
};
