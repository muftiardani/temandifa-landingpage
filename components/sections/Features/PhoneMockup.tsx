import Image from "next/image";

interface PhoneMockupProps {
  children: React.ReactNode;
  className?: string;
  showLogo?: boolean;
}

export function PhoneMockup({
  children,
  className = "",
  showLogo = false,
}: PhoneMockupProps) {
  return (
    <div
      className={`absolute top-0 left-0 overflow-visible rounded-4xl bg-blue-900 px-2 pt-4 shadow-xl transition-colors dark:bg-blue-950 ${className}`}
    >
      {showLogo && (
        <div className="mb-2 flex items-center justify-center gap-3 px-2 py-1 text-2xl font-bold text-white">
          <Image
            src="/images/logo.png"
            alt="TemanDifa logo - accessibility app for people with disabilities"
            width={100}
            height={100}
            className="h-12 w-auto rounded-full object-contain"
          />
          TemanDifa
        </div>
      )}
      {children}
    </div>
  );
}
