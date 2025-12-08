"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  fadeIn,
  fadeInLeft,
  fadeInRight,
  viewportOptions,
} from "@/lib/animations";

export default function Hero() {
  return (
    <motion.section
      className="px-4 sm:px-7 max-w-7xl mx-auto pb-10 pt-1"
      initial="initial"
      whileInView="animate"
      viewport={viewportOptions}
      variants={fadeIn}
    >
      <div
        className="bg-[#3b82f6] dark:bg-blue-700
                          rounded-[2.5rem] 
                          p-8 
                          md:p-12 
                          md:py-2 
                          relative 
                          overflow-hidden 
                          flex flex-col 
                          md:flex-row 
                          items-center
                          transition-colors"
      >
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
          <h1 className="text-7xl md:text-6xl font-bold leading-tight">
            Menjadi bantuan <br /> saat dibutuhkan.
          </h1>
          <h2 className="text-yellow-400 dark:text-yellow-300 font-bold text-xl md:text-2xl">
            Aksesibilitas Nyata, Inklusi Tanpa Batas
          </h2>
          <p className="text-white/90 dark:text-blue-100 md:text-lg leading-relaxed max-w-md">
            Sebuah kesempatan yang akan mengubah banyak hal. TemanDifa hadir
            untuk mendukung setiap langkah menuju kemandirian. Kami ada untuk
            menjadi bagian dari mereka yang membutuhkan di sekelilingmu.
          </p>
        </motion.div>

        <motion.div
          className="relative z-10 w-full md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end gap-4 md:gap-6"
          variants={fadeInRight}
        >
          <div className="relative w-[45%] md:w-[300px] h-[400px] md:h-[600px] transform translate-y-8">
            <Image
              src="/images/woman.png"
              alt="Smiling woman using smartphone, representing TemanDifa app user"
              fill
              priority
              className="object-contain"
            />
          </div>

          <div className="relative w-[45%] md:w-[300px] h-[400px] md:h-[600px] transform -translate-y-8">
            <Image
              src="/images/man.png"
              alt="Man with headphones using smartphone, representing TemanDifa app user"
              fill
              priority
              className="object-contain"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
