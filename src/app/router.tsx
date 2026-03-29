import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainPage from "../pages/main/MainPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import UserPage from "../pages/UserPage";
import Dashboard from "../pages/Dashboard";
import AboutUsPage from "../pages/AboutUsPage";
import NotFound from "../pages/NotFound";
import RootLayout from "../layouts/RootLayout";
import AuthGateLayout from "../layouts/AuthGateLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import TopicPage from "../pages/TopicPage";
import LessonPage from "../pages/LessonPage";
import LessonsPage from "../pages/LessonsPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <MainPage /> },
        { path: "/about", element: <AboutUsPage /> },
        {
          element: <AuthGateLayout />,
          children: [
            { path: "/login", element: <LoginPage /> },
            { path: "/register", element: <RegisterPage /> },
            { path: "/reset-password", element: <ResetPasswordPage /> },
          ],
        },
        {
          element: <ProtectedLayout />,
          children: [
            { path: "/user", element: <UserPage /> },
            { path: "/dashboard", element: <Dashboard /> },
            { path: "/topics/:id", element: <TopicPage /> },
            { path: "/learn/:topicId", element: <LessonsPage /> },
            { path: "/learn/:topicId/lessons/:lessonId", element: <LessonPage /> },
          ],
        },
        { path: "/404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
  ],
  {
    basename: "/SAA-Cat",
  },
);
export default function AppRouter() {
  return <RouterProvider router={router} />;
}
