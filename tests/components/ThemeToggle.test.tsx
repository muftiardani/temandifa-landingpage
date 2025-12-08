import { describe, it, expect } from "vitest";
import { render, screen } from "../utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

describe("ThemeToggle", () => {
  it("should render theme toggle button", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("should have proper aria-label", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label");
  });

  it("should display sun emoji in light mode", () => {
    render(<ThemeToggle />);
    expect(screen.getByText("☀️")).toBeInTheDocument();
  });

  it("should have hover styles", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("hover:bg-gray-100");
  });
});
