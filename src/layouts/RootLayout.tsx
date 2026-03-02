import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/Footer/Footer";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className=" flex w-full  flex-1 flex-col items-center justify-center  bg-gray-900 text-white">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
