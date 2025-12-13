/**
 * Form Type Definitions
 * Centralized type definitions for all forms in the application
 */

/**
 * Contact Form Data
 * Used in ContactForm component and contact API route
 */
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string; // Honeypot field for spam protection
  csrfHash?: string; // CSRF protection
}

/**
 * Newsletter Form Data
 * Used in NewsletterForm component and newsletter API route
 */
export interface NewsletterFormData {
  email: string;
  honeypot?: string; // Honeypot field for spam protection
  csrfHash?: string; // CSRF protection
}

/**
 * Unsubscribe Form Data
 * Used in unsubscribe page and API route
 */
export interface UnsubscribeFormData {
  email: string;
}
