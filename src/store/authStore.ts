import { create } from "zustand";
import type { User } from "firebase/auth";
import type { IUserData } from "../types/users";

type AuthState = {
  user: User | null;
  profile: IUserData | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setProfile: (profile: IUserData | null) => void;
  setLoading: (loading: boolean) => void;
  updateProfile: (partialProfile: Partial<IUserData>) => void;
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
