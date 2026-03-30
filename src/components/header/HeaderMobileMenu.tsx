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
    <div className="absolute left-1/2 top-[72px] z-30 w-72 -translate-x-1/2 rounded-2xl border border-border-soft bg-surface p-4 shadow-lg md:hidden">
      <HeaderNavLinks
        links={links}
        className="flex flex-col gap-2 text-center font-medium"
        linkClassName="rounded-lg px-3 py-2 text-text-primary transition hover:bg-surface-muted hover:text-text-primary"
        onNavigate={onClose}
      />

      {isAuthed && (
        <button
          type="button"
          onClick={async () => {
            await onLogout();
            onClose();
          }}
          className="mt-3 w-full cursor-pointer rounded-lg bg-main-yellow px-3 py-2 text-center font-medium text-main-dark transition-opacity hover:opacity-90"
        >
          Sign out
        </button>
      )}
    </div>
  );
}
