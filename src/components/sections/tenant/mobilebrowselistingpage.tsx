'use client'

import React, { useState } from 'react'
import { useRef } from "react";
import { 
  Search ,
  MapPin,
  ListFilterPlus,
  ArrowUpDown,
  BadgeCheck,
  MoveRight,
} from 'lucide-react'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChevronDown } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Badge } from "@/components/ui/badge"
import ListingCard from './listing-card';

export default function MobileBrowseListingPage() {
  
    const locations: string[] = [
        "Nairobi",
        "Thika",
        "Mombasa",
        "Kisumu",
        "Nakuru"
      ];
      const [selectedLocation, setSelectedLocation] = React.useState<string>(locations[0]);
    
      const filterOptions: string[] = [
        "House",
        "Apartment",
        "Hostel",
        "Hotel",
        "Resort",
      ];
      const [selectedFilters, setSelectedFilters] = useState<string[]>(["Newly Listed"]);

      const priceOptions: string[] = [
        "0 - 3,000",
        "3,001 - 7,000",
        "7,001 - 10,000",
        "10,001 - 20,000",
        "20,001 - 40,000",
        "40,001 - 100,000",
        "100,000+"
      ];
      const [selectedPrice, setSelectedPrice] = useState<string>("House");
    
      // 1. Define your sorting options array configuration
      const sortOptions: string[] = [
        "Recommended",
        "Customer Ratings",
        "Newest First"
      ];
    
      // 2. State tracker holds the active sort option, defaulting to "Recommended"
      const [selectedSort, setSelectedSort] = useState<string>("Recommended");
    
      // Logic to add/remove filters dynamically on click
      const handleFilterClick = (filter: string) => {
        setSelectedFilters((prev) => 
          prev.includes(filter) 
            ? prev.filter(item => item !== filter) // Remove if already checked
            : [...prev, filter]                    // Add if not present
        );
      };
    
      // Determine what string to render inside the button face dynamically
      const displayLabel = selectedFilters.length === 0 
        ? "Filters" 
        : selectedFilters.length === 1 
          ? selectedFilters[0] 
          : `${selectedFilters.length} Active`;       
  return (
    <main className="flex w-full flex-col">
        <div className="relative flex flex-col items-center gap-4 w-full h-full md:flex-row md:items-center md:justify-between md:gap-2">
                <div className="relative w-full md:w-full h-10">

                  {/* 1. Icon Container: Positioned absolute inside the container boundary */}
                  <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                    <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  </div>

                  {/* 2. Form Input Field: Left padding (pl-10) pushes placeholder text to clear the icon */}
                  <input
                    type="text"
                    className="h-full w-full rounded-2xl border-2 pl-11 pr-4 text-sm text-gray-900 outline-none
                               placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 
                               bg-transparent dark:border-gray-700 dark:text-gray-200 dark:placeholder:text-gray-500 
                               dark:focus:border-blue-500 dark:focus:ring-blue-500 transition-colors duration-150"
                    placeholder="Search for apartments, houses, hostel..."
                  />
                </div>

                <div className="flex items-center gap-1 w-full">
                    <div className="relative flex items-center h-8 rounded-2xl bg-transparent dark:border-gray-700 w-32 md:w-44 lg:w-52"> 
                      <div className="pointer-events-none absolute left-2 flex items-center"> 
                        <MapPin className="h-4 w-4 text-gray-400 dark:text-gray-500" /> 
                      </div>

                      <Dropdown.Root>    
                          <Button 
                            size="sm" 
                            color="secondary" 
                            iconTrailing={ChevronDown} 
                            className="w-full gap-0 h-full justify-between bg-transparent border-none hover:bg-slate-100/50 dark:hover:bg-slate-800/50 rounded-2xl pl-7 text-sm text-gray-700 dark:text-gray-200 flex items-center group font-sm focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 shadow-none"
                          >
                               <span className="truncate">{selectedLocation}</span>
                          </Button>

                           {/* Dropdown Options Popover Overlay panel */}
                          <Dropdown.Popover className="w-40 mt-1 bg-white dark:bg-slate-900 border dark:border-gray-800 rounded-xl shadow-xl z-50"> 
                              <Dropdown.Menu className="p-1 space-y-0.5"> 
                                <Dropdown.Section> 
                                  {/* 4. DYNAMIC LOOP: Maps through your locations array setup */}
                                  {locations.map((location) => {
                                    const isActive = selectedLocation === location;
                                    return (
                                    <Dropdown.Item 
                                      key={location}
                                      /* Trigger hook update when this specific destination is clicked */
                                      onClick={() => setSelectedLocation(location)}
                                      className={`rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer transition-colors block w-full text-left
                                        ${selectedLocation === location 
                                          ? 'bg-gray-500/80 dark:bg-blue-950/40 text-black dark:text-blue-400 font-medium' // Active styling matching current choice
                                          : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                                        }
                                      `}
                                    >
                                      <div className="flex items-center justify-between w-full">
                                        <span>{location}</span>
                                        {isActive && <span className="text-xs font-bold text-gray-600 dark:text-gray-300">✓</span>}
                                      </div>
                                    </Dropdown.Item> 
                                    );
                                  })}
                                </Dropdown.Section> 
                              </Dropdown.Menu> 
                          </Dropdown.Popover>
                      </Dropdown.Root>
                    </div>
                              
                              
                    {/* Filter Button: Positioned to the right of the location dropdown */}
                    <div className="flex items-center h-8 bg-transparent rounded-2xl w-19 md:w-20 transition-colors"> 
                    <Dropdown.Root> 
                      <Button 
                        size="sm" 
                        color="secondary" 
                        iconTrailing={ChevronDown}
                        /* All active focus boundaries are locked strictly to baseline slate/gray values to eliminate the blue ring */
                        className="w-19 h-full justify-between bg-transparent border-none hover:bg-slate-100/50 dark:hover:bg-slate-800/50 rounded-2xl text-sm text-gray-700 dark:text-gray-200 flex flex-row items-center group font-medium shadow-none min-w-0 *:data-icon:shrink-0"
                      >
                        <span className="truncate">Type</span>
                      </Button>
                              
                      <Dropdown.Popover className="w-32 mt-1 bg-white dark:bg-slate-900 dark:border-gray-800 rounded-xl shadow-xl z-50"> 
                        <Dropdown.Menu className="space-y-0.1"> 
                          <Dropdown.Section> 
                            {filterOptions.map((option) => {
                              const isActive = selectedFilters.includes(option);
                              return (
                                <Dropdown.Item 
                                  key={option}
                                  onClick={() => handleFilterClick(option)}
                                  className={`text-sm rounded-lg cursor-pointer transition-colors block w-full text-left font-medium
                                    ${isActive 
                                      ? 'bg-slate-100 dark:bg-slate-800 text-gray-900 dark:text-white font-semibold' 
                                      : 'text-gray-500 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                                    }
                                  `}
                                > 
                                  <div className="flex items-center justify-between w-full">
                                    <span>{option}</span>
                                    {isActive && <span className="text-xs font-bold text-gray-600 dark:text-gray-300">✓</span>}
                                  </div>
                                </Dropdown.Item> 
                              );
                            })}
                          </Dropdown.Section> 
                        </Dropdown.Menu> 
                      </Dropdown.Popover> 
                    </Dropdown.Root> 
                </div>
                <div className="flex items-center h-8 bg-transparent rounded-2xl w-full md:w-44 transition-colors duration-150"> 
                    <Dropdown.Root> 
                      <Button 
                        size="sm" 
                        color="secondary" 
                        iconTrailing={ChevronDown}
                        /* All active focus boundaries are locked strictly to baseline slate/gray values to eliminate the blue ring */
                        className="w-20 h-full justify-between bg-transparent border-none hover:bg-slate-100/50 dark:hover:bg-slate-800/50 rounded-2xl text-sm text-gray-700 dark:text-gray-200 flex flex-row items-center group font-medium min-w-0 *:data-icon:shrink-0"
                      >
                        <span className="truncate">Price</span>
                      </Button>
                              
                      <Dropdown.Popover className="w-32 mt-1 bg-white dark:bg-slate-900 dark:border-gray-800 rounded-xl z-50"> 
                        <Dropdown.Menu className="p-0 space-y-0.5"> 
                          <Dropdown.Section> 
                            {priceOptions.map((option) => {
                              const isActive = selectedPrice === option;
                              return (
                                <Dropdown.Item 
                                  key={option}
                                  onClick={() => setSelectedPrice(option)}
                                  /* Blue highlights completely stripped out here as well */
                                  className={`text-sm rounded-lg cursor-pointer transition-colors block w-full text-left font-medium
                                    ${isActive 
                                      ? 'bg-slate-100 dark:bg-slate-800 text-gray-900 dark:text-white font-semibold' 
                                      : 'text-gray-500 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                                    }
                                  `}
                                > 
                                  <div className="flex items-center justify-between w-full">
                                    <span>{option}</span>
                                    {isActive && <span className="text-xs font-bold text-gray-600 dark:text-gray-300">✓</span>}
                                  </div>
                                </Dropdown.Item> 
                              );
                            })}
                          </Dropdown.Section> 
                        </Dropdown.Menu> 
                      </Dropdown.Popover> 
                    </Dropdown.Root> 
                </div>
            </div>
        </div>
                
        <div className="relative w-full mt-4">
          <Card className="relative w-full max-w-full overflow-hidden pt-0 pb-0">
            {/* <Card className="relative w-full overflow-hidden pt-0"> */}
            {/* Listing Image */}
            <div className="relative aspect-video w-full md:w-full overflow-hidden">
              {/* Image Overlay */}
              <div className="absolute inset-0 z-10 bg-black/15" />

              <img
                src="/images/listing8.jpg"
                alt="Listing image"
                className="h-full w-full object-cover transition-transform duration-300"
              />

              {/* Title */}
              <div className="absolute inset-0 top-2 md:top-6 left-3 z-20 flex flex-col p-1">
                <h2
                  className="
                    text-md
                    font-semibold
                    text-gray-200
                    dark:text-gray-200
                  "
                >
                  Modern Living
                </h2>
                <span className="text-sm font-normal text-gray-300 dark:text-gray-200"> in <strong>Nairobi</strong></span>
              </div>

              <div className="absolute w-full flex-col md:flex-row md:justify-between items-start bottom-1 md:bottom-6 left-3 z-20">
                <h3 className="absolute bottom-10 z-20 text-sm font-normal text-white dark:text-gray-200">
                  Find your perfect home in the city.
                </h3>

                {/* Verified Badge */}
                  <Button
                    className="
                      absolute bottom-1 z-20
                      h-8
                      gap-1.5
                      bg-blue-600
                      px-2.5
                      text-xs
                      font-medium
                      text-white
                      backdrop-blur-sm
                      dark:bg-blue-600/90
                    "
                  >
                    Explore Now
                  </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex w-full flex-col items-center mt-4">
          <div className="flex w-full items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Recommended Listings
              </h2>
          </div>
                              
          {/* Carousel */}
          <div className="mt-2 w-full overflow-hidden">
              <div
                  className="flex w-full gap-4 overflow-x-auto px-1 pb-2 snap-x snap-mandatory scroll-smooth scrollbar-hide">
                  
                  {/* Card 1 */}
                  <div className="w-[85%] shrink-0 snap-start md:w-[48%]">
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
                  </div>

                  {/* Card 2 */}
                  <div className="w-[85%] shrink-0 snap-start md:w-[48%]">
                      <ListingCard
                          id="2"
                          imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR05zGleq5nx5v1i5AfPIu1x9ApzHGfWec4CgIs_j2j1A&s=10"
                          title="Modern 3 Bedroom House"
                          location="Suburbs, Cityville"
                          price="KSH 20,500"
                          PricePeriod="month"
                          beds={3}
                          rating={4.8}
                          reviewCount={42}
                          propertyType="House"
                          verified
                      />
                  </div>

                  {/* Card 3 */}
                  <div className="w-[85%] shrink-0 snap-start md:w-[48%]">
                      <ListingCard
                          id="3"
                          imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR05zGleq5nx5v1i5AfPIu1x9ApzHGfWec4CgIs_j2j1A&s=10"
                          title="Luxury City Apartment"
                          location="Westlands, Nairobi"
                          price="KSH 35,000"
                          PricePeriod="month"
                          beds={2}
                          rating={4.7}
                          reviewCount={28}
                          propertyType="Apartment"
                          verified
                      />
                  </div>

                  {/* Card 4 */}
                  <div className="w-[85%] shrink-0 snap-start md:w-[48%]">
                      <ListingCard
                          id="4"
                          imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR05zGleq5nx5v1i5AfPIu1x9ApzHGfWec4CgIs_j2j1A&s=10"
                          title="Spacious Family Home"
                          location="Kilimani, Nairobi"
                          price="KSH 45,000"
                          PricePeriod="month"
                          beds={3}
                          rating={4.9}
                          reviewCount={51}
                          propertyType="House"
                          verified
                      />
                  </div>

              </div>
          </div>
      </div>

        <div className="flex w-full flex-col items-center mt-4">
          <div className="flex w-full items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Featured Listings
              </h2>
          </div>
                              
          {/* Carousel */}
          <div className="mt-2 w-full overflow-hidden">
              <div
                  className="flex w-full gap-4 overflow-x-auto px-1 pb-2 snap-x snap-mandatory scroll-smooth scrollbar-hide">
                  
                  {/* Card 1 */}
                  <div className="w-[85%] shrink-0 snap-start md:w-[48%]">
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
                  </div>

                  {/* Card 2 */}
                  <div className="w-[85%] shrink-0 snap-start md:w-[48%]">
                      <ListingCard
                          id="2"
                          imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR05zGleq5nx5v1i5AfPIu1x9ApzHGfWec4CgIs_j2j1A&s=10"
                          title="Modern 3 Bedroom House"
                          location="Suburbs, Cityville"
                          price="KSH 20,500"
                          PricePeriod="month"
                          beds={3}
                          rating={4.8}
                          reviewCount={42}
                          propertyType="House"
                          verified
                      />
                  </div>

                  {/* Card 3 */}
                  <div className="w-[85%] shrink-0 snap-start md:w-[48%]">
                      <ListingCard
                          id="3"
                          imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR05zGleq5nx5v1i5AfPIu1x9ApzHGfWec4CgIs_j2j1A&s=10"
                          title="Luxury City Apartment"
                          location="Westlands, Nairobi"
                          price="KSH 35,000"
                          PricePeriod="month"
                          beds={2}
                          rating={4.7}
                          reviewCount={28}
                          propertyType="Apartment"
                          verified
                      />
                  </div>

                  {/* Card 4 */}
                  <div className="w-[85%] shrink-0 snap-start md:w-[48%]">
                      <ListingCard
                          id="4"
                          imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR05zGleq5nx5v1i5AfPIu1x9ApzHGfWec4CgIs_j2j1A&s=10"
                          title="Spacious Family Home"
                          location="Kilimani, Nairobi"
                          price="KSH 45,000"
                          PricePeriod="month"
                          beds={3}
                          rating={4.9}
                          reviewCount={51}
                          propertyType="House"
                          verified
                      />
                  </div>

              </div>
          </div>
      </div>

    </main>
    )
}
