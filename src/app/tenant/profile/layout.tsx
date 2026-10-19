import TenantProfileNavbar from "@/components/sections/tenant/tenant-profilenavbar";
import TenantMobileBottomNav from "@/components/sections/tenant/tenantmobilebottomnav";
import TenantProfileSidebar from "@/components/sections/tenant/tenant-profilesidebar";
import { ProfileProvider } from "@/providers/profile-provider";


export default function TenantProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProfileProvider>
      <div className="flex h-screen w-full flex-col overflow-hidden">
          {/* Profile Navbar */}
          <TenantProfileNavbar />

        {/* Profile Content Area */}
          <div className="flex min-h-0 flex-1 w-full">
              {/* Profile Sidebar */}
              <TenantProfileSidebar />

              {/* Main Area */}
              <main className="min-w-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 md:px-9 md:py-7">
                {/* Current page */}
                {children}
              </main>
          </div>

        {/* Mobile Navigation */}
        <TenantMobileBottomNav />
      </div>
    </ProfileProvider>
  );
};
