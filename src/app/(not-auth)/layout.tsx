import { redirect } from "next/navigation";
import NotAuthHeader from "./_layout/not-auth-header";
import NotAuthMain from "./_layout/not-auth-main";
import { verifySession } from "@/lib/dal";

export default async function NotAuthLayout({ children }: LayoutProps<"/">) {
  const session = await verifySession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <>
      <NotAuthHeader />
      <NotAuthMain>{children}</NotAuthMain>
    </>
  );
}
