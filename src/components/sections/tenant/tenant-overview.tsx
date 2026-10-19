"use client"

import { useProfileContext } from "@/providers/profile-provider";
import TenantOverviewCard from './tenant-overviewcard';
import { Separator } from "@/components/ui/separator"
import QuickActionsCard from "@/components/sections/tenant/tenant-quickactionscard";
import UpcomingStay from "./upcomingstay";

import { 
  Bookmark,
  Heart, 
  SearchSlashIcon, 
  MessageCircleMore,
} from "lucide-react";
import RecentStays from "./recentstays";
import {Line, LineChart } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 514 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#10b981",
  },
} satisfies ChartConfig

type RecentStayStatus = "Completed" | "Canceled" | "Pending";

type RecentStay = {
  id: string;
  propertyName: string;
  location: string;
  image: string;
  stayDate: string;
  price: string;
  status: RecentStayStatus;
};

const recentStays: RecentStay[] = [
  {
    id: "1",
    propertyName: "Modern 2 Bedroom Apartment",
    location: "Kilimani, Nairobi",
    image: "/images/apartmentcover.jpg",
    stayDate: "10-12 May 2026",
    price: "KSH 18,000",
    status: "Completed", // Optional status field
  },
  {
    id: "2",
    propertyName: "Cozy Studio in the Heart of the City",
    location: "Westlands, Nairobi",
    image: "/images/apartmentcover.jpg",
    stayDate: "15-18 June 2026",
    price: "$320",
    status: "Canceled",
  },
  {
    id: "3",
    propertyName: "Luxury Villa with Private Pool",
    location: "Karen, Nairobi",
    image: "/images/apartmentcover.jpg",
    stayDate: "20-25 July 2026",
    price: "KSH 12,500",
    status: "Pending",
  },
  {
  id: "4",
  propertyName: "Luxury Studio",
  location: "Lavington, Nairobi",
  image: "/images/apartmentcover.jpg",
  stayDate: "15-18 February 2026",
  price: "KSH 15,000",
  status: "Completed",
  },
];


