import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiReact, SiTypescript, SiNodedotjs, SiPostgresql, SiPython,
  SiVercel, SiFirebase,
} from "react-icons/si";
import { brand } from "@/data/brand";
import { Star, GitFork, Github, ExternalLink, CalendarDays } from "lucide-react";

const techStack = [
  { icon: SiReact, name: "React", color: "#61DAFB" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
  { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
  { icon: SiPython, name: "Python", color: "#3776AB" },
  { icon: SiVercel, name: "Vercel", color: "#888888" },
  { icon: SiFirebase, name: "Firebase", color: "#FFCA28" },
];

export function TrustBar() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="trust-bar"
      ref={ref}
      className="py-10 px-4 sm:px-6 lg:px-8 border-y border-border/40 bg-muted/10"
      aria-label="GitHub stats and technology stack"
    >
      <div className="max-w-6xl mx-auto">

        {/* Single row: GitHub stats + tech badges + availability */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* GitHub stats */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex items-center gap-5 text-sm"
          >
            <a
              href={brand.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors focus-ring rounded text-xs"
              data-testid="link-github-profile"
              aria-label="View GitHub profile"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="font-medium">GitHub</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-50" aria-hidden="true" />
            </a>
            <div className="h-3 w-px bg-border hidden sm:block" aria-hidden="true" />
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="w-3 h-3 text-primary" aria-hidden="true" />
              <strong className="text-foreground">150+</strong> stars
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <GitFork className="w-3 h-3 text-primary" aria-hidden="true" />
              <strong className="text-foreground">20+</strong> repos
            </div>
          </motion.div>

          {/* Tech badges */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
            className="flex flex-wrap items-center justify-center gap-2"
            aria-label="Primary technology stack"
          >
            {techStack.map(({ icon: Icon, name, color }, i) => (
              <motion.span
                key={name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.15 + i * 0.04, duration: 0.25, ease: "backOut" }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border bg-card text-xs text-muted-foreground hover:border-primary/20 hover:text-foreground transition-colors cursor-default"
                title={name}
              >
                <Icon style={{ color, width: 11, height: 11 }} aria-hidden="true" />
                {name}
              </motion.span>
            ))}
          </motion.div>

          {/* Availability */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
            className="flex items-center gap-3 flex-shrink-0"
          >
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarDays className="w-3.5 h-3.5 text-green-500" aria-hidden="true" />
              <span className="text-green-600 dark:text-green-400 font-medium">Available — Q3 2026</span>
            </div>
            <a
              href={brand.contact.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors shadow-sm shadow-primary/15 focus-ring press-effect"
              data-testid="button-trust-calendly"
            >
              Book a Call →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
