import { BackButton } from "@/components/reusable/back-button";
import ListingDetails from "@/components/sections/tenant/listing-details";
import ListingGallery from "@/components/sections/tenant/listing-gallery";
import ListingHeader from "@/components/sections/tenant/listing-header";

interface ListingDetailsPageProps {
    params: Promise<{ id: string }>;
}

export default async function ListingDetailsPage({ params }: ListingDetailsPageProps) {
    const { id } = await params;

    
    return (
        <main className="flex flex-col w-full h-full py-2 px-2 mt-0">
            <BackButton 
                href="/tenant/browse-listings" 
                label="Back to Listings" 
                className="h-12 w-42 shrink-0 gap-2 mt-2
                  border border-slate-200 bg-white
                  text-sm text-slate-900
                  hover:bg-slate-200 hover:text-slate-900
                  dark:border-slate-700 dark:bg-secondary
                  dark:text-secondary-foreground
                  dark:hover:bg-slate-800 dark:hover:text-white"
            />

            {/* Listing images */}
            <div className="mt-4">
                <ListingGallery
                    verified
                    featured 
                    images={[
                        { imageUrl: "/images/listing1.jpg" },
                        { imageUrl: "/images/listing2.jpg" },
                        { imageUrl: "/images/listing3.jpg" },
                        { imageUrl: "/images/listing4.jpg" },
                        { imageUrl: "/images/listing5.jpg" },
                        { imageUrl: "/images/listing6.jpg" },
                        { imageUrl: "/images/listing7.jpg" },
                    ]} 
                />
            </div>

            {/* Listing Header */}
            <ListingHeader
                id={id}
                title="Modern Apartment in the City Center"
                location="Toronto, Canada"
                price={5000}
                pricePeriod="month"
                rating={4.8}
                reviewCount={120}
            />

            {/* Listing Details */}
            <ListingDetails
                propertyName={["Modern Apartment in the City Center"]}
                amenities={[
                    "Wi-Fi",
                    "Parking",
                    "Gym",
                    "Pool",
                    "Pet Friendly"
                ]}
            />

        </main>
    )
}