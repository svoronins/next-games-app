"use server";
import { signIn as serverSignIn, signOut as serverSignOut } from "../auth";
export async function signIn() {
  await serverSignIn();
}
export async function signOut() {
  await serverSignOut({ redirectTo: "/" });
}
