import React, { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TenantSidebarNavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
  tooltip?: string;
  badgeCount?: number;
}

export default function TenantSidebarNavItem({
  to,
  icon,
  label,
  isOpen,
  tooltip,
  badgeCount,
}: TenantSidebarNavItemProps): React.JSX.Element {
  const pathname = usePathname();

  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const linkRef = useRef<HTMLAnchorElement>(null);
  const isActive = pathname === to;

  const handleMouseEnter = () => {
    if (!isOpen && linkRef.current) {
      const rect = linkRef.current.getBoundingClientRect();

      setTooltipPosition({
        top: rect.top + rect.height / 2,
        left: rect.right + 8, // 8px offset to the right
      });
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      className="group relative w-full"
      onMouseEnter={handleMouseEnter}
      onFocus={handleMouseEnter}
    >
      <Link
        ref={linkRef}
        href={to}
        aria-label={isOpen ? undefined : tooltip ?? label}
        aria-current={isActive ? "page" : undefined}
        className={`
          flex w-full items-center rounded-md
          px-3 py-2.5 transition-all duration-200
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-[var(--color-accent-gold)]
          ${isOpen ? "justify-start gap-3" : "justify-center"}
          ${
            isActive
              ? "bg-blue-600 text-white font-medium"
              : "text-slate-700 dark:text-slate-300 hover:bg-gray-400 dark:hover:bg-slate-800"
          }
        `}
      >
        <span className="flex h-5 w-5 shrink-0 items-center justify-center">
          {icon}
        </span>
        
        {isOpen && (
          <span className="flex-1 whitespace-nowrap text-md font-medium">
            {label}
          </span>
        )}
    
        {isOpen && badgeCount !== undefined && badgeCount > 0 && (
          <span className="shrink-0 rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
            {badgeCount > 99 ? "99+" : badgeCount}
          </span>
        )}
      </Link>
      
      {!isOpen && (
        <span
          role="tooltip"
          className="
            pointer-events-none
            fixed z-[9999]
            -translate-y-1/2
            whitespace-nowrap
            rounded-md
            border border-slate-200
            bg-white
            px-3 py-2
            text-sm font-medium
            text-slate-900
            shadow-lg
            opacity-0 invisible
            transition-opacity duration-150
            group-hover:visible group-hover:opacity-100
            group-focus-within:visible group-focus-within:opacity-100
            dark:border-slate-700
            dark:bg-slate-900
            dark:text-white
          "
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
          }}
        >
          {tooltip ?? label}
        </span>
      )}
    </div>
  );
}