"use client";

import { useActionState } from "react";
// import { registerUser } from "@/app/lib/actions";
import Link from "next/link";
import { registerUser } from "../app/lib/actions";

export default function RegisterForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    registerUser,
    undefined
  );
  console.log(errorMessage);
  return (
    <form action={formAction} className="space-y-6 w-11/12 sm:w-1/2 mx-auto">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Create an Account
        </h1>

        <div className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="firstname"
            >
              First Name
            </label>
            <input
              className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              id="firstname"
              type="text"
              name="firstname"
              placeholder="Enter your first name"
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="lastname"
            >
              Last Name
            </label>
            <input
              className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              id="lastname"
              type="text"
              name="lastname"
              placeholder="Enter your last name"
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
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
              className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              id="password"
              type="password"
              name="password"
              placeholder="Create a password"
              required
              minLength={6}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="confirmPassword"
            >
              Re-enter Password
            </label>
            <input
              className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isPending}
          >
            {isPending ? "Registering..." : "Register"}
          </button>
          {errorMessage && (
            <div className="mt-4 text-center text-sm text-red-500">
              <p>{errorMessage}</p>
            </div>
          )}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Already have an account?{" "}
              <Link
                href="/auth/sign-in"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
              >
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
