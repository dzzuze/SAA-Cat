import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { auth } from "../lib/firebase/firebase";
import { getUserData } from "./getUserData";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser);
  const setProfile = useAuthStore((s) => s.setProfile);
  const setLoading = useAuthStore((s) => s.setLoading);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);

      if (user) {
        setUser(user);
        const profileData = await getUserData(user.uid);
        setProfile(profileData);
      } else {
        setUser(null);
        setProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading, setProfile]);

  return <>{children}</>;
}
