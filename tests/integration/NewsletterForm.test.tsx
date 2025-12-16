import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
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

  it("should render newsletter form", async () => {
    render(<NewsletterForm />);

    await waitFor(() => {
      expect(screen.getByRole("form")).toBeInTheDocument();
    });

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should have proper ARIA labels", async () => {
    render(<NewsletterForm />);

    await waitFor(() => {
      const form = screen.getByRole("form");
      expect(form).toHaveAttribute(
        "aria-label",
        "Newsletter subscription form"
      );
    });

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Subscribe to newsletter");
  });

  it("should have email input field", async () => {
    render(<NewsletterForm />);

    await waitFor(() => {
      const emailInput = screen.getByRole("textbox");
      expect(emailInput).toHaveAttribute("type", "email");
      expect(emailInput).toHaveAttribute("id", "newsletter-email");
    });
  });

  it("should have submit button", async () => {
    render(<NewsletterForm />);

    await waitFor(() => {
      const submitButton = screen.getByRole("button");
      expect(submitButton).toHaveAttribute("type", "submit");
    });
  });

  it("should have honeypot field hidden", async () => {
    render(<NewsletterForm />);

    await waitFor(() => {
      const form = screen.getByRole("form");
      expect(form).toBeInTheDocument();
    });

    const form = screen.getByRole("form");
    const honeypotField = form.querySelector('input[name="honeypot"]');

    expect(honeypotField).toBeInTheDocument();
    expect(honeypotField).toHaveAttribute("tabIndex", "-1");
    expect(honeypotField).toHaveAttribute("aria-hidden", "true");
  });
});
