import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ColorSwatch } from "@/components/ColorSwatch";

describe("ColorSwatch", () => {
  const mockProps = {
    name: "Red",
    hexCode: "#ee7563",
    contrastRatio: "7.11:1 AAA",
  };

  it("renders color name", () => {
    render(<ColorSwatch {...mockProps} />);
    expect(screen.getByText("Red")).toBeInTheDocument();
  });

  it("renders hex code", () => {
    render(<ColorSwatch {...mockProps} />);
    expect(screen.getByText("#ee7563")).toBeInTheDocument();
  });

  it("renders contrast ratio", () => {
    render(<ColorSwatch {...mockProps} />);
    expect(screen.getByText("7.11:1 AAA")).toBeInTheDocument();
  });

  it("applies background color to preview", () => {
    const { container } = render(<ColorSwatch {...mockProps} />);
    const preview = container.querySelector('[style*="background-color"]');
    expect(preview).toHaveStyle("background-color: #ee7563");
  });
});
