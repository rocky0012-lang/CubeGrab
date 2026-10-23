"use client"

import Image from 'next/image'
import { Badge } from "@/components/base/badges/badges";
import { 
  BadgeCheck, 
  CheckCircle, 
  CircleX, 
  Mail,
  Phone, 
} from 'lucide-react';
import { useProfileContext } from "@/providers/profile-provider";
import { Separator } from "@/components/ui/separator"
import RecentBooking from './recent-profilebooking';
import ProfileMenu from "@/components/sections/tenant/mobileprofile-menu";
import { AvatarProfilePhoto } from "@/components/base/avatar/avatar-profile-photo";

type RecentBookingStatus = "Completed" | "Canceled" | "Pending";

type RecentBookings = {
  id: string;
  propertyName: string;
  location: string;
  image: string;
  stayDate: string;
  price: string;
  status: RecentBookingStatus;
  guest: number;
};

const recentBooking: RecentBookings[] = [
  {
    id: "1",
    propertyName: "Modern 2 Bedroom Apartment",
    location: "Kilimani, Nairobi",
    image: "/images/apartmentcover.jpg",
    stayDate: "10-12 May 2026",
    price: "KSH 18,000",
    status: "Completed", // Optional status field
    guest: 2,
  },
  {
    id: "2",
    propertyName: "Cozy Studio in the Heart of the City",
    location: "Westlands, Nairobi",
    image: "/images/apartmentcover.jpg",
    stayDate: "15-18 June 2026",
    price: "$320",
    status: "Canceled",
    guest: 1,
  },
  {
    id: "3",
    propertyName: "Luxury Villa with Private Pool",
    location: "Karen, Nairobi",
    image: "/images/apartmentcover.jpg",
    stayDate: "20-25 July 2026",
    price: "KSH 12,500",
    status: "Pending",
    guest: 4,
  },
  {
  id: "4",
  propertyName: "Luxury Studio",
  location: "Lavington, Nairobi",
  image: "/images/apartmentcover.jpg",
  stayDate: "15-18 February 2026",
  price: "KSH 15,000",
  status: "Completed",
  guest: 2,
  },
];

