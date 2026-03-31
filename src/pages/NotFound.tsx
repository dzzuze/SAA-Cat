import { Link } from "react-router-dom";
import LostCat from "../assets/cat-home.svg?react";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-app py-16 text-center text-text-primary transition-colors duration-300">
      <LostCat className="mb-4 h-40 w-48 text-text-primary" />

      <h1 className="text-6xl font-bold text-text-primary">404</h1>

      <p className="mt-3 text-lg text-text-muted">
        This little cat got lost… and the page did too.
      </p>

      <Link
        to="/"
        className="mt-6 rounded-xl bg-main-yellow px-6 py-3 font-bold text-main-dark transition-all hover:opacity-90"
      >
        Go back home
      </Link>
    </div>
  );
}