"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 transition-colors">
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
          />
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Teman
            <span className="text-yellow-500 dark:text-yellow-400">Difa</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-blue-500 dark:text-blue-400 font-medium">
          <Link
            href="/"
            className="hover:text-blue-700 dark:hover:text-blue-300 transition"
            aria-label="Navigasi ke halaman beranda"
          >
            Beranda
          </Link>
          <Link
            href="/tentang"
            className="hover:text-blue-700 dark:hover:text-blue-300 transition"
            aria-label="Navigasi ke halaman tentang kami"
          >
            Tentang
          </Link>
          <Link
            href="/produk"
            className="hover:text-blue-700 dark:hover:text-blue-300 transition"
            aria-label="Navigasi ke halaman produk"
          >
            Produk
          </Link>

          <Link
            href="/kontak"
            className="bg-blue-500 dark:bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-600 dark:hover:bg-blue-700 transition shadow-md"
            aria-label="Navigasi ke halaman kontak"
          >
            Kontak
          </Link>

          <ThemeToggle />
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 z-50"
          aria-label="Toggle menu"
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
          <div className="absolute top-full left-0 w-screen bg-white dark:bg-gray-900 shadow-lg md:hidden z-40 border-t border-gray-200 dark:border-gray-700 transition-colors -mx-4 sm:-mx-8">
            <div className="flex flex-col gap-4 p-6">
              <Link
                href="/"
                className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Beranda
              </Link>
              <Link
                href="/tentang"
                className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Tentang
              </Link>
              <Link
                href="/produk"
                className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Produk
              </Link>
              <Link
                href="/kontak"
                className="bg-blue-500 dark:bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-600 dark:hover:bg-blue-700 transition shadow-md text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Kontak
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
