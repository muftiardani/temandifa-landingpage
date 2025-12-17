"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  fadeIn,
  fadeInLeft,
  fadeInRight,
  viewportOptions,
  getTransition,
} from "@/styles/animations";
import ParticleBackground from "@/components/ui/ParticleBackground";
import { useTranslations } from "next-intl";
import { blurDataURL } from "@/lib/seo/image-placeholders";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Hero() {
  const t = useTranslations("Hero");
  const prefersReducedMotion = useReducedMotion();

  const { scrollY } = useScroll();

  const y1 = useTransform(
    scrollY,
    [0, 500],
    prefersReducedMotion ? [0, 0] : [0, 150]
  );
  const y2 = useTransform(
    scrollY,
    [0, 500],
    prefersReducedMotion ? [0, 0] : [0, -100]
  );
  const opacity = useTransform(
    scrollY,
    [0, 300],
    prefersReducedMotion ? [1, 1] : [1, 0]
  );

  const transition = getTransition(prefersReducedMotion);

  const floatingAnimation = prefersReducedMotion
    ? {}
    : {
        y: [0, -20, 0],
        rotate: [0, 5, 0],
      };

  const floatingTransition = prefersReducedMotion
    ? {}
    : {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut" as const,
      };

  return (
    <motion.section
      className="mx-auto max-w-7xl px-4 pt-12 pb-10 sm:px-7"
      initial={prefersReducedMotion ? {} : "initial"}
      whileInView="animate"
      viewport={viewportOptions}
      variants={fadeIn}
      transition={transition}
    >
      <div
        className={`bg-linear-to-br from-blue-600 via-indigo-900 to-slate-900 dark:bg-linear-to-br dark:from-slate-900 dark:via-blue-950 dark:to-purple-950 ${prefersReducedMotion ? "" : "animate-gradient"} relative isolate flex min-h-[700px] flex-col items-center overflow-hidden rounded-[2.5rem] p-8 shadow-2xl shadow-blue-900/20 transition-colors md:min-h-[550px] md:flex-row md:p-12 md:py-2`}
      >
        {!prefersReducedMotion && <ParticleBackground />}

        <motion.div
          style={{ y: y1, opacity }}
          animate={floatingAnimation}
          transition={floatingTransition}
          className="absolute top-20 right-20 h-40 w-40 rounded-full bg-blue-500/20 blur-[80px] dark:bg-blue-600/10"
          aria-hidden="true"
        />
        <motion.div
          style={{ y: y2, opacity }}
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [0, 20, 0],
                  rotate: [0, -5, 0],
                }
          }
          transition={
            prefersReducedMotion
              ? {}
              : {
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          className="absolute bottom-20 left-20 h-56 w-56 rounded-full bg-purple-500/20 blur-[80px] dark:bg-purple-600/10"
          aria-hidden="true"
        />

        <div
          className="absolute bottom-0 left-0 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full border-60 border-white/5 bg-transparent opacity-50 mix-blend-overlay filter"
          aria-hidden="true"
        ></div>
        <div
          className="absolute top-0 right-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full border-60 border-white/5 bg-transparent opacity-50 mix-blend-overlay filter"
          aria-hidden="true"
        ></div>

        <motion.div
          className="relative z-20 w-full md:w-1/2"
          variants={fadeInLeft}
          transition={transition}
        >
          <div className="rounded-3xl bg-white/5 p-6 backdrop-blur-sm lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
            <h1 className="text-4xl leading-tight font-bold text-white drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">
              {t.rich("hero_headline", {
                br: () => <br />,
              })}
            </h1>
            <h2 className="mt-4 bg-linear-to-r from-yellow-300 to-yellow-500 bg-clip-text text-xl font-bold text-transparent drop-shadow-md md:text-2xl">
              {t("hero_subheadline")}
            </h2>
            <motion.button
              className="group relative mt-8 inline-flex items-center gap-3 overflow-hidden rounded-full bg-linear-to-r from-blue-600 to-indigo-600 px-8 py-4 text-lg font-bold text-white shadow-xl ring-1 shadow-blue-500/30 ring-white/20 transition-all hover:shadow-blue-500/50 hover:ring-white/40 focus:ring-4 focus:ring-blue-500/50 focus:outline-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              <span className="relative">Download Aplikasi</span>
              <motion.div
                animate={{ y: [0, 3, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>
            </motion.button>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="relative z-10 mt-8 flex w-full justify-center md:mt-0 md:w-1/2 md:justify-end"
          variants={fadeInRight}
          transition={transition}
        >
          <div className="relative h-[400px] w-full max-w-[600px] md:h-[500px]">
            <div className="absolute top-1/2 left-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[60px]" />

            <Image
              src="/images/woman-man.png"
              alt="TemanDifa app users - accessibility for visually impaired"
              fill
              priority
              placeholder="blur"
              blurDataURL={blurDataURL.womanMan}
              className="object-contain drop-shadow-2xl"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
