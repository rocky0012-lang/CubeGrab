import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { 
    MapPin,
    BedDouble,
    Star,
    BadgeCheck, 
    Heart,
} from "lucide-react"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ListingCardProps {
  id: string;
  imageUrl: string;
  title: string;
  location: string;
  price: string;
  PricePeriod?: string;
  beds: number;
  rating: number;
  reviewCount: number;
  propertyType: string;
  verified?: boolean;
}

export default function ListingCard({ id, imageUrl, title, location, price, PricePeriod, beds, rating, reviewCount, propertyType, verified }: ListingCardProps) {
  return (
    <div className="relative w-full">
      <Link 
        href={`/tenant/listing/${id}`}
        className="block w-full"
        aria-label={`View details for ${title}`}
      >
      <Card className="relative w-full max-w-sm overflow-hidden pt-0">
        {/* <Card className="relative w-full overflow-hidden pt-0"> */}
        {/* Listing Image */}
        <div className="relative aspect-video w-full overflow-hidden">
          {/* Image Overlay */}
          <div className="absolute inset-0 z-10 bg-black/15" />

          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 20vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
          />

          {/* Verified Badge */}
          {verified && (
            <Badge
              variant="secondary"
              className="
                absolute bottom-3 left-3 z-20
                lg:h-8 h-5
                lg:gap-1.5
                lg:px-2.5
                lg:text-sm text-xs
                lg:font-medium font-normal
                text-slate-900
                backdrop-blur-sm
                bg-green-500
                dark:bg-green-900
                dark:text-white
              "
            >
              <BadgeCheck
                className="
                  h-6 w-6
                  shrink-0
                  text-emerald-600
                  dark:text-emerald-400
                "
              />

              Verified
            </Badge>
          )}
        </div>

        <CardHeader className="lg:space-y-3 space-y-0">
          {/* Title */}
          <CardTitle className="lg:text-lg truncate text-md font-semibold">
            {title}
          </CardTitle>

          {/* Location */}
          <CardDescription className="flex items-center gap-1 lg:text-sm text-xs text-gray-600 dark:text-gray-400">
            <MapPin className="size-3 shrink-0" />

            <span>
              {location}
            </span>
          </CardDescription>

          {/* Price */}
          <div className="flex flex-col items-start">
            <span className="lg:text-lg text-md font-semibold text-gray-900 dark:text-[var(--color-text-accent)]">
              {price}
              {PricePeriod && (
                <span className="ml-1 lg:text-sm text-xs font-normal text-gray-500 dark:text-gray-400">
                  / {PricePeriod}
                </span>
              )}
            </span>

            {/* Beds */}
            <Badge
              className="
                mt-2 flex lg:h-8 h-6 flex-row gap-2
                bg-slate-100 text-sm text-slate-900
                hover:bg-blue-100 hover:text-slate-900
                dark:border-slate-700
                dark:bg-secondary
                dark:text-secondary-foreground
                dark:hover:bg-slate-800
                dark:hover:text-white
              "
            >
              <BedDouble className="size-5" />
              <span>
                {beds} {beds === 1 ? "Bed" : "Beds"}
              </span>
            </Badge>

            {/* Rating + Property Type */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="lg:size-4 size-3 fill-yellow-500 text-yellow-500" />

                <span className="lg:text-sm text-xs text-gray-600 dark:text-gray-400">
                  {rating} ({reviewCount} reviews)
                </span>
              </div>

              <span className="text-sm text-gray-400">
                •
              </span>

              <span className="text-sm text-gray-600 dark:text-gray-400">
                {propertyType}
              </span>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>

    {/* Favorite Button */}
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          aria-label={`Save ${title} to favorites`}
          className="
            absolute right-3 top-3 z-20
            flex lg:size-9 size-5
            items-center justify-center
            rounded-full
            lg:border border-white/30
            text-white
            backdrop-blur-sm
            transition-all duration-200
            hover:bg-white/90
            hover:text-yellow-500
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-[var(--color-accent-gold)]
            focus-visible:ring-offset-2
            focus-visible:ring-offset-transparent
          "
        >
          <Heart className="lg:size-5 size-5" />
        </button>
    </div>
  )
}
