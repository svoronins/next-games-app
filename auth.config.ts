import type { NextAuthConfig } from "next-auth";
export const authConfig = {
  pages: {
    signIn: "/auth/sign-in",
    signOut: "/auth/sign-out",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        // User is available during sign-in
        token.id = Number(user.id);
      }
      if (trigger === "update" && session) {
        token = { ...token, user: session };
        return token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
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
