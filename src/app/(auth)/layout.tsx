import { Navigation } from "@/components/navigation";

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="min-h-screen bg-[#222222] text-white">
      <Navigation />
      {children}
    </div>
  );
}
