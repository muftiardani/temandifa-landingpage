/**
 * Loading Skeleton Components
 * Reusable skeleton components for loading states
 */

interface LoadingSkeletonProps {
  className?: string;
}

/**
 * Base skeleton component with pulse animation
 */
export function LoadingSkeleton({ className = "" }: LoadingSkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
      aria-hidden="true"
    />
  );
}

/**
 * Hero section skeleton
 */
export function HeroSkeleton() {
  return (
    <div className="px-4 sm:px-7 max-w-7xl mx-auto pb-10 pt-1">
      <div className="bg-gray-200 dark:bg-gray-800 rounded-[2.5rem] p-8 md:p-12 h-[400px] md:h-[600px] flex flex-col justify-center">
        <LoadingSkeleton className="h-12 w-3/4 mb-4" />
        <LoadingSkeleton className="h-8 w-1/2 mb-4" />
        <LoadingSkeleton className="h-24 w-full max-w-md" />
      </div>
    </div>
  );
}

/**
 * Card skeleton for feature cards
 */
export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <LoadingSkeleton className="h-12 w-12 rounded-full mb-4" />
      <LoadingSkeleton className="h-6 w-3/4 mb-3" />
      <LoadingSkeleton className="h-4 w-full mb-2" />
      <LoadingSkeleton className="h-4 w-5/6" />
    </div>
  );
}

/**
 * Text block skeleton
 */
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

/**
 * Form skeleton
 */
export function FormSkeleton() {
  return (
    <div className="space-y-6">
      {/* Name field */}
      <div>
        <LoadingSkeleton className="h-5 w-24 mb-2" />
        <LoadingSkeleton className="h-12 w-full" />
      </div>

      {/* Email field */}
      <div>
        <LoadingSkeleton className="h-5 w-24 mb-2" />
        <LoadingSkeleton className="h-12 w-full" />
      </div>

      {/* Subject field */}
      <div>
        <LoadingSkeleton className="h-5 w-24 mb-2" />
        <LoadingSkeleton className="h-12 w-full" />
      </div>

      {/* Message field */}
      <div>
        <LoadingSkeleton className="h-5 w-24 mb-2" />
        <LoadingSkeleton className="h-32 w-full" />
      </div>

      {/* Submit button */}
      <LoadingSkeleton className="h-12 w-full" />
    </div>
  );
}

/**
 * Page skeleton with navbar and content
 */
export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Navbar skeleton */}
      <div className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          <LoadingSkeleton className="h-12 w-32" />
          <div className="hidden md:flex gap-6">
            <LoadingSkeleton className="h-10 w-20" />
            <LoadingSkeleton className="h-10 w-20" />
            <LoadingSkeleton className="h-10 w-20" />
            <LoadingSkeleton className="h-10 w-24" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <LoadingSkeleton className="h-10 w-64 mb-6" />
        <TextSkeleton lines={5} />
      </div>
    </div>
  );
}
