
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

export default function NotificationBell() {
  const {
    activeFilter,
    setActiveFilter,
    notifications,
    unreadCount,
    clearAll,
  } = useTenantNotifications();

  return (
    <Drawer modal={false} direction="right">
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          aria-label="Open notifications"
          className="relative flex items-center justify-center rounded-full border-none bg-transparent p-2 text-gray-500 shadow-none outline-none transition-colors duration-150 hover:bg-slate-100/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white group dark:text-gray-400 dark:hover:bg-slate-800/50 dark:focus-visible:ring-offset-slate-900"
        >
          <Bell className="size-7 transition-transform group-hover:rotate-12" />

          {unreadCount > 0 && (
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white ring-2 ring-white animate-pulse-slow dark:ring-slate-900">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex items-center justify-between">
            Notifications

            <div className="flex w-auto items-center gap-1">
              <Button
                size="lg"
                variant="ghost"
                aria-label="Notification settings"
                className="font-medium text-gray-500 hover:rotate-45 dark:text-gray-400"
              >
                <Settings className="size-5" />
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
          </DrawerTitle>

          <DrawerDescription className="sr-only">
            View and manage your notifications
          </DrawerDescription>
        </DrawerHeader>

        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <div className="flex flex-wrap gap-3">
            {notificationFilters.map(({ id, label }) => (
              <Button
                key={id}
                variant="secondary"
                onClick={() => setActiveFilter(id)}
                aria-pressed={activeFilter === id}
                className={`h-8 gap-2 border border-slate-200 bg-white text-sm text-slate-900 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-slate-800 dark:hover:text-white ${
                  activeFilter === id
                    ? "ring-2 ring-(--color-accent-gold) ring-offset-2 dark:ring-offset-slate-950"
                    : ""
                }`}
              >
                <span>{label}</span>
              </Button>
            ))}
          </div>

          <div className="mt-4 space-y-4">
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

        <DrawerFooter>
          <DrawerClose asChild>
            <Button className="h-8 rounded-2xl border bg-gray-400 text-md font-medium text-black hover:bg-gray-500 dark:bg-active dark:text-black dark:hover:bg-gray-300">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
