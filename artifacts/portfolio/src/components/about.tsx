import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Target, Lightbulb, Zap } from "lucide-react";

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="text-center" data-testid={`stat-${label.toLowerCase().replace(/\s+/g, "-")}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: "backOut" }}
        className="text-3xl font-bold text-primary mb-1"
      >
        {value}
      </motion.div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

const terminalLines = [
  { prompt: "$ whoami", delay: 0 },
  { prompt: "faizul_rahman", delay: 0.3, output: true },
  { prompt: "$ cat about.txt", delay: 0.6 },
  { prompt: "AI & ML Engineering Student", delay: 0.9, output: true },
  { prompt: "Full Stack Developer | Problem Solver", delay: 1.1, output: true },
  { prompt: "$ echo $LOCATION", delay: 1.4 },
  { prompt: "Lovely Professional University, Punjab, India", delay: 1.7, output: true },
  { prompt: "$ echo $CGPA", delay: 2.0 },
  { prompt: "8.3 / 10.0", delay: 2.3, output: true },
  { prompt: "$ echo $STATUS", delay: 2.6 },
  { prompt: "Actively seeking opportunities...", delay: 2.9, output: true },
];

function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className="rounded-xl border border-border bg-background/50 overflow-hidden font-mono text-xs"
      data-testid="terminal-about"
    >
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-muted/30">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 text-muted-foreground text-[10px]">faizul@portfolio ~ </span>
      </div>
      <div className="p-4 space-y-1.5 min-h-[220px]">
        {terminalLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: line.delay, duration: 0.3 }}
            className={line.output ? "text-primary/80 pl-2" : "text-muted-foreground"}
          >
            {!line.output && <span className="text-primary mr-1">›</span>}
            {line.prompt}
          </motion.div>
        ))}
        {inView && (
          <div className="text-muted-foreground">
            <span className="text-primary mr-1">›</span>
            <span className="animate-pulse">_</span>
          </div>
        )}
      </div>
    </div>
  );
}

const strengths = [
  { icon: Zap, title: "Fast Learner", desc: "Rapidly adapt to new technologies and frameworks" },
  { icon: Target, title: "Goal-Oriented", desc: "Focused on delivering production-grade solutions" },
  { icon: Lightbulb, title: "Creative Thinker", desc: "Innovative approaches to complex problems" },
  { icon: GraduationCap, title: "Academic Excellence", desc: "8.3 CGPA in CSE (AI & ML) program" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-24 px-4 sm:px-6 lg:px-8" aria-label="About section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            About Me
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold mb-4" data-testid="heading-about">
            Driven by curiosity,<br />built for impact
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            I'm a final-year B.Tech student specializing in AI & ML with a deep passion for
            building systems that solve real problems — from computer vision pipelines to full-stack platforms.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Terminal />

            <div className="grid grid-cols-3 gap-6 mt-8 p-6 rounded-xl border border-border bg-card">
              <AnimatedStat value="3+" label="Projects Built" />
              <AnimatedStat value="8.3" label="CGPA Score" />
              <AnimatedStat value="10+" label="Technologies" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed text-base">
                I believe that great software comes from a deep understanding of both the problem domain
                and the technical craft. My journey began with curiosity about how machines learn —
                and led me to build everything from AI recognition systems to full SaaS platforms.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base mt-4">
                Currently pursuing B.Tech in Computer Science &amp; Engineering with a specialization
                in Artificial Intelligence &amp; Machine Learning at Lovely Professional University,
                where I maintain a CGPA of 8.3. My goal is to bridge the gap between research and
                real-world applications — building AI systems that are not just accurate, but useful.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base mt-4">
                Outside of code, I actively participate in hackathons, contribute to open-source
                projects, and continuously learn from the fast-moving world of AI and MLOps.
              </p>
            </div>

            <div className="border-l-2 border-primary/50 pl-4 py-1">
              <p className="text-foreground font-medium italic">
                "The best way to predict the future is to build it."
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {strengths.map(({ icon: Icon, title, desc }) => (
                <motion.div
                  key={title}
                  className="p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors group"
                  whileHover={{ y: -3 }}
                  data-testid={`card-strength-${title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <Icon className="w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-semibold mb-1">{title}</div>
                  <div className="text-xs text-muted-foreground">{desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
