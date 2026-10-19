import React, { useState } from 'react'

import { Button } from "@/components/ui/button"
import ActiveBookings from './activebookingscard';
import PastBookings from './pastbookingscard';
import { Separator } from "@/components/ui/separator";

const PastBookingsData = [
  {
    id: "1",
    propertyName: "Cozy Apartment in Downtown",
    location: "New York, NY",
    image: "/images/apartmentcover.jpg",
    stayDate: "06-15 May 2023",
    price: "$150",
    status: "Completed"
  },
  {
    id: "2",
    propertyName: "Cozy Apartment in Downtown",
    location: "New York, NY",
    image: "/images/apartmentcover.jpg",
    stayDate: "06-15 May 2023",
    price: "$150",
    status: "Completed"
  },
  {
    id: "3",
    propertyName: "Cozy Apartment in Downtown",
    location: "New York, NY",
    image: "/images/apartmentcover.jpg",
    stayDate: "06-15 May 2023",
    price: "$150",
    status: "Completed"
  },
  {
    id: "4",
    propertyName: "Cozy Apartment in Downtown",
    location: "New York, NY",
    image: "/images/apartmentcover.jpg",
    stayDate: "06-15 May 2023",
    price: "$150",
    status: "Canceled"
  },
  {
    id: "5",
    propertyName: "Cozy Apartment in Downtown",
    location: "New York, NY",
    image: "/images/apartmentcover.jpg",
    stayDate: "06-15 May 2023",
    price: "$150",
    status: "Canceled"
  },
];

const BookingsFilters = [
  { id: "all", label: "All Bookings" },
  { id: "apartments", label: "Upcoming"},
  { id: "houses", label: "Active"},
  { id: "hotels", label: "Completed"},
  { id: "airbnb", label: "Cancelled"},
];

const MobileMyBookings = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  return (
    <main className="flex w-full h-full px-2">
      <div className="flex flex-col w-full items-center lg:items-start h-full">
        <h1 className="text-lg md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">My Bookings</h1>
        
        {/* Filters */}
        <div className="flex w-full gap-2 overflow-x-auto scrollbar-hide">
            {BookingsFilters.map(({ id, label }) => (
                <Button
                    key={id}
                    variant="secondary"
                    onClick={() => setActiveFilter(id)}
                    className={`
                        h-7 md:h-10 shrink-0 gap-2
                        border border-slate-200
                        bg-gray-200
                        px-1
                        text-md
                        hover:bg-[var(--color-accent-gold-dark)]
                        dark:bg-transparent
                        dark:text-secondary-foreground
                        dark:hover:bg-blue-600
                        dark:hover:text-slate-100
                        ${
                            activeFilter === id
                                ? "ring-(--color-accent-gold) bg-(--color-accent-gold) text-white ring-offset-2 dark:bg-blue-600 dark:ring-blue-600 dark:ring-offset-slate-950"
                                : ""
                        }
                    `}
                >
                    <span>{label}</span>
                </Button>
            ))}
        </div>

        {/* Active Bookings */}
        <div className="mt-4 flex w-full flex-col gap-4">
            <ActiveBookings activeBooking={true} />
            {/* <ActiveBookings activeBooking={null} /> */}
        </div>

        <Separator
          orientation="horizontal"
          className="hidden h-auto shrink-0 sm:block mt-6"
        />

        {/* Past Bookings */}
        <div className="mt-4 flex w-full flex-col gap-4">
            <PastBookings pastBookings={PastBookingsData} />
            {/* <PastBookings pastBookings={[]} /> */}
        </div>
        
      </div>
    </main>
  )
}

export default MobileMyBookings
