import NextAuth, { DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

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

        if (!res.ok) {
          throw new Error(data.message || "Error al iniciar sesión");
        }

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
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users/social-login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: user.email,
                fullName: user.name,
                googleId: user.id,
              }),
            },
          );

          const data = await res.json();
          if (res.ok && data.token) {
            (user as any).token = data.token;
            (user as any).id = data.user.id;
            return true;
          }
          return false;
        } catch (error) {
          console.error("Error en social login:", error);
          return false;
        }
      }
      return true;
    },

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
        session.user.id = token.id;
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
