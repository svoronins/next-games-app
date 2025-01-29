import type { NextAuthConfig, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { User } from "./app/types";
import { AdapterUser } from "next-auth/adapters";
export type CustomUser = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
};

declare module "next-auth" {
  interface Session {
    user: CustomUser;
  }

  // interface User extends CustomUser {}

  interface JWT extends CustomUser {}
}

export const authConfig = {
  pages: {
    signIn: "/auth/sign-in",
    signOut: "/auth/sign-out",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const currentUser = user as unknown as User;
        // User is available during sign-in
        token.id = Number(user.id);
        token.email = user.email;
        token.firstname = currentUser.firstname;
        token.lastname = currentUser.lastname;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.firstname = token.firstname as string;
      session.user.lastname = token.lastname as string;
      session.user.email = token.email as string;

      return session;
    },

    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnUserPage = nextUrl.pathname.startsWith("/account");
      if (isOnUserPage) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL("/login", nextUrl)); // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // return Response.redirect(new URL("/account", nextUrl));
        return true;
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
