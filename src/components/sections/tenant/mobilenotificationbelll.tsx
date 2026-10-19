import { Button } from "@/components/ui/button"
import { 
    Bell, 
    CircleAlert, 
    CircleCheckBig, 
    MessageSquare, 
    MonitorDot, 
    Settings,
    ShieldAlert,
    Star,
} from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useState } from "react";
import TenantNotificationCard, { TenantNotificationCardProps } from "@/components/sections/tenant/tenantnotificationcard";

const mockNotifications = [
  {
    id: '1',
    type: 'success' as const,
    icon: CircleCheckBig,
    title: 'Booking Confirmed',
    description: 'Your Booking at Mordern 2 Bedroom Appt has been confirmed.',
    timeAgo: '2h ago',
    isUnread: true,
  },
  {
    id: '2',
    type: 'review' as const,
    icon: Star,
    title: 'New Review',
    description: 'You received a 5-star review from Daniel.',
    timeAgo: '1h ago',
    isUnread: false,
  },
  {
    id: '3',
    type: 'message' as const,
    icon: MessageSquare,
    title: 'New Message',
    description: 'Sarah K. sent you a message about Cozy Airbnb Studio.',
    timeAgo: '5h ago',
    isUnread: false,
  },
  {
    id: '4',
    type: 'warning' as const,
    icon: CircleAlert,
    title: 'Warning',
    description: 'Your booking payment time is about to expire.',
    timeAgo: '5h ago',
    isUnread: true,
  },
  {
    id: '5',
    type: 'error' as const,
    icon: ShieldAlert,
    title: 'New Message',
    description: 'Sarah K. sent you a message about Cozy Airbnb Studio.',
    timeAgo: '5h ago',
    isUnread: false,
  },
  {
    id: '6',
    type: 'system' as const,
    icon: MonitorDot,
    title: 'Sytem Update',
    description: 'New feature are now available. Check out what\'s new!',
    timeAgo: '5h ago',
    isUnread: false,
  }
];

const NotificationFilters = [
  { id: "all", label: "All"},
  { id: "apartments", label: "Bookings"},
  { id: "houses", label: "Messages"},
  { id: "hotels", label: "System"},
];

export default function MobileNotificationBell() {

    const [activeFilter, setActiveFilter] = useState("all");
    const [unreadCount, setUnreadCount] = useState<number>(14);
  return (
    <Drawer modal={false} direction="bottom">
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
              size="sm"
              className="relative p-1 text-gray-500 bg-transparent dark:text-gray-200 dark:hover:bg-slate-800/50 transition-colors duration-150 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 flex items-center justify-center group"
              >
              {/* The primary Lucide Bell Icon Asset */}
              <Bell className="size-5 transition-transform group-hover:rotate-12" />

              {/* Badge Counter */}
              {unreadCount > 0 && (
                <span
                  className="absolute top-1 right-1 flex h-3 min-w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-semibold text-white ring-2 ring-white dark:ring-slate-900 animate-pulse-slow"
                >
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="p-1 ml-1 mb-0 pb-1">
          <DrawerTitle className="flex w-full flex-col items-center">
            <div className="flex w-full items-center text-sm font-semibold justify-between">
                Notifications
                <div className="flex w-auto items-center">
                    <Button size="lg" variant="ghost" className="text-gray-500 hover:rotate-45 dark:text-gray-400 font-medium">
                      <Settings className="size-4" />
                    </Button>
                    <Button variant="link" size="sm" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 font-medium">
                      Clear all
                    </Button>
                </div>
            </div>
            <div className="flex w-full flex-wrap gap-1">
                {NotificationFilters.map(({ id, label }) => (
                  <Button
                    key={id}
                    variant="secondary"
                    onClick={() => setActiveFilter(id)}
                    className={`
                      h-6 gap-1 mt-1
                      border border-slate-200 bg-white
                      text-sm text-slate-900
                      hover:bg-slate-50 hover:text-slate-900
                      dark:border-slate-700 dark:bg-secondary
                      dark:text-secondary-foreground
                      dark:hover:bg-slate-800 dark:hover:text-white
                      ${
                        activeFilter === id
                          ? "bg-(--color-accent-gold) dark:bg-blue-700"
                          : ""
                      }
                    `}
                  >
                    <span>{label}</span>
                  </Button>
                ))}
            </div>
        </DrawerTitle>
        <DrawerDescription className="sr-only">
          View and manage your notifications
        </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 min-h-0 overflow-y-auto">
            <div className="mt-1 space-y-4">
              {mockNotifications.map((notif) => (
                <TenantNotificationCard key={notif.id} {...notif} />
              ))}
            </div>
        </div>
        <DrawerFooter className="p-2">
          <DrawerClose asChild>
            <Button className="bg-gray-400 text-black hover:bg-gray-500 dark:hover:bg-gray-300 lg:text-md sm:text-sm font-medium dark:text-black dark:bg-active border rounded-2xl h-6">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
