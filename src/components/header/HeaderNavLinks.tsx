import { NavLink } from "react-router-dom";
import type { HeaderLink } from "./headerLinks";

type Props = {
  links: HeaderLink[];
  className?: string;
  onNavigate?: () => void;
};

type NavLinkArgs = { isActive: boolean };

const navLinkClass = ({ isActive }: NavLinkArgs) =>
  [
    "block rounded px-3 py-2 text-sm font-medium transition-colors",
    "md:p-0 md:bg-transparent",
    isActive ? "text-yellow-700" : "text-gray-800 hover:text-yellow-700",
  ].join(" ");

export default function HeaderNavLinks({
  links,
  className = "",
  onNavigate,
}: Props) {
  return (
    <ul className={className}>
      {links.map((l) => (
        <li key={l.to}>
          <NavLink
            to={l.to}
            end={Boolean(l.end)}
            className={navLinkClass}
            onClick={onNavigate}
          >
            {l.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
