"use client";

import { useActionState } from "react";
import { authenticate } from "@/app/lib/actions";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/account";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <form
      action={formAction}
      className="space-y-6 w-11/12 sm:w-1/2 mx-auto" // Set width to 50% on medium and larger screens, 100% on smaller screens
    >
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Please log in to continue.
        </h1>

        <div className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 placeholder:text-gray-400"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 placeholder:text-gray-400"
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              minLength={6}
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 text-blue-500 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor="remember"
                className="ml-2 text-sm text-gray-600 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>

            <a
              href="#"
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 hover:dark:text-blue-500"
            >
              Forgot password?
            </a>
          </div>

          <input type="hidden" name="redirectTo" value={callbackUrl} />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-700 dark:hover:bg-blue-600"
            disabled={isPending}
          >
            {isPending ? "Logging in..." : "Log in"}
          </button>

          {errorMessage && (
            <div className="mt-4 text-center text-sm text-red-500">
              <p>{errorMessage}</p>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
