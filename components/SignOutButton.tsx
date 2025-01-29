"use client";
import { signOut } from "../app/helpers";

export function SignOutButton({ action }: { action: () => void }) {
  return (
    <button
      className="w-full text-start block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
      role="menuitem"
      onClick={action}
    >
      Sign out
    </button>
  );
}
