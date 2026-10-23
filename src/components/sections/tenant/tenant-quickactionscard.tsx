import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

interface QuickActionsCardProps {
  icon: LucideIcon;
  title: string;
  href: string;
  iconClassName?: string;
  iconContainerClassName?: string;
}

const QuickActionsCard = ({icon: Icon, title, href, iconClassName = "", iconContainerClassName = "",}: QuickActionsCardProps) => {
  return (
    <Link
      href={href}
      className="group flex min-h-32 flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--color-accent-gold)] hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:hover:border-[var(--color-accent-gold)]"
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200 group-hover:scale-110 ${iconContainerClassName}`}
      >
        <Icon
          className={`h-6 w-6 transition-all duration-200 ${iconClassName}`}
        />
      </div>

      <h3 className="text-center text-sm font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>
    </Link>
  );
};

export default QuickActionsCard
