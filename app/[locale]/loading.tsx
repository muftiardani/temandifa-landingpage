export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-blue-200 dark:border-blue-900"></div>
          <div className="absolute top-0 left-0 h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent dark:border-blue-400"></div>
        </div>

        <p className="font-medium text-gray-600 dark:text-gray-400">
          Loading...
        </p>

        <div className="mt-2 text-sm">
          <span className="font-bold text-blue-600 dark:text-blue-400">
            Teman
          </span>
          <span className="font-bold text-yellow-500 dark:text-yellow-400">
            Difa
          </span>
        </div>
      </div>
    </div>
  );
}
