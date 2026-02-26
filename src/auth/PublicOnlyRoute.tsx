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
      <div>
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
