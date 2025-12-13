/**
 * Utility Functions Exports
 * Re-export all utility functions from a single entry point
 */

// Date utilities
export { formatDate, formatDateShort, getRelativeTime } from './date';

// String utilities
export {
  truncate,
  slugify,
  capitalize,
  titleCase,
  cleanWhitespace,
} from './string';

// Number utilities
export {
  formatNumber,
  formatCurrency,
  formatPercentage,
  clamp,
  round,
} from './number';
