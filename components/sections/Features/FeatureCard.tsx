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
  const bgColor = variant === "blue" ? "bg-blue-500" : "bg-yellow-400";
  const textColor = variant === "blue" ? "text-white" : "text-gray-900";
  const titleColor =
    variant === "blue" ? "text-yellow-500 dark:text-yellow-300" : "text-blue-600 dark:text-blue-400";

  return (
    <div
      className={`${bgColor} ${textColor} rounded-xl p-8 shadow-lg relative z-10 ${className}`}
    >
      {decorativeSquare && (
        <div
          className={`absolute ${decorativeSquare.className} ${decorativeSquare.bgColor} z-20`}
          aria-hidden="true"
        />
      )}
      <h3 className={`text-2xl font-bold ${titleColor} mb-2`}>{title}</h3>
      <p className="text-sm pl-7 leading-relaxed">{description}</p>
    </div>
  );
}
