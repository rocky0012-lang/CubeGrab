import React from 'react'

const SavedListingsPage = () => {
  return (
    <main className="flex w-full h-full py-2 px-2">
      <div className="flex flex-col w-full h-full py-2 px-0">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Saved Listings</h1>
        <p className="text-gray-700 dark:text-gray-300">
          Here you can view all the listings you have saved.
        </p>
        <div className="mt-6">
          {/* Add your saved listings content here */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example saved listing card */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Listing Title</h2>
              <p className="text-gray-700 dark:text-gray-300">Description of the saved listing.</p>
            </div>
            {/* Repeat for other saved listings */}
          </div>
        </div>
      </div>
    </main>
  )
}

export default SavedListingsPage
