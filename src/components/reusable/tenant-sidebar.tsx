'use client'

import { Hr } from '@react-email/components'
import React, { useState } from 'react'
import { Label } from 'react-aria-components'

import {  
  ChevronLeft,
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
  ChevronRight,
} from 'lucide-react'
import TenantSidebarNavItem from './tenantsidebar-navitem'
import { CubeGrabLogo } from "../reusable/cubegrab-logo"

interface NavigationItem {
  to: string;  // The target URL path destination (e.g., "/payments")
  icon: React.ReactNode;  // The Lucide icon element (e.g., <CreditCard />)
  label: string;  // The text label shown next to the icon (e.g., "Payments")
  badgeCount?: number;  // Optional badge count for notification indicators
}

export default function TenantSidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

    const primaryLinks: NavigationItem[] = [
      {to: "/tenant/dashboard", icon: <LayoutDashboard />, label: "Overview"},
      {to: "/tenant/browse-listings", icon: <SearchSlash />, label: "Browse Listings"},
      {to: "/tenant/saved-listings", icon: <Bookmark />, label: "Saved Listings"},
      {to: "/tenant/my-bookings", icon: <CalendarCheck />, label: "My Bookings"},
      {to: "/tenant/messages", icon: <MessageCircleMore />, label: "Messages", badgeCount: 3},
      {to: "/tenant/payments", icon: <CreditCard />, label: "Payments"},
      {to: "/tenant/favourites", icon: <Heart />, label: "Favourites"},
      {to: "/tenant/reviews", icon: <Star />, label: "Reviews"},
    ];

    const utilityLinks: NavigationItem[] = [
      {to: "/tenant/notifications", icon: <Bell />, label: "Notifications"},
      {to: "/tenant/settings", icon: <Settings />, label: "Settings"},
      {to: "/tenant/support", icon: <CircleQuestionMark />, label: "Support"},
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen((preState: boolean) => !preState)
    };
    
  return (
    <aside 
      /* Your exact requested responsive width specifications applied here */
      className={`flex flex-col h-screen overflow-hidden text-white border-blue-600 p-4 transition-all duration-300 ease-in-out border-r ${
        isSidebarOpen ? 'w-80 md:w-86' : 'w-0 md:w-16'
      }`}
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
            className={`p-1.5 rounded-md text-slate-400 hover:bg-slate-800 hover:text-white transition-colors duration-200 focus:outline-none ${
              !isSidebarOpen ? 'hidden md:block mx-auto' : ''
            }`}
            aria-label={isSidebarOpen ? "Collapse menu" : "Expand menu"}
          >
            {isSidebarOpen ? (<ChevronLeft className="h-5 w-5" /> ) : ( <ChevronRight className="h-5 w-5" /> )}
          </button>
      </div>

      <div className="flex flex-col flex-1 mt-6 overflow-y-auto overflow-x-hidden">
      
      {/* Dashboard Label */} 
      {isSidebarOpen && 
      ( <Label className="text-gray-400 text-sm px-3 mb-3">
        Tenant Dashboard 
      </Label> )}

      <nav className="flex flex-col gap-1 w-full">
          {primaryLinks.map((link) => (
            <TenantSidebarNavItem 
              key={link.to} 
              to={link.to} 
              icon={link.icon} 
              label={link.label} 
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
              isOpen={isSidebarOpen}
              badgeCount={link.badgeCount} // Passing down the notification number
            />
          ))}
      </nav>
      </div>
    </aside>
    );
  }


