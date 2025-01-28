import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import bcrypt from "bcrypt";

import { createPool } from "@vercel/postgres";
import { User } from "./app/types";

async function getUser(email: string): Promise<User | undefined> {
  try {
    const sql = createPool({ connectionString: process.env.DATABASE_URL });

    const user = await sql.query("SELECT * FROM users WHERE email=$1", [email]);

    return user.rows[0]; // Adjust based on the query response structure.
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUser(email);

          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            return {
              id: user.id.toString(),
              email: user.email,
              // password: user.password
            };
          } else {
            console.log("Invalid credentials");
            return null;
          }
        }
        return null;
      },
    }),
  ],

  secret: process.env.AUTH_SECRET,
});
