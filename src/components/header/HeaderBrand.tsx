import { NavLink } from "react-router-dom";
import HeaderCat from "../../assets/header-cat.svg?react";

type Props = {
  onNavigate?: () => void;
};

export default function HeaderBrand({ onNavigate }: Props) {
  return (
    <NavLink to="/" className="flex items-center gap-3" onClick={onNavigate}>
      <HeaderCat className="h-15 w-18" aria-hidden />
      <span>
        <span className="text-xl font-bold text-yellow-400">SAA</span>
        <span className="text-xl font-bold">-Cat</span>
      </span>
    </NavLink>
  );
}
