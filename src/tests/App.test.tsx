import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import App from "@/App";

vi.mock("react-router-dom", () => ({
  createBrowserRouter: vi.fn(() => ({})),
  RouterProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("App", () => {
  it("renders without crashing", () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
});
