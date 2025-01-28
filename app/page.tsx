import Link from "next/link";
import { NavBar } from "../components/NavBar";

export default function Main({}) {
  return (
    <>
      My next app
      <Link href={"/games"}>To the games</Link>
    </>
  );
}
