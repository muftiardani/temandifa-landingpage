"use client";

import Image from "next/image";
import { useState, useTransition, useEffect, useRef, useCallback } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { blurDataURL } from "@/lib/seo/image-placeholders";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useAnalytics } from "@/hooks/useAnalytics";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const { trackNavigation, trackLanguage } = useAnalytics();

  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useFocusTrap<HTMLDivElement>(isMenuOpen);

  const toggleLanguage = useCallback(() => {
    const nextLocale = locale === "id" ? "en" : "id";
    trackLanguage(nextLocale);
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }, [locale, pathname, router, trackLanguage]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/70 shadow-lg shadow-black/5 backdrop-blur-xl backdrop-saturate-150 transition-colors dark:border-gray-700/20 dark:bg-gray-900/70">
      <nav
        className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-8"
        role="navigation"
        aria-label="Navigasi utama"
      >
        <div className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Logo Teman Difa"
            width={50}
            height={50}
            className="object-contain"
            placeholder="blur"
            blurDataURL={blurDataURL.logo}
          />
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Teman
            <span className="text-yellow-500 dark:text-yellow-400">Difa</span>
          </div>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            data-testid="nav-home"
            className="text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
            onClick={() => trackNavigation("Home", "/")}
            aria-current={pathname === "/" ? "page" : undefined}
          >
            {t("home")}
          </Link>
          <Link
            href="/tentang"
            data-testid="nav-about"
            className="text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
            onClick={() => trackNavigation("About", "/tentang")}
            aria-current={pathname === "/tentang" ? "page" : undefined}
          >
            {t("about")}
          </Link>
          <Link
            href="/produk"
            data-testid="nav-features"
            className="text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
            onClick={() => trackNavigation("Features", "/produk")}
            aria-current={pathname === "/produk" ? "page" : undefined}
          >
            {t("features")}
          </Link>

          <Link
            href="/kontak"
            data-testid="nav-contact"
            className="rounded-full bg-blue-500 px-6 py-2 text-white shadow-md transition hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={() => trackNavigation("Contact CTA", "/kontak")}
            aria-current={pathname === "/kontak" ? "page" : undefined}
          >
            {t("contact")}
          </Link>

          <button
            onClick={toggleLanguage}
            disabled={isPending}
            className="h-8 w-8 overflow-hidden rounded-full border border-gray-200 transition-opacity hover:opacity-80 dark:border-gray-700"
            aria-label="Switch language"
          >
            {locale === "id" ? (
              <div className="relative h-full w-full bg-red-600">
                <div className="absolute top-0 h-1/2 w-full bg-red-600"></div>
                <div className="absolute bottom-0 h-1/2 w-full bg-white"></div>
              </div>
            ) : (
              <div className="relative flex h-full w-full items-center justify-center bg-blue-800 text-[10px] font-bold text-white">
                EN
              </div>
            )}
          </button>

          <ThemeToggle />
        </div>

        <button
          ref={menuToggleRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="z-50 flex flex-col gap-1.5 p-2 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`h-0.5 w-6 bg-blue-600 transition-transform duration-300 ${
              isMenuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          ></span>
          <span
            className={`h-0.5 w-6 bg-blue-600 transition-opacity duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`h-0.5 w-6 bg-blue-600 transition-transform duration-300 ${
              isMenuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          ></span>
        </button>

        {isMenuOpen && (
          <div
            ref={mobileMenuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigasi mobile"
            className="absolute top-full left-0 z-40 -mx-4 w-screen border-t border-gray-200 bg-white shadow-lg transition-colors sm:-mx-8 md:hidden dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="flex flex-col gap-4 p-6">
              <Link
                href="/"
                data-testid="mobile-nav-home"
                className="block py-3 text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                onClick={() => {
                  trackNavigation("Home", "/", true);
                  setIsMenuOpen(false);
                }}
                aria-current={pathname === "/" ? "page" : undefined}
              >
                {t("home")}
              </Link>
              <Link
                href="/tentang"
                data-testid="mobile-nav-about"
                className="block py-3 text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                onClick={() => {
                  trackNavigation("About", "/tentang", true);
                  setIsMenuOpen(false);
                }}
                aria-current={pathname === "/tentang" ? "page" : undefined}
              >
                {t("about")}
              </Link>
              <Link
                href="/produk"
                data-testid="mobile-nav-features"
                className="block py-3 text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                onClick={() => {
                  trackNavigation("Features", "/produk", true);
                  setIsMenuOpen(false);
                }}
                aria-current={pathname === "/produk" ? "page" : undefined}
              >
                {t("features")}
              </Link>
              <Link
                href="/kontak"
                data-testid="mobile-nav-contact"
                className="block py-3 text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                onClick={() => {
                  trackNavigation("Contact", "/kontak", true);
                  setIsMenuOpen(false);
                }}
                aria-current={pathname === "/kontak" ? "page" : undefined}
              >
                {t("contact")}
              </Link>

              <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                <span className="text-gray-600 dark:text-gray-400">Bahasa</span>
                <button
                  onClick={toggleLanguage}
                  className="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label={`Switch to ${locale === "id" ? "English" : "Bahasa Indonesia"}`}
                  title={
                    locale === "id"
                      ? "Switch to English"
                      : "Ganti ke Bahasa Indonesia"
                  }
                >
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {locale === "id" ? "EN" : "ID"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
