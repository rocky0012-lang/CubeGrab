import React from 'react'

interface TenantOverviewCardProps {
  title: string;
  data: string | number;
  description: string;
  shortDescription?: string;
}

export default function TenantOverviewCard({ title, data, description, shortDescription }: TenantOverviewCardProps) {

  const fallbackShortText = shortDescription || description;

  return (
    <div className="min-w-0 rounded-lg pt-2 border border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-800/50 sm:p-1 lg:p-5">
      <h3 className="text-xs truncate font-medium text-slate-600 dark:text-white lg:text-lg">
        {title}
      </h3>

      <p className="m-2 truncate text-base text-center lg:text-start font-bold text-slate-900 dark:text-white sm:text-lg lg:text-2xl">
        {data}
      </p>

      <p className="mt-1 flex lg:hidden text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 leading-normal">
        {fallbackShortText}
      </p>

      <p className="mt-1 hidden lg:flex text-sm text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
};


