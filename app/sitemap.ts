import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://temandifa.com";
  const currentDate = new Date();
  const locales = ["id", "en"];
  const pages = ["", "tentang", "produk", "kontak"];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate entries for each locale and page combination
  locales.forEach((locale) => {
    pages.forEach((page) => {
      const url = page
        ? `${baseUrl}/${locale}/${page}`
        : `${baseUrl}/${locale}`;

      let priority = 1.0;
      let changeFrequency: "weekly" | "monthly" = "weekly";

      // Set priority based on page
      if (page === "produk") {
        priority = 0.9;
        changeFrequency = "monthly";
      } else if (page === "tentang") {
        priority = 0.8;
        changeFrequency = "monthly";
      } else if (page === "kontak") {
        priority = 0.7;
        changeFrequency = "monthly";
      }

      sitemapEntries.push({
        url,
        lastModified: currentDate,
        changeFrequency,
        priority,
        alternates: {
          languages: {
            id: page ? `${baseUrl}/id/${page}` : `${baseUrl}/id`,
            en: page ? `${baseUrl}/en/${page}` : `${baseUrl}/en`,
          },
        },
      });
    });
  });

  return sitemapEntries;
}
