import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Briefcase, Plus } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const timeline = [
  { year: "2022", label: "Started Learning Programming", desc: "Began with Python and the fundamentals of computer science." },
  { year: "2023", label: "HTML, CSS & JavaScript", desc: "Learned web fundamentals and built first static websites." },
  { year: "2023", label: "Started React Development", desc: "Moved into component-driven frontend engineering." },
  { year: "2024", label: "Backend & Databases", desc: "Learned Node.js, Express, Firebase, and MongoDB." },
  { year: "Aug 2025", label: "Started Freelancing", desc: "Began building full-stack SaaS products for real clients." },
  { year: "2025 – Present", label: "AI & ML Engineering", desc: "Deepening expertise in AI/ML at Lovely Professional University." },
];

export function Experience() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/20" aria-label="Experience section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            Experience
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold mb-4" data-testid="heading-experience">
            Professional journey
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto">
            From my first line of code to shipping production SaaS platforms as a freelance developer.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div
              className="rounded-2xl border border-border bg-card p-6 h-full hover:border-primary/30 transition-colors"
              data-testid="card-experience-current"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
                <h3 className="font-bold text-lg" data-testid="text-experience-title">Independent Full Stack Developer</h3>
              </div>
              <p className="text-sm text-primary font-medium mb-1">Freelance</p>
              <p className="text-xs font-mono text-muted-foreground mb-4">August 2025 – Present</p>
              <ul className="space-y-2">
                {[
                  "Design and build scalable SaaS platforms end-to-end",
                  "Develop production-grade React applications and REST APIs",
                  "Design databases, authentication, and cloud deployment pipelines",
                  "Deliver business solutions with performance optimization built in",
                ].map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Plus className="w-3 h-3 text-primary mt-1 flex-shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="relative pl-8">
              <div className="absolute left-2.5 top-2 bottom-2 w-px bg-border" aria-hidden="true" />
              <div className="space-y-6">
                {timeline.map((t, i) => (
                  <motion.div
                    key={t.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.35 + i * 0.08 }}
                    className="relative"
                    data-testid={`timeline-item-${i}`}
                  >
                    <div className="absolute -left-8 top-1 w-3 h-3 rounded-full bg-primary border-2 border-background" />
                    <span className="text-xs font-mono text-primary">{t.year}</span>
                    <h4 className="font-semibold text-sm mt-0.5">{t.label}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              data-testid="button-open-to-work"
            >
              Let's Connect
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
