'use client'

import { useEffect, useState } from "react";
import { HelpCircle, LayersTwo01, LogOut01, Moon01, Settings01, User01 } from "@untitledui/icons";
import { Button as AriaButton, SubmenuTrigger } from "react-aria-components";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { cx } from "@/lib/utils/cx";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { useTheme } from "next-themes";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useProfileContext } from "@/providers/profile-provider";


import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle 
} from "../ui/alert-dialog";
import { toast } from "sonner";

interface DropdownAvatarProps {
    signInPath?: string;
}


export const DropdownAvatar = ({ signInPath = "/sign-in" }: DropdownAvatarProps) => {
    const { profile, loading } = useProfileContext();

    const profileHref = profile?.user_role === "tenant" ? "/tenant/profile" : "/owner/profile";
    const settingsHref = profile?.user_role === "tenant" ? "/tenant/settings" : "/owner/settings";

    const { resolvedTheme, setTheme } = useTheme();
    const [ mounted, setMounted ] = useState(false);
    const [ openLogoutDialog, setOpenLogoutDialog ] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const isDark = mounted && resolvedTheme === "dark";
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();

            if (error) {
                console.error(error);
                toast.error("Failed to sign out. Please try again.");
                return false;
            }

            toast.success("Successfully signed out.");

            router.replace(signInPath);
            router.refresh();

            return true;
        } catch (err) {
            console.error(err);
            toast.error("An unexpected error occurred. Please try again.");

            return false;
        }
    };

    


    return (
        <>
        <Dropdown.Root>
            <AriaButton
                className={({ isPressed, isFocusVisible }) =>
                    cx(
                        "group relative inline-flex cursor-pointer rounded-full outline-offset-2 ring-(--color-accent-gold)",
                        (isPressed || isFocusVisible) && "outline-2",
                    )
                }
            >
                <Avatar 
                    alt={profile?.full_name} 
                    src={profile?.profile_photo_url ?? undefined}
                    size="sm" 
                />
            </AriaButton>

            <Dropdown.Popover className="w-45 text-sm lg:w-60 lg:size-auto">
                <div className="flex gap-3 border-b border-secondary p-3">
                    <AvatarLabelGroup
                        size="md"
                        src={profile?.profile_photo_url ?? undefined}
                        status="online"
                        title={loading ? "Loading..." : profile?.full_name}
                        subtitle={loading ? "Loading..." : profile?.email}
                    />
                </div>
                <Dropdown.Menu>
                    <Dropdown.Item icon={User01} className="font-sm text-sm" href={loading ? "#" : profileHref}>
                        {loading ? 'Loading profile...' : 'View profile'}
                    </Dropdown.Item>
                    <Dropdown.Item icon={Settings01} href={loading ? "#" : settingsHref}>
                        {loading ? 'Loading settings...' : 'Settings'}
                    </Dropdown.Item>
                    <Dropdown.Section selectionMode="single" selectedKeys={new Set([isDark ? "dark-mode" : "light-mode"])}>
                        {mounted && (
                            <Dropdown.Item id="dark-mode" icon={Moon01} selectionIndicator="toggle" onAction={() => setTheme(isDark ? "light" : "dark")}>
                                {isDark ? "Light mode" : "Dark mode"}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Section>

                    <Dropdown.Separator />

                    <Dropdown.Item icon={LayersTwo01}>
                        Changelog
                    </Dropdown.Item>

                    <SubmenuTrigger>
                        <Dropdown.Item icon={HelpCircle}>Support</Dropdown.Item>

                        <Dropdown.Popover placement="right top" className="w-auto" offset={-6}>
                            <Dropdown.Menu>
                                <Dropdown.Item>Help center</Dropdown.Item>
                                <Dropdown.Item>Contact support</Dropdown.Item>
                                <Dropdown.Item>Send feedback</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </SubmenuTrigger>

                </Dropdown.Menu>
                <div className="flex flex-col gap-3 border-t border-secondary p-3">
                    <Button 
                        size="xs" 
                        color="secondary-destructive" 
                        iconLeading={LogOut01} 
                        className="text-center hover:bg-red-500 hover:text-white transition-colors" 
                        onClick={() => setOpenLogoutDialog(true)} 
                    >
                        Sign out
                    </Button>
                </div>
            </Dropdown.Popover>
        </Dropdown.Root>

        <AlertDialog 
            open={openLogoutDialog}
            onOpenChange={setOpenLogoutDialog}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to sign out?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        You will need to sign in again to access your account.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        disabled={isLoggingOut}
                        onClick={async (e) => {
                            e.preventDefault();
                            setIsLoggingOut(true);

                            const success = await handleLogout();

                            setIsLoggingOut(false);
                            if (success) {
                                setOpenLogoutDialog(false);
                            }
                        }}
                        className="bg-red-600 text-white hover:bg-red-700"
                    >
                        Sign out
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </>
    );
};