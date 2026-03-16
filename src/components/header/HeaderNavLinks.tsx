import { NavLink } from "react-router-dom";
import type { HeaderLink } from "./headerLinks";

type Props = {
  links: HeaderLink[];
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
};

type NavLinkArgs = { isActive: boolean };

export default function HeaderNavLinks({
  links,
  className = "",
  linkClassName,
  onNavigate,
}: Props) {
  const navLinkClass = ({ isActive }: NavLinkArgs) =>
    [
      "block rounded px-3 py-2 text-sm font-bold",
      "md:p-0 md:bg-transparent",
      linkClassName
        ? isActive
          ? "text-gray-900 font-extrabold bg-yellow-200 border-2 border-white"
          : linkClassName
        : isActive
          ? "text-yellow-400"
          : "hover:text-yellow-200",
    ].join(" ");

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
