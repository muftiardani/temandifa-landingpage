export const LOCALES = ['id', 'en'] as const;

export const DEFAULT_LOCALE = 'id' as const;

export const LOCALE_NAMES = {
  id: 'Bahasa Indonesia',
  en: 'English',
} as const;

export const LOCALE_FLAGS = {
  id: '🇮🇩',
  en: '🇬🇧',
} as const;

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

export const DATE_FORMATS = {
  SHORT: 'dd/MM/yyyy',
  LONG: 'dd MMMM yyyy',
  FULL: 'EEEE, dd MMMM yyyy',
  TIME: 'HH:mm',
  DATETIME: 'dd/MM/yyyy HH:mm',
} as const;

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

export type Locale = typeof LOCALES[number];
export type Namespace = typeof NAMESPACES[number];
export type DateFormat = keyof typeof DATE_FORMATS;
export type NumberFormat = keyof typeof NUMBER_FORMATS;
