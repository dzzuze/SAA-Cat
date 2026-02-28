import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

type GuestOnlyLayoutProps = {
  redirectTo?: string;
};

export default function GuestOnlyLayout({
  redirectTo = "/dashboard",
}: GuestOnlyLayoutProps) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}