import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import UserPage from "../pages/UserPage";
import Dashboard from "../pages/Dashboard";
import AboutUsPage from "../pages/AboutUsPage";
import NotFound from "../pages/NotFound";
import RootLayout from "../layouts/RootLayout";
import AuthGateLayout from "../layouts/AuthGateLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
  { path: "/", element: <MainPage /> },
  { path: "/about", element: <AboutUsPage /> },

  {
    element: <AuthGateLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },

  {
    element: <ProtectedLayout />,
    children: [
      { path: "/user", element: <UserPage /> },
      { path: "/dashboard", element: <Dashboard /> },
    ],
  },

  { path: "/404", element: <NotFound /> },
  { path: "*", element: <Navigate to="/404" replace /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
