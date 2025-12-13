/**
 * Centralized Type Exports
 * Re-export all types from a single entry point
 */

// Form types
export type {
  ContactFormData,
  NewsletterFormData,
  UnsubscribeFormData,
} from './forms';

// API types
export type {
  APIResponse,
  RateLimitResponse,
  RateLimitResult,
  EmailSendResponse,
  CSRFTokenResponse,
  NewsletterResponse,
  ContactResponse,
} from './api';

// Component types
export type {
  BaseComponentProps,
  ButtonVariant,
  ButtonSize,
  ButtonProps,
  Theme,
  Locale,
  LoadingProps,
  ErrorProps,
  BreadcrumbItem,
  FeatureCardProps,
  SEOMetadata,
} from './components';
