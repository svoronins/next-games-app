import { neon } from "@neondatabase/serverless";
import { CreateUser, User } from "./app/types";
import bcrypt from "bcrypt";
import { AuthError } from "next-auth";
const sql = neon(`${process.env.DATABASE_URL}`);

export async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql("SELECT * FROM users WHERE email=$1", [email]);

    if (user.length === 0) {
      return undefined; // Return undefined when no user is found
    }

    return {
      id: user[0].id,
      email: user[0].email,
      firstname: user[0].firstname,
      lastname: user[0].lastname,
      password: user[0].password,
    };
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return undefined;
  }
}

export async function createUser(credentials: CreateUser) {
  try {
    const existstingUser = await getUser(credentials.email);

    if (existstingUser) {
      throw new Error("User already exists.");
    }
    const cryptPass = await bcrypt.hash(credentials.password, 10);
    const newUser = await sql(
      "INSERT INTO users(firstname, lastname,email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [
        credentials.firstname,
        credentials.lastname,
        credentials.email,
        cryptPass,
      ]
    );

    return { id: newUser[0].id };
  } catch (error) {
    console.error("Failed to fetching:", error);
    if (error instanceof AuthError) {
      throw new Error(error.message);
    }
    if (error instanceof Error) {
      if (error.message === "User already exists.") {
        throw new Error(
          "User with this email already exists. Please try a different one."
        );
      }
    }
    throw new Error("An unexpected error occurred while creating the user.");
  }
}
