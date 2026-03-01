import HeaderNavLinks from "./HeaderNavLinks";
import type { HeaderLink } from "./headerLinks";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  links: HeaderLink[];
  extraLinks?: HeaderLink[];
};

export default function HeaderMobileMenu({
  isOpen,
  onClose,
  links,
  extraLinks,
}: Props) {
  if (!isOpen) return null;

  const merged = extraLinks ? [...links, ...extraLinks] : links;

  return (
    <div className="absolute left-1/2 top-[72px] w-72 -translate-x-1/2 rounded-xl bg-yellow-400 p-4 shadow-lg md:hidden">
      <HeaderNavLinks
        links={merged}
        className="flex flex-col gap-2 text-center font-medium"
        onNavigate={onClose}
      />
    </div>
  );
}
