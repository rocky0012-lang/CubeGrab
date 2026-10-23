"use client";

import Link from "next/link";
import { useLogout } from "@/components/reusable/logout-action";
import { useProfileContext } from "@/providers/profile-provider";
import {
    User,
    Mail,
    Phone,
    ShieldCheck,
    Lock,
    CreditCard,
    LogOut,
    ChevronRight,
    CheckCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react";

interface ProfileMenuItem {
    title: string;
    href?: string;
    icon: React.ElementType;
    badge?: string;
    badgeVariant?: "verified" | "warning" | "default";
    logout?: boolean;
}

const profileMenuItems: ProfileMenuItem[] = [
    {
        title: "Personal Information",
        href: "/tenant/profile/personal-information",
        icon: User,
    },
    {
        title: "Preferences",
        href: "/tenant/profile/email",
        icon: Mail,
        badgeVariant: "verified",
    },
    {
        title: "Identity Verification",
        href: "/tenant/profile/phone",
        icon: Phone,
        badgeVariant: "verified",
    },
    {
        title: "Notification Settings",
        href: "/tenant/profile/identity",
        icon: ShieldCheck,
        badgeVariant: "verified",
    },
    {
        title: "Security",
        href: "/tenant/profile/security",
        icon: Lock,
    },
    {
        title: "Help & Support",
        href: "/tenant/profile/payment-methods",
        icon: CreditCard,
    },
];

const badgeStyles = {
    verified:
        "border-0 bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    warning:
        "border-0 bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400",
    default:
        "border-0 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

interface ProfileMenuProps {
    redirectTo: string;
}

export default function ProfileMenu({ redirectTo }: ProfileMenuProps) {
    const logout = useLogout(redirectTo);
    const [openLogOutDialog, setOpenLogOutDialog] = useState(false);

    const { profile } = useProfileContext();

    const verificationStatus = (
        profile as (typeof profile & { verification_status?: string }) | null
    )?.verification_status;
    
    const normalizedVerificationStatus = verificationStatus?.toLowerCase() ?? "not_started";

    const isIdentityVerified = normalizedVerificationStatus === "verified";

    const identityBadge = {
        text: isIdentityVerified 
            ? "Verified"
            : normalizedVerificationStatus === "pending" ||
                normalizedVerificationStatus === "in_review"
            ? "Pending"
            : normalizedVerificationStatus === "failed"
                ? "Failed"
                : normalizedVerificationStatus === "expired"
                ? "Expired"
                : "Not verified",

        variant: isIdentityVerified ? "verified" : "warning",
    } as const;

    return (
        <div className="flex w-full flex-col">
            {/* Menu items */}
            <div className="flex flex-col">
                {profileMenuItems.map((item) => {
                    const Icon = item.icon;
                    const isIdentityItem = item.title === "Identity Verification";

                    const badgeText = isIdentityItem 
                        ? identityBadge.text
                        : item.badge;

                    const badgeVariant = isIdentityItem
                        ? identityBadge.variant
                        : item.badgeVariant;

                    return (
                        <Link
                            key={item.title}
                            href={item.href ?? "#"}
                            className="group flex w-full items-center justify-between border-b px-2 py-3 transition-colors last:border-b-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900 md:rounded-lg md:border-b-0 md:px-3 md:py-4"
                        >
                            {/* Icon + title/badge */}
                            <div className="flex min-w-0 items-center gap-3 md:gap-4">
                                {/* Icon */}
                                <div className="flex size-4 shrink-0 items-center justify-center text-slate-600 dark:text-slate-300 md:size-10">
                                    <Icon className="size-5" />
                                </div>

                                {/* Title + optional badge */}
                                <div
                                  className={
                                    badgeText
                                      ? "flex flex-col items-start gap-1"
                                      : "flex items-center"
                                  }
                                >
                                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                                    {item.title}
                                  </span>
                              
                                  {badgeText && (
                                    <Badge
                                      className={`w-fit gap-1 text-xs ${
                                        badgeStyles[badgeVariant ?? "default"]
                                      }`}
                                    >
                                      {badgeVariant === "verified" && (
                                        <CheckCircle className="size-3" />
                                      )}
                                
                                      {badgeText}
                                    </Badge>
                                  )}
                                </div>
                            </div>

                            {/* Right arrow */}
                            <ChevronRight className="size-5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    );
                })}
            </div>

            {/* Logout */}
            <div className="mt-1 border-t pt-1 dark:border-slate-800 md:mt-2 md:pt-2">
                <button
                    type="button"
                    className="group flex w-full items-center justify-between rounded-lg px-2 py-3 text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10 md:px-3 md:py-4"
                    onClick={() => setOpenLogOutDialog(true)}
                >
                    <div 
                    className="flex items-center gap-3 md:gap-4">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-red-50 dark:bg-red-500/10 md:size-10">
                            <LogOut className="size-5" />
                        </div>          

                        <span className="text-sm font-medium">
                            Logout
                        </span>
                    </div>          

                    <ChevronRight className="size-5 shrink-0 text-red-400 transition-transform group-hover:translate-x-0.5" />
                </button>
            </div>

            <AlertDialog
                open={openLogOutDialog}
                onOpenChange={setOpenLogOutDialog}
            >
                <AlertDialogContent className="w-5/6">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-md font-semibold">Sign out?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to sign out of your CubeGrab account?
                            You&apos;ll need to sign in to continue.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={logout} 
                            className="bg-red-700 text-white hover:bg-red-800">Sign Out</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}