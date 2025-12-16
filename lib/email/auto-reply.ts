import { escape } from "html-escaper";
import type { EmailTemplate } from "./templates";

interface AutoReplyData {
  name: string;
  email: string;
  subject: string;
}

export function contactAutoReplyTemplate(data: AutoReplyData): EmailTemplate {
  const { name, email, subject } = data;

  const escapedName = escape(name);
  const escapedEmail = escape(email);
  const escapedSubject = escape(subject);

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #3b82f6;">Terima Kasih!</h2>
      <p>Halo <strong>${escapedName}</strong>,</p>
      <p>Terima kasih telah menghubungi kami. Kami telah menerima pesan Anda dan akan segera merespons.</p>
      
      <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0;"><strong>Subjek:</strong> ${escapedSubject}</p>
      </div>
      
      <p>Kami akan menghubungi Anda melalui email <strong>${escapedEmail}</strong> dalam 1-2 hari kerja.</p>
      
      <p style="margin-top: 30px;">Salam hangat,<br><strong>Tim TemanDifa</strong></p>
      
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
      
      <p style="color: #6b7280; font-size: 12px;">
        Email ini dikirim otomatis. Mohon tidak membalas email ini.
      </p>
    </div>
  `;

  const text = `
Halo ${name},

Terima kasih telah menghubungi kami. Kami telah menerima pesan Anda dan akan segera merespons.

Subjek: ${subject}

Kami akan menghubungi Anda melalui email ${email} dalam 1-3 hari kerja.

Salam hangat,
Tim TemanDifa

---
Email ini dikirim otomatis. Mohon tidak membalas email ini.
  `.trim();

  return { html, text };
}
