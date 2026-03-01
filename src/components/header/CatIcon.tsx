import React from "react";

type Props = {
  className?: string;
  title?: string;
};

export default function CatIcon({ className = "", title = "Cat icon" }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      {/* Simple cat head */}
      <path d="M16 22 L10 10 L22 16" />
      <path d="M48 22 L54 10 L42 16" />
      <path d="M16 22 C16 14, 48 14, 48 22 C56 26, 56 50, 32 54 C8 50, 8 26, 16 22" />
      {/* Eyes */}
      <circle cx="24" cy="34" r="2.5" />
      <circle cx="40" cy="34" r="2.5" />
      {/* Nose + mouth */}
      <path d="M32 38 L29 41 L35 41 Z" />
      <path d="M32 41 C30 43, 28 44, 26 44" />
      <path d="M32 41 C34 43, 36 44, 38 44" />
      {/* Whiskers */}
      <path d="M10 38 L22 38" />
      <path d="M10 42 L22 40" />
      <path d="M54 38 L42 38" />
      <path d="M54 42 L42 40" />

      {/* Default styling via currentColor */}
      <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <g fill="currentColor" />
    </svg>
  );
}