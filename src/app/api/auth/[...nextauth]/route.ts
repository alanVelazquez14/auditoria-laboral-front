import NextAuth, { DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      accessToken?: string;
      roleTarget?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    token?: string;
    roleTarget?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken?: string;
    roleTarget?: string;
  }
}

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "DepurApp Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const authPayload = {
          email: credentials?.email,
          password: credentials?.password,
        };

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
          {
            method: "POST",
            body: JSON.stringify(authPayload),
            headers: { "Content-Type": "application/json" },
          },
        );

        const data = await res.json();

        if (res.ok && data.user) {
          return {
            ...data.user,
            token: data.token || data.accessToken,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as any;
        token.id = u.id;
        token.roleTarget = u.roleTarget;
        token.accessToken = u.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).roleTarget = token.roleTarget;
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth",
  },
});

export { handler as GET, handler as POST };
