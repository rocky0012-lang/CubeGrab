import React from 'react'
import { Badge } from "@/components/ui/badge"
import Image from 'next/image';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
//import { Button } from '@/components/base/buttons/button';
import { Label } from '@/components/base/input/label';
import { Input } from '@/components/base/input/input';
import { AvatarLabelGroup } from '@/components/base/avatar/avatar-label-group';
import { BadgeCheck, CircleCheckBig, MessageCircle, PhoneCall, ShieldCheck } from 'lucide-react';
import { Button } from "@/components/ui/button"

interface ListingamenitiesProps {
  propertyName: string;
  amenities: string[];
}

const ListingDetails = ({ propertyName, amenities }: ListingamenitiesProps) => {
  return (
    <div className="mt-4 w-full">
        <div className="flex w-full gap-2 overflow-hidden rounded-xl">
            <div className="relative w-3/4 overflow-hidden rounded-xl">
                <div className="flex flex-wrap gap-2">
                    {amenities.map((amenity) => (
                        <Badge 
                            key={amenity}
                            className="
                            mt-2 flex h-8 flex-row gap-2
                            bg-blue-100 text-sm text-slate-900
                            hover:text-slate-900
                            dark:border-slate-700
                            dark:bg-secondary
                            dark:text-secondary-foreground
                            dark:hover:bg-slate-800
                            dark:hover:text-white
                            "
                        >
                            <span>{amenity}</span>
                        </Badge>
                    ))}
                </div>

                <div className="flex gap-2 mt-4">
                  <div className="flex flex-col w-3/4 items-start gap-2 pl-2">
                    <div className="flex flex-col gap-2">
                      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        About this property
                      </h1>
                      <h2 className="text-xl font-bold text-slate-700 dark:text-[var(--color-accent-gold)]">
                        {propertyName}
                      </h2>
                      <p className="text-md text-slate-700 dark:text-slate-300">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">

                    </div>
                  </div>
                  <div className="flex flex-col w-1/4 items-start gap-2 pl-2">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Amenities
                    </h1>
                    <div className="flex flex-col gap-3">
                      {amenities.map((amenity) => (
                        <div
                          key={amenity}
                          className="flex items-center gap-2"
                        >
                          <CircleCheckBig className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-500" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
            </div>

            <div className="flex w-1/4 flex-col gap-2">

                {/* Owner card */}
                <Card className="w-full dark:bg-slate-800 rounded-lg">
                  <CardHeader>
                    <CardTitle className='text-2xl'>Contact Owner</CardTitle>
                  </CardHeader>
                    <CardContent>
                      <div className="flex flex-row items-center justify-between gap-2">
                          <AvatarLabelGroup
                              size="lg"
                              src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                              status="online"
                              title="Olivia Rhye"
                              subtitle="Property Owner"
                          />

                          <div className="flex items-center gap-2">
                              <Badge
                                  className="
                                    h-10
                                    gap-2
                                    bg-transparent
                                    px-0
                                    text-lg
                                    font-bold
                                    text-emerald-600
                                    dark:bg-transparent
                                    dark:text-emerald-500
                                  "
                              >
                                  <BadgeCheck
                                    className="
                                      h-9
                                      w-9
                                      shrink-0
                                      text-emerald-600
                                      dark:text-emerald-500
                                    "
                                  />
                                  Verified
                                </Badge>
                          </div>
                      </div>

                        <div className="mt-3 flex flex-col gap-2.5">
                          <Button
                            type="submit"
                            className="h-11 w-full flex-row items-center justify-center bg-[var(--color-accent-gold-dark)] hover:bg-[var(--color-accent-gold-light)] dark:hover:bg-blue-700 dark:bg-blue-600 gap-2"
                          >
                            <MessageCircle className="h-5 w-5" />
                            <span>Send Message</span>
                          </Button>

                          <Button
                            type="button"
                            className="h-11 w-full flex-row items-center justify-center bg-[var(--color-accent-gold-dark)] hover:bg-[var(--color-accent-gold-light)] dark:hover:bg-blue-700 dark:bg-blue-600 gap-2"
                          >
                            <PhoneCall className="h-5 w-5" />
                            <span>Call Owner</span>
                          </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Payment Security Section */}
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10">
                  <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Your payment is secure
                  </h1>
                  <p className="text-sm leading-5 text-slate-600 dark:text-slate-300">
                    All payments are held in escrow until you confirm checkin
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Map Section */}
          <div className="mt-4 flex w-full flex-col gap-2 pl-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Location
            </h1>
            <div className="flex w-full flex-col gap-2">
              <div className="relative h-64 w-full overflow-hidden rounded-xl">
                <Image
                  src="/images/map.png"
                  alt="Map"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
    </div>
  )
}

export default ListingDetails
