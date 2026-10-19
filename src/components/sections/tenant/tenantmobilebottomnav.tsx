"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";

import {
  LayoutDashboard,
  SearchSlash,
  CircleUserRound,
  CalendarCheck,
  MessageCircleMore,
} from "lucide-react";

const navigationItems = [
  {
    label: "Overview",
    href: "/tenant/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Browse Listings",
    href: "/tenant/browse-listings",
    icon: SearchSlash,
  },
  {
    label: "Messages",
    href: "/tenant/messages",
    icon: MessageCircleMore,
  },
  {
    label: "My Bookings",
    href: "/tenant/my-bookings",
    icon: CalendarCheck,
  },
  {
    label: "Profile",
    href: "/tenant/profile",
    icon: CircleUserRound,
  },
];

const TenantMobileBottomNav = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const chatIsOpen = Boolean(searchParams.has("chatId"));

  if (chatIsOpen) {
    return null; // Hide the bottom navigation when the chat is open
  }

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t rounded-lg border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-[var(--color-bg-primary-base)] sm:flex md:flex lg:*:hidden">
      <div className="flex h-12 w-full items-center justify-around px-0">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200 ${
                isActive
                  ? "bg-[var(--color-accent-gold)] text-white"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-white dark:hover:bg-slate-800 dark:hover:text-white"
              }`}
            >
              <Icon
                className={`h-5 w-5 ${
                  isActive ? "stroke-[2.5]" : "stroke-2"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default TenantMobileBottomNav;