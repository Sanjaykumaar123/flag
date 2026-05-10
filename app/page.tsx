import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { ArchitectureSection, MetricsSection, CTASection } from "@/components/LandingSections";

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <ArchitectureSection />
      <MetricsSection />
      <CTASection />
      
      {/* Footer */}
      <footer className="border-t border-white/10 py-12 glass-panel">
        <div className="container mx-auto px-6 text-center text-muted-foreground text-sm">
          <p>© 2026 ContextForge AI · Built for FlagOS Open Computing Global Challenge · Track 3</p>
        </div>
      </footer>
    </main>
  );
}
