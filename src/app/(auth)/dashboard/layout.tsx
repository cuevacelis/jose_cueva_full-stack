import { AuthHeader } from "@/app/(auth)/dashboard/_layout/auth-header";
import { verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";
import AuthMain from "./_layout/auth-main";

export default async function AuthLayout({
  children,
}: LayoutProps<"/dashboard">) {
  const session = await verifySession();

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <AuthHeader />
      <AuthMain>{children}</AuthMain>
    </>
  );
}
