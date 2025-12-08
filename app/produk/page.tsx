import Navbar from "@/components/layout/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produk - TemanDifa",
  description:
    "Fitur-fitur TemanDifa: Deteksi Objek, Voice to Text, Scan Dokumen, Emergency Call",
};

export default function ProdukPage() {
  return (
    <main className="bg-white dark:bg-gray-950 min-h-screen transition-colors">
      <Navbar />
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4 text-center">
          Fitur TemanDifa
        </h1>
        <p className="text-center text-slate-600 dark:text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
          Teknologi AI yang dirancang khusus untuk membantu penyandang
          disabilitas dalam aktivitas sehari-hari
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature 1: Deteksi Objek */}
          <div className="border-2 border-blue-500 dark:border-blue-600 rounded-2xl p-8 hover:shadow-xl transition-shadow bg-white dark:bg-gray-800">
            <div className="bg-blue-500 dark:bg-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
              <span className="text-white text-3xl">📷</span>
            </div>
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              Deteksi Objek Real-Time
            </h3>
            <p className="text-slate-700 dark:text-gray-300 leading-relaxed">
              Kamera mendeteksi objek di sekitar pengguna secara langsung,
              membantu mengenali kondisi sekitar pengguna dengan teknologi AI.
            </p>
          </div>

          {/* Feature 2: Voice to Text */}
          <div className="border-2 border-blue-500 dark:border-blue-600 rounded-2xl p-8 hover:shadow-xl transition-shadow bg-white dark:bg-gray-800">
            <div className="bg-yellow-400 dark:bg-yellow-500 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
              <span className="text-blue-600 dark:text-blue-900 text-3xl">
                🎤
              </span>
            </div>
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              Voice to Text
            </h3>
            <p className="text-slate-700 dark:text-gray-300 leading-relaxed">
              Mengubah suara menjadi teks sehingga pengguna tunarungu dapat
              mengikuti percakapan dengan mudah dan real-time.
            </p>
          </div>

          {/* Feature 3: Scan & Deteksi Teks */}
          <div className="border-2 border-blue-500 dark:border-blue-600 rounded-2xl p-8 hover:shadow-xl transition-shadow bg-white dark:bg-gray-800">
            <div className="bg-blue-500 dark:bg-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
              <span className="text-white text-3xl">📄</span>
            </div>
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              Scan & Deteksi Teks
            </h3>
            <p className="text-slate-700 dark:text-gray-300 leading-relaxed">
              Memindai dokumen atau tulisan menggunakan kamera, lalu mengubahnya
              menjadi teks atau suara sehingga pengguna dapat langsung mendengar
              isi dokumen.
            </p>
          </div>

          {/* Feature 4: Emergency Call */}
          <div className="border-2 border-blue-500 dark:border-blue-600 rounded-2xl p-8 hover:shadow-xl transition-shadow bg-white dark:bg-gray-800">
            <div className="bg-yellow-400 dark:bg-yellow-500 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
              <span className="text-blue-600 dark:text-blue-900 text-3xl">
                📞
              </span>
            </div>
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              Emergency Call
            </h3>
            <p className="text-slate-700 dark:text-gray-300 leading-relaxed">
              Memberikan opsi untuk terhubung dengan relawan yang siap membantu
              secara langsung melalui panggilan video kapan saja.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-blue-600 dark:bg-blue-700 rounded-3xl p-12 text-center text-white transition-colors">
          <h2 className="text-3xl font-bold mb-4">
            Siap Menggunakan TemanDifa?
          </h2>
          <p className="text-blue-100 dark:text-blue-200 text-lg mb-6 max-w-2xl mx-auto">
            Download aplikasi TemanDifa sekarang dan rasakan kemudahan
            aksesibilitas di ujung jari Anda
          </p>
          <button className="bg-yellow-400 dark:bg-yellow-500 text-blue-600 dark:text-blue-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-300 dark:hover:bg-yellow-400 transition">
            Download Sekarang
          </button>
        </div>
      </section>
    </main>
  );
}
