"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportOptions } from "@/lib/animations";
import { useTranslations } from "next-intl";

export default function ProblemSection() {
  const t = useTranslations("ProblemSection");
  const problems = ["item1", "item2", "item3", "item4"] as const;

  return (
    <section className="py-10 px-4 max-w-7xl mx-auto relative overflow-hidden md:overflow-visible bg-white dark:bg-gray-950 transition-colors">
      <motion.div
        className="mb-12 flex relative z-10"
        initial="initial"
        whileInView="animate"
        viewport={viewportOptions}
        variants={fadeInUp}
      >
        <div className="w-2 bg-yellow-400 dark:bg-yellow-500 mr-6 rounded-full h-auto self-stretch"></div>
        <h2 className="text-4xl md:text-5xl font-bold text-[#3b82f6] dark:text-blue-400 leading-tight">
          {t.rich("subtitle", {
            br: () => <br />,
          })}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
        <motion.div
          className="space-y-8 text-slate-700 dark:text-gray-300 text-lg md:pr-12 leading-relaxed flex flex-col justify-center"
          initial="initial"
          whileInView="animate"
          viewport={viewportOptions}
          variants={fadeInUp}
        >
          <p>
            {t("global_stats_prefix")}{" "}
            <span className="bg-yellow-400 dark:bg-yellow-500 px-2 py-0.5 mx-1 rounded font-bold text-[#3b82f6] dark:text-blue-900">
              {t("global_stats_highlight")}
            </span>
            {t.rich("global_stats_suffix", {
              br: () => <br />,
            })}
          </p>
          <p>
            {t("local_stats_prefix")}{" "}
            <span className="bg-yellow-400 dark:bg-yellow-500 px-2 py-0.5 mx-1 rounded font-bold text-[#3b82f6] dark:text-blue-900">
              {t("local_stats_highlight")}
            </span>
            {t.rich("local_stats_suffix", {
              br: () => <br />,
            })}
          </p>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial="initial"
          whileInView="animate"
          viewport={viewportOptions}
          variants={staggerContainer}
        >
          {problems.map((key, index) => (
            <motion.div
              key={index}
              className="flex items-stretch gap-3 h-14 md:h-16"
              variants={fadeInUp}
            >
              <div className="bg-[#3b82f6] dark:bg-blue-600 w-14 md:w-16 flex items-center justify-center rounded-md text-white text-4xl font-bold shadow-sm shrink-0">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="flex-1 border-2 border-[#3b82f6] dark:border-blue-500 rounded-md bg-white dark:bg-gray-800 px-6 flex items-center">
                <span className="text-[#3b82f6] dark:text-blue-300 font-bold text-base md:text-lg">
                  {t(`problems.${key}`)}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
