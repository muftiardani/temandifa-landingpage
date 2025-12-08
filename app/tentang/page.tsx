import Navbar from "@/components/layout/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami - TemanDifa",
  description: "Tentang TemanDifa dan misi kami untuk aksesibilitas difabel",
};

export default function TentangPage() {
  return (
    <main className="bg-white dark:bg-gray-950 min-h-screen transition-colors">
      <Navbar />
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-8">
          Tentang TemanDifa
        </h1>
        <div className="space-y-6 text-slate-700 dark:text-gray-300 text-lg leading-relaxed">
          <p>
            TemanDifa lahir dari kepedulian terhadap aksesibilitas bagi difabel.
            Kami percaya bahwa teknologi seharusnya menjadi jembatan, bukan
            penghalang.
          </p>
          <p>
            Dengan menggabungkan Artificial Intelligence, TemanDifa hadir untuk
            memudahkan difabel dalam beraktivitas, belajar dan berkomunikasi
            secara mandiri.
          </p>
          <div className="bg-blue-50 dark:bg-gray-800 p-8 rounded-2xl mt-8 transition-colors">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              Visi Kami
            </h2>
            <p>
              Menjadi platform teknologi terdepan yang memberdayakan penyandang
              disabilitas untuk hidup mandiri dan percaya diri dalam menjalani
              aktivitas sehari-hari.
            </p>
          </div>
          <div className="bg-yellow-50 dark:bg-gray-800 p-8 rounded-2xl transition-colors">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              Misi Kami
            </h2>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-yellow-500 dark:text-yellow-400 font-bold">
                  •
                </span>
                <span>
                  Menyediakan teknologi AI yang mudah diakses untuk difabel
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-yellow-500 dark:text-yellow-400 font-bold">
                  •
                </span>
                <span>Meningkatkan kemandirian penyandang disabilitas</span>
              </li>
              <li className="flex gap-3">
                <span className="text-yellow-500 dark:text-yellow-400 font-bold">
                  •
                </span>
                <span>Menciptakan inklusi digital tanpa batas</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
