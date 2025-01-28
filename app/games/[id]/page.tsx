import { redirect } from "next/navigation";
import SingleGame from "../../../components/SingleGame";

async function getSingleGame(id: string) {
  const res = await fetch(`https://www.freetogame.com/api/game?id=${id}`);
  if (!res.ok) return undefined;
  return res.json();
}

export default async function Profile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  if (!id) {
    redirect("/games");
  }
  const game = await getSingleGame(id);
  if (!game) redirect("/games");

  return <SingleGame game={game} />;
}
