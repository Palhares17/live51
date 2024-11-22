import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Live #51",
  description: "Autenticação com NextAuth.js",
};

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = Boolean(await auth());
  
  if (isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className="min-h-screen grid place-items-center p-4">{children}</div>
  );
}
