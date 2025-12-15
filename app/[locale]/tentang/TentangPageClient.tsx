"use client";

import Navbar from "@/components/layout/Navbar";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportOptions } from "@/styles/animations";
import PageTransition from "@/components/ui/PageTransition";

export default function TentangPageClient() {
  const t = useTranslations("AboutPage");

  return (
    <PageTransition>
      <main className="bg-white dark:bg-gray-950 min-h-screen transition-colors">
      <Navbar />
      <Breadcrumbs />
      <motion.section 
        className="max-w-4xl mx-auto px-4 py-16"
        initial="initial"
        whileInView="animate"
        viewport={viewportOptions}
        variants={fadeInUp}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-8">
          {t("title")}
        </h1>
        <motion.div 
          className="space-y-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportOptions}
        >
          <p>{t("description_1")}</p>
          <p>{t("description_2")}</p>
          <motion.div 
            className="bg-blue-50 dark:bg-gray-800 p-8 rounded-2xl mt-8 transition-colors"
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              {t("vision_title")}
            </h2>
            <p>{t("vision_text")}</p>
          </motion.div>
          <motion.div 
            className="bg-yellow-50 dark:bg-gray-800 p-8 rounded-2xl transition-colors"
            variants={fadeInUp}
          >
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
          </motion.div>
        </motion.div>
      </motion.section>
    </main>
    </PageTransition>
  );
}
