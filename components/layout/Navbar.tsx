"use client";

import Image from "next/image";
import { useState, useTransition, useEffect, useRef } from "react";
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

  const toggleLanguage = () => {
    const nextLocale = locale === "id" ? "en" : "id";
    trackLanguage(nextLocale);
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

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
    <header className="sticky top-0 z-50 w-full 
                       bg-white/70 dark:bg-gray-900/70 
                       backdrop-blur-xl backdrop-saturate-150
                       border-b border-white/20 dark:border-gray-700/20
                       shadow-lg shadow-black/5
                       transition-colors">
      <nav
        className="w-full py-4 px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between relative"
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

        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            data-testid="nav-home"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            onClick={() => trackNavigation("Home", "/")}
          >
            {t("home")}
          </Link>
          <Link
            href="/tentang"
            data-testid="nav-about"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            onClick={() => trackNavigation("About", "/tentang")}
          >
            {t("about")}
          </Link>
          <Link
            href="/produk"
            data-testid="nav-features"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            onClick={() => trackNavigation("Features", "/produk")}
          >
            {t("features")}
          </Link>

          <Link
            href="/kontak"
            data-testid="nav-contact"
            className="bg-blue-500 dark:bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-600 dark:hover:bg-blue-700 transition shadow-md"
            onClick={() => trackNavigation("Contact CTA", "/kontak")}
          >
            {t("contact")}
          </Link>

          <button
            onClick={toggleLanguage}
            disabled={isPending}
            className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 hover:opacity-80 transition-opacity"
            aria-label="Switch language"
          >
            {locale === "id" ? (
              <div className="w-full h-full bg-red-600 relative">
                <div className="absolute top-0 w-full h-1/2 bg-red-600"></div>
                <div className="absolute bottom-0 w-full h-1/2 bg-white"></div>
              </div>
            ) : (
              <div className="w-full h-full bg-blue-800 relative flex items-center justify-center text-[10px] text-white font-bold">
                EN
              </div>
            )}
          </button>

          <ThemeToggle />
        </div>

        <button
          ref={menuToggleRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 z-50"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`w-6 h-0.5 bg-blue-600 transition-transform duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-blue-600 transition-opacity duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-blue-600 transition-transform duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
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
            className="absolute top-full left-0 w-screen bg-white dark:bg-gray-900 shadow-lg md:hidden z-40 border-t border-gray-200 dark:border-gray-700 transition-colors -mx-4 sm:-mx-8"
          >
            <div className="flex flex-col gap-4 p-6">
              <Link
                href="/"
                data-testid="mobile-nav-home"
                className="block py-3 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={() => { trackNavigation("Home", "/", true); setIsMenuOpen(false); }}
              >
                {t("home")}
              </Link>
              <Link
                href="/tentang"
                data-testid="mobile-nav-about"
                className="block py-3 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={() => { trackNavigation("About", "/tentang", true); setIsMenuOpen(false); }}
              >
                {t("about")}
              </Link>
              <Link
                href="/produk"
                data-testid="mobile-nav-features"
                className="block py-3 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={() => { trackNavigation("Features", "/produk", true); setIsMenuOpen(false); }}
              >
                {t("features")}
              </Link>
              <Link
                href="/kontak"
                data-testid="mobile-nav-contact"
                className="block py-3 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={() => { trackNavigation("Contact", "/kontak", true); setIsMenuOpen(false); }}
              >
                {t("contact")}
              </Link>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                <span className="text-gray-600 dark:text-gray-400">Bahasa</span>
                <button
            onClick={toggleLanguage}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={`Switch to ${locale === "id" ? "English" : "Bahasa Indonesia"}`}
            title={locale === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
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
