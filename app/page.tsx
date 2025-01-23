import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      My next app
      <Link href={"/games"}>To the games</Link>
    </main>
  );
}
