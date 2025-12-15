"use client";

import Navbar from "@/components/layout/Navbar";
import ContactForm from "@/components/forms/ContactForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  viewportOptions,
} from "@/styles/animations";
import PageTransition from "@/components/ui/PageTransition";

export default function KontakPageClient() {
  const t = useTranslations("ContactPage");

  return (
    <PageTransition>
      <main className="min-h-screen bg-white transition-colors dark:bg-gray-950">
        <Navbar />
        <Breadcrumbs />
        <section className="mx-auto max-w-4xl px-4 py-16">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportOptions}
            variants={fadeInUp}
          >
            <h1 className="mb-4 text-center text-4xl font-bold text-blue-600 md:text-5xl dark:text-blue-400">
              {t("title")}
            </h1>
            <p className="mb-12 text-center text-lg text-gray-600 dark:text-gray-300">
              {t("subtitle")}
            </p>
          </motion.div>

          <motion.div
            className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportOptions}
          >
            {/* Email */}
            <motion.div
              className="rounded-2xl border-2 border-transparent bg-blue-50 p-6 transition-all duration-300 hover:scale-105 hover:border-blue-500 hover:shadow-2xl dark:bg-gray-800 dark:hover:border-blue-600"
              variants={fadeInLeft}
            >
              <div className="mb-3 flex items-center gap-3">
                <motion.div
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 dark:bg-blue-600"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-xl text-white">✉️</span>
                </motion.div>
                <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {t("email_label")}
                </h3>
              </div>
              <a
                href="mailto:hello@temandifa.com"
                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                aria-label="Kirim email ke hello@temandifa.com"
              >
                hello@temandifa.com
              </a>
            </motion.div>

            {/* Office */}
            <motion.div
              className="rounded-2xl border-2 border-transparent bg-blue-50 p-6 transition-all duration-300 hover:scale-105 hover:border-blue-500 hover:shadow-2xl dark:bg-gray-800 dark:hover:border-blue-600"
              variants={fadeInRight}
            >
              <div className="mb-3 flex items-center gap-3">
                <motion.div
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 dark:bg-blue-600"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-xl text-white">📍</span>
                </motion.div>
                <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {t("office_label")}
                </h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {t("office_address")}
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="rounded-3xl bg-gray-50 p-8 transition-colors dark:bg-gray-800"
            initial="initial"
            whileInView="animate"
            viewport={viewportOptions}
            variants={fadeInUp}
            transition={{ delay: 0.3 }}
          >
            <h2 className="mb-6 text-center text-2xl font-bold text-blue-600 dark:text-blue-400">
              {t("form_title")}
            </h2>
            <ContactForm />
          </motion.div>
        </section>
      </main>
    </PageTransition>
  );
}
