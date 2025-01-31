"use client";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SignOutButton } from "./SignOutButton";
import { Modal } from "./Modal";
import { signOut } from "../app/helpers";

export function AccountDropDown({ session }: { session: Session }) {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const pathName = usePathname();
  const userName = session.user?.firstname || "Account";
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useEffect(() => {
    setShowAccountMenu(false);
  }, [pathName]);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowAccountMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center ms-3" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-500"
          aria-expanded="false"
          data-dropdown-toggle="dropdown-user"
          onClick={() => setShowAccountMenu(!showAccountMenu)}
        >
          <span className="sr-only">Open user menu</span>
          Konto
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
            Hej {session.user?.firstname}
          </p>
        </div>
        <ul className="py-1" role="none">
          <li>
            <Link
              href={"/games"}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              All games
            </Link>
            <Link
              href={"/account"}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              My account page
            </Link>
          </li>
          <li>
            <SignOutButton action={() => setOpenModal(true)} />
          </li>
        </ul>
      </div>
      <Modal
        type="danger"
        confirmButtonLabel={"Log out"}
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={() => router.push("/logout")}
        header="Are you sure you want to log out?"
        description="After signing out you will be redirected to start page"
      />
    </div>
  );
}
