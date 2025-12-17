"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, viewportOptions } from "@/styles/animations";
import { useTranslations } from "next-intl";
import { CloudBackground } from "@/components/ui/CloudBackground";

export default function ClosingHero() {
  const t = useTranslations("ClosingHero");

  return (
    <section
      className="relative overflow-hidden bg-white px-4 py-20 pb-32 transition-colors md:pt-32 dark:bg-gray-950"
      aria-labelledby="closing-heading"
    >
      <div className="absolute top-0 left-0 z-0 h-96 w-96 -translate-x-1/2 -translate-y-10 rounded-full bg-yellow-400/20 blur-3xl dark:bg-yellow-500/10"></div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 bg-linear-to-b from-transparent to-slate-900/50" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="relative h-[400px] w-full overflow-hidden rounded-[2.5rem] bg-linear-to-br from-blue-600 to-indigo-800 shadow-2xl md:h-[600px] dark:from-blue-900 dark:to-indigo-950"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={viewportOptions}
        >
          <div className="absolute inset-0 z-0 bg-linear-to-br from-blue-400 to-indigo-600 dark:from-blue-900 dark:to-indigo-950">
            <CloudBackground />

            <div className="absolute inset-0 bg-linear-to-t from-blue-600/50 to-transparent mix-blend-multiply dark:from-blue-900/80"></div>
            <div className="absolute inset-0 bg-black/10 dark:bg-black/30"></div>
          </div>

          <div className="absolute -top-12 left-0 z-20 w-full px-4 pt-16 text-center md:pt-24">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={viewportOptions}
              variants={fadeInUp}
            >
              <h2
                id="closing-heading"
                className="mb-6 text-4xl font-bold text-white drop-shadow-lg md:text-5xl"
              >
                {t("title_prefix")}
                <span className="relative ml-2 inline-block">
                  <span className="relative z-10">{t("title_highlight")}</span>
                  <span className="absolute bottom-1 left-0 z-0 h-3 w-full bg-yellow-400/80 blur-sm dark:bg-yellow-500/80"></span>
                </span>
              </h2>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-blue-50 drop-shadow-md md:text-2xl">
                {t.rich("description", {
                  br: () => <br />,
                })}
              </p>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-1/2 z-10 h-[500px] w-full max-w-4xl -translate-x-1/2 md:h-[550px]">
            <motion.div
              className="relative h-full w-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={viewportOptions}
            >
              <Image
                src="/images/community.png"
                alt="Diverse group of people including individuals with disabilities, representing TemanDifa community"
                fill
                className="object-contain object-bottom drop-shadow-2xl"
                loading="lazy"
                sizes="100vw"
                quality={85}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
