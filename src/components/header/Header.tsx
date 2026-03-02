import { useEffect, useMemo, useRef, useState } from "react";
import { signOut } from "firebase/auth";

import { auth } from "../../lib/firebase/firebase";
import { useAuth } from "../../auth/useAuth";

import WatchingCat from "../../assets/watching-cat.svg?react";

import HeaderBrand from "./HeaderBrand";
import HeaderUserMenu from "./HeaderUserMenu";
import HeaderNavLinks from "./HeaderNavLinks";
import HeaderMobileMenu from "./HeaderMobileMenu";

import { authedLinks, baseLinks, guestLinks } from "./headerLinks";

export default function Header() {
  const { user, loading } = useAuth();
  const isAuthed = Boolean(user?.uid);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement | null>(null);

  const closeAll = () => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    closeAll();
  };

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (!userMenuRef.current) return;
      if (!userMenuRef.current.contains(e.target as Node)) setIsUserMenuOpen(false);
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

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);


  const showAuthedUI = !loading && isAuthed;

const desktopLinks = useMemo(() => {
  if (loading) return baseLinks; 
  return isAuthed ? [...baseLinks, ...authedLinks] : [...baseLinks, ...guestLinks];
}, [loading, isAuthed]);

const mobileLinks = useMemo(() => {
  if (loading) return baseLinks;
  return isAuthed ? [...baseLinks, ...authedLinks] : [...baseLinks, ...guestLinks];
}, [loading, isAuthed]);

  return (
    <nav className="fixed top-0 z-20 w-full border-b bg-yellow-100">
      <div className="mx-auto flex flex-wrap items-center justify-between p-4">
        <HeaderBrand onNavigate={closeAll} />

        <div className="flex items-center gap-3 md:order-2">
          {showAuthedUI && user && (
            <HeaderUserMenu
              user={user}
              links={authedLinks}
              isOpen={isUserMenuOpen}
              setIsOpen={setIsUserMenuOpen}
              onLogout={handleLogout}
              menuRef={userMenuRef}
            />
          )}

          {loading && <div className="text-sm font-medium text-gray-700">Loading…</div>}

          <button
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-controls="navbar"
            aria-expanded={isMenuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md transition hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 md:hidden"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
            </svg>
          </button>
        </div>

       <div className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto">
          <div className="flex items-center gap-8 font-medium">
             <HeaderNavLinks links={desktopLinks} className="flex items-center gap-8 font-medium" />
          </div>
  
      <WatchingCat className="absolute bottom-0 right-6 hidden h-18 w-18 md:block" aria-hidden />

</div>
      </div>   
      <div className="">
      {showAuthedUI && (
        <button
          type="button"
          onClick={handleLogout}
          className="rounded px-3 py-2 text-sm font-medium text-gray-800 transition hover:bg-yellow-200"
        >
          Sign out
        </button>
      )}
    
</div>
      
      <HeaderMobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        links={mobileLinks}
        isAuthed={isAuthed}
        onLogout={handleLogout}
      />
    </nav>
  );
}