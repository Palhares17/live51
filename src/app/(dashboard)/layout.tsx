import type { Metadata } from "next";
import { AppBar } from "./_components/AppBar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Live #51",
  description: "Autenticação com NextAuth.js",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await auth();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <AuthProvider user={user}>
      <div className="flex min-h-screen w-full flex-col">
        <AppBar />

        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
