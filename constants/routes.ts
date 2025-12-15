export const ROUTES = {
  HOME: '/',
  ABOUT: '/tentang',
  PRODUCTS: '/produk',
  CONTACT: '/kontak',
  UNSUBSCRIBE: '/unsubscribe',
} as const;

export const API_ROUTES = {
  CONTACT: '/api/contact',
  NEWSLETTER: '/api/newsletter',
  NEWSLETTER_UNSUBSCRIBE: '/api/newsletter/unsubscribe',
  CSRF: '/api/csrf',
} as const;

export const EXTERNAL_ROUTES = {
  GITHUB: 'https://github.com/muftiardani/temandifa-landingpage',
  PLAY_STORE: 'https://play.google.com/store/apps/details?id=com.temandifa',
  APP_STORE: 'https://apps.apple.com/app/temandifa',
} as const;

export type AppRoute = typeof ROUTES[keyof typeof ROUTES];
export type APIRoute = typeof API_ROUTES[keyof typeof API_ROUTES];
export type ExternalRoute = typeof EXTERNAL_ROUTES[keyof typeof EXTERNAL_ROUTES];
