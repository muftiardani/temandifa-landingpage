# TemanDifa Web 🌟

> **Aksesibilitas Nyata, Inklusi Tanpa Batas**

Landing page untuk TemanDifa - aplikasi AI yang memberdayakan penyandang disabilitas dengan fitur deteksi objek real-time, voice-to-text, scan dokumen, dan emergency call.

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

## ✨ Features

- 🌐 **Internationalization** - Support untuk Bahasa Indonesia & English
- 🌙 **Dark Mode** - Theme switching dengan next-themes
- 🎨 **Modern UI/UX** - Responsive design dengan Tailwind CSS 4
- ✨ **Smooth Animations** - Framer Motion untuk interactive experiences
- ♿ **Accessibility First** - WCAG 2.1 compliant dengan ARIA labels
- 📱 **Mobile Optimized** - Mobile-first responsive design
- 🚀 **Performance** - Next.js 16 dengan image optimization
- 📊 **SEO Optimized** - Metadata, Open Graph, JSON-LD schema
- 📝 **Form Validation** - React Hook Form + Zod schema validation

## 🛠️ Tech Stack

| Category       | Technology             |
| -------------- | ---------------------- |
| **Framework**  | Next.js 16.0.7         |
| **UI Library** | React 19.2.0           |
| **Language**   | TypeScript 5           |
| **Styling**    | Tailwind CSS 4         |
| **Animation**  | Framer Motion 12.23    |
| **i18n**       | next-intl 4.5          |
| **Theme**      | next-themes 0.4        |
| **Forms**      | react-hook-form 7.68   |
| **Validation** | Zod 4.1                |
| **Analytics**  | Google Analytics (GA4) |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/temandifa-web.git
   cd temandifa-web
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Setup environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Google Analytics ID:

   ```env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

4. **Run development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
temandifa-web/
├── app/
│   ├── [locale]/           # Locale-based routing (id/en)
│   │   ├── layout.tsx      # Root layout with SEO metadata
│   │   ├── page.tsx        # Homepage
│   │   ├── tentang/        # About page
│   │   ├── produk/         # Product/Features page
│   │   ├── kontak/         # Contact page
│   │   └── providers/      # Theme provider
│   ├── globals.css         # Global styles
│   ├── robots.ts           # SEO robots configuration
│   └── sitemap.ts          # SEO sitemap generation
├── components/
│   ├── sections/           # Page sections (Hero, Features, etc.)
│   ├── layout/             # Layout components (Navbar, Footer)
│   ├── forms/              # Form components
│   └── ui/                 # Reusable UI components
├── i18n/                   # Internationalization config
├── lib/                    # Utility functions & animations
├── messages/               # Translation files (id.json, en.json)
└── public/                 # Static assets
```

## 🌐 Internationalization

The app supports two languages:

- 🇮🇩 **Indonesian (id)** - Default
- 🇬🇧 **English (en)**

Translation files are located in `/messages`:

- `id.json` - Indonesian translations
- `en.json` - English translations

To add a new language:

1. Create a new JSON file in `/messages` (e.g., `es.json`)
2. Update `i18n/routing.ts` to include the new locale
3. Update `middleware.ts` matcher

## 🎨 Styling

This project uses **Tailwind CSS 4** with custom configuration:

### Custom Spacing

```typescript
spacing: {
  "70": "17.5rem",   // 280px
  "75": "18.75rem",  // 300px
  "80": "20rem",     // 320px
  "95": "23.75rem",  // 380px
  "105": "26.25rem", // 420px
  "160": "40rem"     // 640px
}
```

### Dark Mode

Dark mode is implemented using `next-themes` with class-based strategy:

```tsx
import { useTheme } from "next-themes";

const { theme, setTheme } = useTheme();
```

## 🎭 Animations

Framer Motion animation presets are available in `/lib/animations.ts`:

```typescript
import { fadeIn, fadeInUp, fadeInLeft, fadeInRight } from "@/lib/animations";

<motion.div variants={fadeInUp} initial="initial" whileInView="animate">
  Content
</motion.div>;
```

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🔧 Configuration Files

- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.mjs` - ESLint configuration

## 🌟 Key Features Implementation

### Keyboard Accessibility

- **Esc key** closes mobile menu
- **Tab navigation** for all interactive elements
- **ARIA labels** for screen readers

### Performance Optimization

- Next.js Image component with priority loading
- AVIF & WebP image formats
- 1-year cache for static assets
- Compression enabled

### SEO Features

- Comprehensive metadata
- Open Graph tags
- Twitter Card support
- JSON-LD structured data
- Sitemap & robots.txt

## 🔗 Links

- Website: [https://temandifa.com](https://temandifa.com)
- Instagram: [@temandifa](https://instagram.com/temandifa)
- TikTok: [@temandifa](https://tiktok.com/@temandifa)
- LinkedIn: [temandifa-com](https://linkedin.com/company/temandifa-com)

---

Made with ❤️ by TemanDifa Team
