import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="bg-[#3b82f6] dark:bg-gray-900 text-white pt-16 pb-8 px-4 sm:px-8 border-t border-blue-400 dark:border-gray-700 transition-colors"
      role="contentinfo"
      aria-label="Footer situs"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-blue-400 dark:border-gray-700 pb-12 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="TemanDifa logo"
                width={150}
                height={150}
                className="w-8 h-8 object-contain"
              />
              <span className="text-2xl font-bold">TemanDifa.</span>
            </div>
            <p className="text-blue-100 dark:text-gray-300 text-sm font-semibold leading-relaxed">
              Melihat dengan percaya diri,
              <br />
              Mendengar dengan jelas,
              <br />
              Menjadi bantuan saat dibutuhkan.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Beranda</h4>
            <ul className="space-y-3 text-blue-100 dark:text-gray-300 font-semibold text-sm">
              <li>
                <Link
                  href="/tentang"
                  className="hover:text-white hover:underline transition"
                  aria-label="Link ke halaman tentang kami"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href="/produk"
                  className="hover:text-white hover:underline transition"
                  aria-label="Link ke halaman produk"
                >
                  Produk
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Social Media</h4>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/temandifa"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all hover:scale-110"
                aria-label="Kunjungi Instagram TemanDifa"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              <a
                href="https://tiktok.com/@temandifa"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all hover:scale-110"
                aria-label="Kunjungi TikTok TemanDifa"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>

              <a
                href="https://linkedin.com/company/temandifa-com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all hover:scale-110"
                aria-label="Kunjungi LinkedIn TemanDifa"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Bantuan</h4>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-1 inline-block w-full max-w-[200px]">
              <a
                href="mailto:hello@temandifa.com"
                className="block w-full text-center text-blue-600 dark:text-blue-400 font-bold py-2 px-4 rounded hover:bg-slate-100 dark:hover:bg-gray-700 transition"
                aria-label="Kirim email ke hello@temandifa.com"
              >
                hello@temandifa.com
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-blue-200 dark:text-gray-400 text-sm font-medium">
          © 2025 TemanDifa.com. Hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
}
