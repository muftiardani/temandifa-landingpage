import { describe, it, expect } from "vitest";
import { render, screen } from "../utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

describe("ThemeToggle", () => {
  it("should render theme toggle button", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("should have proper aria-label for light mode", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("aria-label", "switch_to_dark");
  });

  it("should display moon emoji in light mode", () => {
    render(<ThemeToggle />);
    expect(screen.getByText("🌙")).toBeInTheDocument();
  });

  it("should have hover styles", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("hover:bg-gray-100");
  });

  it("should have transition classes", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("transition-colors");
  });

  it("should have proper title attribute", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("title", "dark_mode");
  });
});
