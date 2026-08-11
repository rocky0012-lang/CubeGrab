import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TenantSidebarNavItemProps {
    to: string;  // The target URL path destination (e.g., "/payments")
    icon: React.ReactNode;  // The Lucide icon element (e.g., <CreditCard />)
    label: string;  // The text label shown next to the icon (e.g., "Payments")
    isOpen: boolean;   // The state tracking if the sidebar is expanded or collapsed
    badgeCount?: number;  // Optional badge count for notification indicators
}

export default function TenantSidebarNavItem({ to, icon, label, isOpen, badgeCount }: TenantSidebarNavItemProps): React.JSX.Element {
  const pathname = usePathname();

  // Prevent parent routes from incorrectly matching child routes. 
  // Example: 
  // /tenant/my-bookings should match /tenant/my-bookings/123

  const isActive = pathname === to || 
  (to !== "/tenant/dashboard" && pathname.startsWith(`${to}/`));  
  
  return (
        <Link 
            href={to} 
            aria-label={!isOpen ? label : undefined}
            className={` group relative flex items-center w-full rounded-md px-3 py-2.5 transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2  focus-visible:ring-offset-slate-950
              ${isOpen ? "gap-3" : "justify-center"}
              ${isActive 
                ? "bg-[var(--color-accent-gold)] text-white" 
                : "text-slate-300 hover:bg-[var(--color-accent-gold-dark)] hover:text-white"
              }
            `}
            >
            
            {/* ICON */} 
            <span className="flex h-5 w-5 shrink-0 items-center justify-center" aria-hidden="true"> 
                {icon} 
            </span>

            {/* Nav Text */}
            {isOpen && (
              <span className="flex-1 whitespace-nowrap text-md">
                {label}
              </span>
            )}

            {isOpen && badgeCount > 0 && (
              <span className="shrink-0 rounded-full bg-blue-500 px-2 py-0.5 text-xs">
                {badgeCount}
              </span>
            )}
            
            {/* Hover Tooltip: Appears exclusively when the sidebar is collapsed on desktop layout */}
            {!isOpen && (
              <span 
                className=" absolute left-full ml-2 hidden md:group-hover:block whitespace-nowrap rounded-md border px-2.5 py-1.5 text-xs text-white shadow-xl z-50 "
              >
                {label}
              </span>
            )}
          </Link>
    );
}
