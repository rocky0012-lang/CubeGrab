import React from 'react'
import { 
    MapPin, 
    Star 
} from "lucide-react";

interface ListingHeaderProps {
    id: string;
    title: string;
    location: string;
    price: number;
    pricePeriod: string;
    rating: number;
    reviewCount: number;
    currency: string;
}

const ListingHeader = ({ id, title, location, price, pricePeriod, rating, reviewCount, currency = "USD" /* currency = "KES" */ }: ListingHeaderProps) => {
  return (
    <div className="mt-4 w-3/4">
      <div className="flex w-full items-start justify-between gap-6 px-2">

        {/* LEFT — Title & Location */}
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h1>

          <p className="mt-1 flex items-center gap-1 text-md text-gray-500 dark:text-gray-400">
            <MapPin className="h-4 w-4 shrink-0" />

            <span>
              {location}
            </span>
          </p>
        </div>

        {/* RIGHT — Price & Rating */}
        <div className="flex shrink-0 flex-col items-end pr-6">
          <span className="text-2xl font-semibold text-gray-900 dark:text-[var(--color-text-accent)]">
            {new Intl.NumberFormat("en-KE", { style: "currency", currency, maximumFractionDigits: 0 }).format(price)}

            <span className="ml-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              / {pricePeriod}
            </span>
          </span>

          <div className="mt-1 flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />

            <span className="text-sm text-gray-600 dark:text-gray-400">
              {rating} ({reviewCount} reviews)
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ListingHeader
