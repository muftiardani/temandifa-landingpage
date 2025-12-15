export function formatNumber(
  num: number,
  locale: string = 'id',
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, options).format(num);
}

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

export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

export function round(num: number, decimals: number = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}
