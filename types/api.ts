/**
 * API Response Type Definitions
 * Centralized type definitions for API responses
 */

/**
 * Generic API Response
 * Standard response format for all API endpoints
 */
export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  requestId?: string;
}

/**
 * Rate Limit Response
 * Response from rate limiting middleware
 */
export interface RateLimitResponse {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Rate Limit Result
 * Internal rate limit check result
 */
export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Email Send Response
 * Response from email sending operations
 */
export interface EmailSendResponse {
  id?: string;
  success: boolean;
  error?: string;
}

/**
 * CSRF Token Response
 * Response from CSRF token generation endpoint
 */
export interface CSRFTokenResponse {
  token: string;
  hash: string;
}

/**
 * Newsletter Subscription Response
 * Response from newsletter subscription
 */
export interface NewsletterResponse extends APIResponse {
  subscribed?: boolean;
}

/**
 * Contact Form Response
 * Response from contact form submission
 */
export interface ContactResponse extends APIResponse {
  emailSent?: boolean;
}
