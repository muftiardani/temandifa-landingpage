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
    <header className="sticky top-6 z-50 mx-auto w-[95%] max-w-7xl">
      <nav
        className="rounded-full border border-white/20 bg-white/70 px-6 py-3 shadow-xl backdrop-blur-xl backdrop-saturate-150 transition-all dark:border-gray-700/30 dark:bg-gray-900/70"
        role="navigation"
        aria-label="Navigasi utama"
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 transition-transform hover:scale-105"
            onClick={() => trackNavigation("Home", "/")}
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-linear-to-br from-blue-500 to-purple-600 p-1 shadow-lg">
              <div className="flex h-full w-full items-center justify-center rounded-lg bg-white dark:bg-gray-900">
                <Image
                  src="/images/logo.png"
                  alt="Logo Teman Difa"
                  width={30}
                  height={30}
                  className="object-contain"
                  placeholder="blur"
                  blurDataURL={blurDataURL.logo}
                />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Teman
              <span className="text-blue-600 dark:text-blue-400">Difa</span>
            </span>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {[
              { label: t("home"), href: "/" },
              { label: t("about"), href: "/tentang" },
              { label: t("features"), href: "/produk" },
            ].map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-full px-5 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                  }`}
                  onClick={() => trackNavigation(link.label, link.href)}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <span className="absolute inset-0 -z-10 rounded-full bg-blue-50 dark:bg-blue-900/20" />
                  )}
                  {link.label}
                </Link>
              );
            })}

            <div className="ml-2 flex items-center gap-3 border-l border-gray-200 pl-4 dark:border-gray-700">
              <button
                onClick={toggleLanguage}
                disabled={isPending}
                className="group relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-50 transition-all hover:border-blue-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                aria-label="Switch language"
              >
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  {locale === "id" ? "ID" : "EN"}
                </span>
                <div className="absolute inset-0 -z-10 bg-linear-to-tr from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
              </button>

              <ThemeToggle />

              <Link
                href="/kontak"
                className="group relative overflow-hidden rounded-full bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-105 hover:bg-blue-700 active:scale-95"
                onClick={() => trackNavigation("Contact CTA", "/kontak")}
              >
                <span className="relative z-10">{t("contact")}</span>
                <div className="absolute inset-0 z-0 translate-y-full bg-linear-to-r from-purple-600 to-blue-600 transition-transform duration-300 group-hover:translate-y-0" />
              </Link>
            </div>
          </div>

          <button
            ref={menuToggleRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-900 transition-colors md:hidden dark:bg-gray-800 dark:text-white"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="text-xl">☰</span>
          </button>
        </div>

        {isMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="animate-in slide-in-from-top-4 fade-in absolute top-full left-0 mt-4 w-full origin-top duration-200"
          >
            <div className="mx-auto w-[95%] overflow-hidden rounded-3xl border border-white/20 bg-white/90 p-4 shadow-2xl backdrop-blur-2xl dark:border-gray-700/50 dark:bg-gray-900/90">
              <div className="flex flex-col space-y-2">
                {[
                  { label: t("home"), href: "/" },
                  { label: t("about"), href: "/tentang" },
                  { label: t("features"), href: "/produk" },
                  { label: t("contact"), href: "/kontak" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block rounded-xl px-5 py-4 text-base font-bold transition-all ${
                      pathname === link.href
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                        : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => {
                      trackNavigation(link.label, link.href, true);
                      setIsMenuOpen(false);
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
