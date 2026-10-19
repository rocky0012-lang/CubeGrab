'use client'

import React, { useState } from 'react'
import { 
  Search ,
  MapPin,
  ListFilterPlus,
  ArrowUpDown,
} from 'lucide-react'
import { ChevronDown } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { DropdownAccountCardSM } from "@/components/reusable/account-card"
import { usePathname } from "next/navigation";
import NotificationBell from "@/components/reusable/notificationbell";


const navbarConfig = {
  "/tenant/dashboard": {
    search: true,
    location: false,
    filter: false,
    sort: false,
    notifications: true,
    account: true,
  },

  "/tenant/browse-listings": {
    search: true,
    location: true,
    filter: true,
    sort: true,
    notifications: true,
    account: true,
  },

  "/tenant/saved-listings": {
    search: true,
    location: false,
    filter: true,
    sort: false,
    notifications: true,
    account: true,
  },

  "/tenant/favourites": {
    search: true,
    location: false,
    filter: true,
    sort: false,
    notifications: true,
    account: true,
  },

  "/tenant/my-bookings": {
    search: true,
    location: false,
    filter: false,
    sort: false,
    notifications: true,
    account: true,
  },

  "/tenant/messages": {
    search: false,
    location: false,
    filter: false,
    sort: false,
    notifications: true,
    account: true,
  },

  "/tenant/payments": {
    search: false,
    location: false,
    filter: false,
    sort: false,
    notifications: true,
    account: true,
  },

  "/tenant/reviews": {
    search: false,
    location: false,
    filter: false,
    sort: false,
    notifications: true,
    account: true,
  },

  "/tenant/support": {
    search: false,
    location: false,
    filter: false,
    sort: false,
    notifications: true,
    account: true,
  },

  "/tenant/notifications": {
    search: false,
    location: false,
    filter: false,
    sort: false,
    notifications: false,
    account: true,
  },

  "/tenant/settings": {
    search: false,
    location: false,
    filter: false,
    sort: false,
    notifications: false,
    account: true,
  },
} as const;



