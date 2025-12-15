import { MetadataRoute } from "next";
import { config } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = config.baseUrl;
  const currentDate = new Date();
  const locales = ["id", "en"];
  const pages = ["", "tentang", "produk", "kontak"];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    pages.forEach((page) => {
      const url = page
        ? `${baseUrl}/${locale}/${page}`
        : `${baseUrl}/${locale}`;

      let priority = 1.0;
      let changeFrequency: "weekly" | "monthly" = "weekly";

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

  const images = [
    {
      url: `${baseUrl}/images/logo.png`,
      title: "TemanDifa Logo",
      description: "TemanDifa - AI Assistant for Visually Impaired",
    },
    {
      url: `${baseUrl}/images/woman-man.png`,
      title: "TemanDifa App Users",
      description: "People using TemanDifa accessibility app",
    },
    {
      url: `${baseUrl}/images/menu-mockup.png`,
      title: "TemanDifa Menu Interface",
      description: "TemanDifa app menu mockup showing main features",
    },
    {
      url: `${baseUrl}/images/camera-mockup.png`,
      title: "TemanDifa Object Detection",
      description: "Object detection feature using camera",
    },
    {
      url: `${baseUrl}/images/mic-mockup.png`,
      title: "TemanDifa Voice Assistant",
      description: "Voice assistant feature for hands-free interaction",
    },
    {
      url: `${baseUrl}/images/video-mockup.png`,
      title: "TemanDifa Video Call",
      description: "Video call assistance feature",
    },
  ];

  images.forEach((image) => {
    sitemapEntries.push({
      url: image.url,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  });

  return sitemapEntries;
}
