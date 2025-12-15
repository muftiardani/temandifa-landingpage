import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import PageTransition from "@/components/ui/PageTransition";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import ScrollDepthTracker from "@/components/analytics/ScrollDepthTracker";

const Hero = dynamic(() => import("@/components/sections/Hero"));
const AboutSection = dynamic(
  () => import("@/components/sections/AboutSection")
);
const ProblemSection = dynamic(
  () => import("@/components/sections/ProblemSection")
);
const Features = dynamic(() => import("@/components/sections/Features"));
const ClosingHero = dynamic(() => import("@/components/sections/ClosingHero"));

export default function Home() {
  return (
    <PageTransition>
      <main className="min-h-screen bg-white text-gray-800 dark:bg-gray-950 dark:text-gray-100">
        <Navbar />
        <ScrollDepthTracker />

        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>

        <ErrorBoundary>
          <AboutSection />
          <ProblemSection />
        </ErrorBoundary>

        <ErrorBoundary>
          <Features />
        </ErrorBoundary>

        <ErrorBoundary>
          <ClosingHero />
        </ErrorBoundary>
      </main>
    </PageTransition>
  );
}
