import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";

export type Profile = {
    id: string;
    full_name: string;
    email: string;
    phone_number: string | null;
    user_role: string;
    account_status: string;
    created_at: string;
    country_code: string | null;
    country_name: string | null;
    profile_photo_url?: string | null;
    verification_status?: string | null;
};

interface ProfileState {
    profile: Profile | null;
    loading: boolean;
    error: string | null;
    fetchProfile: (forceRefresh?: boolean) => Promise<void>;
    clearProfile: () => void;
    initializeAuthListener: () => () => void; // Returns an unsubscribe cleanup function
}

export const useProfileStore = create<ProfileState>()((set, get ) => ({
            profile: null,
            loading: true,
            error: null,

            fetchProfile: async (forceRefresh = false) => {

                if (get().profile && !forceRefresh) {
                    set({ loading: false });
                    return;
                }

                set ({ loading: true, error: null });

                try {
                    const supabase = createClient();
                    const { data: { user }, error: authError } = await supabase.auth.getUser();

                    if (authError || !user) {
                        get().clearProfile();
                        return;
                    }

                    // Fetch latest columns from Supabase database
                    const { data, error } = await supabase
                        .from("users")
                        .select("id, full_name, email, phone_number, user_role, account_status, created_at, country_code, country_name, profile_photo_url, verification_status")
                        .eq("id", user.id)
                        .maybeSingle();

                    if (error) {
                        throw new Error(`Failed to fetch profile: ${error.message}`);
                    }

                    if (data) {
                        set({ profile: data, loading: false });
                    } else {
                        set({ profile: null, loading: false });
                    }
                } catch (err: unknown) {
                    set({
                        profile: null,
                        loading: false,
                        error: err instanceof Error ? err.message : "An unknown error occurred while fetching the profile.",
                    });
                }
            },

            clearProfile: () => {
                set({ profile: null, loading: false, error: null });
            },

            initializeAuthListener: () => {
                const supabase = createClient();
                const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
                    if (event === 'SIGNED_OUT') {
                        get().clearProfile();
                        return;
                    }

                    if (event === 'SIGNED_IN' || event === "USER_UPDATED") {
                        const currentProfile = get().profile;
                        const authenticatedUserId = session?.user?.id;

                        if (currentProfile && authenticatedUserId && currentProfile.id !== authenticatedUserId) {
                            get().clearProfile();
                        }

                        get().fetchProfile(true);
                    }
                });

                return () => { subscription.unsubscribe(); };
            }
        })
);


