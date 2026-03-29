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
      "relative block px-4 py-2 text-sm font-bold transition-all duration-300 ease-out active:scale-95 text-white group",
      linkClassName,
      "after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-main-yellow after:transition-all after:duration-300",
      isActive ? "after:w-full" : "after:w-0 hover:after:w-full after:bg-white",
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
