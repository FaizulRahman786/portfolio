import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, Github, Linkedin } from "lucide-react";

const TYPED_STRINGS = [
  "AI Engineer",
  "ML Enthusiast",
  "Full Stack Developer",
  "Problem Solver",
];

function TypedText() {
  const [displayText, setDisplayText] = useState("");
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = TYPED_STRINGS[stringIndex];
    const speed = isDeleting ? 50 : 100;
    const pauseDelay = !isDeleting && charIndex === current.length ? 2000 : speed;

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < current.length) {
        setDisplayText(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      } else if (!isDeleting && charIndex === current.length) {
        setIsDeleting(true);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      } else {
        setIsDeleting(false);
        setStringIndex((s) => (s + 1) % TYPED_STRINGS.length);
      }
    }, pauseDelay);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, stringIndex]);

  return (
    <span className="text-primary" data-testid="text-typed-headline">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
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
        ctx.fillStyle = `rgba(251, 191, 36, ${p.opacity})`;
        ctx.fill();
      });

      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(251, 191, 36, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });

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
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      <ParticleCanvas />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/60 pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Available for opportunities
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-none"
          data-testid="text-hero-name"
        >
          Faizul{" "}
          <span className="relative">
            <span className="text-primary">Rahman</span>
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-[3px] bg-primary rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            />
          </span>
        </motion.h1>

        <motion.div
          variants={item}
          className="text-xl sm:text-2xl lg:text-3xl font-medium text-muted-foreground mb-6 h-10"
          data-testid="text-hero-headline"
        >
          <TypedText />
        </motion.div>

        <motion.p
          variants={item}
          className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          data-testid="text-hero-intro"
        >
          I'm an AI &amp; ML engineering student at Lovely Professional University passionate about
          solving real-world problems through intelligent systems and scalable software.
          From computer vision pipelines to full-stack SaaS — I build things that matter.
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
        >
          <motion.a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            data-testid="button-view-projects"
          >
            View Projects <ArrowRight className="w-4 h-4" />
          </motion.a>

          <motion.a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-transparent text-foreground font-semibold text-sm hover:border-primary/50 hover:bg-muted/50 transition-all"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            data-testid="button-download-resume"
          >
            <Download className="w-4 h-4" /> Download Resume
          </motion.a>

          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-transparent text-foreground font-semibold text-sm hover:border-primary/50 hover:bg-muted/50 transition-all"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            data-testid="button-contact"
          >
            <Mail className="w-4 h-4" /> Contact Me
          </motion.a>
        </motion.div>

        <motion.div
          variants={item}
          className="flex items-center justify-center gap-4"
        >
          {[
            { icon: Github, href: "https://github.com/faizulrahman", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com/in/faizulrahman", label: "LinkedIn" },
            { icon: Mail, href: "mailto:faizul@example.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label={label}
              data-testid={`link-social-${label.toLowerCase()}`}
            >
              <Icon className="w-4 h-4" />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-1 h-2 rounded-full bg-primary/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
