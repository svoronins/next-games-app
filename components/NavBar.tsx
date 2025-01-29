import Link from "next/link";
import { AccountDropDown } from "./AccountDropDown";
import { auth } from "../auth";
import { SignInButton } from "./SignInButton";

export async function NavBar() {
  const session = await auth();
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
            {session ? <AccountDropDown session={session} /> : <SignInButton />}
          </div>
        </div>
      </div>
    </nav>
  );
}
