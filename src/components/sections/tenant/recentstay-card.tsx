import Image from 'next/image';
import { Badge } from "@/components/ui/badge"

export type RecentStayStatus = "Completed" | "Canceled" | "Pending";

interface RecentStay {
    id: string;
    propertyName: string;
    location: string;
    image: string;
    stayDate: string;
    price: string;
    status: RecentStayStatus; 
}

interface RecentStayCardProps {
    stay: RecentStay;
}

const RecentStayCard = ({stay}: RecentStayCardProps) => {
    const statusStyles = {
        Completed:
            "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
        Canceled:
            "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
        Pending:
            "bg-orange-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400",
    };

  return (
    <div className="flex min-w-[360px] overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
        <Image
            src={stay.image}
            alt={stay.propertyName}
            width={150}
            height={150}
            className="h-31 w-31 object-cover rounded-lg mt-3 ml-2 lg:h-36 lg:w-36"
        />

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 p-4">
            <h3 className="truncate text-md lg:text-lg font-semibold text-slate-900 dark:text-white">
                {stay.propertyName}
            </h3>

            <p className="truncate text-xs lg:text-sm text-slate-500 dark:text-slate-400">
                {stay.location}
            </p>

            <p className="text-sm lg:text-md font-medium text-slate-700 dark:text-slate-300">
                {stay.stayDate}
            </p>

            <p className="text-sm lg:text-lg font-bold text-slate-900 dark:text-white">
                {stay.price}
            </p>

            <Badge
                className={`shrink-0 border-0 text-xs ${statusStyles[stay.status]}`}
            >
                {stay.status}
            </Badge>
        </div>
    </div>
  )
}

export default RecentStayCard
