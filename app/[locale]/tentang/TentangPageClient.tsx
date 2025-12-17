"use client";

import Navbar from "@/components/layout/Navbar";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
  viewportOptions,
} from "@/styles/animations";
import PageTransition from "@/components/ui/PageTransition";
import Image from "next/image";

export default function TentangPageClient() {
  const t = useTranslations("AboutPage");

  return (
    <PageTransition>
      <main className="min-h-screen bg-white transition-colors dark:bg-gray-950">
        <Navbar />
        <div className="mt-8 md:mt-12">
          <Breadcrumbs />
        </div>
        <motion.section
          className="mx-auto max-w-7xl px-4 py-16"
          initial="initial"
          whileInView="animate"
          viewport={viewportOptions}
          variants={fadeInUp}
        >
          {/* Text Content Wrapper */}
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              className="space-y-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={viewportOptions}
            >
              <div className="mx-auto max-w-4xl space-y-6 text-center">
                <p>{t("description_1")}</p>
                <p>{t("description_2")}</p>
              </div>
            </motion.div>
          </div>

          {/* Vision & Mission Grid */}
          <motion.div
            className="mx-auto mt-16 grid max-w-6xl gap-8 text-left md:grid-cols-2"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportOptions}
          >
            {/* Vision Card */}
            <motion.div
              className="group relative overflow-hidden rounded-3xl border border-blue-100 bg-white/50 p-8 shadow-lg backdrop-blur-md transition-all hover:shadow-xl dark:border-blue-900/50 dark:bg-gray-800/50"
              variants={fadeInUp}
            >
              <div className="absolute top-0 right-0 -mt-10 -mr-10 h-32 w-32 rounded-full bg-blue-400/20 blur-2xl transition-all group-hover:bg-blue-500/30" />

              <h2 className="mb-4 bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-2xl font-bold text-transparent dark:from-blue-400 dark:to-indigo-400">
                {t("vision_title")}
              </h2>
              <p className="relative z-10 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                {t("vision_text")}
              </p>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              className="group relative overflow-hidden rounded-3xl border border-yellow-100 bg-white/50 p-8 shadow-lg backdrop-blur-md transition-all hover:shadow-xl dark:border-yellow-900/50 dark:bg-gray-800/50"
              variants={fadeInUp}
            >
              <div className="absolute top-0 right-0 -mt-10 -mr-10 h-32 w-32 rounded-full bg-yellow-400/20 blur-2xl transition-all group-hover:bg-yellow-500/30" />

              <h2 className="mb-4 bg-linear-to-r from-yellow-600 to-orange-600 bg-clip-text text-2xl font-bold text-transparent dark:from-yellow-400 dark:to-orange-400">
                {t("mission_title")}
              </h2>
              <ul className="relative z-10 space-y-4 text-gray-700 dark:text-gray-300">
                <li className="flex gap-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-xs font-bold text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
                    1
                  </span>
                  <span>{t("mission_1")}</span>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-xs font-bold text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
                    2
                  </span>
                  <span>{t("mission_2")}</span>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-xs font-bold text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
                    3
                  </span>
                  <span>{t("mission_3")}</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            className="mt-20"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportOptions}
          >
            <motion.div className="mb-12 text-center" variants={fadeInUp}>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
                {t("team_title")}
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                {t("team_desc")}
              </p>
            </motion.div>

            <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  name: "M. Mufti Ardani",
                  role: t("member_1_role"),
                  image: "/images/team/arda.png",
                  linkedin: "https://www.linkedin.com/in/muftiardani",
                },
                {
                  name: "Umi Inayatul H.",
                  role: t("member_2_role"),
                  image: "/images/team/ina.png",
                  linkedin: "https://www.linkedin.com/in/umihidayah21",
                },
                {
                  name: "M. Ishlakhudin Tsani",
                  role: t("member_3_role"),
                  image: "/images/team/tsani.png",
                  linkedin:
                    "https://www.linkedin.com/in/muhamad-ishlakhudin-tsani-47665b326",
                },
                {
                  name: "Ana Lativach",
                  role: t("member_4_role"),
                  image: "/images/team/ana.png",
                  linkedin: "https://www.linkedin.com/in/ana-lativach",
                },
              ].map((member) => (
                <motion.div
                  key={member.name}
                  className="group relative overflow-hidden rounded-3xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20"
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                >
                  <div className="animate-gradient aspect-3/4 w-full overflow-hidden bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={600}
                      height={800}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/60 to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
                  </div>

                  <div className="absolute right-4 bottom-4 left-4 rounded-2xl border border-white/20 bg-white/10 p-4 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:bg-white/20">
                    <h3 className="truncate text-lg font-bold text-white">
                      {member.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-2">
                      <p className="truncate text-xs font-medium tracking-wider text-blue-200 uppercase">
                        {member.role}
                      </p>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-200 transition-colors hover:text-white"
                        aria-label={`LinkedIn ${member.name}`}
                      >
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>
      </main>
    </PageTransition>
  );
}
