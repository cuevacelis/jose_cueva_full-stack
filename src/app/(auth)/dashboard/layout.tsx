import { Navigation } from "@/app/(auth)/dashboard/_layout/navigation";
import { verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: LayoutProps<"/dashboard">) {
  const session = await verifySession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-[#222222] text-white">
      <Navigation />
      {children}
    </div>
  );
}
