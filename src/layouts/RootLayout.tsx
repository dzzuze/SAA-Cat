import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import BgCat from "../assets/bg-cat.svg?react";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Header />
      <main className="flex w-full flex-1 flex-col items-center justify-center bg-[#1a1a1d] text-white">
        <div
          className="absolute inset-0 flex justify-between opacity-6 pointer-events-none"
          aria-hidden
        >
          <BgCat className="h-full w-1/3 object-cover" />
          <BgCat className="h-full w-1/3 object-cover" />
          <BgCat className="h-full w-1/3 object-cover" />
        </div>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
