import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";

import { resetPassword } from "../auth/resetPassword";
import ResetPasswordPage from "../pages/ResetPasswordPage";

vi.mock("../auth/resetPassword", () => ({
  resetPassword: vi.fn(),
}));

describe("ResetPasswordPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("должен успешно отправлять форму и показывать сообщение об успехе", async () => {
    vi.mocked(resetPassword).mockResolvedValue(undefined);

    render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>,
    );

    const emailInput = screen.getByPlaceholderText("meow@example.com");
    const submitButton = screen.getByRole("button", { name: /send link/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(screen.getByText(/sending.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByText(/A password reset email has been sent/i),
      ).toBeInTheDocument();
    });

    expect(
      screen.getByRole("link", { name: /return to the login page/i }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("form")).not.toBeInTheDocument();

    expect(resetPassword).toHaveBeenCalledWith("test@example.com");
  });

  it("должен показывать ошибку, если сброс пароля не удался", async () => {
    const mockError = { code: "auth/user-not-found" };
    vi.mocked(resetPassword).mockRejectedValue(mockError);

    render(
      <MemoryRouter>
        <ResetPasswordPage />
      </MemoryRouter>,
    );

    const emailInput = screen.getByPlaceholderText("meow@example.com");
    const submitButton = screen.getByRole("button", { name: /send link/i });

    fireEvent.change(emailInput, { target: { value: "wrong@example.com" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText(/sending.../i)).not.toBeInTheDocument();
    });
  });
});
