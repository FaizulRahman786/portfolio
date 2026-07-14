import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Target, Lightbulb, Zap, Database, CheckCircle2 } from "lucide-react";
import { brand } from "@/data/brand";

/* ── Terminal ──────────────────────────────────────────────── */
const terminalLines = [
  { text: "whoami", isOutput: false },
  { text: "faizul_rahman — Full Stack Engineer", isOutput: true },
  { text: "cat philosophy.md", isOutput: false },
  { text: "Fast by default. Maintainable by design.", isOutput: true },
  { text: "Scalable by architecture.", isOutput: true },
  { text: "echo $STACK", isOutput: false },
  { text: "React · TypeScript · Node.js · PostgreSQL · Python", isOutput: true },
  { text: "echo $STATUS", isOutput: false },
  { text: "✓  Integrating AI into Modern Products", isOutput: true, accent: true },
];

function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="rounded-xl border border-border overflow-hidden font-mono text-xs shadow-md"
      data-testid="terminal-about"
      role="region"
      aria-label="Developer profile terminal"
    >
      {/* Title bar */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-muted/30">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" aria-hidden="true" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" aria-hidden="true" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" aria-hidden="true" />
        <span className="ml-3 text-muted-foreground/60 text-[10px]">faizul@portfolio ~ bash</span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-1.5 min-h-[200px] bg-background/40">
        {terminalLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -4 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.12, duration: 0.25, ease: "easeOut" }}
            className={
              line.accent
                ? "text-emerald-500 pl-2 font-semibold"
                : line.isOutput
                  ? "text-foreground/90 pl-2 font-medium"
                  : "text-muted-foreground"
            }
          >
            {!line.isOutput && (
              <span className="text-muted-foreground/50 mr-1.5" aria-hidden="true">$</span>
            )}
            {line.text}
          </motion.div>
        ))}

        {/* Blinking cursor */}
        {inView && (
          <motion.div
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: terminalLines.length * 0.12 + 0.1 }}
            aria-hidden="true"
          >
            <span className="text-muted-foreground/50 mr-1.5">$</span>
            <span className="animate-cursor-blink text-primary">█</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ── Strength cards ────────────────────────────────────────── */
const strengths = [
  { icon: Zap, title: "Performance-First", desc: "Sub-100ms API responses, 99 Lighthouse scores." },
  { icon: Target, title: "SaaS Architecture", desc: "Multi-tenant backends built for scale." },
  { icon: Database, title: "Database Design", desc: "Schema, indexing, caching strategies." },
  { icon: Lightbulb, title: "AI Integration", desc: "CV pipelines & LLM APIs in production." },
];

/* ── Deliverables ──────────────────────────────────────────── */
const deliverables = [
  "End-to-end ownership — schema to deployment",
  "40% average latency reduction on API layers",
  "Lighthouse 99 scores on every shipped app",
  "OWASP-compliant auth & data security",
  "CI/CD pipelines with GitHub Actions + Vercel",
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ── About ─────────────────────────────────────────────────── */
export function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      className="py-28 px-4 sm:px-6 lg:px-8 bg-background"
      aria-label="About Faizul Rahman"
    >
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="text-center mb-20"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold tracking-[0.18em] text-primary uppercase mb-4"
          >
            About Me
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-bold leading-tight mb-5"
            data-testid="heading-about"
          >
            Building systems at scale,
            <br />
            <span className="text-muted-foreground font-light">optimized for performance</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            {brand.mission}
          </motion.p>
        </motion.div>

        {/* Main 2-column grid */}
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start">

          {/* Left: terminal */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <Terminal />

            {/* Engineering quote */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="mt-5 border-l-2 border-primary/40 pl-4 py-1"
            >
              <p className="text-sm text-muted-foreground italic">
                "The best code is the code that ships, scales, and someone else can maintain."
              </p>
            </motion.div>

            {/* What I deliver */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="mt-6 space-y-2.5"
            >
              <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                What I deliver
              </p>
              {deliverables.map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle2
                    className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  {item}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: bio + strengths */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Bio paragraphs */}
            <div className="space-y-4">
              {brand.bio.map((para, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed text-[0.9375rem]">
                  {para}
                </p>
              ))}
            </div>

            {/* Strength cards */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {strengths.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.35 + i * 0.07, duration: 0.35, ease: "backOut" }}
                  className="p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-all group card-premium"
                  whileHover={{ y: -2 }}
                  data-testid={`card-strength-${title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors">
                    <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                  </div>
                  <div className="text-sm font-semibold mb-0.5 text-foreground">{title}</div>
                  <div className="text-[11px] text-muted-foreground leading-tight">{desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
