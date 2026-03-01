import { NavLink } from "react-router-dom";
import HeaderCat from "../../assets/header-cat.svg?react";
import HidingCat from "../../assets/hiding-cat.svg?react";


export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative  bg-yellow-100">
     <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6  py-8 md:flex-row">
        
        <div className="flex items-center gap-3">
          <HeaderCat className="h-12 w-12" aria-hidden />
          <span className="text-lg font-semibold">SAA-Cat</span>
        </div>

        <nav>
          <ul className="flex flex-wrap items-center gap-6 text-sm font-medium">
            <li>
              <NavLink to="/" className="hover:text-yellow-700">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-yellow-700">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className="hover:text-yellow-700">
                Dashboard
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="text-sm text-gray-700">
          © {year} Rolling Scope School.
        </div>
      </div>
<HidingCat className="pointer-events-none absolute bottom-0 right-0 translate-x-[20px] h-26 w-26" aria-hidden />
    </footer>
  );
}