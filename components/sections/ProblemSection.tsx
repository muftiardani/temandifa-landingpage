"use client";

import { motion } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
  viewportOptions,
} from "@/styles/animations";
import { useTranslations } from "next-intl";
import Counter from "@/components/ui/Counter";

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
          className="flex flex-col justify-center space-y-8 text-lg leading-relaxed text-gray-700 md:pr-12 dark:text-gray-300"
          initial="initial"
          whileInView="animate"
          viewport={viewportOptions}
          variants={fadeInUp}
        >
          <p>
            {t("global_stats_prefix")}{" "}
            <span className="mx-1 rounded bg-yellow-400 px-2 py-0.5 font-bold text-[#3b82f6] dark:bg-yellow-500 dark:text-blue-900">
              <Counter end={2.2} decimals={1} />{" "}
              {t("global_stats_highlight")
                .replace(/2[.,]2/, "")
                .trim()}
            </span>
            {t.rich("global_stats_suffix", {
              br: () => <br />,
            })}
          </p>
          <p>
            {t("local_stats_prefix")}{" "}
            <span className="mx-1 rounded bg-yellow-400 px-2 py-0.5 font-bold text-[#3b82f6] dark:bg-yellow-500 dark:text-blue-900">
              <Counter end={4} decimals={0} />{" "}
              {t("local_stats_highlight").replace(/4/, "").trim()}
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
              className="flex h-14 items-stretch gap-3 md:h-16"
              variants={fadeInUp}
            >
              <div className="flex w-14 shrink-0 items-center justify-center rounded-md bg-[#3b82f6] text-4xl font-bold text-white shadow-sm md:w-16 dark:bg-blue-600">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="flex flex-1 items-center rounded-md border-2 border-[#3b82f6] bg-white px-6 dark:border-blue-500 dark:bg-gray-800">
                <span className="text-base font-bold text-[#3b82f6] md:text-lg dark:text-blue-300">
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
