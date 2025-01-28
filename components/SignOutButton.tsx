"use client";

import { signOut } from "next-auth/react";

export async function SignOutButton() {
  return (
    <button
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
      role="menuitem"
      onClick={async () => {
        signOut({ callbackUrl: "/" });
      }}
    >
      Sign out
    </button>
  );
}
