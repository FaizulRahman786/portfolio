import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, Copy, Check } from "lucide-react";
import { brand } from "@/data/brand";

/* ── Particle Canvas ───────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return; // skip entirely for reduced motion

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.2 + 0.3,
        opacity: Math.random() * 0.3 + 0.05,
      });
    }

    const LINK_DIST = 100;
    const draw = () => {
      const isDark = document.documentElement.classList.contains("dark");
      const particleColor = isDark ? "249,172,47" : "233,128,187";

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor},${p.opacity})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${particleColor},${0.06 * (1 - dist / LINK_DIST)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
      aria-hidden="true"
    />
  );
}

/* ── Copy email ────────────────────────────────────────────── */
function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(brand.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <motion.button
      onClick={copy}
      className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/60 bg-card/60 hover:border-primary/40 hover:bg-primary/5 text-xs text-muted-foreground hover:text-foreground transition-all focus-ring"
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      aria-label={copied ? "Email copied!" : "Copy email address"}
      data-testid="button-copy-email"
      title="Click to copy email"
    >
      {copied ? (
        <>
          <Check className="w-3 h-3 text-green-500 flex-shrink-0" aria-hidden="true" />
          <span className="text-green-500 font-medium">Copied!</span>
        </>
      ) : (
        <>
          <Mail className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
          <span className="font-mono">{brand.contact.email}</span>
          <Copy className="w-2.5 h-2.5 opacity-0 group-hover:opacity-60 transition-opacity flex-shrink-0" aria-hidden="true" />
        </>
      )}
    </motion.button>
  );
}

/* ── Trust stat ────────────────────────────────────────────── */
function TrustStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xl sm:text-2xl font-bold text-primary tabular-nums leading-none">{value}</span>
      <span className="text-[10px] text-muted-foreground text-center leading-tight max-w-[72px]">{label}</span>
    </div>
  );
}

/* ── Animation variants ────────────────────────────────────── */
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

/* ── Hero ──────────────────────────────────────────────────── */
export function Hero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background mesh-gradient"
      aria-label="Introduction — Faizul Rahman, Full Stack Engineer"
    >
      <ParticleCanvas />

      {/* Radial vignette for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 30%, hsl(var(--background)/0.4) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Bottom gradient fade into TrustBar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Availability badge */}
        <motion.div variants={item} className="flex justify-center mb-8">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/25 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium"
            data-testid="badge-availability"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse flex-shrink-0" aria-hidden="true" />
            Available for contracts — Q3 2026
          </span>
        </motion.div>

        {/* Role label — guides eye into the name */}
        <motion.p
          variants={item}
          className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase mb-4"
          data-testid="text-hero-role-label"
        >
          Full Stack Engineer & SaaS Architect
        </motion.p>

        {/* Name — single focal point */}
        <motion.h1
          variants={item}
          className="font-bold leading-none tracking-tight mb-6"
          style={{ fontSize: "clamp(3rem, 9vw, 6rem)" }}
          data-testid="text-hero-name"
        >
          Faizul{" "}
          <span className="relative inline-block">
            <span className="gradient-text">Rahman</span>
            <motion.span
              className="absolute -bottom-1.5 left-0 right-0 h-[3px] rounded-full"
              style={{ background: "linear-gradient(90deg, hsl(var(--primary)/0.8), hsl(var(--primary)/0.2))" }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.85, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              aria-hidden="true"
            />
          </span>
        </motion.h1>

        {/* Value proposition */}
        <motion.p
          variants={item}
          className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          data-testid="text-hero-vp"
        >
          {brand.valueProposition}
        </motion.p>

        {/* CTA Buttons — 2 only, clear hierarchy */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
        >
          {/* Primary */}
          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/35 hover:bg-primary/90 transition-all press-effect focus-ring"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            data-testid="button-book-call"
            aria-label="Book a discovery call"
          >
            Book Discovery Call
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </motion.a>

          {/* Secondary */}
          <motion.a
            href="#projects"
            onClick={(e) => { e.preventDefault(); scrollTo("#projects"); }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full border border-border bg-background/60 text-foreground font-semibold text-sm hover:border-primary/40 hover:bg-primary/5 transition-all press-effect focus-ring"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            data-testid="button-view-work"
            aria-label="View my project work"
          >
            View My Work
          </motion.a>
        </motion.div>

        {/* Trust numbers — clean 4-column */}
        <motion.div
          variants={item}
          className="flex items-center justify-center gap-4 sm:gap-10 mb-10 px-4 sm:px-6 py-5 rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm w-full max-w-md mx-auto"
          data-testid="trust-numbers"
          aria-label="Key metrics"
        >
          {brand.trustNumbers.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-4 sm:gap-10">
              {i > 0 && (
                <div className="h-8 w-px bg-border/60 flex-shrink-0" aria-hidden="true" />
              )}
              <TrustStat value={stat.value} label={stat.label} />
            </div>
          ))}
        </motion.div>

        {/* Social + copy email row */}
        <motion.div variants={item} className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2.5">
            {[
              { icon: Github, href: brand.social.github, label: "GitHub" },
              { icon: Linkedin, href: brand.social.linkedin, label: "LinkedIn" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all focus-ring"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Visit ${label}`}
                data-testid={`link-social-${label.toLowerCase()}`}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
              </motion.a>
            ))}

            {/* Resume as icon button */}
            <motion.a
              href="/resume.pdf"
              download
              className="w-9 h-9 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all focus-ring"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Download resume PDF"
              data-testid="link-social-resume"
              title="Download Resume"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
            </motion.a>
          </div>

          <CopyEmail />
        </motion.div>
      </motion.div>

      {/* Scroll indicator — fixed at bottom of viewport, always visible */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 no-print"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        aria-hidden="true"
      >
        <motion.button
          onClick={() => scrollTo("#trust-bar")}
          className="flex flex-col items-center gap-1.5 text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors group"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-label="Scroll down"
        >
          <span className="text-[10px] tracking-widest uppercase font-medium opacity-0 group-hover:opacity-100 transition-opacity">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-current flex items-start justify-center p-1">
            <motion.div
              className="w-1 h-2 rounded-full bg-current"
              animate={{ opacity: [1, 0.3, 1], y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.button>
      </motion.div>
    </section>
  );
}
