import { Game } from "./types";

export async function getGames(): Promise<Game[]> {
  const res = await fetch("https://www.freetogame.com/api/games", {
    cache: "force-cache",
    // mode: "no-cors",
    // credentials: "include",
    // headers: {
    //   "Content-Type": "application/json",
    // },
  });
  return res.json();
}
