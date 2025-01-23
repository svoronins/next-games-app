"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Game } from "../app/types";

export function GameCard({ game }: { game: Game }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ">
      <img
        src={game.thumbnail}
        alt={game.title}
        className="w-full h-48 object-cover cursor-pointer"
        onClick={() => router.push(`/games/${game.id}`)}
      />

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 truncate">{game.title}</h2>

        <p className="text-gray-600 text-sm">
          {isExpanded
            ? game.short_description
            : `${game.short_description.substring(0, 50)}...`}
        </p>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-blue-500 hover:underline text-sm"
        >
          {isExpanded ? "Show Less" : "Read More"}
        </button>
      </div>

      <div className="px-4 pb-4 flex justify-between items-center">
        {/* <span className="text-sm text-blue-600 font-medium">{game.genre}</span> */}
        <a
          href={game.game_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
        >
          Play Now
        </a>
      </div>
    </div>
  );
}
