import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Navbar from '@/components/layout/Navbar';
import { NextIntlClientProvider } from 'next-intl';

// Mock next/navigation
vi.mock('@/i18n/routing', () => ({
  Link: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
  usePathname: () => '/',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'id',
}));

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: vi.fn(),
    resolvedTheme: 'light',
  }),
}));

const messages = {
  Navbar: {
    home: 'Home',
    about: 'About',
    features: 'Features',
    contact: 'Contact',
  },
};

describe('Navbar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders navigation links', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Navbar />
      </NextIntlClientProvider>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('displays TemanDifa logo and brand name', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Navbar />
      </NextIntlClientProvider>
    );

    const logo = screen.getByAltText('Logo Teman Difa');
    expect(logo).toBeInTheDocument();
    expect(screen.getByText(/Teman/)).toBeInTheDocument();
    expect(screen.getByText(/Difa/)).toBeInTheDocument();
  });

  it('toggles mobile menu when hamburger button is clicked', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Navbar />
      </NextIntlClientProvider>
    );

    const menuButton = screen.getByLabelText('Toggle menu');
    
    // Initially, mobile menu should not be visible (only desktop links visible)
    const homeLinks = screen.getAllByText('Home');
    expect(homeLinks).toHaveLength(1); // Only desktop link

    // Click to open mobile menu
    fireEvent.click(menuButton);

    // Now both desktop and mobile links should be visible
    const homeLinksAfterClick = screen.getAllByText('Home');
    expect(homeLinksAfterClick.length).toBeGreaterThan(1);
  });

  it('closes mobile menu when ESC key is pressed', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Navbar />
      </NextIntlClientProvider>
    );

    const menuButton = screen.getByLabelText('Toggle menu');

    // Open mobile menu
    fireEvent.click(menuButton);
    expect(screen.getAllByText('Home').length).toBeGreaterThan(1);

    // Press ESC key
    fireEvent.keyDown(document, { key: 'Escape' });

    // Mobile menu should close
    expect(screen.getAllByText('Home')).toHaveLength(1);
  });

  it('has proper ARIA labels for accessibility', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Navbar />
      </NextIntlClientProvider>
    );

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Navigasi utama');

    const menuButton = screen.getByLabelText('Toggle menu');
    expect(menuButton).toBeInTheDocument();

    const langButton = screen.getByLabelText('Switch language');
    expect(langButton).toBeInTheDocument();
  });

  it('displays language switcher with correct locale', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Navbar />
      </NextIntlClientProvider>
    );

    const langButton = screen.getByLabelText('Switch language');
    expect(langButton).toBeInTheDocument();
  });

  it('locks body scroll when mobile menu is open', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Navbar />
      </NextIntlClientProvider>
    );

    const menuButton = screen.getByLabelText('Toggle menu');

    // Open mobile menu
    fireEvent.click(menuButton);
    expect(document.body.style.overflow).toBe('hidden');

    // Close mobile menu
    fireEvent.click(menuButton);
    expect(document.body.style.overflow).toBe('unset');
  });
});
