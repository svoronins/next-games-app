import { IGames } from "../types";
import { GameCard } from "./GameCard";

async function getGames(): Promise<IGames[]> {
  const res = await fetch("https://www.freetogame.com/api/games", {
    cache: "force-cache",
  });
  return res.json();
}

export default async function AllGames() {
  const games = await getGames();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Games Library</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
