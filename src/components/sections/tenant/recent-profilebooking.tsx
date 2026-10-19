import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import ProfileRecentBookingCard from './profilerecentbooking-card';

interface RecentBooking {
    id: string;
    propertyName: string;
    location: string;
    image: string;
    stayDate: string;
    price: string;
    status: "Completed" | "Canceled" | "Pending";
    guest: number;
}

interface RecentBookingProps {
    recentBookings: RecentBooking[];
}

const RecentBooking = ({ recentBookings }: RecentBookingProps) => {
  return (
    <div className="flex w-full items-start justify-between flex-col">
        {/* Section Header */}
      <div className="mb-4 flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Recent Bookings
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Your recently completed and previous bookings.
          </p>
        </div>

        {recentBookings.length > 0 && (
          <Button variant="ghost" className="w-fit">
            View All
          </Button>
        )}
      </div>

        {/* Empty State */}
      {recentBookings.length === 0 ? (
        <Empty className="min-h-72 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CalendarDays />
            </EmptyMedia>

            <EmptyTitle>No Recent Stays</EmptyTitle>

            <EmptyDescription>
              You haven&apos;t completed any stays yet. Once you book and complete
              a stay, it will appear here.
            </EmptyDescription>
          </EmptyHeader>

          <EmptyContent>
            {/*<Button
              className="bg-[var(--color-accent-gold)] font-medium hover:bg-[var(--color-accent-gold-dark)]"
            >
              Find a Property
            </Button>* */}
          </EmptyContent>
        </Empty>
      ) : (
        /* Recent Bookings */
        <div className="w-full overflow-x-auto rounded-xl border">
          <table className="w-full min-w-[800px]">
              <thead className="border-b bg-slate-50 dark:bg-slate-900">
                  <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                          Property
                      </th>
            
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                          Location
                      </th>
            
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                          Stay Date
                      </th>
            
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                          Status
                      </th>
            
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                          Price
                      </th>
            
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                          Guests
                      </th>
                  </tr>
              </thead>
            
              <tbody className="divide-y">
                  {recentBookings.map((stay) => (
                      <ProfileRecentBookingCard
                          key={stay.id}
                          booking={stay}
                      />
                  ))}
              </tbody>
          </table>
      </div>
      )}
    </div>
  );
};

export default RecentBooking
