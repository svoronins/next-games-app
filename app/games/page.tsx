import AllGames from "../components/AllGames";
import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";

export default function StartPage() {
  return (
    <div className="content flex">
      {/* <NavBar /> */}
      {/* <SideBar /> */}
      <AllGames />;
    </div>
  );
}
