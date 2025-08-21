import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import HomePage from "@/pages/HomePage";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe("HomePage", () => {
  it("renders the main heading", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders the theme toggle button", () => {
    render(<HomePage />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders color swatches", () => {
    render(<HomePage />);
    expect(screen.getByText("Red")).toBeInTheDocument();
    expect(screen.getByText("Blue")).toBeInTheDocument();
    expect(screen.getByText("Green")).toBeInTheDocument();
  });

  it("toggles between light and dark mode", async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    const toggleButton = screen.getByRole("button");

    expect(screen.getByText("Light Mode Colors")).toBeInTheDocument();

    await user.click(toggleButton);
    expect(screen.getByText("Dark Mode Colors")).toBeInTheDocument();

    await user.click(toggleButton);
    expect(screen.getByText("Light Mode Colors")).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(<HomePage />);

    const toggleButton = screen.getByRole("button");
    expect(toggleButton).toHaveAttribute("aria-label");
  });

  it("displays contrast ratios for all colors", () => {
    render(<HomePage />);

    const aaaTexts = screen.getAllByText(/AAA/);
    expect(aaaTexts.length).toBeGreaterThan(0);
  });
});
