"use client";

import { motion } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
  viewportOptions,
} from "@/styles/animations";
import { useTranslations } from "next-intl";

export default function ProblemSection() {
  const t = useTranslations("ProblemSection");
  const problems = ["item1", "item2", "item3", "item4"] as const;

  return (
    <section
      className="relative mx-auto max-w-7xl overflow-hidden bg-white px-4 py-10 transition-colors md:overflow-visible dark:bg-gray-950"
      aria-labelledby="problem-heading"
    >
      <motion.div
        className="relative z-10 mb-12 flex"
        initial="initial"
        whileInView="animate"
        viewport={viewportOptions}
        variants={fadeInUp}
      >
        <div className="mr-6 h-auto w-2 self-stretch rounded-full bg-yellow-400 dark:bg-yellow-500"></div>
        <h2
          id="problem-heading"
          className="text-4xl leading-tight font-bold text-[#3b82f6] md:text-5xl dark:text-blue-400"
        >
          {t.rich("subtitle", {
            br: () => <br />,
          })}
        </h2>
      </motion.div>

      <div className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-2">
        <motion.div
          className="flex h-full flex-col justify-between gap-6"
          initial="initial"
          whileInView="animate"
          viewport={viewportOptions}
          variants={fadeInUp}
        >
          {/* Stats Card 1 */}
          <div className="flex flex-1 flex-col justify-center rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50">
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              {t("global_stats_prefix")}{" "}
              <span className="mt-1 block bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent dark:from-blue-400 dark:to-indigo-400">
                2.2{" "}
                {t("global_stats_highlight")
                  .replace(/2[.,]2/, "")
                  .trim()}
              </span>
              <span className="mt-1 block text-sm text-slate-500 dark:text-slate-400">
                {t.rich("global_stats_suffix", {
                  br: () => " ",
                })}
              </span>
            </p>
          </div>

          {/* Stats Card 2 */}
          <div className="flex flex-1 flex-col justify-center rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50">
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              {t("local_stats_prefix")}{" "}
              <span className="mt-1 block bg-linear-to-r from-yellow-500 to-orange-500 bg-clip-text text-3xl font-bold text-transparent">
                4 {t("local_stats_highlight").replace(/4/, "").trim()}
              </span>
              <span className="mt-1 block text-sm text-slate-500 dark:text-slate-400">
                {t.rich("local_stats_suffix", {
                  br: () => " ",
                })}
              </span>
            </p>
          </div>
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
              className="flex items-stretch gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:border-blue-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800"
              variants={fadeInUp}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100/50 text-xl font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="flex flex-1 items-center">
                <span className="text-base font-medium text-slate-700 dark:text-slate-300">
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
