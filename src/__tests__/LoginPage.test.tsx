import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { loginUser } from "../auth/login";
import toast from "react-hot-toast";
import type { UserCredential } from "firebase/auth";

vi.mock("../auth/login", () => ({
  loginUser: vi.fn(),
}));

vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

describe("LoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should successfully log in and redirect to the dashboard", async () => {
    vi.mocked(loginUser).mockResolvedValue({
      user: { email: "test@meow.com" },
    } as UserCredential);

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    const emailInput = screen.getByPlaceholderText("meow@example.com");
    const passwordInput = screen.getByPlaceholderText("••••••••");
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: "test@meow.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(screen.getByText(/entrance.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith("test@meow.com", "password123");
      expect(toast.success).toHaveBeenCalledWith("Successful login!");
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard", {
        replace: true,
      });
    });
  });

  it("should show an error if login fails", async () => {
    vi.mocked(loginUser).mockRejectedValue(new Error("Fail"));

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    const emailInput = screen.getByPlaceholderText("meow@example.com");
    const passwordInput = screen.getByPlaceholderText("••••••••");
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: "error@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    expect(toast.error).toHaveBeenCalled();
  });

  it("should render all main elements correctly", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Entrance/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("meow@example.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
  });

  it("should update input values on change", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    const emailInput = screen.getByPlaceholderText(
      "meow@example.com",
    ) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(
      "••••••••",
    ) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: "test@mail.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    expect(emailInput.value).toBe("test@mail.com");
    expect(passwordInput.value).toBe("123456");
  });

  it("should have a link to the reset password page", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    const forgotPasswordLink = screen.getByRole("link", { name: /meow!/i });
    expect(forgotPasswordLink).toBeInTheDocument();
    expect(forgotPasswordLink.getAttribute("href")).toBe("/reset-password");
  });
});
