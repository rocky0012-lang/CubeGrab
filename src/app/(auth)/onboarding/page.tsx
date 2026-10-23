"use client"

import React, { useState } from "react";
import Image from "next/image";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import PhoneInput, { isPossiblePhoneNumber, parsePhoneNumber } from 'react-phone-number-input'
import "react-phone-number-input/style.css";
import { getData } from 'country-list'
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useForm, Controller } from "react-hook-form";
import { useProfileContext } from "@/providers/profile-provider";
import { useProfileStore } from "@/hooks/use-profile";
import { getPhoneCountry } from "@/lib/phone-country";
import { 
  Mail, 
  UserRound, 
} from "lucide-react"
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"

const onboardingSignupSchema = z.object({
  full_name: z.string().min(1, "Full name is required."),
  phoneNumber: z.string()
    .min(1, "Phone number is required.")
    .refine((value) => isPossiblePhoneNumber(value || ''), {
      message: "Please enter a valid phone number.",
    }),
  country: z.object({
    code: z.string().length(2, "Invalid ISO country code"),
    name: z.string().min(1, "Country is required."),
  }),
})

type OnboardingSignupValues = z.infer<typeof onboardingSignupSchema>

const OnboardingPage = () => {

    const [formError, setFormError] = React.useState<string | null>(null)
      const { profile } = useProfileContext();
      //create a supabase client
      const supabase = createClient()
      // Password UI Toggles
      //const user_role = "tenant" // Hidden field value
      const router = useRouter()
      const countryList = getData();

      const {
        register,
        handleSubmit,
        setValue,
        control,
        watch,
        reset,
        formState: { errors, isSubmitting },
      } = useForm<OnboardingSignupValues>({
        resolver: zodResolver(onboardingSignupSchema),
        defaultValues: {
          full_name: "",
          phoneNumber: "",
          country: {code: "", name: ""},
        },
      })

      const handlePhoneChange = (value: string | undefined) => {
        setValue('phoneNumber', value ?? "", { shouldValidate: true, });

        const country = getPhoneCountry(value, countryList);
          // Clear out fields if phone input is emptied out completely
          setValue('country.code', "", { shouldValidate: true, });
          setValue('country.name', "", { shouldValidate: true, });
        };

      useEffect(() => {
      if (!profile) return
      reset({
          full_name: profile.full_name ?? "",
          phoneNumber: profile.phone_number ?? "",
          country: {
              code: profile.country_code ?? "",
              name: profile.country_name ?? "",
          },
        });
      }, [profile, reset])
      
      
      async function onSubmit(data: OnboardingSignupValues) {
        setFormError(null);

        if (!profile) {
            setFormError("Unable to load your profile. Please try again.");
            return;
        }
      
        try {
          // 🚀 Execute the update query inside the try block
            const { data: updatedUser, error } = await supabase
                .from("users")
                .update({
                    full_name: data.full_name,
                    phone_number: data.phoneNumber,
                    country_code: data.country.code,
                    country_name: data.country.name,
                })
                .eq("id", profile.id)
                .select("user_role")
                .single();
              
            if (error) {
                console.error("Failed to update profile:", error);

                // 🚨 Display the error message to the user
                if (error.code === "23505" || error.message?.includes('users_phone_number_key')) {
                  setFormError("This phone number is already registered to another account. Please use a different phone number or check your details.");
              } else {
                setFormError("Unable to update your profile. Please try again.");
              }
              return;
            }

            if (updatedUser.user_role === "tenant") {
              useProfileStore.getState().fetchProfile(true);
                router.replace("/tenant/dashboard");
            } else if (updatedUser.user_role === "owner") {
              useProfileStore.getState().fetchProfile(true);
                router.replace("/owner/dashboard");
            } else {
              setFormError("Account configuration error: Invalid role detected.");
            }
          
        } catch (err) {
            console.error("Unexpected error:", err);
        
            setFormError(
              err instanceof Error
                ? err.message
                : "An unexpected error occurred."
            );
        }
    }
    return (
        <main className="flex min-h-screen w-full flex-col px-4 py-4 sm:px-6 lg:px-8">

          {/* Background Image Wrapper */}
          <div className="absolute inset-0 -z-10 overflow-hidden select-none pointer-events-none">
            <Image
              src="/images/onboard-bg.jpg" // Replace with your image file path
              alt="Background texture"
              fill
              priority
              className="object-cover object-center opacity-40 dark:opacity-20" // Softens the image for dark/light contrast
            />

            {/* 🌓 THE MAGIC OVERLAY: Lightens in light mode, deepens in dark mode */}
            <div className="absolute inset-0 from-white/60 via-white/80 to-white dark:from-gray-950/60 dark:via-gray-950/80 dark:to-gray-950 backdrop-blur-[2px]" />
          </div>

            {/* Logo */}
            <div className="flex w-full shrink-0 items-start">
                <Image
                    src="/images/onboarding-image.png"
                    alt="CubeGrab"
                    width={150}
                    height={150}
                    className="object-contain"
                />
            </div>

            {/* Main Content */}
            <div className="flex min-h-0 flex-1 w-full flex-row">

                {/* LEFT HALF */}
                <section className=" hidden lg:flex w-1/2 flex-col items-start justify-end px-4 lg:px-10 lg:mb-20 xl:px-16">

                    {/* Main Introduction */}
                    <div className="flex flex-col">

                        <div className="flex flex-col gap-1">
                            <p className="hidden text-gray-700 lg:flex lg:text-5xl lg:font-bold dark:text-gray-300">
                                Let's get you
                            </p>

                            <p className="hidden text-gray-700 lg:flex lg:text-5xl lg:font-bold dark:text-(--color-accent-gold-dark)">
                                set up and ready to go!
                            </p>
                        </div>

                        {/* Description */}
                        <div className="mt-5 flex flex-col gap-1">
                            <p className="hidden text-gray-700 lg:flex lg:text-lg dark:text-gray-300">
                                Complete your information to get started
                            </p>

                            <p className="hidden text-gray-700 lg:flex lg:text-lg dark:text-gray-300">
                                and unlock the best rental experiences
                            </p>

                            <p className="hidden text-gray-700 lg:flex lg:text-lg dark:text-gray-300">
                                on CubeGrab.
                            </p>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="mt-24 flex w-full items-start justify-between gap-6">

                        {/* Verified Listings */}
                        <div className="flex flex-row items-center text-center gap-2">

                            <div className="flex items-center justify-center rounded-full border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-white">
                                <Image
                                    src="/images/onboard-verifiedlisting.png"
                                    alt="Verified listings"
                                    width={40}
                                    height={40}
                                />
                            </div>

                            <div className="mt-3 flex flex-col gap-0">
                                <p className="hidden text-gray-700 lg:flex lg:text-lg lg:font-bold dark:text-gray-300">
                                    Verified listings
                                </p>

                                <span className="hidden text-gray-500 lg:flex lg:text-sm dark:text-gray-400">
                                    Safe and Secure
                                </span>
                            </div>
                        </div>

                        {/* Trusted Community */}
                        <div className="flex flex-row items-center text-center gap-2">

                            <div className="flex items-center justify-center rounded-full border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-white">
                                <Image
                                    src="/images/community-onboard.png"
                                    alt="Trusted community"
                                    width={40}
                                    height={40}
                                />
                            </div>

                            <div className="mt-3 flex flex-col gap-0">
                                <p className="hidden text-gray-700 lg:flex lg:text-lg lg:font-bold dark:text-gray-300">
                                    Trusted community
                                </p>

                                <span className="hidden text-gray-500 lg:flex lg:text-sm dark:text-gray-400">
                                    Connect with trusted users
                                </span>
                            </div>
                        </div>

                        {/* Seamless Booking */}
                        <div className="flex flex-row items-center text-center gap-2">

                            <div className="flex items-center justify-center rounded-full border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-white">
                                <Image
                                    src="/images/booking-onboard.png"
                                    alt="Seamless booking"
                                    width={40}
                                    height={40}
                                />
                            </div>

                            <div className="mt-3 flex flex-col gap-0">
                                <p className="hidden text-gray-700 lg:flex lg:text-lg lg:font-bold dark:text-gray-300">
                                    Seamless booking
                                </p>

                                <span className="hidden text-gray-500 lg:flex lg:text-sm dark:text-gray-400">
                                    Anytime, Anywhere
                                </span>
                            </div>
                        </div>

                    </div>
                </section>

                {/* RIGHT HALF - FORM WILL GO HERE */}
                <section className="flex w-full lg:w-1/2 flex-col items-start bg-gray-300 dark:bg-blue-950 rounded-2xl justify-center px-4 lg:px-10 xl:px-16">
                    <div className="flex w-full flex-col items-start justify-center gap-2">
                        <p className="text-3xl font-semibold text-gray-900 dark:text-white">
                            Personal Information
                        </p>
                        <p className="text-gray-700 text-md font-medium dark:text-gray-300">
                            Your account has been created! Please review and complete your details below.
                        </p>

                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
                        {/* First & Last Name row */}
                        <div className="flex w-full flex-col gap-4">
                          <Field
                              className="w-full"
                              data-invalid={!!errors.full_name}
                          >
                              <FieldLabel className="text-md font-semibold">
                                  Full Name
                              </FieldLabel>
                              <FieldContent>
                                  <div className="relative w-full">
                                      {/* Icon inside input - left side */}
                                      <div className="pointer-events-none rounded-md px-2 py-2 absolute left-1 top-1/2 flex -translate-y-1/2 items-center justify-center">
                                          <UserRound className="size-6 text-gray-700 dark:text-gray-100" />
                                      </div>
                                      <Input
                                          {...register("full_name")}
                                          className="
                                              h-10 w-full
                                              rounded-md
                                              border border-alpha-black
                                              bg-white
                                              py-2 pl-10 pr-3
                                              text-sm
                                              shadow-sm
                                              ring-1
                                              focus:outline-none
                                              focus:ring-2
                                              focus:ring-ring
                                              dark:ring-blue-700
                                              dark:bg-black
                                              dark:border-gray-700
                                              dark:text-white
                                          "
                                      />
                                  </div>
                              </FieldContent>
                              <FieldError>
                                  {errors.full_name?.message}
                              </FieldError>
                          </Field>
                        </div>
                        {/* Email field */}
                        <Field>
                          <FieldLabel className="text-md font-semibold">Email Address</FieldLabel>
                          <FieldContent>
                            <div className="relative w-full">
                              <div className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center justify-center">
                                <Mail className="size-6 text-gray-700 dark:text-gray-100" />
                              </div>
                              <Input
                                type="email"
                                value={profile?.email ?? ""}
                                readOnly
                                className="
                                    h-10 w-full
                                    rounded-md
                                    border 
                                    bg-gray-100
                                    py-2 pl-10 pr-3
                                    text-sm
                                    shadow-sm
                                    ring-1
                                    focus:outline-none
                                    dark:bg-gray-900
                                    dark:border-gray-700
                                    dark:text-gray-300
                                    cursor-default
                                "
                            />
                            </div>
                          </FieldContent>
                        </Field>
                        {/* Combined Country Dropdown & Phone field */}
                          <Field className="flex flex-row w-full" data-invalid={!!errors.phoneNumber}>
                            <div className="flex flex-col">
                            <FieldLabel className="text-md font-semibold text-gray-900 dark:text-white">
                              Phone Number
                            </FieldLabel>
                              
                            <FieldContent>
                              <Controller
                                name="phoneNumber"
                                control={control}
                                render={({ field }) => (
                                  <PhoneInput
                                    international
                                    defaultCountry="KE"
                                    value={field.value} 
                                    onChange={(value) => {
                                      field.onChange(value) 
                                      handlePhoneChange(value) 
                                    }}
                                    className="
                                      custom-phone-input
                                      h-10 w-full
                                      rounded-md
                                      border border-alpha-black
                                      bg-white
                                      px-3 py-2
                                      text-sm
                                      shadow-sm
                                      ring-1
                                      focus-within:ring-2
                                      focus-within:ring-ring
                                      focus-within:border-transparent
                                      dark:ring-blue-700
                                      dark:bg-black
                                      dark:border-gray-700
                                      dark:text-white
                                      transition-all
                                    "
                                  />
                                )}
                              />
                            </FieldContent>
                              
                            {/* Display the real-time custom error string text generated by Zod schema rules parsing templates */}
                            {errors.phoneNumber && (
                              <FieldError className="text-xs text-red-500 font-medium mt-1">
                                {errors.phoneNumber.message}
                              </FieldError>
                            )}
                          </div>
                        </Field>
                              
                        {/* Form Error Output */}
                        {formError && (
                          <p className="text-sm text-red-500 font-medium mt-1">
                             ⚠️ {formError}
                          </p>
                        )}
                        {/* Submit Button */}
                        <Button type="submit" disabled={isSubmitting} className="w-full h-8 bg-[var(--color-accent-gold)] hover:bg-[var(--color-accent-gold-dark)] text-black text-lg font-medium">
                          {isSubmitting ? "Registering..." : "Complete Registration"}
                        </Button>
                      </form>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default OnboardingPage;