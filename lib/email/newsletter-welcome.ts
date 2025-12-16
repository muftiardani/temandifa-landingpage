import { escape } from "html-escaper";
import type { EmailTemplate } from "./templates";

interface NewsletterWelcomeData {
  email: string;
  unsubscribeUrl: string;
}

export function newsletterWelcomeTemplate(
  data: NewsletterWelcomeData
): EmailTemplate {
  const { email, unsubscribeUrl } = data;

  const escapedEmail = escape(email);

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #3b82f6; margin: 0;">Welcome to TemanDifa! 🎉</h1>
      </div>
      
      <div style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 30px; border-radius: 12px; color: white; margin-bottom: 30px;">
        <h2 style="margin: 0 0 15px 0;">Thank You for Subscribing!</h2>
        <p style="margin: 0; font-size: 16px; line-height: 1.6;">
          You're now part of our community dedicated to making technology accessible for everyone.
        </p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h3 style="color: #1f2937; margin-bottom: 15px;">What to Expect:</h3>
        <ul style="color: #4b5563; line-height: 1.8;">
          <li>📱 Latest updates about TemanDifa app</li>
          <li>✨ New features and improvements</li>
          <li>💡 Tips for better accessibility</li>
          <li>🎯 Exclusive content and announcements</li>
        </ul>
      </div>
      
      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
        <p style="margin: 0; color: #6b7280; font-size: 14px;">
          <strong>Your email:</strong> ${escapedEmail}
        </p>
      </div>
      
      <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
          Follow us on social media:
        </p>
        <div style="margin-bottom: 20px;">
          <a href="https://instagram.com/temandifa" style="color: #3b82f6; text-decoration: none; margin: 0 10px;">Instagram</a>
          <a href="https://tiktok.com/@temandifa" style="color: #3b82f6; text-decoration: none; margin: 0 10px;">TikTok</a>
          <a href="https://linkedin.com/company/temandifa-com" style="color: #3b82f6; text-decoration: none; margin: 0 10px;">LinkedIn</a>
        </div>
        <p style="color: #9ca3af; font-size: 12px; margin: 20px 0 0 0;">
          © 2025 TemanDifa.com. All rights reserved.<br>
          <a href="https://temandifa.com" style="color: #9ca3af;">Visit our website</a>
        </p>
        <p style="color: #9ca3af; font-size: 11px; margin: 15px 0 0 0;">
          Don't want to receive these emails? <a href="${unsubscribeUrl}" style="color: #9ca3af; text-decoration: underline;">Unsubscribe</a>
        </p>
      </div>
    </div>
  `;

  const text = `
Welcome to TemanDifa Newsletter! 🎉

Thank you for subscribing! You're now part of our community dedicated to making technology accessible for everyone.

What to Expect:
- Latest updates about TemanDifa app
- New features and improvements
- Tips for better accessibility
- Exclusive content and announcements

Your email: ${email}

Follow us:
Instagram: https://instagram.com/temandifa
TikTok: https://tiktok.com/@temandifa
LinkedIn: https://linkedin.com/company/temandifa-com

---
© 2026 TemanDifa. All rights reserved.
Visit our website: https://temandifa.com

Don't want to receive these emails?
Unsubscribe: ${unsubscribeUrl}
  `.trim();

  return { html, text };
}
