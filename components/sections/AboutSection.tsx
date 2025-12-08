"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportOptions } from "@/lib/animations";

export default function AboutSection() {
  return (
    <motion.section
      className="bg-white dark:bg-gray-950 py-16 px-4 sm:px-8 transition-colors"
      initial="initial"
      whileInView="animate"
      viewport={viewportOptions}
      variants={fadeInUp}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-6 text-center">
          Tentang TemanDifa
        </h2>
        <p className="text-slate-600 dark:text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-center mb-12">
          TemanDifa adalah aplikasi yang dirancang khusus untuk membantu
          penyandang disabilitas dalam kehidupan sehari-hari.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="bg-blue-50 dark:bg-gray-800 p-8 rounded-2xl hover:shadow-lg transition-shadow"
            variants={fadeInUp}
          >
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              Visi Kami
            </h3>
            <p className="text-slate-700 dark:text-gray-300 leading-relaxed">
              Menjadi platform aksesibilitas terdepan yang memberdayakan
              penyandang disabilitas untuk hidup mandiri dan produktif.
            </p>
          </motion.div>

          <motion.div
            className="bg-yellow-50 dark:bg-gray-800 p-8 rounded-2xl hover:shadow-lg transition-shadow"
            variants={fadeInUp}
          >
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              Misi Kami
            </h3>
            <p className="text-slate-700 dark:text-gray-300 leading-relaxed">
              Menyediakan teknologi AI yang mudah diakses untuk membantu
              penyandang disabilitas dalam komunikasi, mobilitas, dan aktivitas
              sehari-hari.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
