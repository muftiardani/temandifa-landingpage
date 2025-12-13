/**
 * Centralized Constants Exports
 * Re-export all constants from a single entry point
 */

// Route constants
export {
  ROUTES,
  API_ROUTES,
  EXTERNAL_ROUTES,
  type AppRoute,
  type APIRoute,
  type ExternalRoute,
} from './routes';

// Rate limit constants
export {
  RATE_LIMITS,
  RATE_LIMIT_HEADERS,
  RATE_LIMIT_MESSAGES,
  type RateLimitEndpoint,
  type RateLimitConfig,
} from './rate-limits';

// i18n constants
export {
  LOCALES,
  DEFAULT_LOCALE,
  LOCALE_NAMES,
  LOCALE_FLAGS,
  NAMESPACES,
  DATE_FORMATS,
  NUMBER_FORMATS,
  type Locale,
  type Namespace,
  type DateFormat,
  type NumberFormat,
} from './i18n';
