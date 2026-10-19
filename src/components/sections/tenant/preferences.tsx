"use client"

import Image from "next/image"
import React from "react"
import { InputTags } from "@/components/base/input/input-tags"
import { MapPinned } from "lucide-react"
import { Field } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

const MIN_BUDGET = 5_000
const MAX_BUDGET = 100_000
const budgetOptions = [15_000, 25_000, 35_000, 45_000, 55_000, 65_000, 75_000, 85_000, 95_000, 100_000]
const formatKsh = (amount: number) => `Ksh ${amount.toLocaleString("en-KE")}`

export default function Preferences() {
  const [alignItemWithTrigger] = React.useState(true)

  // Keep the lower thumb at zero, but display that endpoint as Ksh 5,000.
  // The upper thumb controls the maximum budget.
  const [value, setValue] = React.useState<number[]>([0, 15_000])
  const selectedMaximum = value[1] ?? 15_000

  const setMaximumBudget = (rawValue: string) => {
    const nextMaximum = Number(rawValue)
    if (!Number.isFinite(nextMaximum)) return
    setValue([0, Math.min(MAX_BUDGET, Math.max(15_000, nextMaximum))])
  }

  const handleSliderChange = (nextValue: number[]) => {
    // Snap the upper thumb to one of the values available in the Select.
    const requestedMaximum = nextValue[1] ?? selectedMaximum
    const nearestOption = budgetOptions.reduce((closest, option) =>
      Math.abs(option - requestedMaximum) < Math.abs(closest - requestedMaximum)
        ? option
        : closest
    )
    setValue([0, nearestOption])
  }

  return (
    <div className="mt-0 flex h-full w-full flex-col justify-center">
      <h2 className="text-xl font-bold">Preferences</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Tell us what you are looking for so we can show you the best options.
      </p>

      <div className="mt-4 flex w-full items-center gap-4">
        <div className="flex w-1/2 flex-col gap-2">
          <div className="flex w-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-150 dark:border-slate-800 dark:bg-slate-950 sm:p-5">
            <div className="flex w-full flex-row items-start gap-3.5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900">
                <MapPinned size={22} className="text-slate-700 dark:text-slate-300" />
              </div>
              <div className="flex min-w-0 flex-col justify-center pt-0.5">
                <h2 className="text-base font-semibold leading-tight tracking-tight text-slate-900 dark:text-white">
                  User Preferences
                </h2>
                <p className="mt-1 text-xs leading-normal text-slate-500 dark:text-slate-400 sm:text-sm">
                  Select your preferred locations (You can choose multiple).
                </p>
              </div>
            </div>
            <div className="mt-4 w-full">
              <InputTags
                tooltip="Add a location."
                placeholder="Type and press Enter"
                className="w-full !focus:ring-2 !focus:ring:[var(--color-input-border)] !focus-within:ring-2 !focus-within:ring:[var(--color-input-border)] !focus:border-transparent !focus-within:border-transparent"
              />
            </div>
          </div>

          <div className="flex w-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-150 dark:border-slate-800 dark:bg-slate-950 sm:p-5">
            <div className="flex flex-row items-start gap-3.5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900">
                <Image 
                  src="/images/budget-icon.png" 
                  alt="Budget Icon" 
                  width={22} 
                  height={22} 
                />
              </div>
              <div className="flex min-w-0 flex-col justify-center pt-0.5">
                <h2 className="text-base font-semibold leading-tight tracking-tight text-slate-900 dark:text-white">
                  Budget Range
                </h2>
                <p className="mt-1 text-xs leading-normal text-slate-500 dark:text-slate-400 sm:text-sm">
                  You can set your budget range for the properties you are looking for.
                </p>
              </div>
            </div>

            <div className="mt-4 w-full">
              <Field className="w-full">
                <Select value={String(selectedMaximum)} onValueChange={setMaximumBudget}>
                  <SelectTrigger aria-label="Maximum budget">
                    <SelectValue placeholder="Select a budget range" />
                  </SelectTrigger>
                  <SelectContent align={alignItemWithTrigger ? "start" : "end"}>
                    <SelectGroup>
                      {budgetOptions.map((amount) => (
                        <SelectItem key={amount} value={String(amount)}>
                          {`${formatKsh(MIN_BUDGET)} - ${formatKsh(amount)}`}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <div className="mt-6 w-full">
              <Slider
                value={value}
                onValueChange={handleSliderChange}
                min={0}
                max={MAX_BUDGET}
                step={1_000}
                minStepsBetweenThumbs={1}
                aria-label="Budget range"
                className="mx-auto w-full [&_[data-slot=slider-track]]:dark:bg-white/30 [&_[data-slot=slider-range]]:dark:bg-white"
              />
              <div className="mt-2 flex items-center justify-between gap-2">
                <Label>5K</Label>
                <Label>100K</Label>
              </div>
            </div>
          </div>
        </div>


        {/* Right side of the preferences section */}
        <div className="flex w-1/2 flex-col gap-2">
          <div className="flex w-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-150 dark:border-slate-800 dark:bg-slate-950 sm:p-5">
            <div className="flex w-full flex-row items-start gap-3.5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900">
                <Image 
                  src="/images/billboard-house-icon.png" 
                  alt="Budget Icon" 
                  width={22} 
                  height={22} 
                />
              </div>
              <div className="flex min-w-0 flex-col justify-center pt-0.5">
                <h2 className="text-base font-semibold leading-tight tracking-tight text-slate-900 dark:text-white">
                  Property Types
                </h2>
                <p className="mt-1 text-xs leading-normal text-slate-500 dark:text-slate-400 sm:text-sm">
                  Choose the types of properties you are interested in.
                </p>
              </div>
            </div>
            <div className="flex flex-col mt-4 ml-4 w-full gap-2">
              <div className="gap-2 inline-flex items-center">
                <Checkbox id="terms" className="size-6" />
                <p className="text-md text-gray-500 dark:text-gray-100">
                  Apartment
                </p>
              </div>
              <div className="gap-2 inline-flex items-center">
                <Checkbox id="terms" className="size-6" />
                <p className="text-md text-gray-500 dark:text-gray-100">
                  House
                </p>
              </div>
              <div className="gap-2 inline-flex items-center">
                <Checkbox id="terms" className="size-6" />
                <p className="text-md text-gray-500 dark:text-gray-100">
                  Studio
                </p>
              </div>
              <div className="gap-2 inline-flex items-center">
                <Checkbox id="terms" className="size-6" />
                <p className="text-md text-gray-500 dark:text-gray-100">
                  Bedsitter
                </p>
              </div>
              <div className="gap-2 inline-flex items-center">
                <Checkbox id="terms" className="size-6" />
                <p className="text-md text-gray-500 dark:text-gray-100">
                  Hostel
                </p>
              </div>
              <div className="gap-2 inline-flex items-center">
                <Checkbox id="terms" className="size-6" />
                <p className="text-md text-gray-500 dark:text-gray-100">
                  AirBnB/ Short stay
                </p>
              </div>
              <div className="gap-2 inline-flex items-center">
                <Checkbox id="terms" className="size-6" />
                <p className="text-md text-gray-500 dark:text-gray-100">
                  Office/ Commercial
                </p>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-150 dark:border-slate-800 dark:bg-slate-950 sm:p-5">
            <div className="flex flex-row items-start gap-3.5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900">
                <Image src="/images/budget-range-icon.png" alt="Budget Icon" width={22} height={22} />
              </div>
              <div className="flex min-w-0 flex-col justify-center pt-0.5">
                <h2 className="text-base font-semibold leading-tight tracking-tight text-slate-900 dark:text-white">
                  Budget Range
                </h2>
                <p className="mt-1 text-xs leading-normal text-slate-500 dark:text-slate-400 sm:text-sm">
                  You can set your budget range for the properties you are looking for.
                </p>
              </div>
            </div>

            <div className="mt-4 w-full">
              <Field className="w-full">
                <Select value={String(selectedMaximum)} onValueChange={setMaximumBudget}>
                  <SelectTrigger aria-label="Maximum budget">
                    <SelectValue placeholder="Select a budget range" />
                  </SelectTrigger>
                  <SelectContent align={alignItemWithTrigger ? "start" : "end"}>
                    <SelectGroup>
                      {budgetOptions.map((amount) => (
                        <SelectItem key={amount} value={String(amount)}>
                          {`${formatKsh(MIN_BUDGET)} - ${formatKsh(amount)}`}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <div className="mt-6 w-full">
              <Slider
                value={value}
                onValueChange={handleSliderChange}
                min={0}
                max={MAX_BUDGET}
                step={1_000}
                minStepsBetweenThumbs={1}
                aria-label="Budget range"
                className="mx-auto w-full [&_[data-slot=slider-track]]:dark:bg-white/30 [&_[data-slot=slider-range]]:dark:bg-white"
              />
              <div className="mt-2 flex items-center justify-between gap-2">
                <Label>5K</Label>
                <Label>100K</Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
