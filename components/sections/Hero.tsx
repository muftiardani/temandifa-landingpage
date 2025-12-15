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
      className="mx-auto max-w-7xl px-4 pt-4 pb-10 sm:px-7"
      initial={prefersReducedMotion ? {} : "initial"}
      whileInView="animate"
      viewport={viewportOptions}
      variants={fadeIn}
      transition={transition}
    >
      <div
        className={`bg-linear-to-br from-blue-500 via-blue-600 to-purple-600 dark:bg-linear-to-br dark:from-blue-700 dark:via-blue-800 dark:to-purple-900 ${prefersReducedMotion ? "" : "animate-gradient"} relative isolate flex min-h-[700px] flex-col items-center overflow-hidden rounded-[2.5rem] p-8 transition-colors md:min-h-[550px] md:flex-row md:p-12 md:py-2`}
      >
        {!prefersReducedMotion && <ParticleBackground />}

        <motion.div
          style={{ y: y1, opacity }}
          animate={floatingAnimation}
          transition={floatingTransition}
          className="absolute top-20 right-20 h-32 w-32 rounded-full bg-yellow-400/20 blur-3xl dark:bg-yellow-500/20"
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
          className="absolute bottom-20 left-20 h-40 w-40 rounded-full bg-purple-400/20 blur-3xl dark:bg-purple-500/20"
          aria-hidden="true"
        />

        <div
          className="absolute bottom-0 left-0 h-75 w-75 -translate-x-1/2 translate-y-1/2 rounded-full border-50 border-black bg-transparent opacity-30 mix-blend-multiply filter"
          aria-hidden="true"
        ></div>
        <div
          className="absolute top-0 right-0 h-75 w-75 translate-x-1/2 -translate-y-1/2 rounded-full border-50 border-black bg-transparent opacity-30 mix-blend-multiply filter"
          aria-hidden="true"
        ></div>

        <motion.div
          className="relative z-20 w-full space-y-6 text-white md:w-1/2"
          variants={fadeInLeft}
          transition={transition}
        >
          <h1 className="text-4xl leading-tight font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            {t.rich("hero_headline", {
              br: () => <br />,
            })}
          </h1>
          <h2 className="text-xl font-bold text-yellow-500 md:text-2xl dark:text-yellow-300">
            {t("hero_subheadline")}
          </h2>
          <p className="max-w-md leading-relaxed text-white/90 md:text-lg dark:text-blue-100">
            {t("hero_description")}
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="relative z-10 mt-8 flex w-full justify-center md:mt-0 md:w-1/2 md:justify-end"
          variants={fadeInRight}
          transition={transition}
        >
          <div className="relative h-[400px] w-full max-w-[600px] md:h-[500px]">
            <Image
              src="/images/woman-man.png"
              alt="TemanDifa app users - accessibility for visually impaired"
              fill
              priority
              placeholder="blur"
              blurDataURL={blurDataURL.womanMan}
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
