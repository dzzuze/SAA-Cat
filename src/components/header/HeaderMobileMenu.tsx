import HeaderNavLinks from "./HeaderNavLinks";
import type { HeaderLink } from "./headerLinks";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  links: HeaderLink[];
  isAuthed: boolean;
  onLogout: () => Promise<void>;
};

export default function HeaderMobileMenu({
  isOpen,
  onClose,
  links,
  isAuthed,
  onLogout,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="absolute left-1/2 top-[72px] w-72 -translate-x-1/2 rounded-xl bg-yellow-400  p-4 shadow-lg md:hidden">
      <HeaderNavLinks
        links={links}
        className="flex flex-col gap-2 text-center font-medium"
        linkClassName="text-gray-800 hover:text-gray-950" 
        onNavigate={onClose}
      />

      {isAuthed && (
        <button
          onClick={async () => {
            await onLogout();
            onClose();
          }}
          className="mt-3 w-full rounded px-3 py-2 text-center font-medium text-gray-800 transition "
        >
          Sign out
        </button>
      )}
    </div>
  );
}
