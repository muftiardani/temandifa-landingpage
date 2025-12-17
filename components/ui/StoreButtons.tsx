"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface StoreButtonsProps {
  variant?: "light" | "dark" | "glass";
  className?: string;
  alignment?: "left" | "center" | "right";
}

export function StoreButtons({
  variant = "light",
  className = "",
  alignment = "center",
}: StoreButtonsProps) {
  const t = useTranslations("Common");

  const containerClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  const buttonBaseClass =
    "group relative inline-flex items-center gap-3 overflow-hidden rounded-xl px-6 py-3 transition-all hover:scale-105 active:scale-95";

  const variants = {
    light:
      "bg-white text-slate-900 shadow-lg hover:shadow-xl hover:bg-slate-50",
    dark: "bg-slate-900 text-white shadow-lg hover:shadow-xl hover:bg-slate-800",
    glass:
      "bg-white/10 text-white backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 hover:border-white/40",
  };

  return (
    <div
      className={`flex flex-wrap items-center gap-4 ${containerClasses[alignment]} ${className}`}
    >
      {/* Google Play Button */}
      <motion.button
        className={`${buttonBaseClass} ${variants[variant]}`}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          className="h-8 w-8 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.609 1.814L13.792 12 3.61 22.186A1.006 1.006 0 013 21.266V2.734a1.006 1.006 0 01.609-.92z"
            fill="#4285F4"
          />
          <path
            d="M13.792 12L21.68 7.035c.44-.242.44-1.018 0-1.26L5.4 3.024l8.392 8.976z"
            fill="#4CAF50"
          />
          <path
            d="M13.792 12l-8.392 8.976L18.73 16.94l-3.32-3.321z"
            fill="#EA4335"
          />
          <path
            d="M18.73 16.94l2.95-1.685a.86.86 0 0 0 0-1.26l-2.95-1.685-3.32 3.32 3.32 1.31z"
            fill="#FFC107"
          />
        </svg>

        <div className="flex flex-col items-start gap-0.5 leading-none">
          <span className="text-[10px] font-medium tracking-wide uppercase opacity-80">
            {t("store_google_play_prefix")}
          </span>
          <span className="text-sm font-bold sm:text-base">
            {t("store_google_play_title")}
          </span>
        </div>
      </motion.button>

      {/* App Store Button */}
      <motion.button
        className={`${buttonBaseClass} ${variants[variant]}`}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          className="h-8 w-8 shrink-0 pb-1"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.77-1.32 0-2.22-1.28-3.02-2.43-2.31-3.35-1.89-8.4.9-9.67 1.15-.55 2.01-.28 3.01-.28 1 0 1.94-.65 3.26-.65 1.34 0 2.25.79 3.01.65.68-.31 1.76-1.58 2.09-2.24-3.53 1.28-3.02 5.92-.09 7.03-.09.31-.22.61-.39.89-1.39 2.22-1.24 1.92-2.15 3.65zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.14-.86 2.97-.62.97-1.65 1.6-2.87 1.63-.15-1.07.45-2.37.79-3.1z" />
        </svg>
        <div className="flex flex-col items-start gap-0.5 leading-none">
          <span className="text-[10px] font-medium tracking-wide uppercase opacity-80">
            {t("store_app_store_prefix")}
          </span>
          <span className="text-sm font-bold sm:text-base">
            {t("store_app_store_title")}
          </span>
        </div>
      </motion.button>
    </div>
  );
}
