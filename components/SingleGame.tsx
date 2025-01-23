"use client";

import { useRouter } from "next/navigation";

export default function SingleGame({ game }: { game: any }) {
  const {
    title,
    description,
    developer,
    publisher,
    platform,
    release_date,
    genre,
    minimum_system_requirements,
    game_url,
    freetogame_profile_url,
    screenshots,
    thumbnail,
  } = game;
  const router = useRouter();
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-4 h-4 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Go Back
        </button>
      </div>

      {/* Game Header */}

      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 border-b pb-6">
        <img
          src={thumbnail}
          alt={title}
          className="w-48 h-48 rounded-lg shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-gray-600">{genre}</p>
          <div className="mt-2 flex flex-wrap gap-4">
            <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded">
              {platform}
            </span>
            <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded">
              Release Date: {release_date}
            </span>
            <span className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded">
              Status: Live
            </span>
          </div>
        </div>
      </div>

      {/* Game Description */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">About the Game</h2>
        <p className="text-gray-700 leading-7">{description}</p>
      </div>

      {/* Developer & Publisher Info */}
      <div className="mt-6 flex flex-col md:flex-row gap-4">
        <div>
          <h3 className="font-medium text-lg">Developer</h3>
          <p className="text-gray-600">{developer}</p>
        </div>
        <div>
          <h3 className="font-medium text-lg">Publisher</h3>
          <p className="text-gray-600">{publisher}</p>
        </div>
      </div>

      {/* System Requirements */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">
          Minimum System Requirements
        </h2>
        <ul className="text-gray-600">
          {Object.entries(minimum_system_requirements).map(([key, value]) => (
            <li key={key} className="mb-2">
              <span className="font-medium capitalize">{key}: </span>
              {value as any}
            </li>
          ))}
        </ul>
      </div>

      {/* Screenshots */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Screenshots</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {screenshots.map((screenshot: any, index: number) => (
            <img
              key={index}
              src={screenshot.image}
              alt={`${title} Screenshot ${index + 1}`}
              className="w-full h-auto rounded-lg shadow-md"
            />
          ))}
        </div>
      </div>

      {/* External Links */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Links</h2>
        <div className="flex flex-col gap-4">
          <a
            href={game_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Play the Game
          </a>
          <a
            href={freetogame_profile_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View on FreeToGame
          </a>
        </div>
      </div>
    </div>
  );
}
