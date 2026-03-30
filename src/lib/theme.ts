export type Theme = "light" | "dark" | "system";

const THEME_STORAGE_KEY = "theme";

export function getStoredTheme(): Theme {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (
    storedTheme === "light" ||
    storedTheme === "dark" ||
    storedTheme === "system"
  ) {
    return storedTheme;
  }

  return "system";
}

export function setStoredTheme(theme: Theme): void {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function applyResolvedTheme(theme: "light" | "dark"): void {
  const root = document.documentElement;

  root.classList.toggle("dark", theme === "dark");
  root.setAttribute("data-theme", theme);
}