/**
 * String Utility Functions
 * Helper functions for string manipulation
 */

/**
 * Truncate a string to a maximum length
 * 
 * @param str - String to truncate
 * @param length - Maximum length
 * @param suffix - Suffix to add (default: '...')
 * @returns Truncated string
 * 
 * @example
 * truncate('Hello World', 5); // "Hello..."
 * truncate('Short', 10); // "Short"
 */
export function truncate(str: string, length: number, suffix: string = '...'): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + suffix;
}

/**
 * Convert string to slug format
 * 
 * @param str - String to slugify
 * @returns Slugified string
 * 
 * @example
 * slugify('Hello World!'); // "hello-world"
 * slugify('TemanDifa App'); // "temandifa-app"
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Capitalize first letter of string
 * 
 * @param str - String to capitalize
 * @returns Capitalized string
 * 
 * @example
 * capitalize('hello'); // "Hello"
 * capitalize('WORLD'); // "WORLD"
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Capitalize first letter of each word
 * 
 * @param str - String to capitalize
 * @returns Title cased string
 * 
 * @example
 * titleCase('hello world'); // "Hello World"
 * titleCase('the quick brown fox'); // "The Quick Brown Fox"
 */
export function titleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
}

/**
 * Remove extra whitespace from string
 * 
 * @param str - String to clean
 * @returns Cleaned string
 * 
 * @example
 * cleanWhitespace('  hello   world  '); // "hello world"
 */
export function cleanWhitespace(str: string): string {
  return str.trim().replace(/\s+/g, ' ');
}
