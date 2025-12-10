"use client";

import Navbar from "@/components/layout/Navbar";
import ContactForm from "@/components/forms/ContactForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeInUp, fadeInRight, staggerContainer, viewportOptions } from "@/lib/animations";
import PageTransition from "@/components/ui/PageTransition";

export default function ContactPage() {
  const t = useTranslations("ContactPage");

  return (
    <PageTransition>
      <main className="bg-white dark:bg-gray-950 min-h-screen transition-colors">
      <Navbar />
      <Breadcrumbs />
      <section className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={viewportOptions}
          variants={fadeInUp}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4 text-center">
            {t("title")}
          </h1>
          <p className="text-center text-slate-600 dark:text-gray-300 text-lg mb-12">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportOptions}
        >
          {/* Email */}
          <motion.div 
            className="bg-blue-50 dark:bg-gray-800 p-6 rounded-2xl border-2 border-transparent
                       hover:border-blue-500 dark:hover:border-blue-600
                       hover:shadow-2xl hover:scale-105 transition-all duration-300"
            variants={fadeInUp}
          >
            <div className="flex items-center gap-3 mb-3">
              <motion.div 
                className="bg-blue-500 dark:bg-blue-600 w-10 h-10 rounded-xl flex items-center justify-center"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-white text-xl">✉️</span>
              </motion.div>
              <h3 className="font-bold text-lg text-blue-600 dark:text-blue-400">
                {t("email_label")}
              </h3>
            </div>
            <a
              href="mailto:hello@temandifa.com"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              aria-label="Kirim email ke hello@temandifa.com"
            >
              hello@temandifa.com
            </a>
          </motion.div>

          {/* Social Media */}
          <motion.div 
            className="bg-yellow-50 dark:bg-gray-800 p-6 rounded-2xl border-2 border-transparent
                       hover:border-yellow-400 dark:hover:border-yellow-500
                       hover:shadow-2xl hover:scale-105 transition-all duration-300"
            variants={fadeInUp}
          >
            <div className="flex items-center gap-3 mb-3">
              <motion.div 
                className="bg-yellow-400 dark:bg-yellow-500 w-10 h-10 rounded-xl flex items-center justify-center"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-blue-600 dark:text-blue-900 text-xl">🌐</span>
              </motion.div>
              <h3 className="font-bold text-lg text-blue-600 dark:text-blue-400">
                {t("social_label")}
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
          </motion.div>

          {/* Office */}
          <motion.div 
            className="bg-blue-50 dark:bg-gray-800 p-6 rounded-2xl border-2 border-transparent
                       hover:border-blue-500 dark:hover:border-blue-600
                       hover:shadow-2xl hover:scale-105 transition-all duration-300"
            variants={fadeInUp}
          >
            <div className="flex items-center gap-3 mb-3">
              <motion.div 
                className="bg-blue-500 dark:bg-blue-600 w-10 h-10 rounded-xl flex items-center justify-center"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-white text-xl">📍</span>
              </motion.div>
              <h3 className="font-bold text-lg text-blue-600 dark:text-blue-400">
                {t("office_label")}
              </h3>
            </div>
            <p className="text-slate-700 dark:text-gray-300 text-sm">
              {t("office_address")}
            </p>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          className="bg-gray-50 dark:bg-gray-800 p-8 rounded-3xl transition-colors"
          initial="initial"
          whileInView="animate"
          viewport={viewportOptions}
          variants={fadeInRight}
        >
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6 text-center">
            {t("form_title")}
          </h2>
          <ContactForm />
        </motion.div>
      </section>
    </main>
    </PageTransition>
  );
}
