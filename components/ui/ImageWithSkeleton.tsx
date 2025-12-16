"use client";

import Image, { ImageProps } from "next/image";
import { useState, useCallback } from "react";

interface ImageWithSkeletonProps extends Omit<
  ImageProps,
  "onLoad" | "onError"
> {
  skeletonClassName?: string;
  showErrorState?: boolean;
}

export function ImageWithSkeleton({
  src,
  alt,
  className = "",
  skeletonClassName = "",
  showErrorState = true,
  ...props
}: ImageWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  if (hasError && showErrorState) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 ${className}`}
        style={{ width: props.width, height: props.height }}
        role="img"
        aria-label={`Failed to load: ${alt}`}
      >
        <div className="text-center text-gray-400 dark:text-gray-500">
          <svg
            className="mx-auto mb-2 h-8 w-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-xs">Image unavailable</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Skeleton Loader */}
      {isLoading && (
        <div
          className={`animate-shimmer absolute inset-0 rounded-lg ${skeletonClassName}`}
          aria-hidden="true"
        />
      )}

      {/* Actual Image */}
      <Image
        src={src}
        alt={alt}
        className={`transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"} ${className}`}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
}

export default ImageWithSkeleton;
