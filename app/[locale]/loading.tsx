export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-900 rounded-full"></div>
          {/* Spinning ring */}
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Loading text */}
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          Loading...
        </p>

        {/* TemanDifa branding */}
        <div className="mt-2 text-sm">
          <span className="text-blue-600 dark:text-blue-400 font-bold">
            Teman
          </span>
          <span className="text-yellow-500 dark:text-yellow-400 font-bold">
            Difa
          </span>
        </div>
      </div>
    </div>
  );
}
