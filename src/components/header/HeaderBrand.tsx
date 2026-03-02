import { NavLink } from "react-router-dom";
import HeaderCat from "../../assets/header-cat.svg?react";

type Props = {
  onNavigate?: () => void;
};

export default function HeaderBrand({ onNavigate }: Props) {
  return (
    <NavLink to="/" className="flex items-center gap-3" onClick={onNavigate}>
      <HeaderCat className="h-18 w-18" aria-hidden />
      <span className="text-xl font-semibold">SAA-Cat</span>
    </NavLink>
  );
}
