"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  fadeIn,
  fadeInLeft,
  fadeInRight,
  viewportOptions,
} from "@/styles/animations";
import ParticleBackground from "@/components/ui/ParticleBackground";
import { useTranslations } from "next-intl";
import { blurDataURL } from "@/lib/seo/image-placeholders";

export default function Hero() {
  const t = useTranslations("Hero");
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  return (
    <motion.section
      className="px-4 sm:px-7 max-w-7xl mx-auto pb-10 pt-4"
      initial="initial"
      whileInView="animate"
      viewport={viewportOptions}
      variants={fadeIn}
    >
      <div
        className="bg-linear-to-br from-blue-500 via-blue-600 to-purple-600
                          dark:bg-linear-to-br dark:from-blue-700 dark:via-blue-800 dark:to-purple-900
                          animate-gradient
                          rounded-[2.5rem] 
                          p-8 
                          md:p-12 
                          md:py-2 
                          relative 
                          overflow-hidden 
                          flex flex-col 
                          md:flex-row 
                          items-center
                          transition-colors
                          isolate
                          min-h-[700px]
                          md:min-h-[550px]"
      >
        {/* Particle Background - Inside blue container */}
        <ParticleBackground />
        
        {/* Floating Decorative Elements with Parallax */}
        <motion.div
          style={{ y: y1, opacity }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-20 w-32 h-32 
                     bg-yellow-400/20 dark:bg-yellow-500/20 
                     rounded-full blur-3xl"
          aria-hidden="true"
        />
        <motion.div
          style={{ y: y2, opacity }}
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 left-20 w-40 h-40 
                     bg-purple-400/20 dark:bg-purple-500/20 
                     rounded-full blur-3xl"
          aria-hidden="true"
        />

        <div
          className="absolute 
                          bottom-0 
                          left-0 
                          w-75 
                          h-75 
                          border-50
                          border-black 
                          bg-transparent
                          rounded-full 
                          mix-blend-multiply 
                          filter 
                          opacity-30 
                          -translate-x-1/2 
                          translate-y-1/2"
          aria-hidden="true"
        ></div>
        <div
          className="absolute 
                          top-0 
                          right-0 
                          w-75 
                          h-75 
                          border-50
                          border-black
                          bg-transparent 
                          rounded-full 
                          mix-blend-multiply 
                          filter 
                          opacity-30 
                          translate-x-1/2 
                          -translate-y-1/2"
          aria-hidden="true"
        ></div>

        <motion.div
          className="relative z-20 w-full md:w-1/2 text-white space-y-6"
          variants={fadeInLeft}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            {t.rich("hero_headline", {
              br: () => <br />,
            })}
          </h1>
          <h2 className="text-yellow-500 dark:text-yellow-300 font-bold text-xl md:text-2xl">
            {t("hero_subheadline")}
          </h2>
          <p className="text-white/90 dark:text-blue-100 md:text-lg leading-relaxed max-w-md">
            {t("hero_description")}
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="relative z-10 w-full md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end"
          variants={fadeInRight}
        >
          <div className="relative w-full max-w-[600px] h-[400px] md:h-[500px]">
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
