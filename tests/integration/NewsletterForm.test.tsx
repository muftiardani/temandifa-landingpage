import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../utils";
import NewsletterForm from "@/components/forms/NewsletterForm";

global.fetch = vi.fn() as unknown as typeof fetch;

describe("NewsletterForm Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        token: "mock-csrf-token",
        hash: "mock-csrf-hash",
        expiresAt: Date.now() + 900000,
      }),
    } as Response);
  });

  it("should render newsletter form", () => {
    render(<NewsletterForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /subscribe/i })
    ).toBeInTheDocument();
  });

  it("should have proper ARIA labels", () => {
    render(<NewsletterForm />);

    const form = screen.getByRole("form", {
      name: /newsletter/i,
    });
    expect(form).toBeInTheDocument();

    const button = screen.getByRole("button", { name: /subscribe/i });
    expect(button).toHaveAttribute("aria-label");
  });

  it("should have email input field", () => {
    render(<NewsletterForm />);

    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toHaveAttribute("id", "newsletter-email");
  });

  it("should have submit button", () => {
    render(<NewsletterForm />);

    const submitButton = screen.getByRole("button", { name: /subscribe/i });
    expect(submitButton).toHaveAttribute("type", "submit");
  });

  it("should have honeypot field hidden", () => {
    render(<NewsletterForm />);

    const form = screen.getByRole("form");
    const honeypotField = form.querySelector('input[name="honeypot"]');
    
    expect(honeypotField).toBeInTheDocument();
    expect(honeypotField).toHaveAttribute("tabIndex", "-1");
    expect(honeypotField).toHaveAttribute("aria-hidden", "true");
  });
});
