import { describe, it, expect } from "vitest";
import { render, screen } from "../utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

describe("ThemeToggle", () => {
  it("should render without crashing", () => {
    const { container } = render(<ThemeToggle />);
    expect(container).toBeTruthy();
  });

  it("should render loading placeholder or button", () => {
    render(<ThemeToggle />);
    const placeholder = document.querySelector(".animate-pulse");
    const button = screen.queryByRole("button");

    expect(placeholder || button).toBeTruthy();
  });
});