const TenantOverview = () => {
  const { profile } = useProfileContext();
  return (
    <main className="mt-0 flex h-full w-full flex-col gap-4 px-3 py-3 sm:px-4 sm:py-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl hidden lg:flex font-semibold text-gray-900 dark:text-white">Welcome back, {profile?.full_name}</h1>
        <h1 className="text-xl lg:hidden sm:flex font-semibold text-gray-900 dark:text-white">Hi, {profile?.full_name}</h1>
        <p className="text-gray-700 hidden lg:flex dark:text-gray-300 text-md">
           Here&apos;s what&apos;s happening with your stays and activity.
        </p>
        <p className="text-gray-700 lg:hidden sm:flex dark:text-gray-300 text-sm sm:text-base">
           Here&apos;s your activity overview.
        </p>
      </div>

      <div className="hidden lg:grid w-full grid-cols-4 gap-2 lg:gap-4">
        <TenantOverviewCard
          title="Total Bookings"
          data={2}
          description="Total bookings you've made"
        />

        <TenantOverviewCard
          title="Upcoming Stays"
          data={1}
          description="Your upcoming stays"
        />

        <TenantOverviewCard
          title="Completed Stays"
          data={4}
          description="Your completed stays"
        />

        <div className="hidden lg:flex w-full flex-row items-center justify-between gap-6 rounded-lg border border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800 shadow-sm">
          {/* 💡 Left Container Half: Forces the internal Overview Card to drop all borders and shadows */}
          <div className="w-1/2 min-w-0 [&_div]:border-none [&_div]:shadow-none [&_div]:bg-transparent [&_div]:dark:bg-transparent [&_div]:p-0">
            <TenantOverviewCard
              title="Total spent"
              data={`$${5000}`}
              description="Total amount spent on bookings"
            />
          </div>

          {/* 📊 Right Container Half: Holds your Chart opposite the text content */}
          <div className="flex h-[90px] w-1/2 min-w-0 items-center justify-center">
            <ChartContainer config={chartConfig} className="h-[90px] min-h-[90px] w-full min-w-0 aspect-auto">
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  top: 8,
                  left: 12,
                  right: 12,
                  bottom: 8
                }}
              >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="desktop"
                type="natural"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
            </ChartContainer>
          </div>
        </div>
      </div>

      <div className="grid lg:hidden w-full grid-cols-3 gap-2 lg:gap-4">
        <TenantOverviewCard
          title="Active"
          data={2}
          description="Total bookings you've made"
          shortDescription="Total active bookings"
        />

        <TenantOverviewCard
          title="Upcoming"
          data={1}
          description="Your upcoming stays"
          shortDescription="Upcoming stays"
        />

        <TenantOverviewCard
          title="Completed"
          data={4}
          description="Your completed stays"
          shortDescription="Completed stays"
        />
      </div>

      <div className="lg:hidden flex w-full flex-row items-center justify-between gap-4 rounded-lg border border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800 shadow-sm mt-3">
        {/* 💡 Left Container Half: Forces the internal Overview Card to drop all borders and shadows */}
        <div className="w-1/2 [&_div]:border-none [&_div]:shadow-none [&_div]:bg-transparent [&_div]:dark:bg-transparent [&_div]:p-0">
          <TenantOverviewCard
            title="Total spent"
            data={`$${5000}`}
            description="Total amount spent on bookings"
            shortDescription="Amount spent on bookings"
          />
        </div>
        {/* 📊 Right Container Half: Holds your Chart opposite the text content */}
        <div className="flex h-[90px] w-1/2 min-w-0 items-center justify-center">
          <ChartContainer config={chartConfig} className="h-[90px] min-h-[90px] w-full min-w-0 aspect-auto">
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 8,
                left: 12,
                right: 12,
                bottom: 8
              }}
            >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="desktop"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
          </ChartContainer>
        </div>
      </div>

      <UpcomingStay upcomingStay={null} />
      {/* <UpcomingStay upcomingStay={true} or <UpcomingStay upcomingStay={null} /> /> */}
      {/* upcomingStay comes from Supabase or your backend logic to determine if the user has an upcoming stay. */}
      {/* Later:

      <UpcomingStay hasUpcomingStay={!!upcomingStay} />

      And eventually we'll replace the boolean with the actual booking object:

      <UpcomingStay upcomingStay={upcomingStay} />
      */}

      <Separator className="mt-2 hidden lg:flex" />

      <RecentStays recentStays={recentStays} />
        {/* recentStays comes from Supabase or your backend logic to fetch the user's recent stays.
        Later:
          <RecentStays recentStays={[]} />
        */}
      

      <Separator className="mt-2" />

      {/* Quick Actions */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Quickly access the things you use most.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <QuickActionsCard
            title="Find a Property"
            href="/tenant/browse-listings"
            icon={SearchSlashIcon}
            iconContainerClassName="bg-blue-100 shadow-[0_0_15px_rgba(59,130,246,0.35)] dark:bg-blue-500/10"
            iconClassName="text-blue-600 dark:text-blue-400"
          />

          <QuickActionsCard
            title="My Bookings"
            href="/tenant/my-bookings"
            icon={Bookmark}
            iconContainerClassName="bg-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.35)] dark:bg-emerald-500/10"
            iconClassName="text-emerald-600 dark:text-emerald-400"
          />

          <QuickActionsCard
            title="Saved Properties"
            href="/tenant/saved-listings"
            icon={Heart}
            iconContainerClassName="bg-rose-100 shadow-[0_0_15px_rgba(244,63,94,0.35)] dark:bg-rose-500/10"
            iconClassName="text-rose-600 dark:text-rose-400"
          />

          <QuickActionsCard
            title="Messages"
            href="/tenant/messages"
            icon={MessageCircleMore}
            iconContainerClassName="bg-purple-100 shadow-[0_0_15px_rgba(168,85,247,0.35)] dark:bg-purple-500/10"
            iconClassName="text-purple-600 dark:text-purple-400"
          />
        </div>
      </section>
    </main>
  )
}

export default TenantOverview
