import Navbar from "@/components/layout/Navbar";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Tentang Kami - TemanDifa",
  description: "Tentang TemanDifa dan misi kami untuk aksesibilitas difabel",
};

export default function TentangPage() {
  const t = useTranslations("AboutPage");

  return (
    <main className="bg-white dark:bg-gray-950 min-h-screen transition-colors">
      <Navbar />
      <Breadcrumbs />
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-8">
          {t("title")}
        </h1>
        <div className="space-y-6 text-slate-700 dark:text-gray-300 text-lg leading-relaxed">
          <p>{t("description_1")}</p>
          <p>{t("description_2")}</p>
          <div className="bg-blue-50 dark:bg-gray-800 p-8 rounded-2xl mt-8 transition-colors">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              {t("vision_title")}
            </h2>
            <p>{t("vision_text")}</p>
          </div>
          <div className="bg-yellow-50 dark:bg-gray-800 p-8 rounded-2xl transition-colors">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              {t("mission_title")}
            </h2>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-yellow-500 dark:text-yellow-400 font-bold">
                  •
                </span>
                <span>{t("mission_1")}</span>
              </li>
              <li className="flex gap-3">
                <span className="text-yellow-500 dark:text-yellow-400 font-bold">
                  •
                </span>
                <span>{t("mission_2")}</span>
              </li>
              <li className="flex gap-3">
                <span className="text-yellow-500 dark:text-yellow-400 font-bold">
                  •
                </span>
                <span>{t("mission_3")}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
