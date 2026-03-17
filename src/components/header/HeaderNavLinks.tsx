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
      "block rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 ease-out active:scale-95 bg-white/30",
      linkClassName,
      isActive
        ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/20 "
        : "hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5 text-black",
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
