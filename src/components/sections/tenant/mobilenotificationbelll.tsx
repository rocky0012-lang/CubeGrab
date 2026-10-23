
import TenantNotificationCard from "@/components/sections/tenant/tenantnotificationcard";
import { 
  Bell, 
  Settings 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  notificationFilters,
  useTenantNotifications,
} from "@/hooks/use-tenant-notifications";

export default function MobileNotificationBell() {
  const {
    activeFilter,
    setActiveFilter,
    notifications,
    unreadCount,
    clearAll,
  } = useTenantNotifications();

  return (
    <Drawer modal={false} direction="bottom">
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="relative flex items-center justify-center bg-transparent p-1 text-gray-500 outline-none transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 group dark:text-gray-200 dark:hover:bg-slate-800/50"
        >
          <Bell className="size-5 transition-transform group-hover:rotate-12" />

          {unreadCount > 0 && (
            <span className="absolute right-1 top-1 flex h-3 min-w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-semibold text-white ring-2 ring-white animate-pulse-slow dark:ring-slate-900">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="mb-0 ml-1 p-1 pb-1">
          <DrawerTitle className="flex w-full flex-col items-center">
            <div className="flex w-full items-center justify-between text-sm font-semibold">
              Notifications

              <div className="flex w-auto items-center">
                <Button
                  size="lg"
                  variant="ghost"
                  aria-label="Notification settings"
                  className="font-medium text-gray-500 hover:rotate-45 dark:text-gray-400"
                >
                  <Settings className="size-4" />
                </Button>

                <Button
                  variant="link"
                  size="sm"
                  onClick={clearAll}
                  className="font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400"
                >
                  Clear all
                </Button>
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-1">
              {notificationFilters.map(({ id, label }) => (
                <Button
                  key={id}
                  variant="secondary"
                  onClick={() => setActiveFilter(id)}
                  aria-pressed={activeFilter === id}
                  className={`mt-1 h-6 gap-1 border border-slate-200 bg-white text-sm text-slate-900 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-slate-800 dark:hover:text-white ${
                    activeFilter === id
                      ? "bg-(--color-accent-gold) dark:bg-blue-700"
                      : ""
                  }`}
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

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="mt-1 space-y-4">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <TenantNotificationCard
                  key={notification.id}
                  {...notification}
                />
              ))
            ) : (
              <p className="p-4 text-center text-sm text-muted-foreground">
                No notifications to display.
              </p>
            )}
          </div>
        </div>

        <DrawerFooter className="p-2">
          <DrawerClose asChild>
            <Button className="h-6 rounded-2xl border bg-gray-400 font-medium text-black hover:bg-gray-500 dark:bg-active dark:text-black dark:hover:bg-gray-300 sm:text-sm lg:text-md">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
