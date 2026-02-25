import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  // While Firebase checks auth state
  if (loading) {
    return (
      <div style={{ padding: 24 }}>
        <p>Checking authentication...</p>
      </div>
    );
  }

  // If not logged in -> redirect to login
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }} 
      />
    );
  }

  //  If authenticated -> render protected content
  return <Outlet />;
}