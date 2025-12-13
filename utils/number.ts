/**
 * Number Utility Functions
 * Helper functions for number formatting and manipulation
 */

/**
 * Format number with locale
 * 
 * @param num - Number to format
 * @param locale - Locale string (default: 'id')
 * @param options - Intl.NumberFormatOptions
 * @returns Formatted number string
 * 
 * @example
 * formatNumber(1000); // "1.000" (Indonesian)
 * formatNumber(1000, 'en'); // "1,000" (English)
 */
export function formatNumber(
  num: number,
  locale: string = 'id',
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, options).format(num);
}

/**
 * Format number as currency
 * 
 * @param num - Number to format
 * @param currency - Currency code (default: 'IDR')
 * @param locale - Locale string (default: 'id')
 * @returns Formatted currency string
 * 
 * @example
 * formatCurrency(10000); // "Rp10.000"
 * formatCurrency(10000, 'USD', 'en'); // "$10,000.00"
 */
export function formatCurrency(
  num: number,
  currency: string = 'IDR',
  locale: string = 'id'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(num);
}

/**
 * Format number as percentage
 * 
 * @param num - Number to format (0-1 range)
 * @param locale - Locale string (default: 'id')
 * @param decimals - Number of decimal places (default: 0)
 * @returns Formatted percentage string
 * 
 * @example
 * formatPercentage(0.75); // "75%"
 * formatPercentage(0.755, 'id', 2); // "75,50%"
 */
export function formatPercentage(
  num: number,
  locale: string = 'id',
  decimals: number = 0
): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

/**
 * Clamp number between min and max
 * 
 * @param num - Number to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped number
 * 
 * @example
 * clamp(5, 0, 10); // 5
 * clamp(-5, 0, 10); // 0
 * clamp(15, 0, 10); // 10
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

/**
 * Round number to specified decimal places
 * 
 * @param num - Number to round
 * @param decimals - Number of decimal places (default: 2)
 * @returns Rounded number
 * 
 * @example
 * round(3.14159, 2); // 3.14
 * round(3.14159, 0); // 3
 */
export function round(num: number, decimals: number = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}
