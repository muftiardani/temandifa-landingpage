interface SkipToContentProps {
  text: string;
}

export function SkipToContent({ text }: SkipToContentProps) {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-blue-600 focus:px-6 focus:py-3 focus:text-white focus:shadow-lg focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none"
    >
      {text}
    </a>
  );
}
