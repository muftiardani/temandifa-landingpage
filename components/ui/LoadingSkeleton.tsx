interface LoadingSkeletonProps {
  className?: string;
  animation?: "pulse" | "shimmer";
}

export function LoadingSkeleton({
  className = "",
  animation = "pulse",
}: LoadingSkeletonProps) {
  const animationClass =
    animation === "shimmer" ? "animate-shimmer" : "animate-pulse";

  return (
    <div
      className={`${animationClass} rounded bg-gray-200 dark:bg-gray-700 ${className}`}
      aria-hidden="true"
    />
  );
}

export default LoadingSkeleton;
