import { useAuthStore } from "../store/authStore";

export const useAuth = () => {
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);

  return { user, loading };
};
