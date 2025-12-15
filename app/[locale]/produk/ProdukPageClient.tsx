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

export default function ProdukPageClient() {
  const t = useTranslations("ProductPage");

  return (
    <PageTransition>
      <main className="min-h-screen bg-white transition-colors dark:bg-gray-950">
        <Navbar />
        <Breadcrumbs />
        <section className="mx-auto max-w-6xl px-4 py-16">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportOptions}
            variants={fadeInUp}
          >
            <h1 className="mb-4 text-center text-4xl font-bold text-blue-600 md:text-5xl dark:text-blue-400">
              {t("title")}
            </h1>
            <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-300">
              {t("subtitle")}
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-2"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportOptions}
          >
            {/* Feature 1 */}
            <motion.div
              className="rounded-2xl border-2 border-blue-500 bg-white p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-blue-600 dark:bg-gray-800"
              variants={fadeInUp}
            >
              <motion.div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-blue-500 dark:bg-blue-600"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-3xl text-white">📷</span>
              </motion.div>
              <h3 className="mb-4 text-2xl font-bold text-blue-600 dark:text-blue-400">
                {t("features.detection_title")}
              </h3>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                {t("features.detection_desc")}
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="rounded-2xl border-2 border-blue-500 bg-white p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-blue-600 dark:bg-gray-800"
              variants={fadeInUp}
            >
              <motion.div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-yellow-400 dark:bg-yellow-500"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-3xl text-blue-600 dark:text-blue-900">
                  🎤
                </span>
              </motion.div>
              <h3 className="mb-4 text-2xl font-bold text-blue-600 dark:text-blue-400">
                {t("features.voice_title")}
              </h3>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                {t("features.voice_desc")}
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className="rounded-2xl border-2 border-blue-500 bg-white p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-blue-600 dark:bg-gray-800"
              variants={fadeInUp}
            >
              <motion.div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-blue-500 dark:bg-blue-600"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-3xl text-white">📄</span>
              </motion.div>
              <h3 className="mb-4 text-2xl font-bold text-blue-600 dark:text-blue-400">
                {t("features.scan_title")}
              </h3>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                {t("features.scan_desc")}
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              className="rounded-2xl border-2 border-blue-500 bg-white p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-blue-600 dark:bg-gray-800"
              variants={fadeInUp}
            >
              <motion.div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-yellow-400 dark:bg-yellow-500"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-3xl text-blue-600 dark:text-blue-900">
                  📞
                </span>
              </motion.div>
              <h3 className="mb-4 text-2xl font-bold text-blue-600 dark:text-blue-400">
                {t("features.emergency_title")}
              </h3>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                {t("features.emergency_desc")}
              </p>
            </motion.div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="mt-16 rounded-3xl bg-blue-600 p-12 text-center text-white transition-colors dark:bg-blue-700"
            initial="initial"
            whileInView="animate"
            viewport={viewportOptions}
            variants={fadeInUp}
          >
            <h2 className="mb-4 text-3xl font-bold">{t("cta_title")}</h2>
            <p className="mx-auto mb-6 max-w-2xl text-lg text-blue-100 dark:text-blue-200">
              {t("cta_desc")}
            </p>
            <button className="rounded-full bg-yellow-400 px-8 py-3 text-lg font-bold text-blue-600 transition hover:bg-yellow-300 dark:bg-yellow-500 dark:text-blue-900 dark:hover:bg-yellow-400">
              {t("cta_button")}
            </button>
          </motion.div>
        </section>
      </main>
    </PageTransition>
  );
}
