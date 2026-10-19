import React from 'react'
import { CalendarSearch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge"
import { BadgeCheck } from "lucide-react"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface ActiveBooking {
  id: string;
  propertyName: string;
  location: string;
  image: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  bookingId: string;
}


interface ActiveBookingProps {
  activeBooking: ActiveBooking | null;
}

const ActiveBookings = ({ activeBooking }: ActiveBookingProps) => {
  return (
    <div className="lg:mt-2 flex sm:h-51 lg:h-full flex-col">
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Active Bookings <span className="text-lg font-semibold text-gray-900 dark:text-white">(1)</span></h2>

        {activeBooking ? (
        <div className="flex w-full flex-row lg:flex overflow-hidden rounded-lg border-2 dark:border-none dark:bg-blue-900/15 md:h-72 h-40 md:flex-row">
          <div className="h-40 w-40 md:h-auto md:p-2 md:w-auto lg:w-1/2 lg:h-full">
            <Image
              src="/images/apartmentcover.jpg"
              alt="Active Booking"
              width={500}
              height={500}
              className="h-full w-full rounded-lg object-cover"
            />
          </div>

          <div className="flex w-full min-w-0 flex-col p-2 lg:p-6 md:w-1/2">
            <div className="flex w-full items-center justify-between">
              <div className="min-w-0">
                <h3 className="truncate text-md font-semibold text-gray-900 dark:text-white lg:text-3xl">
                  Modern 2 Bedroom Apartment
                </h3>

                <p className="text-sm text-gray-700 dark:text-gray-300 lg:text-lg">
                  Kilimani, Nairobi
                </p>
              </div>
              <Badge className="bg-green-50 w-auto h-7 text-sm hidden lg:flex text-green-700 dark:bg-green-950 dark:text-green-300">
                <BadgeCheck data-icon="inline-start" className="size-5" />
                Confirmed
              </Badge>
            </div>

            <div className="mt-6 flex w-full flex-col gap-4 sm:mt-6 sm:gap-6">
              <div className="lg:flex hidden w-full flex-col gap-3 sm:flex-row sm:items-stretch">
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300 sm:text-lg">
                    Check-in
                  </p>

                  <span className="text-xl font-medium text-gray-700 dark:text-white sm:text-2xl">
                    2024-07-15
                  </span>
                </div>

                <Separator
                  orientation="vertical"
                  className="hidden h-auto shrink-0 sm:block"
                />

                <div className="min-w-0 flex-1">
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300 sm:text-lg">
                    Check-out
                  </p>

                  <span className="text-xl font-medium text-gray-700 dark:text-white sm:text-2xl">
                    2024-07-20
                  </span>
                </div>
              </div>

              <p className="text-sm lg:hidden font-medium text-slate-700 dark:text-slate-300">
                15 May- 18 June 2026
              </p>
              

              <div className="lg:flex hidden w-full flex-col gap-3 sm:flex-row sm:items-stretch">
                <div className="min-w-0 flex-1">
                  <p className="text-base font-medium text-gray-700 dark:text-gray-300 sm:text-lg">
                    Payment
                  </p>

                  <span className="text-xl font-medium text-gray-700 dark:text-white sm:text-2xl">
                    KES 26,000
                  </span>
                </div>

                <div className="mt-3 flex justify-end pt-2 lg:pt-6">
                  <Button
                    variant="default"
                    className="w-full sm:w-40 text-md font-medium bg-(--color-accent-gold) hover:bg-(--color-accent-gold-dark)"
                    size="icon-lg"
                  >
                    View Details
                  </Button>
                </div>
              </div>

              <div className="flex justify-end pt-2 lg:hidden">
                  <Button
                    variant="default"
                    className="dark:bg-(--color-accent-gold) dark:hover:bg-(--color-accent-gold-dark) text-white text-md font-medium bg-(--color-accent-gold) hover:bg-(--color-accent-gold-dark)"
                  >
                    View Details
                  </Button>
              </div>
            </div>
          </div>
        </div>
        ) : (
        <Empty className="lg:min-h-80 rounded-lg border border-slate-300 dark:border-slate-700">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CalendarSearch className="h-8 w-8"/>
            </EmptyMedia>

            <EmptyTitle>No Active Stay</EmptyTitle>

            <EmptyDescription>
              You don&apos;t have any upcoming stays yet. Find a property and make
              your next booking.
            </EmptyDescription>
          </EmptyHeader>

          <EmptyContent>
            <Link href="/tenant/browse-listings">
                <Button
                    className="bg-(--color-accent-gold) font-medium hover:bg-(--color-accent-gold-dark)"
                >
                    Find a Property
                </Button>
            </Link>
          </EmptyContent>
        </Empty>
        )}
    </div>
  );
}

export default ActiveBookings
