import { NavLink } from "react-router-dom";
import type { User } from "firebase/auth";
import type { HeaderLink } from "./headerLinks";

type Props = {
  user: User;
  isOpen: boolean;
  setIsOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  links: HeaderLink[];
  onLogout: () => Promise<void>;
  menuRef: React.RefObject<HTMLDivElement | null>;
};

export default function HeaderUserMenu({
  user,
  isOpen,
  setIsOpen,
  links,
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
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-900 text-sm shadow transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-yellow-300"
      >
        <span className="sr-only">Open user menu</span>🐾
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-48 overflow-hidden rounded-lg border bg-white shadow-lg"
        >
          <div className="border-b px-4 py-3 text-sm">
            <span className="block font-medium">{user.displayName || "Cat Lover"}</span>
            <span className="block truncate text-xs text-gray-500">{user.email}</span>
          </div>

          <ul className="p-2 text-sm font-medium text-gray-800">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className="block rounded px-2 py-2 transition hover:bg-yellow-400"
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
                className="block w-full rounded px-2 py-2 text-left transition hover:bg-yellow-50"
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}