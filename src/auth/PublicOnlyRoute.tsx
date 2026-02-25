import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

type PublicOnlyRouteProps = {
  redirectTo?: string;
};

export default function PublicOnlyRoute({
  redirectTo = "/dashboard",
}: PublicOnlyRouteProps) {
  const { user, loading } = useAuth();

  // Wait until Firebase restores auth state
  if (loading) {
    return (
      <div >
        <p>Checking authentication...</p>
      </div>
    );
  }

  // If user is logged in -> redirect away
  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  // Otherwise allow access
  return <Outlet />;
}