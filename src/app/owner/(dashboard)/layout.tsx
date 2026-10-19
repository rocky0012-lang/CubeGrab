import { ProfileProvider } from "@/providers/profile-provider";


export default function TenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProfileProvider>
      <div className="flex min-h-screen w-full">
        {/* Persistent Sidebar */}

        {/* Main Area */}
        <main className="flex min-w-0 pb-20 md:pb-0 flex-1 flex-col px-1 py-1.5 sm:px-6 md:px-9 md:py-7">
          {/* Navbar */}

          {/* Current page */}
          {children}
        </main>

        {/* Mobile Navigation */}
      </div>
    </ProfileProvider>
  );
}