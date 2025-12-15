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

export function HeroSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-1 pb-10 sm:px-7">
      <div className="flex h-[400px] flex-col justify-center rounded-[2.5rem] bg-gray-200 p-8 md:h-[600px] md:p-12 dark:bg-gray-800">
        <LoadingSkeleton className="mb-4 h-12 w-3/4" />
        <LoadingSkeleton className="mb-4 h-8 w-1/2" />
        <LoadingSkeleton className="h-24 w-full max-w-md" />
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      <LoadingSkeleton className="mb-4 h-12 w-12 rounded-full" />
      <LoadingSkeleton className="mb-3 h-6 w-3/4" />
      <LoadingSkeleton className="mb-2 h-4 w-full" />
      <LoadingSkeleton className="h-4 w-5/6" />
    </div>
  );
}

export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <LoadingSkeleton
          key={i}
          className={`h-4 ${i === lines - 1 ? "w-3/4" : "w-full"}`}
        />
      ))}
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-6">
      {/* Name field */}
      <div>
        <LoadingSkeleton className="mb-2 h-5 w-24" />
        <LoadingSkeleton className="h-12 w-full" />
      </div>

      {/* Email field */}
      <div>
        <LoadingSkeleton className="mb-2 h-5 w-24" />
        <LoadingSkeleton className="h-12 w-full" />
      </div>

      {/* Subject field */}
      <div>
        <LoadingSkeleton className="mb-2 h-5 w-24" />
        <LoadingSkeleton className="h-12 w-full" />
      </div>

      {/* Message field */}
      <div>
        <LoadingSkeleton className="mb-2 h-5 w-24" />
        <LoadingSkeleton className="h-32 w-full" />
      </div>

      {/* Submit button */}
      <LoadingSkeleton className="h-12 w-full" />
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Navbar skeleton */}
      <div className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
          <LoadingSkeleton className="h-12 w-32" />
          <div className="hidden gap-6 md:flex">
            <LoadingSkeleton className="h-10 w-20" />
            <LoadingSkeleton className="h-10 w-20" />
            <LoadingSkeleton className="h-10 w-20" />
            <LoadingSkeleton className="h-10 w-24" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
        <LoadingSkeleton className="mb-6 h-10 w-64" />
        <TextSkeleton lines={5} />
      </div>
    </div>
  );
}
