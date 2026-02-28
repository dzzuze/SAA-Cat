import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

type PublicOnlyRouteProps = {
  redirectTo?: string;
};

export default function PublicOnlyRoute({
  redirectTo = "/dashboard",
}: PublicOnlyRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
  <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-gray-500">
          Checking authentication...
        </p>
  </div>
    );
  }

  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
