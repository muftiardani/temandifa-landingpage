"use client";

import { motion } from "framer-motion";
import { fadeInUp, viewportOptions } from "@/styles/animations";
import { useTranslations } from "next-intl";

export default function AboutSection() {
  const t = useTranslations("AboutSection");
  return (
    <motion.section
      className="bg-white px-4 py-10 transition-colors sm:px-8 dark:bg-gray-950"
      aria-labelledby="about-heading"
      initial="initial"
      whileInView="animate"
      viewport={viewportOptions}
      variants={fadeInUp}
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="about-heading"
          className="mb-6 text-center text-4xl font-bold text-blue-600 md:text-5xl dark:text-blue-400"
        >
          {t("title")}
        </h2>
        <p className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed text-gray-600 md:text-xl dark:text-gray-300">
          {t.rich("description", {
            br: () => <br />,
          })}
        </p>
      </div>
    </motion.section>
  );
}
