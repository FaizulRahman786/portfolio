import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  SiPython, SiJavascript, SiTypescript, SiHtml5,
  SiReact, SiNodedotjs, SiExpress, SiDjango, SiBootstrap,
  SiPostgresql, SiMongodb, SiFirebase, SiSupabase,
  SiGit, SiVite, SiCloudinary, SiVercel, SiRender,
} from "react-icons/si";

interface SkillItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  projects: string[];
  color?: string; // brand color for the icon bg tint
}

interface SkillCategory {
  name: string;
  description: string;
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Languages & Core",
    description: "The foundation everything is built on",
    skills: [
      { name: "Python", icon: SiPython, projects: ["Face Recognition System"], color: "#3776AB" },
      { name: "TypeScript", icon: SiTypescript, projects: ["MB Career Connect", "Anamika SaaS"], color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, projects: ["MB Career Connect", "Pizzeria Town"], color: "#F7DF1E" },
      { name: "HTML & CSS", icon: SiHtml5, projects: ["Jewellery Website", "Pizzeria Town"], color: "#E34F26" },
    ],
  },
  {
    name: "Frontend",
    description: "Building interfaces users love",
    skills: [
      { name: "React", icon: SiReact, projects: ["MB Career Connect", "Anamika SaaS"], color: "#61DAFB" },
      { name: "Vite", icon: SiVite, projects: ["MB Career Connect", "Anamika SaaS"], color: "#646CFF" },
      { name: "Bootstrap", icon: SiBootstrap, projects: ["Jewellery Website", "Anamika SaaS"], color: "#7952B3" },
    ],
  },
  {
    name: "Backend & APIs",
    description: "Scalable services powering products",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, projects: ["MB Career Connect", "Jewellery Website"], color: "#339933" },
      { name: "Express.js", icon: SiExpress, projects: ["MB Career Connect", "Jewellery Website"], color: "#888888" },
      { name: "Django", icon: SiDjango, projects: ["ML Inference APIs"], color: "#092E20" },
    ],
  },
  {
    name: "Databases",
    description: "Data at any scale",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, projects: ["MB Career Connect"], color: "#4169E1" },
      { name: "MongoDB", icon: SiMongodb, projects: ["Jewellery Website"], color: "#47A248" },
      { name: "Firebase", icon: SiFirebase, projects: ["MB Career Connect", "Anamika SaaS"], color: "#FFCA28" },
      { name: "Supabase", icon: SiSupabase, projects: ["Internal Tools"], color: "#3ECF8E" },
    ],
  },
  {
    name: "Cloud & DevOps",
    description: "Deployment, CI/CD, and monitoring",
    skills: [
      { name: "Vercel", icon: SiVercel, projects: ["MB Career Connect", "Anamika SaaS"], color: "#888888" },
      { name: "Render", icon: SiRender, projects: ["API Deployment", "Background Tasks"], color: "#46E3B7" },
      { name: "Cloudinary", icon: SiCloudinary, projects: ["MB Career Connect", "Jewellery Website"], color: "#3448C5" },
      { name: "Git & GitHub", icon: SiGit, projects: ["Version Control", "CI/CD"], color: "#F05032" },
    ],
  },
];

function SkillCard({ skill }: { skill: SkillItem }) {
  const Icon = skill.icon;
  // Create subtle icon background using brand color at low opacity
  const iconStyle = skill.color
    ? { backgroundColor: `${skill.color}12`, border: `1px solid ${skill.color}25` }
    : undefined;

  return (
    <motion.div
      className="flex items-start gap-3.5 p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-all group cursor-default"
      whileHover={{ y: -2 }}
      data-testid={`skill-card-${skill.name.toLowerCase().replace(/[\.\s]/g, "")}`}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-105"
        style={iconStyle || { backgroundColor: "hsl(var(--muted)/0.8)" }}
      >
        <span style={{ color: skill.color || "hsl(var(--muted-foreground))" }} aria-hidden="true">
          <Icon className="w-[18px] h-[18px]" />
        </span>
      </div>
      <div className="space-y-1 min-w-0">
        <span className="text-sm font-semibold text-foreground block group-hover:text-primary transition-colors">
          {skill.name}
        </span>
        <div className="text-[10px] text-muted-foreground leading-tight">
          <span className="font-mono text-primary/50">// </span>
          {skill.projects.slice(0, 2).join(", ")}
          {skill.projects.length > 2 && ` +${skill.projects.length - 2}`}
        </div>
      </div>
    </motion.div>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="skills"
      ref={ref}
      className="py-28 px-4 sm:px-6 lg:px-8 section-alt"
      aria-label="Skills and technologies"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.18em] text-primary uppercase mb-4">
            Stack & Tooling
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-4xl sm:text-5xl font-bold mb-4"
            data-testid="heading-skills"
          >
            Built with the right tools.
            <br />
            <span className="text-muted-foreground font-light">Not just the popular ones.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
            Every technology here has shipped to production. No resume padding.
          </motion.p>
        </motion.div>

        {/* Categories */}
        <div className="space-y-10">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + catIdx * 0.07, duration: 0.45, ease: "easeOut" }}
              className="space-y-3"
            >
              {/* Category header */}
              <div className="flex items-baseline gap-3">
                <h3 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  {category.name}
                </h3>
                <div className="text-[11px] text-muted-foreground/50 hidden sm:block">
                  — {category.description}
                </div>
                <div className="flex-1 h-px bg-border/50" />
              </div>

              {/* Skills grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {category.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      delay: 0.15 + catIdx * 0.07 + skillIdx * 0.04,
                      duration: 0.3,
                      ease: "backOut",
                    }}
                  >
                    <SkillCard skill={skill} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Actively learning */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.45 }}
          className="mt-12 text-center"
        >
          <p className="text-xs text-muted-foreground/60 mb-3 font-mono">
            // actively deploying in research & projects
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["LangChain", "PyTorch", "FastAPI", "Docker", "AWS", "MLflow"].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs text-primary font-medium"
                data-testid={`badge-learning-${tech.toLowerCase()}`}
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
