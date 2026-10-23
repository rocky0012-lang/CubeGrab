"use client";

import React, { useRef, useState, useEffect, useMemo } from 'react'
import { AvatarProfilePhoto } from "@/components/base/avatar/avatar-profile-photo";
import { useProfileContext } from "@/providers/profile-provider";
import { BadgeWithIcon } from "@/components/base/badges/badges";
import { Button } from "@/components/ui/button"
import { uploadProfilePhoto } from "@/lib/profile-photo-upload";
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import PhoneInput, { isPossiblePhoneNumber, parsePhoneNumber } from 'react-phone-number-input'
import "react-phone-number-input/style.css";
import { getData } from 'country-list'
import { useForm, Controller } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Textarea } from "@/components/ui/textarea"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  BadgeCheck,
  Mail,
  Phone,
  ChevronRight,
  Rocket,
  ImagePlus,
  Trash2,
  LoaderCircle,
} from 'lucide-react';

import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';
import Preferences from './preferences';

const profileUpdateSchema = z.object({
  full_name: z.string().trim().min(1, "Full name is required."),
  phone_number: z.string()
    .min(1, "Phone number is required.")
    .refine((value) => isPossiblePhoneNumber(value || ""), {
      message: "Please enter a valid phone number.",
    }),
  // Country values are nullable in public.users and are inferred from the phone number.
  // They must not block saving when the phone library cannot identify a specific country.
  country: z.object({
    code: z.string(),
    name: z.string(),
  }),
  gender: z.enum(["male", "female", "prefer_not_to_say"]).nullable(),
  occupation: z.string(),
  residential_address: z.string(),
  city: z.string(),
  state_or_county: z.string(),
  postal_code: z.string(),
  bio: z.string(),
})

// Dates younger than five years are still selectable in the calendar; they are
// rejected with a visible validation message instead of being disabled.
function isYoungerThanFiveYears(dateOfBirth: Date): boolean {
  const today = new Date();
  const fiveYearsAgo = new Date(
    today.getFullYear() - 5,
    today.getMonth(),
    today.getDate()
  );
  const selectedDate = new Date(
    dateOfBirth.getFullYear(),
    dateOfBirth.getMonth(),
    dateOfBirth.getDate()
  );
  return selectedDate > fiveYearsAgo;
}

type ProfileUpdateValues = z.infer<typeof profileUpdateSchema>;

type TenantProfileData = {
  date_of_birth: string | null;
  gender: "male" | "female" | "prefer_not_to_say" | null;
  occupation: string | null;
  residential_address: string | null;
  city: string | null;
  state_or_county: string | null;
  postal_code: string | null;
  bio: string | null;
};

type Bookings = {
  id: string;
  bookings: number;
  description: string;
};

type Reviews = {
  id: string;
  reviews: number;
  description: string;
};

type Ratings = {
  id: string;
  ratings: number;
  description: string;
};

const recentBooking: Bookings[] = [
  {
    id: "1",
    bookings: 5,
    description: "Bookings"
  }
];

const recentReviews: Reviews[] = [
  {
    id: "1",
    reviews: 10,
    description: "Reviews"
  }
];

const recentRatings: Ratings[] = [
  {
    id: "1",
    ratings: 4.5,
    description: "Ratings"
  }
];

const PersonalInfoSubNav = [
  { id: "personal-info", label: "Personal Information" },
  { id: "preferences", label: "Preferences" },
  { id: "security", label: "Security" },
];

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Prefer not to say", value: "prefer_not_to_say" },
]

