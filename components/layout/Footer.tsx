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
            <ul className="space-y-3 text-blue-100 dark:text-gray-300 font-semibold text-sm">
              <li>
                <a
                  href="https://instagram.com/temandifa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline transition"
                  aria-label="Kunjungi Instagram TemanDifa"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com/@temandifa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline transition"
                  aria-label="Kunjungi TikTok TemanDifa"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/temandifa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline transition"
                  aria-label="Kunjungi LinkedIn TemanDifa"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Bantuan</h4>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-1 inline-block w-full max-w-[250px]">
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
