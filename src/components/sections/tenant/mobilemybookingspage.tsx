"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import MobileMyBookings from './mobilebookingspage';


const BookingsFilters = [
  { id: "all", label: "All Bookings" },
  { id: "apartments", label: "Upcoming"},
  { id: "houses", label: "Active"},
  { id: "hotels", label: "Completed"},
  { id: "airbnb", label: "Cancelled"},
];

const TenantMobileBookingspage = () => {
  return (
    <main className="mt-0 flex h-full w-full flex-col px-3 py-3 sm:px-0 sm:py-1">
      <MobileMyBookings />
    </main>
  )
}

export default TenantMobileBookingspage
