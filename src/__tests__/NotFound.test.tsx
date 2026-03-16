import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import { describe, expect, it } from "vitest";

describe("NotFound page", () => {
  it("renders 404 heading", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders description text", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    expect(
      screen.getByText("This little cat got lost… and the page did too."),
    ).toBeInTheDocument();
  });

  it("renders link to home page", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link", { name: /go back home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
