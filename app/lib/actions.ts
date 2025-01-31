"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { createUser } from "../../dbQuery";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
export async function registerUser(
  prevState: { id?: number; error: string | null },
  formData: FormData
) {
  try {
    const firstname = formData.get("firstname")?.toString().trim();
    const lastname = formData.get("lastname")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();
    const confirmPassword = formData.get("confirmPassword")?.toString();

    // Input validation
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      return { error: "All fields are required." };
    }
    if (password.length < 6) {
      return { error: "Password must be at least 6 characters." };
    }
    if (password !== confirmPassword) {
      return { error: "Passwords do not match." };
    }

    // Create the user

    const newUser: { id: number } = await createUser({
      firstname,
      lastname,
      email,
      password,
    });

    if (!newUser || !newUser.id) {
      return { error: "Failed to create user. Email may already be in use." };
    }

    return { id: newUser.id, error: null }; // Returning user object with id
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred." };
  }
}
