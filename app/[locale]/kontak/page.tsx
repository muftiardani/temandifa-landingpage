import Navbar from "@/components/layout/Navbar";
import ContactForm from "@/components/forms/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak - TemanDifa",
  description:
    "Hubungi TemanDifa untuk informasi lebih lanjut tentang aplikasi aksesibilitas untuk penyandang disabilitas",
};

export default function KontakPage() {
  return (
    <main className="bg-white dark:bg-gray-950 min-h-screen transition-colors">
      <Navbar />
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4 text-center">
          Hubungi Kami
        </h1>
        <p className="text-center text-slate-600 dark:text-gray-300 text-lg mb-12">
          Kami siap membantu Anda. Jangan ragu untuk menghubungi kami!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Email */}
          <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-2xl hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-500 dark:bg-blue-600 w-10 h-10 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">✉️</span>
              </div>
              <h3 className="font-bold text-lg text-blue-600 dark:text-blue-400">
                Email
              </h3>
            </div>
            <a
              href="mailto:hello@temandifa.com"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              aria-label="Kirim email ke hello@temandifa.com"
            >
              hello@temandifa.com
            </a>
          </div>

          {/* Social Media */}
          <div className="bg-yellow-50 dark:bg-gray-800 p-6 rounded-2xl hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-yellow-400 dark:bg-yellow-500 w-10 h-10 rounded-xl flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-900 text-xl">
                  🌐
                </span>
              </div>
              <h3 className="font-bold text-lg text-blue-600 dark:text-blue-400">
                Social Media
              </h3>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <a
                  href="https://instagram.com/temandifa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                  aria-label="Kunjungi Instagram TemanDifa"
                >
                  Instagram
                </a>
              </div>
              <div>
                <a
                  href="https://tiktok.com/@temandifa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                  aria-label="Kunjungi TikTok TemanDifa"
                >
                  TikTok
                </a>
              </div>
              <div>
                <a
                  href="https://linkedin.com/company/temandifa-com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                  aria-label="Kunjungi LinkedIn TemanDifa"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Office */}
          <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-2xl hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-500 dark:bg-blue-600 w-10 h-10 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">📍</span>
              </div>
              <h3 className="font-bold text-lg text-blue-600 dark:text-blue-400">
                Kantor
              </h3>
            </div>
            <p className="text-slate-700 dark:text-gray-300 text-sm">
              Jakarta, Indonesia
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-3xl transition-colors">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6 text-center">
            Kirim Pesan
          </h2>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
