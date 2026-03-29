import type { SVGProps } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Header from "./Header";
import { useAuth } from "../../auth/useAuth";
import { signOut } from "firebase/auth";

import type { User } from "firebase/auth";

vi.mock("../../auth/useAuth", () => ({
  useAuth: vi.fn(),
}));

vi.mock("firebase/auth", () => ({
  signOut: vi.fn(),
}));

vi.mock("../../lib/firebase/firebase", () => ({
  auth: { app: "mock-auth" },
}));

vi.mock("../../assets/watching-cat.svg?react", () => ({
  default: (props: SVGProps<SVGSVGElement>) => (
    <svg data-testid="watching-cat" {...props} />
  ),
}));

vi.mock("./HeaderBrand", () => ({
  default: () => <div data-testid="header-brand">HeaderBrand</div>,
}));

vi.mock("./HeaderNavLinks", () => ({
  default: ({
    links,
    className,
  }: {
    links: Array<{ to: string; label: string }>;
    className?: string;
  }) => (
    <div data-testid="header-nav-links" className={className}>
      {links.map((link) => (
        <span key={link.to}>{link.label}</span>
      ))}
    </div>
  ),
}));

vi.mock("./HeaderUserMenu", () => ({
  default: ({
    isOpen,
    setIsOpen,
    onLogout,
  }: {
    isOpen: boolean;
    setIsOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
    onLogout: () => Promise<void>;
  }) => (
    <div data-testid="header-user-menu">
      <button type="button" onClick={() => setIsOpen((prev) => !prev)}>
        Toggle user menu
      </button>
      <div>{isOpen ? "User menu open" : "User menu closed"}</div>
      <button type="button" onClick={onLogout}>
        Sign out
      </button>
    </div>
  ),
}));

vi.mock("./HeaderMobileMenu", () => ({
  default: ({
    isOpen,
    isAuthed,
    onLogout,
  }: {
    isOpen: boolean;
    isAuthed: boolean;
    onLogout: () => Promise<void>;
  }) => (
    <div data-testid="header-mobile-menu">
      <div>{isOpen ? "Mobile menu open" : "Mobile menu closed"}</div>
      <div>{isAuthed ? "Authed mobile menu" : "Guest mobile menu"}</div>
      <button type="button" onClick={onLogout}>
        Mobile logout
      </button>
    </div>
  ),
}));

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading text when auth is loading", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      profile: null,
      loading: true,
      isAuth: false,
      logout: vi.fn(),
      updateProfile: vi.fn(),
    });

    render(<Header />);

    expect(screen.getByText("Loading…")).toBeInTheDocument();
  });

  it("shows desktop Sign out button for authenticated user", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { uid: "123" } as unknown as User,
      profile: null,
      loading: false,
      isAuth: true,
      logout: vi.fn(),
      updateProfile: vi.fn(),
    });

    render(<Header />);

    expect(
      screen.getByRole("button", { name: /^sign out$/i }),
    ).toBeInTheDocument();
  });

  it("does not show desktop Sign out button for guest user", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      profile: null,
      loading: false,
      isAuth: false,
      logout: vi.fn(),
      updateProfile: vi.fn(),
    });

    render(<Header />);

    expect(
      screen.queryByRole("button", { name: /^sign out$/i }),
    ).not.toBeInTheDocument();
  });

  it("calls firebase signOut when desktop Sign out is clicked", async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { uid: "123" } as unknown as User,
      profile: null,
      loading: false,
      isAuth: true,
      logout: vi.fn(),
      updateProfile: vi.fn(),
    });

    vi.mocked(signOut).mockResolvedValue(undefined);

    render(<Header />);

    fireEvent.click(screen.getByRole("button", { name: /^sign out$/i }));

    await waitFor(() => {
      expect(signOut).toHaveBeenCalledTimes(1);
    });
  });
});