export default function TenantNavbar() {
  const pathname = usePathname();

   const config =
    navbarConfig[pathname as keyof typeof navbarConfig] ??
    navbarConfig["/tenant/dashboard"];

  // 1. Define your dynamic location array mapping (City/Town, Country)
  const locations: string[] = [
    "Nairobi, Kenya",
    "Thika, Kenya",
    "Mombasa, Kenya",
    "Kisumu, Kenya",
    "Nakuru, Kenya"
  ];
  const [selectedLocation, setSelectedLocation] = React.useState<string>(locations[0]);

  const filterOptions: string[] = [
    "Price: Low to High",
    "Price: High to Low",
    "Top Rated First",
    "Newly Listed",
    "Verified Properties Only"
  ];
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["Newly Listed"]);

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
    <nav className="sticky top-0 z-40 backdrop-blur-md dark:bg-[var(--color-bg-primary-base)] hidden lg:flex items-center justify-between w-full h-15 py-2 mb-4 rounded-lg">
      <div className="relative flex items-center gap-4 w-full h-full md:w-3/4 lg:w-2/3">
        {config.search && (
        <div className="relative w-full md:w-1/3 lg:w-full h-10">

          {/* 1. Icon Container: Positioned absolute inside the container boundary */}
          <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
            <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          </div>

          {/* 2. Form Input Field: Left padding (pl-10) pushes placeholder text to clear the icon */}
          <input
            type="text"
            className="h-full w-full rounded-2xl border-2 pl-11 pr-4 text-md text-gray-900 outline-none
                       placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 
                       bg-transparent dark:border-gray-700 dark:text-gray-200 dark:placeholder:text-gray-500 
                       dark:focus:border-blue-500 dark:focus:ring-blue-500 transition-colors duration-150"
            placeholder="Search for apartments, houses, hostel..."
          />
        </div>
        )}

        {/* 3. Dropdown Menu: Positioned to the right of the search bar */}
        {config.location && (
        <div className="relative flex items-center h-10 border-2 rounded-2xl bg-transparent border-gray-200 dark:border-gray-700 w-full md:w-44 lg:w-52"> 
          <div className="pointer-events-none absolute left-4 flex items-center"> 
            <MapPin className="h-4 w-4 text-gray-400 dark:text-gray-500" /> 
          </div>

          <Dropdown.Root>    
              <Button 
                size="sm" 
                color="secondary" 
                iconTrailing={ChevronDown} 
                className="w-full h-full justify-between bg-transparent border-none hover:bg-slate-100/50 dark:hover:bg-slate-800/50 rounded-2xl pl-10 pr-3 text-sm text-gray-700 dark:text-gray-200 flex items-center group font-medium focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 shadow-none"
              >
                   <span className="truncate pr-2">{selectedLocation}</span>
              </Button>

               {/* Dropdown Options Popover Overlay panel */}
              <Dropdown.Popover className="w-56 mt-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl z-50"> 
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
        )} 


        {/* Filter Button: Positioned to the right of the location dropdown */}
        {config.filter && (
        <div className="relative flex items-center h-10 bg-transparent border-2 border-gray-200 dark:border-gray-700 dark:border-slate-700 rounded-2xl w-full md:w-44 lg:w-52 transition-colors duration-150"> 
                  
        {/* Absolute Filter Icon on the Left margin */}
        <div className="pointer-events-none absolute left-4 flex items-center z-10"> 
          <ListFilterPlus className="h-4 w-4 text-gray-400 dark:text-gray-500" /> 
        </div> 
        
        
        <Dropdown.Root> 
          <Button 
            size="sm" 
            color="secondary" 
            iconTrailing={ChevronDown}
            /* All active focus boundaries are locked strictly to baseline slate/gray values to eliminate the blue ring */
            className="w-full h-full justify-between bg-transparent border-none hover:bg-slate-100/50 dark:hover:bg-slate-800/50 rounded-2xl pl-10 pr-3 text-sm text-gray-700 dark:text-gray-200 flex flex-row items-center group font-medium focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 shadow-none min-w-0 *:data-icon:shrink-0"
          >
            <span className="truncate pr-1">{displayLabel}</span>
          </Button>

          <Dropdown.Popover className="w-52 mt-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl z-50"> 
            <Dropdown.Menu className="p-1 space-y-0.5"> 
              <Dropdown.Section> 
                {filterOptions.map((option) => {
                  const isActive = selectedFilters.includes(option);
                  return (
                    <Dropdown.Item 
                      key={option}
                      onClick={() => handleFilterClick(option)}
                      /* Blue highlights completely stripped out here as well */
                      className={`text-sm rounded-lg px-3 py-2 cursor-pointer transition-colors block w-full text-left font-medium
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
      )}


      {config.sort && (
      <div className="relative flex items-center h-10 bg-transparent border-2 border-gray-200 dark:border-gray-700 rounded-2xl w-full md:w-52 lg:w-60 transition-colors duration-150"> 
              
        {/* Absolute Sorting Icon on the Left margin */}
        <div className="pointer-events-none absolute left-4 flex items-center z-10"> 
          <ArrowUpDown className="h-4 w-4 text-gray-400 dark:text-gray-500" /> 
        </div> 

        <Dropdown.Root> 
          <Button 
            size="sm" 
            color="secondary" 
            iconTrailing={ChevronDown}
            className="w-full h-full justify-between bg-transparent border-none hover:bg-slate-100/50 dark:hover:bg-slate-800/50 rounded-2xl pl-10 pr-3 text-sm text-gray-700 dark:text-gray-200 flex flex-row items-center group font-medium focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 shadow-none min-w-0 *:data-icon:shrink-0"
          >
            <div className="flex flex-row items-center gap-1 min-w-0 truncate pr-2">
              <span className="text-gray-400 dark:text-gray-500 shrink-0">Sort:</span>
              <span className="truncate text-gray-700 dark:text-gray-200 font-semibold">
                {selectedSort}
              </span>
            </div>
          </Button>

          {/* Popover choice layout menu overlay */}
          <Dropdown.Popover className="w-52 mt-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl z-50"> 
            <Dropdown.Menu className="p-1 space-y-0.5"> 
              <Dropdown.Section> 
                {sortOptions.map((option) => {
                  const isActive = selectedSort === option;
                  return (
                    <Dropdown.Item 
                      key={option}
                      onClick={() => setSelectedSort(option)}
                      /* Internal choice row selections utilize neutral gray highlights instead of active text-blue fills */
                      className={`text-sm rounded-lg px-3 py-2 cursor-pointer transition-colors block w-full text-left font-medium
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
    )}
    </div>

    <div className="flex items-center gap-4">
      {config.notifications && (
        <NotificationBell />
      )}
      <hr className="bg-gray-500 border-gray-200 dark:border-gray-700 w-px h-8 mx-2" />
      {config.account && (
        <DropdownAccountCardSM redirectTo="/sign-in" />
      )}
    </div>
    
    </nav>
  )
}

