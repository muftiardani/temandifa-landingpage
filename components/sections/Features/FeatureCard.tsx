interface FeatureCardProps {
  title: string;
  description: string;
  variant: "blue" | "yellow";
  className?: string;
  decorativeSquare?: {
    className: string;
    bgColor: string;
  };
}

export function FeatureCard({
  title,
  description,
  variant,
  className = "",
  decorativeSquare,
}: FeatureCardProps) {
  const bgClass =
    variant === "blue"
      ? "bg-slate-50 dark:bg-slate-900 border border-blue-200 dark:border-blue-900"
      : "bg-slate-50 dark:bg-slate-900 border border-yellow-200 dark:border-yellow-900";

  const textColor = "text-slate-800 dark:text-slate-200";

  const titleGradient =
    variant === "blue"
      ? "bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent"
      : "bg-linear-to-r from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-orange-400 bg-clip-text text-transparent";

  return (
    <div
      className={`${bgClass} ${textColor} relative z-10 rounded-xl p-4 shadow-sm transition-shadow hover:shadow-lg sm:p-6 md:p-8 ${className}`}
    >
      {decorativeSquare && (
        <div
          className={`absolute ${decorativeSquare.className} ${decorativeSquare.bgColor} z-0 transform-gpu opacity-40 blur-md`}
          aria-hidden="true"
        />
      )}
      <h3
        className={`text-lg font-bold sm:text-xl md:text-2xl ${titleGradient} relative z-10 mb-2`}
      >
        {title}
      </h3>
      <p className="relative z-10 pl-4 text-sm leading-relaxed sm:pl-7 sm:text-base">
        {description}
      </p>
    </div>
  );
}