const TenantProfileOverview = () => {
  const { profile, loading } = useProfileContext();
  const isIdentityVerified = profile?.verification_status === "verified";

  const memberSince = profile?.created_at ? new Date(profile.created_at).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  }) : null;
  return (
        <main className="mt-0 flex h-full w-full flex-col gap-4 lg:px-0 lg:py-0 px-0 mb-10">
          <div className="flex flex-col lg:flex-row gap-2 items-center justify-between">
            {/* Profile Card Block - Swapped fixed height for auto padding on tiny devices */}
            <div className="flex flex-row lg:h-52 h-auto py-1 border border-gray-200 dark:border-gray-700 rounded-lg w-full lg:w-3/4 lg:items-start items-center lg:gap-6 gap-0">

              {/* Profile Picture */}
              <div className="size-23 mr-1 ml-1 shrink-0 overflow-hidden rounded-full bg-gray-400 dark:bg-gray-800 lg:size-48 lg:mt-1 mt-0">
                <AvatarProfilePhoto 
                  size="lg" 
                  alt={profile?.full_name} 
                  src={profile?.profile_photo_url ?? undefined}
                  className="size-full object-cover"
                />
              </div>            

              {/* Profile Information */}
              <div className="lg:mt-1 mt-0 flex w-full min-w-0 flex-col gap-1 pr-2">
                <h1 className="text-md font-semibold text-gray-900 dark:text-white lg:text-3xl truncate">
                  {loading ? "Loading..." : profile?.full_name}
                </h1>           

                <div className="flex flex-row items-center lg:gap-12 gap-2 flex-wrap">
                  <h3 className="lg:text-md text-sm text-gray-600 dark:text-gray-400">
                    Tenant
                  </h3>
                  {isIdentityVerified && (
                    <Badge
                      className="
                        lg:h-7
                        h-5
                        gap-1
                        bg-white/90
                        px-2
                        lg:text-md
                        lg:font-medium
                        text-xs
                        text-emerald-600
                        dark:ring-0
                        dark:border-0
                        backdrop-blur-sm
                        dark:bg-transparent
                        lg:ring-emerald-600
                        lg:dark:text-emerald-600
                      "
                    >
                      <BadgeCheck
                        className="
                          lg:h-5 lg:w-5
                          h-3.5 w-3.5
                          shrink-0
                          text-emerald-600
                          dark:text-emerald-600
                        "
                      />
                      Verified
                    </Badge>
                  )}
                </div>

                <div className="flex flex-col items-start mt-2 lg:gap-3 gap-1.5 text-gray-500 dark:text-gray-400 w-full min-w-0">
                  {/* Email Info Element */}
                  <div className="flex flex-row items-center gap-1 w-full min-w-0">
                    <Mail className="h-4 w-4 lg:h-5 lg:w-5 shrink-0"/>
                    <span className="ml-1 text-sm lg:text-lg truncate">
                      {loading ? "" : profile?.email}
                    </span>
                  </div>

                  {/* Phone Info Element */}
                  <div className="flex flex-row items-center gap-1 w-full min-w-0">
                    <Phone className="h-4 w-4 lg:h-5 lg:w-5 shrink-0"/>
                    <span className="ml-1 text-sm lg:text-lg truncate">
                      {loading ? "" : profile?.phone_number}
                    </span>
                  </div>

                  {/* Member Registration Info Element - Desktop Only */}
                  <div className="hidden lg:flex flex-row items-center gap-2 text-md">
                    <Image
                      src="/images/memberadd.png"
                      alt="Country Flag"
                      width={20}
                      height={20}
                      className="h-7 w-7 dark:invert"
                    />
                    <span className="font-semibold">Member Since</span>
                    <span className="ml-1">
                      {memberSince && `${memberSince}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Small device layout for Personal Information, Preferences, Identity verification, etc. */}
            <div className="w-full lg:hidden border border-gray-200 dark:border-gray-700 rounded-lg">
              <ProfileMenu redirectTo='/sign-in' />
            </div>

            {/* Metric Overview Box - Hidden on mobile layout */}
            <div className="hidden lg:flex border h-52 border-gray-200 dark:border-gray-700 rounded-lg w-1/4 items-center justify-between gap-2">
              <div className="flex flex-col w-full items-center justify-center mt-2 gap-10">
                <div className="flex flex-col items-center gap-1">
                  <h3 className="text-2xl font-bold text-black dark:text-white">12</h3>
                  <p className="text-md text-gray-600 dark:text-gray-400">Total Bookings</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <h3 className="text-2xl font-bold text-black dark:text-white">4</h3>
                  <p className="text-md text-gray-600 dark:text-gray-400">Favourites</p>
                </div>
              </div>
              <div className="flex flex-col w-full items-center justify-center mt-2 gap-10">
                <div className="flex flex-col items-center gap-1">
                  <h3 className="text-2xl font-bold text-black dark:text-white">6</h3>
                  <p className="text-md text-gray-600 dark:text-gray-400">Reviews</p>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <h3 className="text-2xl font-medium text-black dark:text-white">Member</h3>
                  <div className="flex flex-row items-center justify-between gap-8">
                    <p className="text-md text-gray-600 dark:text-gray-400">Level</p>
                    <p className="text-md text-gray-600 dark:text-gray-400">1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Informational Details Section - Hidden on mobile layout */}
          <div className="hidden lg:flex flex-row gap-2 items-start justify-center">
            {/* Left Column Container: Handles Descriptions & Preferences */}
            <div className="flex flex-col w-3/4 items-start gap-4">

              {/* About Me Section Box */}
              <div className="flex flex-col gap-2 w-full border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 ml-4">About Me</h3>
                <p className="text-md text-gray-600 dark:text-gray-400 mt-2 ml-4 mb-4">
                  I am looking for a comfortable and affordable place to stay during my travels. I value cleanliness, safety, and good communication with hosts. I am respectful of the property and will treat it as if it were my own.
                </p>
              </div>

              {/* Core User Preferences Customization Box */}
              <div className="flex flex-col gap-2 w-full border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4 ml-4">Preference</h3>

                {/* Preferred Location Row */}
                <div className="flex flex-row items-center justify-between gap-2">
                  <h1 className="text-md shrink-0 font-bold text-gray-600 dark:text-white/70 mt-2 ml-4 mr-10 mb-2">Preferred Location</h1>
                  <p className="text-md truncate text-gray-600 dark:text-gray-400 mt-2 ml-4 mb-4 mr-6">
                    Kilimani, Westlands, Karen, Lavington, Runda, Kilimani, Westlands, Karen, Lavington, Kilimani, Westlands, Karen, Lavington, Kilimani, Westlands, Karen, Lavington
                  </p>
                </div>
                <Separator />

                {/* Preferred Property Typology Row */}
                <div className="flex flex-row items-center justify-between gap-2">
                  <h1 className="text-md shrink-0 font-bold text-gray-600 dark:text-white/80 mt-2 ml-4 mr-10 mb-2">Preferred Types</h1>
                  <p className="text-md truncate text-gray-600 dark:text-gray-400 mt-2 ml-4 mb-4 mr-6">
                    Apartments, Airbnb
                  </p>
                </div>
                <Separator />

                {/* Financial Budget Targets Row */}
                <div className="flex flex-row items-center justify-between gap-2">
                  <h1 className="text-md shrink-0 font-bold text-gray-600 dark:text-white/80 mt-2 ml-4 mr-10 mb-2">Budget Range</h1>
                  <p className="text-md truncate text-gray-600 dark:text-gray-400 mt-2 ml-4 mb-4 mr-6">
                    KSH 3000 - KSH 15000 /night
                  </p>
                </div>
                <Separator />

                {/* Scheduling Flexibility Targets Row */}
                <div className="flex flex-row items-center justify-between gap-2">
                  <h1 className="text-md shrink-0 font-bold text-gray-600 dark:text-white/80 mt-2 ml-4 mr-10 mb-2">Move-in Date</h1>
                  <p className="text-md truncate text-gray-600 dark:text-gray-400 mt-2 ml-4 mb-4 mr-6">
                    Flexible
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column Container: Security Status Grid Panel - Hidden on mobile layout */}
            <div className="hidden lg:flex flex-col justify-between h-70 rounded-lg bg-transparent border border-gray-200 dark:border-gray-700 w-1/4 items-start gap-4">

              {/* Identity Verification Sub-Module */}
              <div className="flex w-full pt-4 pl-4 flex-col gap-1">
                <div className="flex w-full flex-row items-center justify-between gap-2">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Identity</h3>
                  {isIdentityVerified ? (
                    <div className="flex items-center gap-2 text-lg mr-4">
                      <CheckCircle className="size-5 text-green-500" />
                      <span>Verified</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-lg mr-4">
                      <CircleX className="size-5 text-gray-500" />
                      <span className="text-gray-500">Not verified</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isIdentityVerified ? "Your identity has been verified." : "Your identity has not been verified."}
                </p>
              </div>
                
              {/* Phone Verification Sub-Module */}
              <div className="flex w-full pl-4 flex-col gap-2">
                <div className="flex flex-row items-center justify-between gap-2 pr-4">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Phone number</h3>
                  <div className="flex items-center justify-between border border-green-500 rounded-2xl gap-1 px-1 text-lg">
                    <CheckCircle className="size-5 text-green-500" />
                    <span className="text-green-500">Verified</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {profile?.phone_number}
                </p>
              </div>
                
              {/* Email Verification Sub-Module */}
              <div className="flex w-full pl-4 pb-4 flex-col gap-2 pr-4">
                <div className="flex flex-row items-center justify-between gap-2">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      Email
                  </h3>
                  <div className="flex items-center justify-between border border-green-500 rounded-2xl gap-1 px-1 text-lg">
                        <CheckCircle className="size-5 text-green-500" />
                        <span className="text-green-500">Verified</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {profile?.email}
                </p>
              </div>

          </div>
        </div>

        {/* Recent Bookings Section */}
        <div className="hidden lg:flex flex-col w-full items-start gap-4">
          <RecentBooking recentBookings={recentBooking} />
        </div>
    </main>
  )
}

export default TenantProfileOverview
