'use client'

import React, { useState } from 'react'

import {  
  LayoutDashboard, 
  CreditCard,
  BadgeCheck,
  Bell,
  Settings,
  ShieldCheck,
  IdCard,
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

export default function TenantProfileSidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)

    const primaryLinks: NavigationItem[] = [
      {to: "/tenant/profile", icon: <LayoutDashboard />, label: "Profile Overview", tooltip: "Overview",},
      {to: "/tenant/profile/personal-information", icon: <IdCard />, label: "Personal Information", tooltip: "Personal Information"},
      {to: "/tenant/profile/verification", icon: <BadgeCheck />, label: "Verification", tooltip: "Verification"},
      //{to: "/tenant/messages", icon: <MessageCircleMore />, label: "Messages", badgeCount: 3, tooltip: "Messages"},
      {to: "/tenant/profile/payments", icon: <CreditCard />, label: "Payments", tooltip: "Payments"},
      {to: "/tenant/profile/notifications", icon: <Bell />, label: "Notifications", tooltip: "Notifications"},
      {to: "/tenant/profile/security", icon: <ShieldCheck />, label: "Security", tooltip: "Security"},
      {to: "/tenant/profile/settings", icon: <Settings />, label: "Settings", tooltip: "Settings"},
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen((preState: boolean) => !preState)
    };
    
  return (
    <aside
  className={`sticky top-0 h-screen shrink-0 hidden md:flex flex-col text-white border rounded-xl p-4 transition-all duration-300 ease-in-out ${
    isSidebarOpen ? "w-80 md:w-86" : "w-0 md:w-16"
  }`} //border-blue-600
>

      <div className="flex justify-between items-center">
          
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

      </div>
    </aside>
    );
  }


