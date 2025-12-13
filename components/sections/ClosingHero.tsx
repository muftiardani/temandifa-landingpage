"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, viewportOptions } from "@/styles/animations";
import { useTranslations } from "next-intl";

export default function ClosingHero() {
  const t = useTranslations("ClosingHero");

  return (
    <section 
      className="py-20 px-4 relative bg-white dark:bg-gray-950 transition-colors"
      aria-labelledby="closing-heading"
    >
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-10 w-70 h-70 md:w-80 md:h-80 border-60 border-yellow-400 dark:border-yellow-500 rounded-full z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="relative w-full h-[400px] md:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl bg-blue-600 dark:bg-blue-700"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={viewportOptions}
        >
          {/* Background */}
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

          <div className="absolute -top-12 left-0 w-full pt-16 md:pt-24 px-4 text-center z-20">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={viewportOptions}
              variants={fadeInUp}
            >
              <h2 
                id="closing-heading"
                className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-md"
              >
                {t("title_prefix")}
                <span className="relative inline-block ml-1">
                  {t("title_highlight")}
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-400 dark:bg-yellow-500 -z-10"></span>
                </span>
              </h2>
              <p className="text-white text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-md">
                {t.rich("description", {
                  br: () => <br />,
                })}
              </p>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] md:h-[550px] z-10">
            <motion.div
              className="relative w-full h-full"
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
