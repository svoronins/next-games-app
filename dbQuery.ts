import { neon } from "@neondatabase/serverless";
import { CreateUser, User } from "./app/types";
import bcrypt from "bcrypt";
const sql = neon(`${process.env.DATABASE_URL}`);

export async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql("SELECT * FROM users WHERE email=$1", [email]);

    return {
      id: user[0].id,
      email: user[0].email,
      firstname: user[0].firstname,
      lastname: user[0].lastname,
      password: user[0].password,
    };
  } catch (error) {
    console.error("Failed to fetching:", error);
    throw new Error("Failed to fetching.");
  }
}

export async function createUser(credentials: CreateUser) {
  try {
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
    if (!!newUser[0]) return true;
    return false;
  } catch (error) {
    console.error("Failed to fetching:", error);
    throw new Error("Failed to fetching.");
  }
}
