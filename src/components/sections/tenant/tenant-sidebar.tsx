'use client'

import { Hr } from '@react-email/components'
import React, { useState } from 'react'
import { Label } from 'react-aria-components'

import {  
  LayoutDashboard, 
  SearchSlash,
  Heart,
  CalendarCheck,
  MessageCircleMore,
  CreditCard,
  Bookmark,
  Star,
  CircleQuestionMark,
  Bell,
  Settings,
  PanelRightOpen,
  PanelRightClose,
} from 'lucide-react'
import TenantSidebarNavItem from './tenantsidebar-navitem'

interface NavigationItem {
  to: string;  // The target URL path destination (e.g., "/payments")
  icon: React.ReactNode;  // The Lucide icon element (e.g., <CreditCard />)
  label: string;  // The text label shown next to the icon (e.g., "Payments")
  badgeCount?: number;  // Optional badge count for notification indicators
  tooltip?: string;  // Optional tooltip text for additional context
}

export default function TenantSidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)

    const primaryLinks: NavigationItem[] = [
      {to: "/tenant/dashboard", icon: <LayoutDashboard />, label: "Overview", tooltip: "Overview",},
      {to: "/tenant/browse-listings", icon: <SearchSlash />, label: "Browse Listings", tooltip: "Browse Listings"},
      {to: "/tenant/saved-listings", icon: <Bookmark />, label: "Saved Listings", tooltip: "Saved Listings"},
      {to: "/tenant/my-bookings", icon: <CalendarCheck />, label: "My Bookings", tooltip: "My Bookings"},
      {to: "/tenant/messages", icon: <MessageCircleMore />, label: "Messages", badgeCount: 3, tooltip: "Messages"},
      {to: "/tenant/payments", icon: <CreditCard />, label: "Payments", tooltip: "Payments"},
      {to: "/tenant/favourites", icon: <Heart />, label: "Favourites", tooltip: "Favourites"},
      {to: "/tenant/reviews", icon: <Star />, label: "Reviews", tooltip: "Reviews"},
    ];

    const utilityLinks: NavigationItem[] = [
      {to: "/tenant/notifications", icon: <Bell />, label: "Notifications", tooltip: "Notifications"},
      {to: "/tenant/settings", icon: <Settings />, label: "Settings", tooltip: "Settings"},
      {to: "/tenant/support", icon: <CircleQuestionMark />, label: "Support", tooltip: "Support"},
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen((preState: boolean) => !preState)
    };
    
  return (
    <aside
  className={`sticky top-0 md:hidden h-screen shrink-0 hidden lg:flex flex-col text-white border-r p-4 transition-all duration-300 ease-in-out ${
    isSidebarOpen ? "md:w-60 lg:w-80" : "w-0 md:w-16"
  }`} //border-blue-600
>

      <div className="flex justify-between items-center">
          
          {/* Your Logo sits right here! It hides cleanly on desktop when collapsed */}
          {isSidebarOpen && (
            <div className="flex items-baseline ml-8 gap-0.5">
              <p className="text-2xl font-bold text-[var(--color-card-bg)]">Cube</p>
              <p className="text-2xl font-medium text-[var(--color-accent-gold)]">Grab</p>
            </div>
          )}
          
          {/* Chevron Controller: Placed at the top right of the header section */}
          <button
            onClick={toggleSidebar}
            className={`p-1.5 rounded-md text-slate-400 hover:bg-slate-800 hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
              !isSidebarOpen ? 'hidden md:block mx-auto' : ''
            }`}
            aria-label={isSidebarOpen ? "Collapse menu" : "Expand menu"}
          >
            {isSidebarOpen ? (<PanelRightOpen className="h-5 w-5" /> ) : ( <PanelRightClose className="h-5 w-5" /> )}
          </button>
      </div>

      <div className="flex flex-col flex-1 mt-6 overflow-y-auto">
      
      {/* Dashboard Label */} 
      {isSidebarOpen && 
      ( <Label className="text-gray-400 text-sm px-3 mb-3 text-slate-900 dark:text-white">
        Tenant Dashboard 
      </Label> )}

      <nav className="flex flex-col gap-1 w-full">
          {primaryLinks.map((link) => (
            <TenantSidebarNavItem 
              key={link.to} 
              to={link.to} 
              icon={link.icon} 
              label={link.label} 
              tooltip={link.tooltip}
              isOpen={isSidebarOpen} 
              badgeCount={link.badgeCount} // Passing down the notification number
            />
          ))}
      </nav>

      {/* Spacer to push utility links to the bottom */}
      <div className="flex-1" />

      {/* Divider between primary and utility links */}
      <Hr className="my-3 border-gray-800" />

      <nav className="flex flex-col gap-1 w-full">
          {utilityLinks.map((link) => (
            <TenantSidebarNavItem
              key={link.to}
              to={link.to}
              icon={link.icon}
              label={link.label}
              tooltip={link.tooltip}
              isOpen={isSidebarOpen}
              badgeCount={link.badgeCount} // Passing down the notification number
            />
          ))}
      </nav>
      </div>
    </aside>
    );
  }


