import { useTheme } from "../../providers/theme-context";

import LightModeCat from "../../assets/light-mode.svg?react";
import DarkModeCat from "../../assets/dark-mode.svg?react";

export function ThemeSwitcher(): React.JSX.Element {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  const handleToggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const Icon = isDark ? LightModeCat : DarkModeCat;

  return (
    <button
      type="button"
      onClick={handleToggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className="flex h-7 w-7 items-center justify-center rounded-full text-text-primary transition hover:scale-105 hover:bg-surface-muted"
    >
      <Icon className="h-14 w-14" aria-hidden />
    </button>
  );
}
