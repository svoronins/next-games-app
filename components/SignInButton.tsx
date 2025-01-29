import Link from "next/link";

export function SignInButton() {
  return (
    <Link
      href="/login"
      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400"
    >
      Log in
    </Link>
  );
}
