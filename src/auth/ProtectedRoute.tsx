import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

 if (loading) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="animate-pulse text-gray-400 text-sm">
        Checking authentication...
      </div>
    </div>
  );
}

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
