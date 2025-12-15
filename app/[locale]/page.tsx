import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import ProblemSection from "@/components/sections/ProblemSection";
import ClosingHero from "@/components/sections/ClosingHero";
import Features from "@/components/sections/Features";
import PageTransition from "@/components/ui/PageTransition";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import ScrollDepthTracker from "@/components/analytics/ScrollDepthTracker";

export default function Home() {
  return (
    <PageTransition>
      <main className="bg-white dark:bg-gray-950 min-h-screen text-gray-800 dark:text-gray-100">
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
