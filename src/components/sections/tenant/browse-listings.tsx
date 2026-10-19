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
        {/* Small / Medium Devices */}
        <div className="mt-6 flex w-full gap-3 lg:hidden">
          {/* Filter */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="secondary"
                className="
                  h-12 flex-1 gap-2
                  border border-slate-200 bg-white
                  text-sm text-slate-900
                  hover:bg-slate-50 hover:text-slate-900
                  dark:border-slate-700 dark:bg-secondary
                  dark:text-secondary-foreground
                  dark:hover:bg-slate-800 dark:hover:text-white
                "
              >
                <Filter className="h-5 w-5 shrink-0" />
                <span>Filter</span>
              </Button>
            </SheetTrigger>
        
            <SheetContent
              side="right"
              className="w-[92vw] rounded-l-2xl border-l border-slate-200 bg-white p-0 shadow-2xl dark:border-slate-800 dark:bg-slate-950 sm:max-w-md"
            >
              <SheetHeader className="px-4 pb-2 pt-5">
                <SheetTitle>Filter Properties</SheetTitle>
          
                <SheetDescription>
                  Select the options you want to use when searching for a property.
                </SheetDescription>
              </SheetHeader>
          
              {/* Filter Options */}
              <div className="no-scrollbar flex-1 overflow-y-auto px-4 py-4">
                <div className="flex flex-col gap-3">
                  {propertyFilters.map(({ id, label, icon: Icon }) => {
                    const isActive = activeFilter === id;
                
                    return (
                      <Button
                        key={id}
                        variant="secondary"
                        onClick={() => setActiveFilter(id)}
                        className={`
                          h-12 w-full justify-start gap-3
                          border
                          text-sm
                          transition-all
                          ${
                            isActive
                              ? "border-(--color-accent-gold) bg-(--color-accent-gold)/10 text-slate-900 dark:text-white"
                              : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-slate-800"
                          }
                        `}
                      >
                        <Icon className="h-5 w-5 shrink-0" />
                      
                        <span>{label}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>
              
              <SheetFooter className="border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
                <SheetClose asChild>
                  <Button
                    className="
                      w-full
                      bg-(--color-accent-gold)
                      text-white
                      hover:bg-(--color-accent-gold-dark)
                    "
                  >
                    Apply Filters
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
              
          {/* View on Map */}
          <Button
            variant="secondary"
            className="
              h-12 flex-1 gap-2
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
                imageUrl="data:image/jpeg;base64,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"
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
