import { Sidebar } from '@/components/dashboard/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#09090B]">
      <Sidebar />
      {/* Main content area - offset for sidebar on desktop, top bar on mobile */}
      <main className="lg:pl-60 pt-14 lg:pt-0 min-h-screen">
        <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
