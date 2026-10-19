import { Badge } from "@/components/base/badges/badges";
import Image from "next/image";
import { 
  BadgeCheck, 
  Sparkles
} from "lucide-react";

interface ListingGalleryProps {
  featured?: boolean;
  verified?: boolean;
  images: {
    imageUrl: string;
  }[];
}

export default function ListingGallery({
  featured,
  verified,
  images,
}: ListingGalleryProps) {
  const coverImage = images[0];
  const secondImage = images[1];
  const extraImages = images.slice(2);

  return (
    <div className="w-full">
      <div className="flex h-[550px] w-full gap-2 overflow-hidden rounded-xl">

        {/* COVER IMAGE — 75% */}
        <div className="relative w-3/4 overflow-hidden rounded-xl">

          <Image
            src={coverImage.imageUrl}
            alt="Listing cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 75vw"
            priority
            className="object-cover transition-transform duration-300 hover:scale-105"
          />

          {/* Listing Badges */}
          <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2">

            {/* Verified Badge */}
            {verified && (
              <Badge
                className="
                  h-8
                  gap-1.5
                  bg-white/90
                  px-2.5
                  text-sm
                  font-medium
                  text-slate-900
                  backdrop-blur-sm
                  dark:bg-green-600
                  dark:text-white
                "
              >
                <BadgeCheck
                  className="
                    h-5 w-5
                    shrink-0
                    text-emerald-600
                    dark:text-white
                  "
                />
                Verified
              </Badge>
            )}

            {/* Featured Badge */}
            {featured && (
              <Badge
                className="
                  h-8
                  gap-1.5
                  border-none
                  bg-blue-600
                  px-2.5
                  text-sm
                  font-medium
                  text-white
                  shadow-sm
                  hover:bg-blue-600
                "
              >
                <Sparkles className="h-5 w-5 shrink-0 text-white" />
                Featured
              </Badge>
            )}
          </div>

        </div>

        {/* RIGHT SIDE — 25% */}
        <div className="flex w-1/4 flex-col gap-2">

          {/* SECOND IMAGE */}
          <div className="relative flex-1 overflow-hidden rounded-xl">
            <Image
              src={secondImage.imageUrl}
              alt="Listing image"
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* FOUR SMALL IMAGES */}
          <div className="grid flex-1 grid-cols-2 gap-2">

            {extraImages.slice(0, 4).map((image, index) => {
              const isLastVisibleImage =
                index === 3 && extraImages.length > 4;

              return (
                <div
                  key={`${image.imageUrl}-${index}`}
                  className="relative overflow-hidden rounded-xl"
                >
                  <Image
                    src={image.imageUrl}
                    alt={`Listing image ${index + 3}`}
                    fill
                    className="object-cover"
                  />

                  {isLastVisibleImage && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                      <span className="text-xl font-semibold text-white">
                        +{extraImages.length - 3}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </div>
  );
}