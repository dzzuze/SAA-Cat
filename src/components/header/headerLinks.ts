export type HeaderLink = {
  to: string;
  label: string;
  end?: boolean;
};

export const baseLinks: HeaderLink[] = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
];

export const guestLinks: HeaderLink[] = [
  { to: "/login", label: "Login" },
  { to: "/register", label: "Sign Up" },
];

export const authedLinks: HeaderLink[] = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/user", label: "Profile" },
];