"use client"


import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  ChevronLeft, 
  Pencil, 
} from 'lucide-react'

const TenantProfileNavbar = () => {
  const router = useRouter()

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault()
    router.back()
  }
  return (
    <nav className="sticky top-0 flex-row z-40 backdrop-blur-md dark:bg-[var(--color-bg-primary-base)] items-center justify-between w-full lg:h-15 h-5 lg:pt-2 lg:pl-2 mb-4 rounded-lg">
      <div className="relative lg:hidden flex flex-row items-center w-full min-h-[48px] px-1">
        {/* 1. Left Aligned Arrow Block */}
        <div className="flex-shrink-0 z-10 hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center px-2 py-2 mr-1 text-gray-700 dark:text-gray-400 dark:hover:bg-blue-500 rounded-md"
              onClick={handleBack}
            >
              <ArrowLeft /> 
            </button>
        </div>

        {/* 2. Perfectly Centered Title Block */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white pointer-events-auto">
            My Profile
          </h1>
        </div>

      </div>

      <div className="lg:flex flex-row hidden items-center justify-between w-full gap-2 px-0">
        <div className="flex-shrink-0">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-gray-400 px-2 py-2 mr-1 text-md font-medium text-gray-700 shadow-md hover:bg-blue-600 focus:outline-none dark:border-gray-600 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700 "
              onClick={handleBack}
            >
              <ChevronLeft /> 
              Back
            </button>
        </div>
        <div className="flex flex-row items-center justify-between w-full gap-2 px-2">
          <div className="flex flex-col items-start gap-0">
            <h1 className="text-3xl hidden lg:flex font-semibold text-gray-900 dark:text-white">My Profile</h1>
              <p className="text-gray-700 hidden lg:flex dark:text-gray-300 text-md">
                   Manage your account and preferences.
              </p>
          </div>
          <div className="flex-shrink-0">
            <Link href="/tenant/profile/personal-information" passHref>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-blue-600 px-2 py-2 mr-13 text-lg font-medium text-black shadow-md hover:bg-blue-700 focus:outline-none dark:border-blue-500 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-500 "
              >
                <Pencil  className="w-5 h-5 mr-2"/>
                Edit Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default TenantProfileNavbar
