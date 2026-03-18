import { create } from "zustand";
import type { User } from "firebase/auth";
import type { IUserProfile } from "../types/users";

type AuthState = {
  user: User | null;
  profile: IUserProfile | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setProfile: (profile: IUserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  updateProfile: (partialProfile: Partial<IUserProfile>) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  loading: true,

  setUser: (user) => set({ user }),

  setProfile: (profile) => set({ profile }),

  setLoading: (loading) => set({ loading }),
  updateProfile: (partialProfile) =>
    set((state) => ({
      profile: state.profile ? { ...state.profile, ...partialProfile } : null,
    })),

  logout: () => set({ user: null, profile: null, loading: false }),
}));
