import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#18181b] text-white">
      <Header />

      <main className="flex-1 flex items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
}
