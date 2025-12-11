import { escape } from 'html-escaper';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface EmailTemplate {
  html: string;
  text: string;
}

export function contactFormEmailTemplate(data: ContactFormData): EmailTemplate {
  const { name, email, subject, message } = data;
  
  const escapedName = escape(name);
  const escapedEmail = escape(email);
  const escapedSubject = escape(subject);
  const escapedMessage = escape(message);
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #3b82f6;">New Contact Form Submission</h2>
      
      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0 0 10px 0;"><strong>From:</strong> ${escapedName}</p>
        <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${escapedEmail}</p>
        <p style="margin: 0;"><strong>Subject:</strong> ${escapedSubject}</p>
      </div>
      
      <div style="margin: 20px 0;">
        <h3 style="color: #1f2937;">Message:</h3>
        <p style="white-space: pre-wrap; line-height: 1.6;">${escapedMessage}</p>
      </div>
      
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
      
      <p style="color: #6b7280; font-size: 14px;">
        This email was sent from the TemanDifa contact form.
      </p>
    </div>
  `;
  
  const text = `
New Contact Form Submission

From: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This email was sent from the TemanDifa contact form.
  `.trim();
  
  return { html, text };
}
