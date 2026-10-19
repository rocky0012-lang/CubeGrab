"use client"

import { 
  CreditCard,
  Bookmark,
  Menu, 
  X,
  UserStar,
  UserRoundPlus, 
} from "lucide-react";
import { DropdownAvatar } from '@/components/reusable/dropdown-avatar';
import MobileNotificationBell from './mobilenotificationbelll';
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

interface NavigationItem {
  href: string;  // The target URL path destination (e.g., "/payments")
  icon: React.ReactNode;  // The Lucide icon element (e.g., <CreditCard />)
  label: string;  // The text label shown next to the icon (e.g., "Payments")
}

const primaryLinks: NavigationItem[] = [
  {href: "/tenant/saved-listings", icon: <Bookmark size={16} />, label: "Saved Listings",},
  {href: "/tenant/payments", icon: <CreditCard size={16} />, label: "Payments"},
  {href: "/tenant/reviews", icon: <UserStar size={16} />, label: "Reviews"},
  {href: "/tenant/invite-friends", icon: <UserRoundPlus size={16} />, label: "Invite Friends"},
];

const TenantMobileHeader = () => {
  
    const notificationCount = 3;

  return (
    <header className="relative flex h-12 w-full items-center justify-between gap-1 px-0 backdrop-blur-sm lg:hidden dark:bg-[var(--color-bg-primary-base)]">
      {/* Hamburger */}
        <Drawer direction="left">
          <DrawerTrigger asChild>
            <Button variant="ghost"><Menu className="size-5" /></Button>
          </DrawerTrigger>
          <DrawerContent className="h-[50vh] dark:bg-[var(--color-bg-primary-base)]">
            <DrawerHeader className="flex flex-row items-center justify-between">
              <div className="flex flex-col">
                <DrawerTitle>Menu</DrawerTitle>
                <DrawerDescription className="sr-only">
                  Tenant navigation menu
                </DrawerDescription>
              </div>
              <div className="items-center inline-flex justify-start">
                <DrawerClose asChild className="rounded-full border transition-colors hover:bg-black/5  dark:border-white/10 dark:text-white dark:hover:bg-white/10">
                  <Button variant="ghost"><X className="size-4" /></Button>
                </DrawerClose>
              </div>
            </DrawerHeader>
            <div className="flex-1 p-2">
              <div className="grid gap-2 border-black/10 dark:border-white/10">
                 {primaryLinks.map((link) => (
                   <Link key={link.href} href={link.href} className="flex items-center gap-2 border border-black/10 rounded-lg px-3 py-2 transition-colors hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10">
                     {link.icon}
                     <span>{link.label}</span>
                   </Link>
                 ))}
              </div>
            </div>
          </DrawerContent>
        </Drawer>

      {/* CubeGrab Logo */}
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-lg font-bold tracking-tight"
        aria-label="CubeGrab"
      >
        <span className="text-blue-600 dark:text-blue-400">
          Cube
        </span>
        <span className="text-(--color-accent-gold)">
          Grab
        </span>
      </div>
    
      {/* Notifications + Profile */}
      <div className="ml-auto flex items-center gap-1">
        <MobileNotificationBell />
        
        {/* Profile */}
        <div className="scale-80 origin-right mr-1">
          <DropdownAvatar />
        </div>
      </div>
    </header>
  );
};

export default TenantMobileHeader
