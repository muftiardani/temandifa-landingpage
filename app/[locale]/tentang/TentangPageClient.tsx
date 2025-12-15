"use client";

import Navbar from "@/components/layout/Navbar";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
  viewportOptions,
} from "@/styles/animations";
import PageTransition from "@/components/ui/PageTransition";

export default function TentangPageClient() {
  const t = useTranslations("AboutPage");

  return (
    <PageTransition>
      <main className="min-h-screen bg-white transition-colors dark:bg-gray-950">
        <Navbar />
        <Breadcrumbs />
        <motion.section
          className="mx-auto max-w-4xl px-4 py-16"
          initial="initial"
          whileInView="animate"
          viewport={viewportOptions}
          variants={fadeInUp}
        >
          <h1 className="mb-8 text-4xl font-bold text-blue-600 md:text-5xl dark:text-blue-400">
            {t("title")}
          </h1>
          <motion.div
            className="space-y-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportOptions}
          >
            <p>{t("description_1")}</p>
            <p>{t("description_2")}</p>
            <motion.div
              className="mt-8 rounded-2xl bg-blue-50 p-8 transition-colors dark:bg-gray-800"
              variants={fadeInUp}
            >
              <h2 className="mb-4 text-2xl font-bold text-blue-600 dark:text-blue-400">
                {t("vision_title")}
              </h2>
              <p>{t("vision_text")}</p>
            </motion.div>
            <motion.div
              className="rounded-2xl bg-yellow-50 p-8 transition-colors dark:bg-gray-800"
              variants={fadeInUp}
            >
              <h2 className="mb-4 text-2xl font-bold text-blue-600 dark:text-blue-400">
                {t("mission_title")}
              </h2>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="font-bold text-yellow-500 dark:text-yellow-400">
                    •
                  </span>
                  <span>{t("mission_1")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-yellow-500 dark:text-yellow-400">
                    •
                  </span>
                  <span>{t("mission_2")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-yellow-500 dark:text-yellow-400">
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
