import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="root-min-h-screen flex flex-col items-center justify-center">
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
