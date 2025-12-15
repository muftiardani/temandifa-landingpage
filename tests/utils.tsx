import { render, RenderOptions } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { ReactElement } from "react";

const defaultMessages = {
  Navbar: {
    home: "Beranda",
    about: "Tentang",
    features: "Fitur",
    contact: "Kontak",
  },
  ContactForm: {
    label_name: "Nama Lengkap",
    label_email: "Email",
    label_subject: "Subjek",
    label_message: "Pesan",
    btn_submit: "Kirim Pesan",
    btn_sending: "Mengirim...",
    success_msg: "Pesan berhasil dikirim!",
    error_msg: "Terjadi kesalahan.",
    validation: {
      name_min: "Nama minimal 2 karakter",
      name_max: "Nama maksimal 100 karakter",
      email_invalid: "Email tidak valid",
      subject_min: "Subjek minimal 5 karakter",
      subject_max: "Subjek maksimal 200 karakter",
      message_min: "Pesan minimal 10 karakter",
      message_max: "Pesan maksimal 1000 karakter",
    },
  },
};

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  locale?: string;
  messages?: Record<string, unknown>;
}

export function renderWithIntl(
  ui: ReactElement,
  {
    locale = "id",
    messages = defaultMessages,
    ...options
  }: CustomRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...options });
}

export * from "@testing-library/react";
export { renderWithIntl as render };
