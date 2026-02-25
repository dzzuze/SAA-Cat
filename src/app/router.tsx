import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import ProtectedRoute from "../auth/ProtectedRoute";
import PublicOnlyRoute from "../auth/PublicOnlyRoute";

import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import UserPage from "../pages/UserPage";
import Dashboard from "../pages/Dashboard";
import AboutUsPage from "../pages/AboutUsPage";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  // PUBLIC
  { path: "/", element: <MainPage /> },
  { path: "/about", element: <AboutUsPage /> },

  // GUEST ONLY (if logged in -> redirect to /dashboard)
  {
    element: <PublicOnlyRoute redirectTo="/dashboard" />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },

  // PROTECTED (only logged-in users)
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/user", element: <UserPage /> },
      { path: "/dashboard", element: <Dashboard /> },
    ],
  },

  // 404
  { path: "/404", element: <NotFound /> },
  { path: "*", element: <Navigate to="/404" replace /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
