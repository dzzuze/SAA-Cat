import { Outlet } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function AuthGateLayout() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-gray-500">Checking authentication...</p>
      </div>
    );
  }

  return <Outlet />;
}