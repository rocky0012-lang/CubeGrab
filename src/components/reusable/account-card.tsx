'use client'

import { useState } from "react";
import { ChevronDown, HelpCircle, LogOut01, Moon01, Plus, Settings01, User01 } from "@untitledui/icons";
import type { Selection } from "react-aria-components";
import { Button as AriaButton, SubmenuTrigger } from "react-aria-components";
import { Avatar } from "@/components/base/avatar/avatar";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { cx } from "@/lib/utils/cx";
import { useTheme } from "next-themes";
import { useLogout } from "@/components/reusable/logout-action";
import { useProfileContext } from "@/providers/profile-provider";
import { AvatarProfilePhoto } from "@/components/base/avatar/avatar-profile-photo";

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

interface DropdownAccountCardSMProps {
    redirectTo: string;
}

export const DropdownAccountCardSM = ({ redirectTo }: DropdownAccountCardSMProps) => {
    const { profile, loading } = useProfileContext();

    const profileHref = profile?.user_role === "tenant" ? "/tenant/profile" : "/owner/profile";
    const settingsHref = profile?.user_role === "tenant" ? "/tenant/settings" : "/owner/settings";

    const logout = useLogout(redirectTo);

    const [selectedAccount, setSelectedAccount] = useState<Selection>(new Set(["olivia"]));
    const { resolvedTheme, setTheme } = useTheme();
    const mounted = true;
    const isDark = mounted && resolvedTheme === "dark";
    const [openLogOutDialog, setOpenLogOutDialog] = useState(false);


    return (
        <>
            <Dropdown.Root>
                <AriaButton
                    className={({ isPressed, isFocused }) =>
                        cx(
                            "relative flex w-46 cursor-pointer items-center gap-2 rounded-lg p-1.5 text-left inset-ring-1 inset-ring-border-secondary outline-offset-2 ring-(--color-accent-gold)]",
                            (isPressed || isFocused) && "outline-2",
                        )
                    }
                >
                    <Avatar 
                        border 
                        size="sm" 
                        alt={profile?.full_name ?? "Profile photo"}
                        src={profile?.profile_photo_url ?? undefined} 
                        status="online" 
                    />
                
                    <p className="text-sm font-semibold ">{profile?.full_name ?? "Profile"}</p>
                
                    <div className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-md">
                        <ChevronDown className="size-4 shrink-0 stroke-[2.25px]" />
                    </div>
                </AriaButton>
                
                <Dropdown.Popover className="w-60">
                    <div className="flex flex-col border-b border-secondary px-4 py-3">
                        <p className="text-sm font-semibold text-primary">PRO account</p>
                        <p className="text-sm text-tertiary">{loading ? "" : profile?.email}</p>
                    </div>
                    <Dropdown.Menu>
                        <Dropdown.Item 
                            icon={User01} 
                            href={loading ? "#" : profileHref} 
                        >
                           {loading ? 'Loading profile...' : 'View profile'}
                        </Dropdown.Item>
                        <Dropdown.Item 
                           icon={Settings01} 
                           href={loading ? "#" : settingsHref}
                        >
                           {loading ? 'Loading settings...' : 'Settings'}
                        </Dropdown.Item>
                        <Dropdown.Section selectionMode="single" selectedKeys={new Set([isDark ? "dark-mode" : "light-mode"])}>
                            {mounted && (<Dropdown.Item id="dark-mode" icon={Moon01} selectionIndicator="toggle" onAction={() => setTheme(isDark ? "light" : "dark")}>
                                {isDark ? "Light mode" : "Dark mode"}
                            </Dropdown.Item>)}
                        </Dropdown.Section>
                
                        <SubmenuTrigger>
                            <Dropdown.Item icon={HelpCircle}>Support</Dropdown.Item>
                
                            <Dropdown.Popover placement="right top" offset={-6}>
                                <Dropdown.Menu>
                                    <Dropdown.Item>Help center</Dropdown.Item>
                                    <Dropdown.Item>Contact support</Dropdown.Item>
                                    <Dropdown.Item>Send feedback</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown.Popover>
                        </SubmenuTrigger>
                
                        <Dropdown.Separator />
                
                        <Dropdown.Section selectionMode="single" selectedKeys={selectedAccount} onSelectionChange={setSelectedAccount}>
                            <Dropdown.SectionHeader className="px-4 pt-1.5 pb-0.5 text-xs font-semibold text-brand-secondary">
                                Switch Account
                            </Dropdown.SectionHeader>
                
                            <Dropdown.Item id="olivia" avatarUrl={profile?.profile_photo_url ?? undefined} alt={profile?.full_name ?? "Profile photo"} selectionIndicator="radio">
                                {loading ? "Loading..." : profile?.full_name}
                            </Dropdown.Item>
                            <Dropdown.Item id="sienna" avatarUrl="https://www.untitledui.com/images/avatars/sienna-hewitt?fm=webp&q=80" selectionIndicator="radio">
                                Sienna Hewitt
                            </Dropdown.Item>
                        </Dropdown.Section>
                
                        <Dropdown.Item icon={Plus}>Add account</Dropdown.Item>
                
                        <Dropdown.Separator />
                
                        
                        <Dropdown.Item 
                            icon={LogOut01}
                            className="text-red-500"
                            onAction={() => setOpenLogOutDialog(true)}
                        >
                            Sign out
                        </Dropdown.Item>
                    </Dropdown.Menu>

                    <div className="flex justify-between border-t border-secondary px-4 py-3">
                        <span className="truncate text-sm text-quaternary">&copy; CubeGrab Inc</span>
                        <span className="text-sm text-quaternary">2026</span>
                    </div>
                </Dropdown.Popover>
            </Dropdown.Root>

            <AlertDialog
                open={openLogOutDialog}
                onOpenChange={setOpenLogOutDialog}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Sign out?</AlertDialogTitle>
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
        </>
    );
};