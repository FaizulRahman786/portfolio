import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Rocket, Briefcase, Brain, GitBranch, TrendingUp } from "lucide-react";

const achievements = [
  {
    icon: Rocket,
    category: "SaaS",
    title: "Production-Ready SaaS Platforms",
    description: "Shipped multiple full-stack SaaS platforms — including MB Career Connection and Anamika SaaS Platform — from architecture through cloud deployment.",
    date: "2026–present",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Briefcase,
    category: "Freelance",
    title: "Real Business Solutions Delivered",
    description: "Built and deployed production websites and platforms for real clients across restaurants, jewellery, and career services.",
    date: "2026–present",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    icon: Brain,
    category: "AI & ML",
    title: "Continuous AI Learning",
    description: "Pursuing B.Tech CSE (AI & ML) at Lovely Professional University while applying AI concepts to production systems.",
    date: "2025–present",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  {
    icon: GitBranch,
    category: "Open Source",
    title: "Active GitHub Contributor",
    description: "Maintains public repositories spanning SaaS platforms, e-commerce, and utility tooling on GitHub.",
    date: "2025–present",
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
  {
    icon: TrendingUp,
    category: "Growth",
    title: "Continuous Improvement",
    description: "Consistently iterating on architecture, performance, and UX across every shipped project.",
    date: "Ongoing",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Achievements() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="achievements" ref={ref} className="py-24 px-4 sm:px-6 lg:px-8" aria-label="Achievements section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            Achievements
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold mb-4" data-testid="heading-achievements">
            Milestones &amp; recognition
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto">
            Hackathons, certifications, and academic milestones that mark the journey.
          </motion.p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border" aria-hidden="true" />

          <div className="space-y-6">
            {achievements.map((ach, i) => {
              const Icon = ach.icon;
              return (
                <motion.div
                  key={ach.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="relative flex gap-6"
                  data-testid={`achievement-${i}`}
                >
                  <div className={`relative z-10 w-16 h-16 flex-shrink-0 rounded-2xl ${ach.bg} border border-border flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${ach.color}`} />
                  </div>

                  <motion.div
                    className="flex-1 p-5 rounded-2xl border border-border bg-card hover:border-primary/30 transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                      <div>
                        <span className={`text-xs font-semibold tracking-widest uppercase ${ach.color}`}>{ach.category}</span>
                        <h3 className="font-bold text-base mt-0.5" data-testid={`text-achievement-title-${i}`}>{ach.title}</h3>
                      </div>
                      <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded-md flex-shrink-0">
                        {ach.date}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{ach.description}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
