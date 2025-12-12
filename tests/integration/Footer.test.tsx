import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../utils";
import Footer from "@/components/layout/Footer";

describe("Footer Integration", () => {
  it("should render footer with all sections", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  it("should display TemanDifa branding", () => {
    render(<Footer />);

    expect(screen.getByText("Teman")).toBeInTheDocument();
    expect(screen.getByText("Difa")).toBeInTheDocument();
  });

  it("should render social media links", () => {
    render(<Footer />);

    const instagramLink = screen.getByLabelText(/instagram/i);
    expect(instagramLink).toHaveAttribute("href", "https://instagram.com/temandifa");
    expect(instagramLink).toHaveAttribute("target", "_blank");

    const tiktokLink = screen.getByLabelText(/tiktok/i);
    expect(tiktokLink).toHaveAttribute("href", "https://tiktok.com/@temandifa");

    const linkedinLink = screen.getByLabelText(/linkedin/i);
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://linkedin.com/company/temandifa-com"
    );
  });

  it("should render email contact link", () => {
    render(<Footer />);

    const emailLink = screen.getByText("hello@temandifa.com");
    expect(emailLink).toHaveAttribute("href", "mailto:hello@temandifa.com");
  });

  it("should render newsletter section", () => {
    render(<Footer />);

    const newsletterForm = screen.getByRole("form", {
      name: /newsletter/i,
    });
    expect(newsletterForm).toBeInTheDocument();
  });

  it("should have proper ARIA labels", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveAttribute("aria-label", "Footer situs");
  });

  it("should have dark mode classes", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("dark:bg-gray-900");
  });

  it("should render newsletter form with email input", () => {
    render(<Footer />);

    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: /subscribe/i });
    expect(submitButton).toBeInTheDocument();
  });
});
