import React from 'react'
import BrowseListingsPage from '@/components/sections/tenant/browse-listings'
import MobileBrowseListingPage from '@/components/sections/tenant/mobilebrowselistingpage'


const BrowseListings = () => {
  return (
    <main className="flex flex-col">
      <div className="hidden lg:flex">
      <BrowseListingsPage />
      </div>
      <div className="flex lg:hidden">
      <MobileBrowseListingPage />
      </div>
    </main>
)
}

export default BrowseListings
