"use client";

import {
    createContext,
    useContext,
    useEffect,
    type ReactNode,
} from "react";

import {
    useProfileStore,
    type Profile,
} from "@/hooks/use-profile";

type ProfileContextType = {
    profile: Profile | null;
    loading: boolean;
    refreshProfile: () => Promise<void>;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({
    children,
}: {
    children: ReactNode;
}) {
    const profile = useProfileStore((state) => state.profile);
    const loading = useProfileStore((state) => state.loading);
    const fetchProfile = useProfileStore((state) => state.fetchProfile);
    const initializeAuthListener = useProfileStore((state) => state.initializeAuthListener);

    useEffect(() => {
        fetchProfile();
        const unsubscribe = initializeAuthListener();

        return () => {
            unsubscribe();
        };
    }, [fetchProfile, initializeAuthListener]);

    const value = {
        profile,
        loading,
        refreshProfile: () => fetchProfile(true),
    };


    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );
}

export function useProfileContext() {
    const context = useContext(ProfileContext);

    if (!context) {
        throw new Error(
            "useProfileContext must be used inside ProfileProvider"
        );
    }

    return context;
}