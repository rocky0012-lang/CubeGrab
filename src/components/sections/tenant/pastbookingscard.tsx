import React from 'react'
import { CalendarDays, CalendarSearch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface PastBooking {
  id: string;
  propertyName: string;
  location: string;
  image: string;
  stayDate: string;
  price: string;
  status: "Completed" | "Canceled" | "Pending";
}


interface PastBookingProps {
  pastBookings: PastBooking[];
}

const PastBookings = ({ pastBookings }: PastBookingProps) => {

  const router = useRouter();

  const handleRowClick = (id: string, e: React.MouseEvent) => {
    // 💡 Prevent automatic routing if the user clicked the direct desktop button
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) {
      return;
    }
    // Only capture click events to route automatically on mobile devices (under 768px wide)
    if (window.innerWidth < 768) {
      router.push(`/tenant/my-bookings/${id}`);
    }
  };


    const statusStyles = {
      Completed:
        "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
      
      Canceled:
        "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
      
      Pending:
        "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400",
    };
  return (
    <div className="flex flex-col lg:mt-2">
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Past Bookings <span className="text-lg font-semibold text-gray-900 dark:text-white">({pastBookings.length})</span></h2>
      {pastBookings.length === 0 ? (
        <Empty className="lg:min-h-80 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CalendarDays />
            </EmptyMedia>
            <EmptyTitle>No Past Stays</EmptyTitle>
            <EmptyDescription>
              You haven&apos;t completed any stays yet. Once you book and complete
              a stay, it will appear here.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            {/*<Button
              className="bg-[var(--color-accent-gold)] font-medium hover:bg-[var(--color-accent-gold-dark)]"
            >
              Find a Property
            </Button>* */}
          </EmptyContent>
        </Empty>
        ) : (
      <div className="w-full overflow-hidden md:overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
        <table className="w-full table-fixed md:table-auto md:min-w-[900px]">
          <tbody className="block w-full md:table-row-group">
            {pastBookings.map((pastBooking) => (
              <tr
                key={pastBooking.id}
                onClick={(e) => handleRowClick(pastBooking.id, e)}
                className="
                  relative block w-full border-b border-slate-200 p-4 dark:border-slate-700 cursor-pointer
                  flex flex-row items-start gap-4 md:items-center
                  md:table-row md:p-0 md:hover:bg-slate-50 md:dark:hover:bg-slate-900/50 md:cursor-default
                "
              >
                {/* Property Image Column */}
                <td
                  className="
                    block p-0 flex-shrink-0 w-20
                    md:table-cell md:sticky md:left-0 md:z-10
                    md:bg-white md:dark:bg-slate-950
                    md:px-2.5 md:py-3
                    md:shadow-[4px_0_6px_-4px_rgba(0,0,0,0.25)]
                    md:w-[280px] md:min-w-[280px]
                    lg:w-[360px] lg:min-w-[360px] lg:px-4
                  "
                >
                  <div className="flex items-start gap-2 h-full md:items-center">
                    <Image
                      src={pastBooking.image}
                      alt={pastBooking.propertyName}
                      width={96}
                      height={96}
                      className="w-20 h-24 shrink-0 rounded-lg object-cover md:size-16"
                    />

                    {/* Desktop Only Text Summary Layer */}
                    <div className="hidden md:flex min-w-0 flex-col">
                      <p className="max-w-[180px] lg:max-w-[260px] truncate text-xs font-semibold text-slate-900 dark:text-white sm:text-md">
                        {pastBooking.propertyName}
                      </p>
                      <p className="max-w-[180px] lg:max-w-[260px] truncate text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 hidden lg:flex">
                        {pastBooking.location}
                      </p>
                    </div>
                  </div>
                </td>
            
                {/* 📝 Text Details Column Stack (Takes up the remaining 3/4 width on mobile) */}
                <td className="block flex-grow min-w-0 p-0 md:table-cell md:px-4 md:py-3 md:align-middle">
                  <div className="flex flex-col min-h-[96px] justify-between md:block"> {/*  Forced height matching the 24-height image */}

                    {/* Title & Location (Mobile view) */}
                    <div className="flex flex-col gap-0.5 md:hidden min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white truncate w-full">
                        {pastBooking.propertyName}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate w-full">
                        {pastBooking.location}
                      </p>
                    </div>
            
                    {/* Stay Date element - stacks cleanly in the middle */}
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 md:text-sm md:text-slate-700 md:dark:text-slate-300 mt-1 md:mt-0">
                      {pastBooking.stayDate}
                    </p>
            
                    {/* Price element layout - sits exactly at the bottom matching image baseline */}
                    <p className="block md:hidden text-sm font-bold text-slate-900 dark:text-white mt-auto">
                      {pastBooking.price}
                    </p>
                  </div>
                </td>
            
                {/* Price Column (Desktop View Only) */}
                <td className="hidden md:table-cell px-4 py-3 md:align-middle">
                  <p className="whitespace-nowrap text-right text-sm font-bold text-slate-900 dark:text-white">
                    {pastBooking.price}
                  </p>
                </td>
            
                {/* Status Badge Component Area */}
                <td className="absolute bottom-4 right-4 block p-0 md:static md:table-cell md:px-4 md:py-3 md:align-middle">
                  <Badge
                    className={`shrink-0 border-0 text-[10px] px-2 py-0.5 md:text-xs ${
                      statusStyles[pastBooking.status]
                    }`}
                  >
                    {pastBooking.status}
                  </Badge>
                </td>

                {/* Actions Button Element (Desktop Only) */}
                <td className="hidden md:table-cell px-4 py-3 md:align-middle">
                  <Link href={`/tenant/my-bookings/${pastBooking.id}`}>
                    <Button
                      variant="outline"
                      type="button"
                      className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-blue-900/15 px-2 py-1 text-md font-medium text-black shadow-md hover:bg-[var(--color-accent-gold-light)] focus:outline-none dark:border-white dark:bg-blue-900/15 dark:text-gray-300 dark:hover:bg-blue-900/25 "
                    >
                      View Details
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
}

export default PastBookings
