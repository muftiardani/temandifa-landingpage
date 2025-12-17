"use client";

import Navbar from "@/components/layout/Navbar";
import ContactForm from "@/components/forms/ContactForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  fadeInUp,
  fadeInLeft,
  staggerContainer,
  viewportOptions,
} from "@/styles/animations";
import PageTransition from "@/components/ui/PageTransition";

export default function KontakPageClient() {
  const t = useTranslations("ContactPage");

  return (
    <PageTransition>
      <main className="relative min-h-screen overflow-hidden bg-white transition-colors dark:bg-gray-950">
        <Navbar />
        <div className="mt-8 md:mt-12">
          <Breadcrumbs />
        </div>

        {/* Decorative Background Elements */}
        <div className="pointer-events-none absolute top-0 -left-40 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[100px] dark:bg-blue-500/20" />
        <div className="pointer-events-none absolute top-40 right-0 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[100px] dark:bg-purple-500/20" />

        <section className="relative z-10 mx-auto max-w-5xl px-4 py-16">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportOptions}
            variants={fadeInUp}
            className="mb-16 text-center"
          >
            <h1 className="mb-6 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-6xl dark:from-blue-400 dark:to-purple-400">
              {t("title")}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              {t("subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <motion.div
              className="flex h-full flex-col gap-6 lg:col-span-1"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={viewportOptions}
            >
              <motion.div variants={fadeInLeft} className="group flex-1">
                <div className="flex h-full flex-col justify-between rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-blue-500/5 transition-all duration-300 hover:border-blue-200 hover:shadow-blue-500/10 dark:border-gray-800 dark:bg-gray-900/50 dark:shadow-none">
                  <div>
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-3xl text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      ✉️
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                      {t("email_label")}
                    </h3>
                    <a
                      href="mailto:hello@temandifa.com"
                      className="text-lg font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      hello@temandifa.com
                    </a>
                  </div>
                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Kami membalas pesan dalam 24 jam kerja.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeInLeft} className="group flex-1">
                <div className="flex h-full flex-col justify-between rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-purple-500/5 transition-all duration-300 hover:border-purple-200 hover:shadow-purple-500/10 dark:border-gray-800 dark:bg-gray-900/50 dark:shadow-none">
                  <div>
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-3xl text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                      📍
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                      {t("office_label")}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t("office_address")}
                    </p>
                  </div>
                  <div className="mt-6 aspect-video w-full overflow-hidden rounded-xl bg-gray-200 grayscale transition-all duration-500 hover:grayscale-0 dark:bg-gray-700" />
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:col-span-2"
              initial="initial"
              whileInView="animate"
              viewport={viewportOptions}
              variants={fadeInUp}
            >
              <div className="relative overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-2xl shadow-blue-500/10 md:p-12 dark:border-gray-800 dark:bg-gray-900/50 dark:shadow-none">
                <div className="absolute top-0 right-0 h-32 w-32 translate-x-10 -translate-y-10 rounded-full bg-linear-to-br from-blue-500/10 to-purple-500/10 blur-2xl" />

                <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
                  {t("form_title")}
                </h2>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
