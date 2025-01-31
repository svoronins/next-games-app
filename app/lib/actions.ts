"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { createUser } from "../../dbQuery";
import { redirect } from "next/navigation";

// ...

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
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const firstname = formData.get("firstname") as string;
    const lastname = formData.get("lastname") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      return "All fields are required.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    const isCreated = await createUser({
      firstname,
      lastname,
      email,
      password,
    });
    console.log("created:", isCreated);

    if (isCreated) {
      return "Your account has been successfully created";
    } else {
      return "Something went wrong";
    }
  } catch (error) {
    if (error instanceof AuthError) {
      return error.message;
    }
    return "An unexpected error occurred.";
  }
}
