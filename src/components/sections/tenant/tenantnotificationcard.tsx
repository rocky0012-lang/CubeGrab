import React from 'react';
import { LucideIcon } from 'lucide-react';

export type TenantNotificationType = 'info' | 'success' | 'warning' | 'error' | 'review' | 'message' | 'system';

export interface TenantNotificationCardProps {
  id?: string;
  type?: TenantNotificationType;
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  timeAgo: string;
  isUnread?: boolean;
}


const typeStyles: Record<TenantNotificationType, { bg: string; icon: string }> = {
    info: { 
      bg: 'bg-blue-50 dark:bg-blue-950/40', 
      icon: 'text-blue-600 dark:text-blue-400' 
    },
    success: { 
      bg: 'bg-green-500 dark:bg-green-500/80', 
      icon: 'text-white dark:text-white' 
    },
    warning: { 
      bg: 'bg-orange-500/60 dark:bg-orange-700/80', 
      icon: 'text-white dark:text-white' 
    },
    error: { 
      bg: 'bg-red-500 dark:bg-red-700/80', 
      icon: 'text-red-600 fill-white dark:text-white' 
    },
    review: { 
      bg: 'bg-yellow-500 dark:bg-yellow-400', 
      icon: 'text-white fill-white dark:text-white' 
    },
    system: {
      bg: 'bg-gray-500 dark:bg-violet-950/40',
      icon: 'text-white dark:fill-none dark:text-white'
    },
    message: {
      bg: 'bg-blue-500 dark:bg-blue-600',
      icon: 'text-white fill-white dark:text-white'
    },
};

// ==========================================
// 🛠️ 3. Main Component Implementation
// ==========================================
export default function TenantNotificationCard({
  type = 'info',
  icon: IconComponent,
  title,
  description,
  timeAgo,
  isUnread = false,
}: TenantNotificationCardProps) {
  const styles = typeStyles[type] || typeStyles.info;

  return (
    <div 
      className={`relative flex flex-row items-start gap-2 scroll-smooth lg:gap-3 p-3.5 border-b border-gray-100 dark:border-gray-800 transition-colors hover:bg-gray-50/80 dark:hover:bg-blue-900/10 cursor-pointer ${
        isUnread ? 'bg-blue-50/20 dark:bg-blue-950/10' : ''
      }`}
    >
      <div className={`p-2.5 rounded-full flex-shrink-0 ${styles.bg}`}>
        <IconComponent className={`lg:w-5 lg:h-5 sm:w-3 sm:h-3 ${styles.icon}`} />
      </div>

      {/* 📝 Center Column: Title, Content, and Unread Status indicator */}
      <div className="flex flex-col flex-grow pr-14">
        <div className="flex flex-row items-center gap-1.5">
          <p className="text-gray-900 dark:text-gray-100 text-sm font-semibold leading-tight">
            {title}
          </p>
          {isUnread && (
            <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" title="Unread notification" />
          )}
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 leading-normal break-words">
          {description}
        </p>
      </div>

      {/* ⏱️ Top Right Anchor: Timestamp string */}
      <span className="absolute top-3.5 right-3.5 text-gray-400 dark:text-gray-500 text-[11px] font-medium flex-shrink-0">
        {timeAgo}
      </span>
    </div>
  );
}
