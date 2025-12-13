/**
 * Base64-encoded blur placeholders for images
 * These prevent layout shift (CLS) while images load
 * Generated using: https://blurha.sh/ or similar tools
 */

// Generic gray placeholder (50x50)
const grayPlaceholder =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjZTVlN2ViIi8+PC9zdmc+";

// Blue gradient placeholder for hero images
const blueGradientPlaceholder =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMzYjgyZjY7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojOGI1Y2Y2O3N0b3Atb3BhY2l0eToxIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+";

// Phone mockup placeholder (light gray)
const phonePlaceholder =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2YzZjRmNiIgcng9IjIwIi8+PC9zdmc+";

// Logo placeholder (transparent)
const logoPlaceholder =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSJ0cmFuc3BhcmVudCIvPjwvc3ZnPg==";

/**
 * Blur data URLs for all images in the app
 * Use with Next.js Image component:
 * <Image src="..." placeholder="blur" blurDataURL={blurDataURL.hero} />
 */
export const blurDataURL = {
  // Logo
  logo: logoPlaceholder,

  // Hero section
  hero: blueGradientPlaceholder,
  womanMan: blueGradientPlaceholder,

  // Feature mockups
  menuMockup: phonePlaceholder,
  cameraMockup: phonePlaceholder,
  micMockup: phonePlaceholder,
  videoMockup: phonePlaceholder,

  // Generic fallback
  default: grayPlaceholder,
} as const;

/**
 * Shimmer effect for loading images
 * Use as blurDataURL for a shimmer effect
 */
export const shimmerDataURL = `data:image/svg+xml;base64,${Buffer.from(
  `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1">
          <animate attributeName="offset" values="-2; 1" dur="2s" repeatCount="indefinite" />
        </stop>
        <stop offset="50%" style="stop-color:#e5e7eb;stop-opacity:1">
          <animate attributeName="offset" values="-1; 2" dur="2s" repeatCount="indefinite" />
        </stop>
        <stop offset="100%" style="stop-color:#f3f4f6;stop-opacity:1">
          <animate attributeName="offset" values="0; 3" dur="2s" repeatCount="indefinite" />
        </stop>
      </linearGradient>
    </defs>
    <rect width="400" height="400" fill="url(#shimmer)" />
  </svg>`
).toString("base64")}`;
