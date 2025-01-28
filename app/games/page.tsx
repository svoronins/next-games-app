import { Suspense } from "react";
import AllGames from "../../components/AllGames";
import { NavBar } from "../../components/NavBar";
import { SideBar } from "../../components/SideBar";
import { getGames } from "../transport";
export default async function StartPage() {
  const games = await getGames();
  // const session = getServerSession(authConfig);
  // console.log(session);
  return (
    <div className="content flex">
      <Suspense fallback={<div>Loading...</div>}>
        {/* <NavBar /> */}
        <SideBar games={games} />
        <AllGames games={games} />
      </Suspense>
    </div>
  );
}
