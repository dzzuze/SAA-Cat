import React from "react";
import CatIcon from "../Header/CatIcon";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full border-t">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CatIcon className="h-5 w-5 opacity-40" />
          <span>© {year} Tandem</span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <a className="hover:underline" href="https://github.com/" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <span className="opacity-30">•</span>
          <span className="opacity-60">Built with ❤️ and cats</span>
        </div>
      </div>
    </footer>
  );
}