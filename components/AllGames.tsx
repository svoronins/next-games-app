"use client";

import { GameCard } from "./GameCard";
import { useSearchParams } from "next/navigation";
import { getPlatformId } from "../app/utils";
import { Game } from "../app/types";
import { Suspense } from "react";

export default function AllGames({ games }: { games: Game[] }) {
  // const games = await getGames();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const currentPlatform = searchParams.get("platform");
  console.log(currentPlatform);

  return (
    <Suspense>
      <div className="p-4 sm:ml-64">
        <div className="container mx-auto p-4 py-8 my-8">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {games
              .filter((game) => {
                const matchesCategory = currentCategory
                  ? game.genre.toLowerCase() === currentCategory.toLowerCase()
                  : true; // If no category is selected, match all
                const matchesPlatform = currentPlatform
                  ? getPlatformId(game.platform) === currentPlatform
                  : true; // If no platform is selected, match all
                return matchesCategory && matchesPlatform;
              })
              .map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
