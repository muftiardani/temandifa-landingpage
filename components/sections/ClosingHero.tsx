"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, viewportOptions } from "@/styles/animations";
import { useTranslations } from "next-intl";

export default function ClosingHero() {
  const t = useTranslations("ClosingHero");

  return (
    <section
      className="relative bg-white px-4 py-20 transition-colors dark:bg-gray-950"
      aria-labelledby="closing-heading"
    >
      <div className="absolute top-0 left-0 z-0 h-70 w-70 -translate-x-1/2 -translate-y-10 rounded-full border-60 border-yellow-400 md:h-80 md:w-80 dark:border-yellow-500"></div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="relative h-[400px] w-full overflow-hidden rounded-[2.5rem] bg-blue-600 shadow-2xl md:h-[600px] dark:bg-blue-700"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={viewportOptions}
        >
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/sky-background.png"
              alt="Blue sky background representing hope and freedom"
              fill
              className="object-cover"
              loading="lazy"
              sizes="100vw"
              quality={85}
            />
            <div className="absolute inset-0 bg-blue-900/10 dark:bg-blue-900/30"></div>
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
                className="mb-6 text-4xl font-bold text-white drop-shadow-md md:text-5xl"
              >
                {t("title_prefix")}
                <span className="relative ml-1 inline-block">
                  {t("title_highlight")}
                  <span className="absolute bottom-1 left-0 -z-10 h-3 w-full bg-yellow-400 dark:bg-yellow-500"></span>
                </span>
              </h2>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-white drop-shadow-md md:text-2xl">
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
                className="object-contain object-bottom"
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
