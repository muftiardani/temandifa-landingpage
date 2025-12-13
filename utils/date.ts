/**
 * Date Utility Functions
 * Helper functions for date formatting and manipulation
 */

/**
 * Format a date to a localized string
 * 
 * @param date - Date to format
 * @param locale - Locale string (default: 'id')
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 * 
 * @example
 * formatDate(new Date(), 'id'); // "13 Desember 2025"
 * formatDate(new Date(), 'en'); // "December 13, 2025"
 */
export function formatDate(
  date: Date,
  locale: string = 'id',
  options?: Intl.DateTimeFormatOptions
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat(locale, options || defaultOptions).format(date);
}

/**
 * Format a date to a short format
 * 
 * @param date - Date to format
 * @param locale - Locale string (default: 'id')
 * @returns Short formatted date string
 * 
 * @example
 * formatDateShort(new Date()); // "13/12/2025"
 */
export function formatDateShort(date: Date, locale: string = 'id'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

/**
 * Get relative time string (e.g., "2 hours ago")
 * 
 * @param date - Date to compare
 * @param locale - Locale string (default: 'id')
 * @returns Relative time string
 * 
 * @example
 * getRelativeTime(new Date(Date.now() - 3600000)); // "1 hour ago"
 */
export function getRelativeTime(date: Date, locale: string = 'id'): string {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  const diff = date.getTime() - Date.now();
  const diffInSeconds = Math.floor(diff / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (Math.abs(diffInDays) > 0) {
    return rtf.format(diffInDays, 'day');
  } else if (Math.abs(diffInHours) > 0) {
    return rtf.format(diffInHours, 'hour');
  } else if (Math.abs(diffInMinutes) > 0) {
    return rtf.format(diffInMinutes, 'minute');
  } else {
    return rtf.format(diffInSeconds, 'second');
  }
}
