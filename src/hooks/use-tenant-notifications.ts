
import { useMemo, useState } from "react";
import {
  CircleAlert,
  CircleCheckBig,
  MessageSquare,
  MonitorDot,
  ShieldAlert,
  Star,
} from "lucide-react";

import type { TenantNotificationCardProps } from "@/components/sections/tenant/tenantnotificationcard";

export type TenantNotificationFilterId =
  | "all"
  | "bookings"
  | "messages"
  | "system";

type NotificationType = TenantNotificationCardProps["type"];

export const notificationFilters = [
  { id: "all", label: "All" },
  { id: "bookings", label: "Bookings" },
  { id: "messages", label: "Messages" },
  { id: "system", label: "System" },
] as const;

const filterTypes: Record<
  Exclude<TenantNotificationFilterId, "all">,
  readonly NotificationType[]
> = {
  bookings: ["success", "warning", "error"],
  messages: ["message", "review"],
  system: ["system", "info"],
};

const mockNotifications = [
  {
    id: "1",
    type: "success",
    icon: CircleCheckBig,
    title: "Booking Confirmed",
    description:
      "Your booking at Modern 2 Bedroom Appt has been confirmed.",
    timeAgo: "2h ago",
    isUnread: true,
  },
  {
    id: "2",
    type: "review",
    icon: Star,
    title: "New Review",
    description: "You received a 5-star review from Daniel.",
    timeAgo: "1h ago",
    isUnread: false,
  },
  {
    id: "3",
    type: "message",
    icon: MessageSquare,
    title: "New Message",
    description:
      "Sarah K. sent you a message about Cozy Airbnb Studio.",
    timeAgo: "5h ago",
    isUnread: false,
  },
  {
    id: "4",
    type: "warning",
    icon: CircleAlert,
    title: "Warning",
    description:
      "Your booking payment time is about to expire.",
    timeAgo: "5h ago",
    isUnread: true,
  },
  {
    id: "5",
    type: "error",
    icon: ShieldAlert,
    title: "Payment Error",
    description:
      "We could not process your payment. Please try again.",
    timeAgo: "5h ago",
    isUnread: false,
  },
  {
    id: "6",
    type: "system",
    icon: MonitorDot,
    title: "System Update",
    description:
      "New features are now available. Check out what's new!",
    timeAgo: "5h ago",
    isUnread: false,
  },
] satisfies TenantNotificationCardProps[];

export function useTenantNotifications() {
  const [activeFilter, setActiveFilter] =
    useState<TenantNotificationFilterId>("all");

  const [notifications, setNotifications] =
    useState<TenantNotificationCardProps[]>(mockNotifications);

  const unreadCount = useMemo(
    () => notifications.filter((notification) => notification.isUnread).length,
    [notifications],
  );

  const visibleNotifications = useMemo(() => {
    if (activeFilter === "all") {
      return notifications;
    }

    const allowedTypes = filterTypes[activeFilter];

    return notifications.filter((notification) =>
      allowedTypes.includes(notification.type),
    );
  }, [activeFilter, notifications]);

  const clearAll = () => {
    setNotifications([]);
  };

  return {
    activeFilter,
    setActiveFilter,
    notifications: visibleNotifications,
    unreadCount,
    clearAll,
  };
}
