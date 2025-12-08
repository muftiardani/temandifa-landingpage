import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import ProblemSection from "@/components/sections/ProblemSection";
import ClosingHero from "@/components/sections/ClosingHero";
import Features from "@/components/sections/Features";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="bg-white dark:bg-gray-950 min-h-screen text-slate-800 dark:text-gray-100">
      <Navbar />
      <Hero />
      <AboutSection />
      <ProblemSection />
      <Features />
      <ClosingHero />
      <Footer />
    </main>
  );
}
