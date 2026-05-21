import NextAuth, { DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { apiServerRequest } from "@/lib/api-server";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      accessToken?: string;
      fullName?: string;
      roleTarget?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    fullName?: string;
    token?: string;
    roleTarget?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    fullName?: string;
    accessToken?: string;
    roleTarget?: string;
  }
}

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
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

        const data = await apiServerRequest<{
          user: { id: string; fullName?: string; roleTarget?: string };
          token?: string;
          accessToken?: string;
        }>("/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(authPayload),
        });

        if (!data.user) {
          return null;
        }

        return {
          id: data.user.id,
          fullName: data.user.fullName,
          roleTarget: data.user.roleTarget,
          token: data.token || data.accessToken,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google") {
        return true;
      }

      try {
        const data = await apiServerRequest<{
          token: string;
          user: { id: string };
        }>("/api/users/social-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idToken: account.id_token,
          }),
        });

        (user as typeof user & { token?: string; id: string }).token = data.token;
        (user as typeof user & { token?: string; id: string }).id = data.user.id;
        return true;
      } catch (error) {
        console.error("Error en social login:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        const backendUser = user as typeof user & {
          token?: string;
          id: string;
          roleTarget?: string;
        };

        token.id = backendUser.id;
        token.roleTarget = backendUser.roleTarget;
        token.accessToken = backendUser.token;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.accessToken = token.accessToken;
        session.user.roleTarget = token.roleTarget;
        session.accessToken = token.accessToken;
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
