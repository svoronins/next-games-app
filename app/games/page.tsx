import AllGames from "../../components/AllGames";
import { NavBar } from "../../components/NavBar";
import { SideBar } from "../../components/SideBar";
import { getGames } from "../transport";

export default async function StartPage() {
  const games = await getGames();
  return (
    <div className="content flex">
      <NavBar />
      <SideBar games={games} />
      <AllGames games={games} />;
    </div>
  );
}
