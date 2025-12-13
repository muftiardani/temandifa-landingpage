"use client";

import Navbar from "@/components/layout/Navbar";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportOptions } from "@/styles/animations";
import PageTransition from "@/components/ui/PageTransition";

export default function ProdukPage() {
  const t = useTranslations("ProductPage");

  return (
    <PageTransition>
      <main className="bg-white dark:bg-gray-950 min-h-screen transition-colors">
      <Navbar />
      <Breadcrumbs />
      <section className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={viewportOptions}
          variants={fadeInUp}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4 text-center">
            {t("title")}
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportOptions}
        >
          {/* Feature 1 */}
          <motion.div 
            className="border-2 border-blue-500 dark:border-blue-600 rounded-2xl p-8 
                       hover:shadow-2xl hover:scale-105 transition-all duration-300 
                       bg-white dark:bg-gray-800"
            variants={fadeInUp}
          >
            <motion.div 
              className="bg-blue-500 dark:bg-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-4"
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-white text-3xl">📷</span>
            </motion.div>
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              {t("features.detection_title")}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t("features.detection_desc")}
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div 
            className="border-2 border-blue-500 dark:border-blue-600 rounded-2xl p-8 
                       hover:shadow-2xl hover:scale-105 transition-all duration-300 
                       bg-white dark:bg-gray-800"
            variants={fadeInUp}
          >
            <motion.div 
              className="bg-yellow-400 dark:bg-yellow-500 w-16 h-16 rounded-xl flex items-center justify-center mb-4"
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-blue-600 dark:text-blue-900 text-3xl">🎤</span>
            </motion.div>
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              {t("features.voice_title")}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t("features.voice_desc")}
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div 
            className="border-2 border-blue-500 dark:border-blue-600 rounded-2xl p-8 
                       hover:shadow-2xl hover:scale-105 transition-all duration-300 
                       bg-white dark:bg-gray-800"
            variants={fadeInUp}
          >
            <motion.div 
              className="bg-blue-500 dark:bg-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-4"
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-white text-3xl">📄</span>
            </motion.div>
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              {t("features.scan_title")}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t("features.scan_desc")}
            </p>
          </motion.div>

          {/* Feature 4 */}
          <motion.div 
            className="border-2 border-blue-500 dark:border-blue-600 rounded-2xl p-8 
                       hover:shadow-2xl hover:scale-105 transition-all duration-300 
                       bg-white dark:bg-gray-800"
            variants={fadeInUp}
          >
            <motion.div 
              className="bg-yellow-400 dark:bg-yellow-500 w-16 h-16 rounded-xl flex items-center justify-center mb-4"
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-blue-600 dark:text-blue-900 text-3xl">📞</span>
            </motion.div>
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              {t("features.emergency_title")}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t("features.emergency_desc")}
            </p>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="mt-16 bg-blue-600 dark:bg-blue-700 rounded-3xl p-12 text-center text-white transition-colors"
          initial="initial"
          whileInView="animate"
          viewport={viewportOptions}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold mb-4">{t("cta_title")}</h2>
          <p className="text-blue-100 dark:text-blue-200 text-lg mb-6 max-w-2xl mx-auto">
            {t("cta_desc")}
          </p>
          <button className="bg-yellow-400 dark:bg-yellow-500 text-blue-600 dark:text-blue-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-300 dark:hover:bg-yellow-400 transition">
            {t("cta_button")}
          </button>
        </motion.div>
      </section>
    </main>
    </PageTransition>
  );
}
