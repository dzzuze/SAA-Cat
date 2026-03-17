import { Link } from "react-router-dom";
import LostCat from "../assets/lost_cat404.svg?react";

export default function NotFound() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center py-16 text-center">
      <LostCat className="mb-2 h-40 w-48" />

      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-3 text-lg text-gray-600">
        This little cat got lost… and the page did too.
      </p>

      <Link
        to="/"
        className="mt-6 rounded-xl bg-black font-bold px-6 py-3 text-white transition hover:bg-yellow-400 hover:text-black"
      >
        Go back home
      </Link>
    </div>
  );
}
