import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../utils";
import ContactForm from "@/components/forms/ContactForm";

global.fetch = vi.fn() as unknown as typeof fetch;

describe("ContactForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render all form fields", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/nama/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subjek/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/pesan/i)).toBeInTheDocument();
  });

  it("should render submit button", () => {
    render(<ContactForm />);
    expect(
      screen.getByRole("button", { name: /kirim pesan/i })
    ).toBeInTheDocument();
  });

  it("should show validation errors for empty fields", async () => {
    render(<ContactForm />);
    const user = userEvent.setup();

    const submitButton = screen.getByRole("button", { name: /kirim pesan/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/nama minimal 2 karakter/i)).toBeInTheDocument();
    });
  });

  it("should show validation error for invalid email", async () => {
    render(<ContactForm />);
    const user = userEvent.setup();

    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, "invalid-email");

    const submitButton = screen.getByRole("button", { name: /kirim pesan/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email tidak valid/i)).toBeInTheDocument();
    });
  });

  it("should accept valid form data", async () => {
    render(<ContactForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/nama/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/subjek/i), "Test Subject");
    await user.type(
      screen.getByLabelText(/pesan/i),
      "This is a test message that is long enough"
    );

    const submitButton = screen.getByRole("button", { name: /kirim pesan/i });
    expect(submitButton).toBeEnabled();
  });

  it("should disable submit button while submitting", async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    render(<ContactForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/nama/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/subjek/i), "Test Subject");
    await user.type(
      screen.getByLabelText(/pesan/i),
      "This is a test message"
    );

    const submitButton = screen.getByRole("button", { name: /kirim pesan/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/mengirim/i)).toBeInTheDocument();
    });
  });

  it("should show success message on successful submission", async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    render(<ContactForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/nama/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/subjek/i), "Test Subject");
    await user.type(
      screen.getByLabelText(/pesan/i),
      "This is a test message"
    );

    await user.click(screen.getByRole("button", { name: /kirim pesan/i }));

    await waitFor(() => {
      expect(screen.getByText(/berhasil dikirim/i)).toBeInTheDocument();
    });
  });

  it("should show error message on failed submission", async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Failed to send" }),
    } as Response);

    render(<ContactForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/nama/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/subjek/i), "Test Subject");
    await user.type(
      screen.getByLabelText(/pesan/i),
      "This is a test message"
    );

    await user.click(screen.getByRole("button", { name: /kirim pesan/i }));

    await waitFor(() => {
      expect(screen.getByText(/terjadi kesalahan/i)).toBeInTheDocument();
    });
  });
});
