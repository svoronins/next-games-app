import Link from "next/link";

export function UserCreated() {
  return (
    <div className="flex flex-col items-center justify-center mt-10 p-6 bg-white border border-green-600 rounded-lg w-11/12 sm:w-1/2 mx-auto">
      {/* Check Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-12 h-12 text-green-600" // ✅ Green checkmark
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
        />
      </svg>

      {/* Success Message */}
      <h2 className="text-lg font-semibold text-green-700 mt-2">
        Account successfully created!
      </h2>
      <p className="text-sm mt-1">You can now log in to your account.</p>

      {/* Clickable Blue Link */}
      <Link
        href="/login"
        className="mt-4 text-blue-600 hover:underline hover:text-blue-800 transition duration-200"
      >
        Go to Login
      </Link>
    </div>
  );
}
