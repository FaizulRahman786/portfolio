import { useState, useEffect, lazy, Suspense } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { TrustBar } from "@/components/trust-bar";
import { ScrollProgress } from "@/components/scroll-progress";
import { CursorGlow } from "@/components/cursor-glow";
import { BackToTop } from "@/components/back-to-top";
import { Footer } from "@/components/footer";
import { CommandPaletteHint } from "@/components/command-palette-hint";
import { Spinner } from "@/components/ui/spinner";

// Lazy-loaded sections (below-the-fold)
const About      = lazy(() => import("@/components/about").then((m) => ({ default: m.About })));
const Skills     = lazy(() => import("@/components/skills").then((m) => ({ default: m.Skills })));
const Projects   = lazy(() => import("@/components/projects").then((m) => ({ default: m.Projects })));
const Experience = lazy(() => import("@/components/experience").then((m) => ({ default: m.Experience })));
const Achievements = lazy(() => import("@/components/achievements").then((m) => ({ default: m.Achievements })));
const Education  = lazy(() => import("@/components/education").then((m) => ({ default: m.Education })));
const Contact    = lazy(() => import("@/components/contact").then((m) => ({ default: m.Contact })));
const CommandPalette = lazy(() => import("@/components/command-palette").then((m) => ({ default: m.CommandPalette })));

function SectionLoader() {
  return (
    <div className="w-full py-20 flex items-center justify-center" aria-hidden="true">
      <Spinner className="text-muted-foreground/20 size-6 animate-spin" />
    </div>
  );
}

export default function Home() {
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash) return;
      
      let attempts = 0;
      const interval = setInterval(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          clearInterval(interval);
        }
        attempts++;
        if (attempts > 30) clearInterval(interval); // max 3 seconds
      }, 100);
    };

    // Delay slightly on initial mount to allow react load cycles
    const timer = setTimeout(handleHashChange, 50);
    window.addEventListener("hashchange", handleHashChange);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground" data-testid="page-home">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      {/* ── Visitor Journey:
          Hero → TrustBar → About → Skills → Projects → Experience
          → Achievements → Education → Contact → Footer
      ── */}
      <main id="main-content">
        {/* 1. Hero — Value Proposition + Social Proof */}
        <Hero />

        {/* 2. TrustBar — GitHub stats, tech stack, availability */}
        <TrustBar />

        {/* 3. About — Mission, philosophy, engineering identity */}
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>

        {/* 4. Skills — Grouped by domain, linked to projects */}
        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>

        {/* 5. Projects — Featured + grid */}
        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>

        {/* 6. Experience — Google XYZ achievement bullets */}
        <Suspense fallback={<SectionLoader />}>
          <Experience />
        </Suspense>

        {/* 7. Achievements */}
        <Suspense fallback={<SectionLoader />}>
          <Achievements />
        </Suspense>

        {/* 8. Education */}
        <Suspense fallback={<SectionLoader />}>
          <Education />
        </Suspense>

        {/* 9. Contact — Availability + Calendly CTA + form */}
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>

      <Footer />
      <BackToTop />
      <Suspense fallback={null}>
        <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
      </Suspense>
      <CommandPaletteHint />
    </div>
  );
}
