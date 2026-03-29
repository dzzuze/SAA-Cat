import { useEffect, useMemo, useRef, useState } from "react";
import { signOut } from "firebase/auth";

import { auth } from "../../lib/firebase/firebase";
import { useAuth } from "../../auth/useAuth";

import WatchingCat from "../../assets/watching-cat.svg?react";

import HeaderBrand from "./HeaderBrand";
import HeaderUserMenu from "./HeaderUserMenu";
import HeaderNavLinks from "./HeaderNavLinks";

import { authedLinks, baseLinks, guestLinks } from "./headerLinks";

export default function Header() {
  const { user, loading } = useAuth();
  const isAuthed = Boolean(user?.uid);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement | null>(null);

  const closeAll = () => {
    setIsUserMenuOpen(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    closeAll();
  };

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (!userMenuRef.current) return;
      if (!userMenuRef.current.contains(e.target as Node))
        setIsUserMenuOpen(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const showAuthedUI = !loading && isAuthed;

  const desktopLinks = useMemo(() => {
    if (loading) return baseLinks;
    return isAuthed
      ? [...baseLinks, ...authedLinks]
      : [...baseLinks, ...guestLinks];
  }, [loading, isAuthed]);

  return (
    <nav className="fixed top-0 z-20 w-full bg-[#3d3d3d]">
      <div className="mx-auto flex flex-wrap justify-between px-4 py-0">
        <HeaderBrand onNavigate={closeAll} />

        <div className="flex items-center gap-3 md:order-2">
          {showAuthedUI && user && (
            <HeaderUserMenu
              user={user}
              links={[...baseLinks, ...authedLinks]}
              isOpen={isUserMenuOpen}
              setIsOpen={setIsUserMenuOpen}
              onLogout={handleLogout}
              menuRef={userMenuRef}
            />
          )}

          {loading && (
            <div className="text-sm font-medium text-gray-700">Loading…</div>
          )}
        </div>

        <div className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto">
          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:flex">
            <HeaderNavLinks
              links={desktopLinks}
              className="flex items-center gap-8 font-medium"
            />
          </div>

          <div className="absolute -bottom-5 right-15 hidden items-end gap-5 md:flex">
            <WatchingCat className="h-18 w-18" aria-hidden />
          </div>
        </div>
      </div>
    </nav>
  );
}
