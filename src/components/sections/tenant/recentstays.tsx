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
import RecentStayCard from './recentstay-card';

interface RecentStay {
  id: string;
  propertyName: string;
  location: string;
  image: string;
  stayDate: string;
  price: string;
  status: "Completed" | "Canceled" | "Pending";
}

interface RecentStayProps {
    recentStays: RecentStay[];
}

const RecentStays = ({ recentStays }: RecentStayProps) => {
  return (
    <div className="flex flex-col">
        {/* Section Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Recent Stays
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Your recently completed and previous stays.
          </p>
        </div>

        {recentStays.length > 0 && (
          <Button variant="ghost" className="w-fit">
            View All
          </Button>
        )}
      </div>

        {/* Empty State */}
      {recentStays.length === 0 ? (
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
        /* Recent Stays */
        <div className="recent-stays-scroll flex w-full gap-3 lg:gap-4 overflow-x-auto pb-3 scroll-smooth">
          {recentStays.map((stay) => (
            <div
              key={stay.id}
               className="w-full shrink-0 md:w-[calc((100%-0.75rem)/2)] lg:w-[calc((100%-2rem)/3)]"
            >
              <RecentStayCard stay={stay} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentStays
