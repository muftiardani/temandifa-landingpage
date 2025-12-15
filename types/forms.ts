export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;
  csrfHash?: string;
}

export interface NewsletterFormData {
  email: string;
  honeypot?: string;
  csrfHash?: string;
}

export interface UnsubscribeFormData {
  email: string;
}
