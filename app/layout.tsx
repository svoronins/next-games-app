import "./globals.css";
import { Inter } from "next/font/google";
import { auth } from "../auth";
import { NavBar } from "../components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session && session.user) {
    session.user = {
      email: session.user.email,
      id: session.user.id,
    };
  }
  console.log("Provider", session?.user);

  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar session={session} />
        <main>{children}</main>
      </body>
    </html>
  );
}
