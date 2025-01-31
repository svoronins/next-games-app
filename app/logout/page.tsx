"use client";
import { useEffect } from "react";
import { signOut } from "../helpers";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    signOut().then(() => {
      router.push("/login"); // Redirect after logout
    });
  }, [router]);

  return <p>Logging out...</p>; // Temporary message before redirecting
}