export default function PersonalInformationPage() {
  const { profile, loading } = useProfileContext();

  const verificationStatus = (
    profile as (typeof profile & { verification_status?: string }) | null
  )?.verification_status;
  const isIdentityVerified = verificationStatus?.toLowerCase() === "verified";

  const memberSince = profile?.created_at ? new Date(profile.created_at).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  }) : null;

  const [activeSubNav, setActiveSubNav] = useState("personal-info");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | null | undefined>(undefined);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [photoSuccess, setPhotoSuccess] = useState<string | null>(null);
  const [isRemovingPhoto, setIsRemovingPhoto] = useState(false);
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [dateOfBirthError, setDateOfBirthError] = useState<string | null>(null);
  const [tenantProfile, setTenantProfile] = useState<TenantProfileData | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [savedFullName, setSavedFullName] = useState<string | null>(null);
  const [savedPhoneNumber, setSavedPhoneNumber] = useState<string | null>(null);
  const [isLoadingTenantProfile, setIsLoadingTenantProfile] = useState(true);

  const existingPhotoUrl = uploadedPhotoUrl !== undefined ? uploadedPhotoUrl : profile?.profile_photo_url ?? null;
  const displayedPhotoUrl = previewUrl ?? existingPhotoUrl;
  const hasProfilePhoto = Boolean(displayedPhotoUrl);

  useEffect(() => {
    if (!selectedPhoto) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedPhoto);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedPhoto]);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPhotoError(null);

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setPhotoError("Please select a JPG, PNG, or WebP image.");
      event.target.value = "";
      return;
    }

    if (file.size <= 0 || file.size > 5 * 1024 * 1024) {
      setPhotoError("The image must be 5 MB or smaller.");
      event.target.value = "";
      return;
    }
    setSelectedPhoto(file);
    setPhotoSuccess(null);
    setUploadProgress(null);
    event.target.value = "";
  };

  const handleSavePhoto = async () => {
    if (!selectedPhoto || isUploadingPhoto) return;
    setPhotoError(null);
    setPhotoSuccess(null);
    setIsUploadingPhoto(true);
    setUploadProgress(0);

    try {
      const result = await uploadProfilePhoto(selectedPhoto, (progress) => {
        setUploadProgress(progress);
      });
      setUploadedPhotoUrl(`${result.profilePhotoUrl}?v=${Date.now()}`);
      setSelectedPhoto(null);
      setPhotoSuccess("Profile photo uploaded successfully!");
    } catch (error) {
      setPhotoError(
        error instanceof Error
        ? error.message
        : "could not save your profile photo. Please try again."
      );
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleRemovePhoto = async () => {
    setPhotoError(null);
    setPhotoSuccess(null);
    // If the user has only selected a new photo but hasn't uploaded it yet, just clear the selection.
    if (selectedPhoto) {
      setSelectedPhoto(null);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    //  nothing saved to remove.
    if (!existingPhotoUrl || isRemovingPhoto) return;
    setIsRemovingPhoto(true);

    try {
      const response = await fetch("/api/profile-photo/remove", {
        method: "DELETE",
        credentials: "same-origin",
      });

      const result = (await response.json()) as {
        success: boolean;
        profilePhotoRemoved?: boolean;
        storageDeleted?: boolean;
        storageCleanupPending?: boolean;
        error?: string;
      };

      // The database URL has been cleared, even if the R2 deletion failed.
      if (result.profilePhotoRemoved) {
        setUploadedPhotoUrl(null);
        setSelectedPhoto(null);
        setUploadProgress(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "could not completely remove your profile photo."
      );
    }

    setPhotoSuccess("profile photo removed successfully!");

  } catch (error) {
    setPhotoError(
      error instanceof Error
        ? error.message
        : "could not remove your profile photo. Please try again."
    );

  } finally {
    setIsRemovingPhoto(false);
  }
  };

  const [formError, setFormError] = React.useState<string | null>(null);
  const supabase = useMemo(() => createClient(), []);
  const countryList = getData();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileUpdateValues>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      full_name: "",
      phone_number: "",
      country: { code: "", name: "" },
      gender: null,
      occupation: "",
      residential_address: "",
      city: "",
      state_or_county: "",
      postal_code: "",
      bio: "",
    },
  });

  const handlePhoneChange = (value: string | undefined) => {
    setValue('phone_number', value ?? "", { shouldValidate: true })
    if (value) {
      const parsed = parsePhoneNumber(value)
    if (parsed) {
        // B. Automatically look up the country name from your countryList dataset array
        // to map it cleanly alongside the 2-letter ISO country text code target string
        const detectedCountryIso = parsed.country; // e.g. "KE"
        const countryObject = countryList.find(c => c.code === detectedCountryIso);
        // C. Update react-hook-form values so data is perfectly organized for database insertion
        setValue('country.code', detectedCountryIso ?? "", { shouldValidate: true })
        setValue('country.name', countryObject?.name ?? "", { shouldValidate: true })
      } else {
        // Clear stale country data if this phone value cannot be parsed yet.
        setValue('country.code', "", { shouldValidate: true })
        setValue('country.name', "", { shouldValidate: true })
      }
    } else {
      // Clear out fields if phone input is emptied out completely
      setValue('country.code', "", { shouldValidate: true })
      setValue('country.name', "", { shouldValidate: true })
    }
  }

  useEffect(() => {
    let cancelled = false;
    async function loadPersonalInformation() {
      if (!profile?.id) {
        setIsLoadingTenantProfile(Boolean(loading));
        return;
      }
      setIsLoadingTenantProfile(true);
      setFormError(null);

      const { data, error } = await supabase
        .from("tenant_profiles")
        .select(
          "date_of_birth, gender, occupation, residential_address, city, state_or_county, postal_code, bio"
        )
        .eq("user_id", profile.id)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        console.error("Failed to load tenant profile:", error);
        setFormError("Your account details loaded, but tenant information could not be loaded. Please refresh and try again.");
        setIsLoadingTenantProfile(false);
        return;
      }

      const tenant = (data ?? null) as TenantProfileData | null;
      setTenantProfile(tenant);
      const loadedDateOfBirth = tenant?.date_of_birth
        ? new Date(`${tenant.date_of_birth}T12:00:00`)
        : undefined;
      setDate(loadedDateOfBirth);
      setDateOfBirthError(
        loadedDateOfBirth && isYoungerThanFiveYears(loadedDateOfBirth)
          ? "You must be at least 5 years old to use CubeGrab. Please choose a different date of birth."
          : null
      );

      setSavedFullName(profile.full_name ?? "");
      setSavedPhoneNumber(profile.phone_number ?? "");

      reset({
        full_name: profile.full_name ?? "",
        phone_number: profile.phone_number ?? "",
        country: {
          code: profile.country_code ?? "",
          name: profile.country_name ?? "",
        },
        gender: tenant?.gender ?? null,
        occupation: tenant?.occupation ?? "",
        residential_address: tenant?.residential_address ?? "",
        city: tenant?.city ?? "",
        state_or_county: tenant?.state_or_county ?? "",
        postal_code: tenant?.postal_code ?? "",
        bio: tenant?.bio ?? "",
      });

      setIsLoadingTenantProfile(false);
    }

    void loadPersonalInformation();

    return () => {
      cancelled = true;
    };
  }, [profile, loading, reset, supabase]);

  async function onSubmit(data: ProfileUpdateValues) {
    setFormError(null);
    setFormSuccess(null);

    if (!profile) {
      setFormError("Unable to load your profile. Please try again.");
      return;
    }

    // Keep dates under five years old selectable, but do not allow them to be saved.
    if (date && isYoungerThanFiveYears(date)) {
      const message = "You must be at least 5 years old to use CubeGrab. Please choose a different date of birth.";
      setDateOfBirthError(message);
      setFormError(message);
      return;
    }
    setDateOfBirthError(null);

    // Format the selected calendar date using local date parts to avoid timezone shifts.
    const dateOfBirth = date
      ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
      : null;

    try {
      const { error } = await supabase.rpc("save_tenant_personal_information", {
        p_full_name: data.full_name.trim(),
        p_phone_number: data.phone_number,
        p_country_code: data.country.code || null,
        p_country_name: data.country.name || null,
        p_date_of_birth: dateOfBirth,
        p_gender: data.gender,
        p_occupation: data.occupation,
        p_residential_address: data.residential_address,
        p_city: data.city,
        p_state_or_county: data.state_or_county,
        p_postal_code: data.postal_code,
        p_bio: data.bio,
      });

      if (error) {
        console.error("Failed to save personal information:", error);

        if (error.code === "23505" || error.message?.includes("users_phone_number_key")) {
          setFormError("This phone number is already registered to another account. Please use a different phone number.");
        } else {
          setFormError(error.message || "Could not save your personal information. Please try again.");
        }
        return;
      }

      setSavedFullName(data.full_name.trim());
      setSavedPhoneNumber(data.phone_number);
      setTenantProfile({
        date_of_birth: dateOfBirth,
        gender: data.gender,
        occupation: data.occupation.trim() || null,
        residential_address: data.residential_address.trim() || null,
        city: data.city.trim() || null,
        state_or_county: data.state_or_county.trim() || null,
        postal_code: data.postal_code.trim() || null,
        bio: data.bio.trim() || null,
      });
      setFormSuccess("Your personal information has been saved successfully.");
    } catch (err) {
      console.error("Unexpected error while saving personal information:", err);
      setFormError(
        err instanceof Error ? err.message : "An unexpected error occurred while saving."
      );
    }
  }

  return (
    <main className="mt-0 flex h-full w-full flex-col overflow-x-hidden px-1 py-1 sm:px-4">
      <h1 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white lg:text-2xl">Personal Information</h1>
      <p className="text-gray-700 dark:text-gray-300">
          Manage your personal details and preferences.
      </p>
      <div className="mt-4 flex w-full flex-row gap-4">
        <div className="w-110 rounded-lg border-3 dark:border-gray-800 border-gray-200 bg-white p-2 shadow-md dark:border-gray-700 dark:bg-blue-900/10">
          <div className="flex items-start justify-between gap-2">
            <AvatarProfilePhoto
              size="lg"
              alt={profile?.full_name}
              src={displayedPhotoUrl ?? undefined}
            />

            <div className="flex items-start mt-2 gap-2 justify-center flex-col">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{loading ? "Loading..." : savedFullName ?? profile?.full_name}</h2>
                {isIdentityVerified ? (
                  <BadgeWithIcon type="pill-color" color="success" size="lg" iconLeading={BadgeCheck}>
                    Verified
                  </BadgeWithIcon>
                ) : (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {verificationStatus ?? "Not verified"}
                  </span>
                )}
              <p className="text-md flex gap-2 text-gray-500 dark:text-gray-400"><Mail />{loading ? "Loading..." : profile?.email}</p>
              <p className="text-md flex gap-2 text-gray-500 dark:text-gray-400"><Phone />{loading ? "Loading..." : savedPhoneNumber ?? profile?.phone_number}</p>
              <p className="text-md text-gray-500 dark:text-gray-400">Member since {loading ? "Loading..." : memberSince}</p>
            </div>
          </div>

          <button className="flex items-center w-full mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white dark:bg-blue-950 dark:hover:bg-blue-800 hover:bg-blue-700">
            <div className="flex items-center justify-start gap-4 flex-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-700 text-white dark:bg-green-600">
                <Rocket />
              </div>
              <div className="flex flex-col items-start justify-center gap-2">
                <h2 className="text-lg font-medium">Account Status</h2>
                <span className={`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${profile?.account_status?.toLowerCase() === 'active' ? 'bg-green-500 text-white dark:bg-green-700 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100'}`}>
                  {loading ? "Loading..." : profile?.account_status ?? "Unknown"}
                </span>

                <p className="text-md text-gray-200 dark:text-gray-400">
                  {loading ? "Loading..." : profile?.account_status?.toLowerCase() === "active" ? "Your account is active." : "Your account may need attention."}
                </p>
              </div>
            </div>
            <ChevronRight />
          </button>

          <div className="mt-4 w-full items-center justify-between flex gap-4 px-2 py-2">
            <div className="flex flex-col items-center border-2 border-gray-300 dark:border-blue-900 bg-gray-300 dark:bg-blue-800/30 rounded-lg w-full gap-2">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{recentBooking[0]?.bookings}</h3>
              <p className="text-md text-gray-500 dark:text-gray-400">{recentBooking[0]?.description}</p>
            </div>
            <div className="flex flex-col items-center border-2 border-gray-300 dark:border-blue-900 bg-gray-300 dark:bg-blue-800/30 rounded-lg w-full gap-2">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{recentReviews[0]?.reviews}</h3>
              <p className="text-md text-gray-500 dark:text-gray-400">{recentReviews[0]?.description}</p>
            </div>
            <div className="flex flex-col items-center border-2 border-gray-300 dark:border-blue-900 bg-gray-300 dark:bg-blue-800/30 rounded-lg w-full gap-2">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{recentRatings[0]?.ratings}</h3>
              <p className="text-md text-gray-500 dark:text-gray-400">{recentRatings[0]?.description}</p>
            </div>
          </div>

          {/* Display Bio */}
          <div className="mt-4 w-full rounded-lg border-2 border-gray-300 dark:border-blue-900 bg-gray-300 dark:bg-blue-800/30 p-4">
            <div className="flex items-center justify-between">
              <Image
                src="/images/Notebook-icon.png"
                alt="Property type icon"
                width={20}
                height={20}
                className="inline-block dark:text-white text-amber-50"
              />
              <h3 className="gap-2 text-md font-semibold text-gray-900 dark:text-white">
                Bio
              </h3>
            </div>
            <p className="mt-2 text-md text-black dark:text-gray-400">
              {loading || isLoadingTenantProfile ? "Loading..." : tenantProfile?.bio ?? "No bio available."}
            </p>
          </div>

          {/* Display Preferred Locations */}
          <div className="mt-4 w-full rounded-lg border-2 border-gray-300 dark:border-blue-900 bg-gray-300 dark:bg-blue-800/30 p-4">
            <div className="flex items-center justify-between">
              <Image
                src="/images/preferred-loc-icon.svg"
                alt="Location icon"
                width={20}
                height={20}
                className="inline-block size-8 rounded-full dark:bg-white text-amber-50"
              />
              <h3 className="gap-2 text-md font-semibold text-gray-900 dark:text-white">
                Preferred Locations
              </h3>
            </div>
            <p className="mt-2 text-md text-gray-500 dark:text-gray-400">
              {loading || isLoadingTenantProfile ? "Loading..." : tenantProfile?.preferredLocations?.join(", ") ?? "No preferred locations available."}
            </p>
          </div>
          
          {/* Property Types */}
          <div className="mt-4 w-full rounded-lg border-2 border-gray-300 dark:border-blue-900 bg-gray-300 dark:bg-blue-800/30 p-4">
            <div className="flex items-center justify-between">
              <Image
                src="/images/prop-type-icon.png"
                alt="Property type icon"
                width={20}
                height={20}
                className="inline-block dark:text-white text-amber-50"
              />
              <h3 className="gap-2 text-md font-semibold text-gray-900 dark:text-white">
                Property Types
              </h3>
            </div>
            <p className="mt-2 text-md text-gray-500 dark:text-gray-400">
              {loading || isLoadingTenantProfile ? "Loading..." : tenantProfile?.propertyTypes?.join(", ") ?? "No property types selected."}
            </p>
          </div>
          
          {/* Budget Range */}
          <div className="mt-4 w-full rounded-lg border-2 border-gray-300 dark:border-blue-900 bg-gray-300 dark:bg-blue-800/30 p-4">
            <div className="flex items-center justify-between">
              <Image
                src="/images/Bag-Dollar-icon.png"
                alt="Budget range icon"
                width={20}
                height={20}
                className="inline-block dark:text-white text-amber-50"
              />
              <h3 className="gap-2 text-md font-semibold text-gray-900 dark:text-white">
                Budget Range
              </h3>
            </div>
            <p className="mt-2 text-md text-gray-500 dark:text-gray-400">
              {loading || isLoadingTenantProfile ? "Loading..." : tenantProfile?.budgetRange ?? "No budget range specified."}
            </p>
          </div>
          
          {/* Move-in Date */}
          <div className="mt-4 w-full rounded-lg border-2 border-gray-300 dark:border-blue-900 bg-gray-300 dark:bg-blue-800/30 p-4">
            <div className="flex items-center justify-between">
              <Image
                src="/images/move-in-icon.png"
                alt="Move-in date icon"
                width={20}
                height={20}
                className="inline-block dark:text-white text-amber-50"
              />
              <h3 className="gap-2 text-md font-semibold text-gray-900 dark:text-white">
                Move-in Date
              </h3>
            </div>
            <p className="mt-2 text-md text-gray-500 dark:text-gray-400">
              {loading || isLoadingTenantProfile ? "Loading..." : tenantProfile?.moveInDate ?? "No move-in date specified."}
            </p>
          </div>
        </div>

        <div className="flex-1 h-fit flex-col rounded-lg border-3 dark:border-gray-800 border-gray-200 bg-white p-2 shadow-md dark:border-gray-700 dark:bg-blue-900/10">
          <div className="flex w-full items-center justify-center h-10 rounded-lg bg-gray-300 dark:bg-blue-950 gap-2">
            {PersonalInfoSubNav.map(({ id, label }) => (
              <Button
                key={id}
                variant="secondary"
                onClick={() => setActiveSubNav(id)}
                className={`flex items-center h-full gap-2 rounded-lg px-4 py-1 text-sm font-medium ${
                  activeSubNav === id
                    ? "bg-blue-600 hover:bg-blue-600 text-white dark:bg-blue-700"
                    : "bg-gray-200 text-gray-900 hover:bg-gray-100 dark:bg-blue-900 dark:text-white dark:hover:bg-blue-800"
                }`}
              >
                <span>{label}</span>
              </Button>
            ))}
          </div>

          <div className="mt-2 flex w-full flex-col gap-4">
            {/* Form for updating personal information */}
            <form
              onSubmit={handleSubmit(onSubmit, () => {
                // React Hook Form does not call onSubmit when Zod validation fails.
                // Show a page-level message as well as the field-level errors.
                setFormSuccess(null);
                setFormError("Please correct the highlighted fields before saving.");
              })}
              className="w-full"
            >
              {activeSubNav === "personal-info" && (
                <div className="flex flex-row w-full gap-4">
                  <div className="flex flex-col w-1/2 gap-4">
                    <Field className="w-full">
                      <FieldLabel className="text-lg">Profile Photo</FieldLabel>
                      <FieldContent>
                        <div className="flex w-full items-center justify-center gap-4 rounded-xl border border-gray-200 p-4 dark:border-gray-800">
                          {/* Left: Existing avatar or selected-image preview */}
                          <div className="size-20 shrink-0 overflow-hidden rounded-full">
                            {previewUrl ? (
                              <img
                                src={previewUrl}
                                alt="Selected profile photo preview"
                                className="size-full object-cover"
                              />
                            ) : (
                              <AvatarProfilePhoto
                                size="sm"
                                alt={profile?.full_name}
                                src={displayedPhotoUrl ?? undefined}
                                className="size-full object-cover"
                              />
                            )}
                          </div>

                          {/* Middle: Change photo */}
                          <div className="min-w-0 flex-1">
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              className="hidden"
                              onChange={handlePhotoChange}
                            />

                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400"
                            >
                              <ImagePlus className="size-4" />
                              Change photo
                            </button>

                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                              JPG, PNG or WebP · Max 5 MB
                            </p>

                            {selectedPhoto && (
                              <p className="mt-2 truncate text-xs text-gray-600 dark:text-gray-300">
                                {selectedPhoto.name}
                              </p>
                            )}
                            {/* Upload status and progress */}
                            {selectedPhoto && (
                              <div className="mt-3">
                                {uploadProgress === null ? (
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Ready to upload
                                  </p>
                                ) : (
                                  <>
                                    <div className="mb-1 flex items-center justify-between text-xs">
                                      <span className="text-gray-500 dark:text-gray-400">
                                        Uploading...
                                      </span>

                                      <span className="font-medium">
                                        {uploadProgress}%
                                      </span>
                                    </div>
                                    <div
                                      className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700"
                                      role="progressbar"
                                      aria-label="Profile photo upload progress"
                                      aria-valuemin={0}
                                      aria-valuemax={100}
                                      aria-valuenow={uploadProgress}
                                    >
                                      <div
                                        className="h-full rounded-full bg-blue-600 transition-all duration-300"
                                        style={{ width: `${uploadProgress}%` }}
                                      />
                                    </div>
                                  </>
                                )}
                              </div>
                            )}

                            {selectedPhoto && (
                              <Button
                                type="button"
                                onClick={handleSavePhoto}
                                disabled={isUploadingPhoto}
                                className="mt-3 bg-gray-300 dark:bg-[var(--color-accent-gold)] text-gray-900 dark:text-white hover:bg-gray-400 dark:hover:bg-[var(--color-accent-gold-hover)]"
                              >

                                {isUploadingPhoto ? (
                                  <>
                                    <LoaderCircle className="mr-2 size-4 animate-spin" />
                                    Uploading...
                                  </>
                                ) : (
                                  "Save photo"
                                )}
                              </Button>
                            )}
                            {photoSuccess && (
                              <p role="status" className="mt-2 text-xs text-green-600 dark:text-green-400">
                                {photoSuccess}
                              </p>
                            )}
                            {photoError && (
                              <p role="alert" className="mt-2 text-xs text-red-600">
                                {photoError}
                              </p>
                            )}
                          </div>

                          {/* Right: Show bin only when a photo exists */}
                          {hasProfilePhoto && (
                            <Button
                              type="button"
                              variant="ghost"
                              disabled={isRemovingPhoto}
                              onClick={handleRemovePhoto}
                              aria-label="Remove profile photo"
                              title="Remove selected photo"
                              className="shrink-0 rounded-lg p-2 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
                            >
                              {isRemovingPhoto ? (
                                <LoaderCircle className="size-4 animate-spin" />
                              ) : (
                                <Trash2 className="size-5" />
                              )}
                            </Button>
                          )}
                        </div>
                      </FieldContent>
                    </Field>
                    {/* Full Name */}
                    <Field
                      data-invalid={!!errors.full_name}
                    >
                      <FieldLabel className="text-md font-semibold">
                        Full Name
                      </FieldLabel>
                      <FieldContent>
                        <Input
                          {...register("full_name")}
                          className="
                            h-10 w-full
                            rounded-md
                            border border-alpha-black
                            bg-white
                            py-2 pr-3
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
                      </FieldContent>
                      <FieldError>
                        {errors.full_name?.message}
                      </FieldError>
                      <FieldDescription>
                        Only your full name can be added.
                      </FieldDescription>
                    </Field>
                    {/* Email Address*/}
                    <Field>
                      <FieldLabel className="mt-2 text-md font-semibold">
                          Email Address
                      </FieldLabel>
                      <FieldContent>
                        <Input
                          type="email"
                          value={profile?.email ?? ""}
                          readOnly
                          className="
                              h-10 w-full
                              rounded-md
                              border
                              bg-gray-100
                              py-2 pr-3
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
                      </FieldContent>
                      <FieldDescription>
                        Email cannot be changed.
                      </FieldDescription>
                    </Field>

                    {/* Phone Number */}
                    <Field className="flex mt-1 flex-col w-full" data-invalid={!!errors.phone_number}>
                      <FieldLabel className="text-md font-semibold">
                          Phone Number
                      </FieldLabel>
                      <FieldContent>
                        <Controller
                          name="phone_number"
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
                      <FieldError>{errors.phone_number?.message}</FieldError>
                    </Field>
                  </div>
                  <div className="flex flex-col w-1/2 gap-4">
                    {/* Date of Birth and Gender */}
                    <div className="flex flex-row items-center justify-between gap-4">
                      {/* Date of Birth */}
                      <Field className="mx-auto w-full">
                        <FieldLabel className="text-md font-semibold">
                          Date of Birth
                        </FieldLabel>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button type="button" variant="outline" id="date" className="justify-start font-normal">{date ? date.toLocaleDateString() : "Select date"}</Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              defaultMonth={date}
                              captionLayout="dropdown"
                              disabled={(day) => day > new Date()}
                              onSelect={(selectedDate) => {
                                setDate(selectedDate);
                                setDateOfBirthError(
                                  selectedDate && isYoungerThanFiveYears(selectedDate)
                                    ? "You must be at least 5 years old to use CubeGrab. Please choose a different date of birth."
                                    : null
                                );
                                setFormError(null);
                                setOpen(false);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                        {dateOfBirthError && (
                          <FieldError>{dateOfBirthError}</FieldError>
                        )}
                      </Field>

                      {/* Gender */}
                       <Field className="w-full">
                          <FieldLabel className="text-md font-semibold">Gender</FieldLabel>
                            <Controller
                              name="gender"
                              control={control}
                              render={({ field }) => (
                                <Select
                                  value={field.value ?? ""}
                                  onValueChange={(value) =>
                                    field.onChange(
                                      value === "male" ||
                                      value === "female" ||
                                      value === "prefer_not_to_say"
                                        ? value
                                        : null
                                    )
                                  }
                                >
                                  <SelectTrigger className="w-full max-w-48">
                                    <SelectValue placeholder="Select gender" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      {genderOptions.map((item) => (
                                        <SelectItem key={item.value} value={item.value}>
                                          {item.label}
                                        </SelectItem>
                                      ))}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              )}
                            />

                        </Field>

                    </div>

                    {/* Occupation and Residencial address */}
                    <div className="flex flex-row items-center justify-between gap-4">
                      {/* Occupation */}
                      <Field>
                        <FieldLabel className="text-md font-semibold">Occupation</FieldLabel>
                        <Input
                          id="text-occupation"
                          placeholder="Engineer"
                          {...register("occupation")}
                        />
                      </Field>
                      {/* Residencial address */}
                      <Field>
                        <FieldLabel className="text-md font-semibold">Residencial Address 1</FieldLabel>
                        <Input
                          id="text-residencial-address"
                          placeholder="678 Main St"
                          {...register("residential_address")}
                        />
                      </Field>
                    </div>

                    {/* Residencial address, City and State/Province */}
                    <div className="flex flex-row items-center justify-between gap-4">
                      {/* Residencial address */}
                      <Field>
                        <FieldLabel className="text-md font-semibold">City</FieldLabel>
                        <Input
                          id="text-city"
                          placeholder="Nairobi"
                          {...register("city")}
                        />
                      </Field>
                      <Field>
                        <FieldLabel className="text-md font-semibold">State/County</FieldLabel>
                        <Input
                          id="text-state"
                          placeholder="Nairobi County"
                          {...register("state_or_county")}
                        />
                      </Field>
                    </div>

                    {/* Postal Code and Bio */}
                    <div className="flex flex-row w-full items-start justify-between gap-4">
                      {/* Postal Code */}
                      <Field className="w-1/2">
                        <FieldLabel className="text-md font-semibold">Postal Code</FieldLabel>
                        <Input
                          id="text-postal-code"
                          placeholder="00100"
                          {...register("postal_code")}
                        />
                      </Field>
                      <Field className="w-1/2">
                        <FieldLabel className="text-md font-semibold">Bio</FieldLabel>
                        <Textarea
                          id="text-bio"
                          placeholder="Tell us a little about yourself..."
                          {...register("bio")}
                          className="resize-none h-24 rounded-md border border-alpha-black bg-white px-3 py-2 text-sm shadow-sm ring-1 dark:ring-blue-700 dark:bg-black dark:border-gray-700 dark:text-white"
                        />
                      </Field>
                    </div>
                    {formError && (
                      <p role="alert" className="mt-3 text-sm text-red-600">
                        {formError}
                      </p>
                    )}
                    {formSuccess && (
                      <p role="status" className="mt-3 text-sm text-green-600 dark:text-green-400">
                        {formSuccess}
                      </p>
                    )}
                    <div className="mt-6 flex-start justify-end">
                      <Button
                        type="submit"
                        disabled={isSubmitting || loading || isLoadingTenantProfile}
                        className="w-full h-8 bg-[var(--color-accent-gold)] hover:bg-[var(--color-accent-gold-dark)] text-black text-lg font-medium">
                        {isSubmitting ? (
                          <>
                            <LoaderCircle className="mr-2 size-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                        "Save Changes"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </form>

            {activeSubNav === "preferences" && (
              <Preferences />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
