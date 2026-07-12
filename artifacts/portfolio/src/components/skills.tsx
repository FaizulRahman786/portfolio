import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiPython, SiJavascript, SiTypescript, SiHtml5, SiCss,
  SiReact, SiNodedotjs, SiExpress, SiDjango, SiBootstrap,
  SiPostgresql, SiMongodb, SiFirebase, SiSupabase,
  SiGit, SiGithub, SiVite, SiCloudinary, SiVercel, SiRender
} from "react-icons/si";
import { Database } from "lucide-react";

const skillCategories = [
  {
    name: "Programming",
    skills: [
      { name: "Python", icon: SiPython, level: 90 },
      { name: "JavaScript", icon: SiJavascript, level: 85 },
      { name: "TypeScript", icon: SiTypescript, level: 80 },
      { name: "HTML", icon: SiHtml5, level: 95 },
      { name: "CSS", icon: SiCss, level: 90 },
    ],
  },
  {
    name: "Frameworks",
    skills: [
      { name: "React", icon: SiReact, level: 88 },
      { name: "Node.js", icon: SiNodedotjs, level: 80 },
      { name: "Express", icon: SiExpress, level: 78 },
      { name: "Django", icon: SiDjango, level: 72 },
      { name: "Bootstrap", icon: SiBootstrap, level: 85 },
    ],
  },
  {
    name: "Databases",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, level: 82 },
      { name: "MongoDB", icon: SiMongodb, level: 78 },
      { name: "Firebase", icon: SiFirebase, level: 75 },
      { name: "Supabase", icon: SiSupabase, level: 70 },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Git", icon: SiGit, level: 90 },
      { name: "GitHub", icon: SiGithub, level: 92 },
      { name: "Vite", icon: SiVite, level: 85 },
      { name: "Cloudinary", icon: SiCloudinary, level: 75 },
      { name: "Vercel", icon: SiVercel, level: 88 },
      { name: "Render", icon: SiRender, level: 80 },
    ],
  },
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} data-testid={`skill-bar-${name.toLowerCase().replace(/\./g, "")}`}>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs text-primary font-mono">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary/70 to-primary"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ delay, duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function SkillCard({ skill }: { skill: { name: string; icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }> } }) {
  const Icon = skill.icon;
  return (
    <motion.div
      className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all group cursor-default"
      whileHover={{ y: -4, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      data-testid={`skill-card-${skill.name.toLowerCase().replace(/[\.\s]/g, "")}`}
    >
      <Icon className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors" />
      <span className="text-xs font-medium text-center">{skill.name}</span>
    </motion.div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/20" aria-label="Skills section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            Skills &amp; Technologies
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold mb-4" data-testid="heading-skills">
            The toolkit I use
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto">
            A curated set of languages, frameworks, and tools I rely on to build
            production-grade AI and web applications.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {skillCategories.slice(0, 2).map((cat) => (
              <div key={cat.name}>
                <h3 className="text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-4">
                  {cat.name}
                </h3>
                <div className="space-y-3">
                  {cat.skills.map((skill, i) => (
                    <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={0.3 + i * 0.08} />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {skillCategories.slice(2).map((cat) => (
              <div key={cat.name}>
                <h3 className="text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-4">
                  {cat.name}
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {cat.skills.map((skill) => (
                    <SkillCard key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            ))}

            <div className="p-6 rounded-xl border border-primary/20 bg-primary/5">
              <div className="text-xs font-mono text-primary mb-2">// currently learning</div>
              <div className="flex flex-wrap gap-2">
                {["LangChain", "PyTorch", "FastAPI", "Docker", "AWS", "MLflow"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-full border border-primary/30 text-xs text-primary bg-primary/10"
                    data-testid={`badge-learning-${tech.toLowerCase()}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
