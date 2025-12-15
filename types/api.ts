export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  requestId?: string;
}

export interface RateLimitResponse {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

export interface EmailSendResponse {
  id?: string;
  success: boolean;
  error?: string;
}

export interface CSRFTokenResponse {
  token: string;
  hash: string;
}

export interface NewsletterResponse extends APIResponse {
  subscribed?: boolean;
}

export interface ContactResponse extends APIResponse {
  emailSent?: boolean;
}
