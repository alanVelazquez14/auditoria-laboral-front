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
  matcher: ["/home/:path*", "/profile/:path*", "/dashboard/:path*"],
};
