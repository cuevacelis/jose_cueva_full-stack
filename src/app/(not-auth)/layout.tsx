export default function NotAuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="min-h-screen bg-[#222222] text-white">
      <main className="flex items-center justify-center min-h-screen">
        {children}
      </main>
    </div>
  );
}
