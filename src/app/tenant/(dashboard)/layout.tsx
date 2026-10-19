"use client";

import { useSearchParams } from "next/navigation";

import TenantSidebar from "@/components/sections/tenant/tenant-sidebar";
import TenantNavbar from "@/components/sections/tenant/tenant-navbar";
import TenantMobileBottomNav from "@/components/sections/tenant/tenantmobilebottomnav";
import { ProfileProvider } from "@/providers/profile-provider";


export default function TenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const searchParams = useSearchParams();
  const chatIsOpen = Boolean(searchParams.has("chatId"));

  return (
    <ProfileProvider>
      <div className="flex min-h-screen w-full">
        {/* Persistent Sidebar */}
        <TenantSidebar />

        {/* Main Area */}
          <main
           className={`flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden px-1 py-1.5 md:px-4 md:py-5 ${
             chatIsOpen ? "h-dvh pb-0" : "pb-20 md:pb-0"
           }`}
          >
            <TenantNavbar />

            {children}
          </main>

        {/* Mobile Navigation */}
        <TenantMobileBottomNav />
      </div>
    </ProfileProvider>
  );
}