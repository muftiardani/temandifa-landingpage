import Image from "next/image";
import type { PhoneMockupProps } from "./types";

export function PhoneMockup({
  children,
  className = "",
  showLogo = false,
}: PhoneMockupProps) {
  return (
    <div
      className={`absolute top-0 left-0 bg-blue-900 dark:bg-blue-950 rounded-4xl shadow-xl pt-4 px-2 overflow-visible transition-colors ${className}`}
    >
      {showLogo && (
        <div className="text-2xl font-bold text-white px-2 py-1 mb-2 flex items-center justify-center gap-3">
          <Image
            src="/images/logo.png"
            alt="TemanDifa logo - accessibility app for people with disabilities"
            width={100}
            height={100}
            className="w-auto h-12 object-contain"
          />
          TemanDifa
        </div>
      )}
      {children}
    </div>
  );
}
