"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { SignOutButton } from "./SignOutButton";
import { signIn, signOut } from "../app/helpers";
import Link from "next/link";
import { User } from "../app/types";
import { auth } from "../auth";
import { Session } from "next-auth";

export function NavBar({ session }: { session: Session | null }) {
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <Link className="flex ms-2 md:me-24" href={"/games"}>
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                Games
              </span>
            </Link>
            <a href="https://flowbite.com" className="flex ms-2 md:me-24"></a>
          </div>
          <div className="flex items-center">
            {session ? (
              <div className="flex items-center ms-3 relative">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                    onClick={() => setShowAccountMenu(!showAccountMenu)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    />
                  </button>
                </div>
                <div
                  className={`z-50 ${
                    showAccountMenu ? "" : "hidden"
                  } my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 absolute top-full right-0`}
                  id="dropdown-user"
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      {session.user?.email}
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    {/* <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Earnings
                      </a>
                    </li> */}
                    <li>
                      <button
                        className="w-full text-start block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                        onClick={async () => {
                          await signOut();
                        }}
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <button>
                <a href="/login">Log in</a>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
