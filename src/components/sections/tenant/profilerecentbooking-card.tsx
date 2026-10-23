import Image from 'next/image';
import { Badge } from "@/components/ui/badge"

export type RecentBookingStatus = "Completed" | "Canceled" | "Pending";

interface RecentBooking {
    id: string;
    propertyName: string;
    location: string;
    image: string;
    stayDate: string;
    price: string;
    status: RecentBookingStatus; 
    guest: number;
}

interface RecentBookingCardProps {
    booking: RecentBooking;
}

const ProfileRecentBookingCard = ({booking}: RecentBookingCardProps) => {
    const statusStyles = {
        Completed:
            "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
        Canceled:
            "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
        Pending:
            "bg-orange-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400",
    };

  return (
    <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50">

            {/* Property */}
            <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                    <Image
                        src={booking.image}
                        alt={booking.propertyName}
                        width={64}
                        height={64}
                        className="size-16 shrink-0 rounded-lg object-cover"
                    />

                    <p className="max-w-[200px] truncate text-sm font-semibold text-slate-900 dark:text-white">
                        {booking.propertyName}
                    </p>
                </div>
            </td>

            {/* Location */}
            <td className="px-4 py-3">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    {booking.location}
                </p>
            </td>

            {/* Stay Date */}
            <td className="px-4 py-3">
                <p className="whitespace-nowrap text-sm font-medium text-slate-700 dark:text-slate-300">
                    {booking.stayDate}
                </p>
            </td>

            {/* Status */}
            <td className="px-4 py-3">
                <Badge
                    className={`shrink-0 border-0 text-xs ${
                        statusStyles[booking.status]
                    }`}
                >
                    {booking.status}
                </Badge>
            </td>

            {/* Price */}
            <td className="px-4 py-3">
                <p className="whitespace-nowrap text-right text-sm font-bold text-slate-900 dark:text-white">
                    {booking.price}
                </p>
            </td>

            {/* Guests */}
            <td className="px-4 py-3">
                <p className="whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">
                    {booking.guest} guests
                </p>
            </td>

        </tr>
  )
}

export default ProfileRecentBookingCard
