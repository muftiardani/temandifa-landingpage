"use client";

import { Link } from "@/i18n/routing";
import { usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export function Breadcrumbs() {
  const pathname = usePathname();
  const t = useTranslations("Breadcrumbs");

  const paths = pathname.split("/").filter(Boolean);

  // Don't show breadcrumbs on homepage
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="mb-6 px-4 sm:px-8 max-w-7xl mx-auto"
      >
        <ol className="flex gap-2 text-sm flex-wrap">
          <li>
            <Link
              href="/"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {t("home")}
            </Link>
          </li>
          {paths.map((path, index) => (
            <li key={path} className="flex gap-2 items-center">
              <span className="text-gray-400" aria-hidden="true">
                /
              </span>
              {index === paths.length - 1 ? (
                <span className="text-gray-600 dark:text-gray-300 font-medium">
                  {t(path)}
                </span>
              ) : (
                <Link
                  href={`/${paths.slice(0, index + 1).join("/")}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {t(path)}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
