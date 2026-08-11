import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Button } from "@/components/base/buttons/button";

export default function NotificationBell(): React.JSX.Element {
  // 1. Manage your notification count state (set to 0 to see the badge disappear)
  const [unreadCount, setUnreadCount] = useState<number>(14);

  // Mock list of alerts for the dropdown overview panel
  const notifications = [
    "Your booking for Thika Appts was confirmed",
    "New message received from Host Jane",
    "Payment invoice #1024 is ready for review"
  ];

  return (
    <div className="relative flex items-center justify-center h-10 w-10">
      <Dropdown.Root>
          <Button
            size="sm"
            color="secondary"
            /* 
              CLEAN UTIL LOOK: 
              - Background transparent to inherit your page canvas
              - Completely cleared of all standard library blue borders and glow outlines
            */
            className="relative p-2 rounded-full text-gray-500 bg-transparent dark:text-gray-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors duration-150 outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 shadow-none border-none flex items-center justify-center group"
          >
            {/* The primary Lucide Bell Icon Asset */}
            <Bell className="h-6 w-6 transition-transform group-hover:rotate-12" />

            {/* 2. THE BADGE COUNTER: Renders dynamically only if the count is greater than 0 */}
            {unreadCount > 0 && (
              <span 
                className="absolute top-1 right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-900 animate-pulse-slow"
              >
                {/* 3. CLAMPING SYSTEM: Keeps text box sizing stable if number is huge */}
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </Button>

        {/* Optional: Simple drop-down view container showing summary items */}
        <Dropdown.Popover className="w-64 mt-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl z-50">
          <div className="p-3 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <span className="font-semibold text-xs text-gray-700 dark:text-gray-200">Notifications</span>
            {unreadCount > 0 && (
              <button 
                onClick={() => setUnreadCount(0)}
                className="text-[11px] text-blue-500 hover:text-blue-600 dark:text-blue-400 font-medium"
              >
                Clear all
              </button>
            )}
          </div>
          <Dropdown.Menu className="p-1 max-h-60 overflow-y-auto">
            <Dropdown.Section>
              {notifications.map((note, index) => (
                <Dropdown.Item 
                  key={index}
                  className="rounded-lg px-3 py-2 text-xs text-gray-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 block w-full text-left truncate cursor-pointer"
                >
                  {note}
                </Dropdown.Item>
              ))}
            </Dropdown.Section>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown.Root>
    </div>
  );
}
