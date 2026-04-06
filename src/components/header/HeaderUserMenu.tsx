import { NavLink } from "react-router-dom";
import type { User } from "firebase/auth";
import type { HeaderLink } from "./headerLinks";

type Props = {
  user: User;
  links: HeaderLink[];
  isOpen: boolean;
  setIsOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  onLogout: () => Promise<void>;
  menuRef: React.RefObject<HTMLDivElement | null>;
};

export default function HeaderUserMenu({
  user,
  links,
  isOpen,
  setIsOpen,
  onLogout,
  menuRef,
}: Props) {
  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="ml-3 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none group"
      >
        <span className="sr-only">Open user menu</span>
        <span
          className={`
          text-3xl transition-all duration-500 ease-in-out inline-block
          ${isOpen ? "rotate-360" : "rotate-0"}
          `}
        >
          {isOpen ? "🗺️" : "🧭"}
        </span>
      </button>

      <div
        role="menu"
        className={`
    absolute right-0 mt-2 w-48 overflow-hidden rounded-lg border bg-white shadow-lg 
    transition-all duration-300 ease-out origin-right 
    ${
      isOpen
        ? "opacity-100 scale-100 translate-x-0 visible"
        : "opacity-0 scale-95 translate-x-10 invisible pointer-events-none"
    }
    `}
      >
        <div className="border-b bg-app-surface-dark border-border-soft px-4 py-3 text-sm">
          <span className="block font-medium text-white">
            {user?.displayName || "Cat Lover"}
          </span>
          <span className="block truncate text-xs text-white">
            {user.email}
          </span>
        </div>

        <ul className="p-2 text-sm bg-surface font-medium text-text-primary">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className="block rounded px-2 py-2 transition hover:bg-main-yellow"
                onClick={() => setIsOpen(false)}
              >
                {l.label}
              </NavLink>
            </li>
          ))}

          <li>
            <button
              type="button"
              onClick={onLogout}
              className="block w-full rounded px-2 py-2 text-left transition hover:bg-red-500"
            >
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
