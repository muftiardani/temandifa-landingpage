"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportOptions } from "@/lib/animations";

export default function AboutSection() {
  return (
    <motion.section
      className="bg-white dark:bg-gray-950 py-10 px-4 sm:px-8 transition-colors"
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
          TemanDifa lahir dari kepedulian terhadap aksesibilitas bagi difabel,
          Kami percaya bahwa teknologi seharusnya menjadi jembatan, bukan
          penghalang. Dengan menggabungkan Artificial Intelligence, TemanDifa
          hadir untuk memudahkan difabel dalam beraktivitas, belajar, dan
          berkomunikasi secara mandiri.
        </p>
      </div>
    </motion.section>
  );
}
