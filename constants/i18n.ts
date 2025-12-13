/**
 * Internationalization Constants
 * Configuration for i18n and localization
 */

/**
 * Supported locales
 */
export const LOCALES = ['id', 'en'] as const;

/**
 * Default locale
 */
export const DEFAULT_LOCALE = 'id' as const;

/**
 * Locale display names
 */
export const LOCALE_NAMES = {
  id: 'Bahasa Indonesia',
  en: 'English',
} as const;

/**
 * Locale flags (emoji)
 */
export const LOCALE_FLAGS = {
  id: '🇮🇩',
  en: '🇬🇧',
} as const;

/**
 * Translation namespaces
 * All available translation namespaces in the application
 */
export const NAMESPACES = [
  'Common',
  'Hero',
  'Features',
  'About',
  'Problem',
  'ClosingHero',
  'Navbar',
  'Footer',
  'Newsletter',
  'ContactForm',
  'Unsubscribe',
  'Error',
  'NotFound',
  'Loading',
  'Accessibility',
  'Theme',
  'Metadata',
  'Breadcrumbs',
] as const;

/**
 * Date format patterns
 */
export const DATE_FORMATS = {
  SHORT: 'dd/MM/yyyy',
  LONG: 'dd MMMM yyyy',
  FULL: 'EEEE, dd MMMM yyyy',
  TIME: 'HH:mm',
  DATETIME: 'dd/MM/yyyy HH:mm',
} as const;

/**
 * Number format options
 */
export const NUMBER_FORMATS = {
  DECIMAL: {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  },
  CURRENCY: {
    style: 'currency',
    currency: 'IDR',
  },
  PERCENT: {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  },
} as const;

/**
 * Type helpers
 */
export type Locale = typeof LOCALES[number];
export type Namespace = typeof NAMESPACES[number];
export type DateFormat = keyof typeof DATE_FORMATS;
export type NumberFormat = keyof typeof NUMBER_FORMATS;
