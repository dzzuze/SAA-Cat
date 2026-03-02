import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Header />
      <main className=" flex w-full  flex-1 flex-col items-center justify-center  bg-gray-900 text-white">
        <Outlet />
      </main>
    </div>
  );
}
