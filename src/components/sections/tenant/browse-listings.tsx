'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { 
    Map,
    LayoutGrid,
    House,
    Hotel,
    Building,
    LandPlot,
    BedDouble,
    BedSingle,
    Filter,
} from 'lucide-react';
import ListingCard from './listing-card';
import Image from 'next/image';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose,
} from "@/components/ui/sheet";

const propertyFilters = [
  { id: "all", label: "All", icon: LayoutGrid },
  { id: "apartments", label: "Apartments", icon: Building },
  { id: "houses", label: "Houses", icon: House },
  { id: "hotels", label: "Hotels", icon: Hotel },
  { id: "airbnb", label: "Airbnb", icon: BedDouble },
  { id: "hostels", label: "Hostels", icon: BedSingle },
  { id: "plots", label: "Plots", icon: LandPlot },
];

const BrowseListingsPage = () => {

    const [activeFilter, setActiveFilter] = useState("all");
  return (
    <main className="mt-0 flex h-full w-full flex-col overflow-x-hidden px-3 py-3 sm:px-4">
        <h1 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white lg:text-2xl">Find Your Perfect Place</h1>
        <p className="text-gray-700 dark:text-gray-300">
            Verified listings, Secure Bookings, complete Peace of Mind.
        </p>

        {/* Large Devices */}
        <div className="mt-6 hidden h-12 w-full items-center justify-between lg:flex">
          <div className="flex flex-wrap gap-3">
            {propertyFilters.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant="secondary"
                onClick={() => setActiveFilter(id)}
                className={`
                  h-12 gap-2
                  border border-slate-200 bg-white
                  text-sm text-slate-900
                  hover:bg-slate-50 hover:text-slate-900
                  dark:border-slate-700 dark:bg-secondary
                  dark:text-secondary-foreground
                  dark:hover:bg-slate-800 dark:hover:text-white
                  ${
                    activeFilter === id
                      ? "ring-2 ring-(--color-accent-gold) ring-offset-2 dark:ring-offset-slate-950"
                      : ""
                  }
                `}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span>{label}</span>
              </Button>
            ))}
          </div>
        
          <Button
            variant="secondary"
            className="
              h-12 shrink-0 gap-2
              border border-slate-200 bg-white
              text-sm text-slate-900
              hover:bg-slate-50 hover:text-slate-900
              dark:border-slate-700 dark:bg-secondary
              dark:text-secondary-foreground
              dark:hover:bg-slate-800 dark:hover:text-white
            "
          >
            <Map className="h-5 w-5 shrink-0" />
            <span>View on map</span>
          </Button>
        </div>

        {/* Listing cards would go here */}
        <div className="mt-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            <ListingCard 
                id="1"
                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR05zGleq5nx5v1i5AfPIu1x9ApzHGfWec4CgIs_j2j1A&s=10"
                title="Modern 2 Bedroom Apartment"
                location="Downtown, Cityville"
                price="$1,200"
                PricePeriod="month"
                beds={2}
                rating={4.5}
                reviewCount={34}
                propertyType="Apartment"
                verified
            />
            <ListingCard 
                id="2"
                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVUhWJJnVsz0DgS4nycGmLn1VE4qUtt3iMy4QbGcSBiw&s=10"
                title="Modern 2 Bedroom Apartment"
                location="Downtown, Cityville"
                price="$1,200"
                PricePeriod="month"
                beds={2}
                rating={4.5}
                reviewCount={34}
                propertyType="Apartment"
                verified
            />
            <ListingCard 
                id="3"
                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNemCnfbP2gbRxx9Qin5OCOHFnV1vEwJTWt2uVCs872w&s=10"
                title="Modern 2 Bedroom Apartment"
                location="Downtown, Cityville"
                price="$1,200"
                PricePeriod="month"
                beds={2}
                rating={4.5}
                reviewCount={34}
                propertyType="Apartment"
                verified
            />
            <ListingCard 
                id="4"
                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVUhWJJnVsz0DgS4nycGmLn1VE4qUtt3iMy4QbGcSBiw&s=10"
                title="Modern 2 Bedroom Apartment"
                location="Downtown, Cityville"
                price="$1,200"
                PricePeriod="month"
                beds={2}
                rating={4.5}
                reviewCount={34}
                propertyType="Apartment"
                verified
            />
            <ListingCard 
                id="5"
                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXdjEzhDi5GrVhMDf4ySvXK0kbm9gP2tu0_RbjJz3RVQ&s=10"
                title="1 Bedroom Apartment"
                location="Thika, Kiambu"
                price="KSH 20,000"
                PricePeriod="month"
                beds={1}
                rating={4.0}
                reviewCount={4}
                propertyType="Apartment"
                verified
            />
            <ListingCard 
                id="6"
                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR05zGleq5nx5v1i5AfPIu1x9ApzHGfWec4CgIs_j2j1A&s=10"
                title="Modern 2 Bedroom Apartment"
                location="Downtown, Cityville"
                price="$1,200"
                PricePeriod="month"
                beds={2}
                rating={4.5}
                reviewCount={34}
                propertyType="Apartment"
                verified
            />
            <ListingCard 
                id="7"
                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR05zGleq5nx5v1i5AfPIu1x9ApzHGfWec4CgIs_j2j1A&s=10"
                title="Modern 2 Bedroom Apartment"
                location="Downtown, Cityville"
                price="$1,200"
                PricePeriod="month"
                beds={2}
                rating={4.5}
                reviewCount={34}
                propertyType="Apartment"
                verified
            />
            <ListingCard 
                id="8"
                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR05zGleq5nx5v1i5AfPIu1x9ApzHGfWec4CgIs_j2j1A&s=10"
                title="Modern 2 Bedroom Apartment"
                location="Downtown, Cityville"
                price="$1,200"
                PricePeriod="month"
                beds={2}
                rating={4.5}
                reviewCount={34}
                propertyType="Apartment"
                verified
            />
            <ListingCard 
                id="9"
                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR05zGleq5nx5v1i5AfPIu1x9ApzHGfWec4CgIs_j2j1A&s=10"
                title="Modern 2 Bedroom Apartment"
                location="Downtown, Cityville"
                price="$1,200"
                PricePeriod="month"
                beds={2}
                rating={4.5}
                reviewCount={34}
                propertyType="Apartment"
                verified
            />
            <ListingCard 
                id="10"
                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR05zGleq5nx5v1i5AfPIu1x9ApzHGfWec4CgIs_j2j1A&s=10"
                title="Modern 2 Bedroom Apartment"
                location="Downtown, Cityville"
                price="$1,200"
                PricePeriod="month"
                beds={2}
                rating={4.5}
                reviewCount={34}
                propertyType="Apartment"
                verified
            />
            <ListingCard 
                id="11"
                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR05zGleq5nx5v1i5AfPIu1x9ApzHGfWec4CgIs_j2j1A&s=10"
                title="Modern 2 Bedroom Apartment"
                location="Downtown, Cityville"
                price="$1,200"
                PricePeriod="month"
                beds={2}
                rating={4.5}
                reviewCount={34}
                propertyType="Apartment"
                verified
            />
            <ListingCard 
                id="12"
                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR05zGleq5nx5v1i5AfPIu1x9ApzHGfWec4CgIs_j2j1A&s=10"
                title="Modern 2 Bedroom Apartment"
                location="Downtown, Cityville"
                price="$1,200"
                PricePeriod="month"
                beds={2}
                rating={4.5}
                reviewCount={34}
                propertyType="Apartment"
                verified
            />
            <ListingCard 
                id="13"
                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR05zGleq5nx5v1i5AfPIu1x9ApzHGfWec4CgIs_j2j1A&s=10"
                title="Modern 2 Bedroom Apartment"
                location="Downtown, Cityville"
                price="$1,200"
                PricePeriod="month"
                beds={2}
                rating={4.5}
                reviewCount={34}
                propertyType="Apartment"
                verified
            />
            <ListingCard 
                id="14"
                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR05zGleq5nx5v1i5AfPIu1x9ApzHGfWec4CgIs_j2j1A&s=10"
                title="Modern 2 Bedroom Apartment"
                location="Downtown, Cityville"
                price="$1,200"
                PricePeriod="month"
                beds={2}
                rating={4.5}
                reviewCount={34}
                propertyType="Apartment"
                verified
            />
            <ListingCard 
                id="15"
                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR05zGleq5nx5v1i5AfPIu1x9ApzHGfWec4CgIs_j2j1A&s=10"
                title="Modern 2 Bedroom Apartment"
                location="Downtown, Cityville"
                price="$1,200"
                PricePeriod="month"
                beds={2}
                rating={4.5}
                reviewCount={34}
                propertyType="Apartment"
                verified
            />
        </div>

        <div className="mt-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="flex h-full min-h-16 items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900/60">
                <Image  
                    src="/images/verified-badge.png" 
                    alt="verified badge" 
                    width={100} 
                    height={100} 
                    className="h-12 w-12 rounded-sm object-contain" 
                /> 
                <div className="flex min-w-0 flex-col justify-center"> 
                    <p className="text-lg font-semibold leading-tight text-gray-700 dark:text-gray-300"> 
                       Verified Listings 
                    </p> 
                    <span className="text-sm text-gray-500"> 
                        All properties are verified 
                    </span> 
                </div> 
            </div>

            <div className="flex h-full min-h-16 items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900/60">
                <Image  
                    src="/images/securepayments.png" 
                    alt="secure payments" 
                    width={100} 
                    height={100} 
                    className="h-12 w-12 rounded-sm object-contain" 
                /> 
                <div className="flex min-w-0 flex-col justify-center"> 
                    <p className="text-lg font-semibold leading-tight text-gray-700 dark:text-gray-300"> 
                       Secure Payments 
                    </p> 
                    <span className="text-sm text-gray-500"> 
                        Escrow Protection 
                    </span> 
                </div> 
            </div>

            <div className="flex h-full min-h-16 items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900/60">
                <Image  
                    src="/images/247support.png" 
                    alt="24/7 support" 
                    width={100} 
                    height={100} 
                    className="h-12 w-12 rounded-sm object-contain dark:bg-active" 
                /> 
                <div className="flex min-w-0 flex-col justify-center"> 
                    <p className="text-lg font-semibold leading-tight text-gray-700 dark:text-gray-300"> 
                       24/7 Support 
                    </p> 
                    <span className="text-sm text-gray-500"> 
                        We&apos;re here to help
                    </span> 
                </div> 
            </div>

            <div className="flex h-full min-h-16 items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900/60">
                <Image  
                    src="/images/trusted.png" 
                    alt="trusted by thousands" 
                    width={100} 
                    height={100} 
                    className="h-12 w-12 rounded-sm object-contain" 
                /> 
                <div className="flex min-w-0 flex-col justify-center"> 
                    <p className="text-lg font-semibold leading-tight text-gray-700 dark:text-gray-300"> 
                       Trusted by Thousands
                    </p> 
                    <span className="text-sm text-gray-500"> 
                        10,000+ happy tenants
                    </span> 
                </div> 
            </div>

        </div>

    </main>
  )
}

export default BrowseListingsPage
