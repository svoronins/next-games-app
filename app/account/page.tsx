import { auth } from "../../auth";

export default async function AccountPage() {
  const session = await auth();
  return (
    <p>
      Welcome, {session?.user?.firstname} {session?.user.lastname}
      <br />
    </p>
  );
}
