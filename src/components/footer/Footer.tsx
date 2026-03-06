import ThreadsCat from "../../assets/misskalem-cat-8811501.svg?react";
import HidingCat from "../../assets/hiding-cat.svg?react";
import BookCat from "../../assets/misskalem-cat-8634123.svg?react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-yellow-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6  py-8 md:flex-row">
        <ThreadsCat
          className="absolute bottom-0 left-10 hidden h-15 w-15 md:block"
          aria-hidden
        />

        <BookCat
          className="absolute bottom-0 left-250 hidden h-15 w-15 md:block"
          aria-hidden
        />

        <div className="text-sm font-bold text-black md:absolute md:left-1/2 md:-translate-x-1/2">
          © {year} Rolling Scope School.
        </div>
      </div>
      <HidingCat
        className="pointer-events-none absolute bottom-0 right-0 translate-x-[25px] h-15 w-20"
        aria-hidden
      />
    </footer>
  );
}
