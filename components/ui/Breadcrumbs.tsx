"use client";

import { Link } from "@/i18n/routing";
import { usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function Breadcrumbs() {
  const pathname = usePathname();
  const t = useTranslations("Breadcrumbs");

  const paths = pathname.split("/").filter(Boolean);

  if (paths.length === 0) {
    return null;
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("home"),
        item: "https://temandifa.com",
      },
      ...paths.map((path, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: t(path),
        item: `https://temandifa.com/${paths.slice(0, index + 1).join("/")}`,
      })),
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <motion.nav
        aria-label="Breadcrumb"
        className="mt-4 mb-8 px-4 sm:px-8 max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 px-4 py-3 transition-colors">
          <ol className="flex gap-2 text-sm flex-wrap items-center">
            <motion.li variants={itemVariants}>
              <Link
                href="/"
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
              >
                <svg
                  className="w-4 h-4 group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="font-medium">{t("home")}</span>
              </Link>
            </motion.li>
            {paths.map((path, index) => (
              <motion.li
                key={path}
                className="flex gap-2 items-center"
                variants={itemVariants}
              >
                <svg
                  className="w-4 h-4 text-gray-400 dark:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                {index === paths.length - 1 ? (
                  <span className="text-gray-700 dark:text-gray-200 font-semibold px-2 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-md">
                    {t(path)}
                  </span>
                ) : (
                  <Link
                    href={`/${paths.slice(0, index + 1).join("/")}`}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors hover:underline"
                  >
                    {t(path)}
                  </Link>
                )}
              </motion.li>
            ))}
          </ol>
        </div>
      </motion.nav>
    </>
  );
}
