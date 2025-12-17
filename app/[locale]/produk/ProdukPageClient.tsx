"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, viewportOptions } from "@/styles/animations";
import PageTransition from "@/components/ui/PageTransition";
import { StoreButtons } from "@/components/ui/StoreButtons";

// SVG Icons
const Icons = {
  Detection: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  ),
  Voice: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  ),
  Scan: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <rect width="10" height="14" x="7" y="5" rx="2" />
      <path d="M10 9h4" />
      <path d="M10 13h4" />
    </svg>
  ),
  Emergency: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
};

const FeatureInfoCard = ({
  feature,
}: {
  feature: {
    id: string;
    icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
    color: string;
    textColor: string;
    title: string;
    desc: string;
  };
}) => {
  const Icon = feature.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-3xl border border-white/20 bg-white/50 p-8 text-center shadow-xl backdrop-blur-xl dark:bg-gray-900/50"
    >
      <div
        className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${feature.color} shadow-lg`}
      >
        <Icon className="h-8 w-8 text-white" />
      </div>
      <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
        {feature.title}
      </h3>
      <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
        {feature.desc}
      </p>
    </motion.div>
  );
};

export default function ProdukPageClient() {
  const t = useTranslations("ProductPage");
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    {
      id: "detection",
      icon: Icons.Detection,
      color: "bg-blue-500",
      textColor: "text-blue-500",
      title: t("features.detection_title"),
      desc: t("features.detection_desc"),
    },
    {
      id: "voice",
      icon: Icons.Voice,
      color: "bg-yellow-400",
      textColor: "text-yellow-500",
      title: t("features.voice_title"),
      desc: t("features.voice_desc"),
    },
    {
      id: "scan",
      icon: Icons.Scan,
      color: "bg-purple-500",
      textColor: "text-purple-500",
      title: t("features.scan_title"),
      desc: t("features.scan_desc"),
    },
    {
      id: "emergency",
      icon: Icons.Emergency,
      color: "bg-red-500",
      textColor: "text-red-500",
      title: t("features.emergency_title"),
      desc: t("features.emergency_desc"),
    },
  ];

  return (
    <PageTransition>
      <main className="min-h-screen bg-white transition-colors dark:bg-gray-950">
        <Navbar />
        <div className="mt-8 md:mt-12">
          <Breadcrumbs />
        </div>

        <section className="mx-auto max-w-7xl px-4 py-16">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportOptions}
            variants={fadeInUp}
            className="mb-12 text-center"
          >
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
              {t("title")}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              {t("subtitle")}
            </p>
          </motion.div>

          {/* ORBIT SYSTEM */}
          <div className="relative mx-auto flex min-h-[600px] max-w-5xl flex-col items-center justify-center lg:min-h-[700px]">
            {/* Background Gradients */}
            <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
              <div className="h-[500px] w-[500px] -translate-y-24 rounded-full bg-blue-500/10 blur-[100px] dark:bg-blue-500/20" />
            </div>

            {/* Orbit Container */}
            <div className="relative z-10 flex h-[350px] w-[350px] items-center justify-center sm:h-[450px] sm:w-[450px] lg:h-[550px] lg:w-[550px]">
              {/* Wind Effect Layers */}
              <div className="pointer-events-none absolute inset-[-40px] z-0">
                {/* Outer Wind */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <svg
                    viewBox="0 0 600 600"
                    className="h-full w-full fill-none stroke-blue-500 opacity-20 dark:opacity-10"
                    strokeWidth="1.5"
                  >
                    {/* Circle 1: faint large wind */}
                    <circle
                      cx="300"
                      cy="300"
                      r="280"
                      strokeDasharray="100 300 50 150"
                      strokeLinecap="round"
                    />
                  </svg>
                </motion.div>

                {/* Middle Wind */}
                <motion.div
                  className="absolute inset-[40px]"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <svg
                    viewBox="0 0 500 500"
                    className="h-full w-full fill-none stroke-blue-600 opacity-30 dark:stroke-blue-400 dark:opacity-20"
                    strokeWidth="2"
                  >
                    <circle
                      cx="250"
                      cy="250"
                      r="240"
                      strokeDasharray="200 100 20 200"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="250"
                      cy="250"
                      r="220"
                      strokeDasharray="50 150 100 200"
                      strokeLinecap="round"
                      opacity="0.5"
                    />
                  </svg>
                </motion.div>

                {/* Inner Wind */}
                <motion.div
                  className="absolute inset-[80px]"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <svg
                    viewBox="0 0 400 400"
                    className="h-full w-full fill-none stroke-indigo-500 opacity-40 dark:opacity-30"
                    strokeWidth="3"
                  >
                    <circle
                      cx="200"
                      cy="200"
                      r="180"
                      strokeDasharray="150 50 100 100"
                      strokeLinecap="round"
                    />
                  </svg>
                </motion.div>
              </div>

              {/* Center Core (Logo/Brand) */}
              <motion.div
                className="relative z-20 flex h-40 w-40 items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Logo Image */}
                <div className="relative h-32 w-32 drop-shadow-2xl filter">
                  <Image
                    src="/images/logo.png"
                    alt="TemanDifa"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>

              {/* Orbiting Items */}
              <motion.div
                className="absolute inset-0 h-full w-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                {features.map((feature, index) => {
                  const angle = (index * 360) / features.length;

                  return (
                    <div
                      key={feature.id}
                      className="absolute top-0 left-1/2 -mt-8 -ml-8 h-16 w-16 origin-[50%_175px] sm:origin-[50%_225px] lg:origin-[50%_275px]"
                      style={{
                        transform: `rotate(${angle}deg)`,
                      }}
                    >
                      {/* The Icon Itself */}
                      <motion.button
                        className={`group relative flex h-16 w-16 items-center justify-center rounded-2xl border-2 bg-white shadow-lg transition-all hover:scale-110 dark:bg-gray-900 ${
                          activeIndex === index
                            ? `border-${feature.color.replace("bg-", "")} scale-110 ring-4 ring-${feature.color.replace("bg-", "")}/20`
                            : "border-gray-200 dark:border-gray-700"
                        }`}
                        animate={{ rotate: -360 }}
                        transition={{
                          duration: 30,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        onClick={() => setActiveIndex(index)}
                        whileHover={{ scale: 1.2 }}
                      >
                        {/* Icon */}
                        <feature.icon
                          className={`h-8 w-8 ${feature.textColor}`}
                        />

                        {/* Glow effect on active */}
                        {activeIndex === index && (
                          <div
                            className={`absolute inset-0 -z-10 rounded-2xl blur-lg ${feature.color} opacity-40`}
                          />
                        )}
                      </motion.button>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Info Panel (Dynamic) */}
            <div className="relative z-30 mt-12 w-full max-w-2xl px-4">
              <AnimatePresence mode="wait">
                <FeatureInfoCard
                  key={activeIndex}
                  feature={features[activeIndex]}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            className="relative mt-20 overflow-hidden rounded-[2.5rem] bg-linear-to-br from-blue-600 to-purple-700 px-6 py-20 text-center text-white shadow-2xl sm:px-12 dark:from-blue-900 dark:to-purple-900"
            initial="initial"
            whileInView="animate"
            viewport={viewportOptions}
            variants={fadeInUp}
          >
            {/* Background Decoration */}
            <div className="pointer-events-none absolute inset-0 opacity-20">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute top-0 right-0 h-full w-full translate-x-1/3 -translate-y-1/3 scale-150 rotate-12 fill-white"
              >
                <path d="M50 0 C60 20 80 20 90 10 C100 0 100 50 100 50 L100 0 Z" />
              </svg>
              <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-400 blur-3xl filter" />
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-purple-400 blur-3xl filter" />
            </div>

            <div className="relative z-10 mx-auto max-w-3xl">
              <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-5xl">
                {t("cta_title")}
              </h2>
              <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-blue-100/90 md:text-xl">
                {t("cta_desc")}
              </p>

              <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <StoreButtons variant="light" />
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </PageTransition>
  );
}
