import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";
import {
  SiPython, SiJavascript, SiTypescript, SiHtml5, SiCss, SiCplusplus, SiC,
  SiReact, SiNodedotjs, SiExpress, SiDjango, SiBootstrap, SiTailwindcss, SiVite,
  SiPostgresql, SiMongodb, SiFirebase, SiSupabase,
  SiJsonwebtokens, SiClerk,
  SiGit, SiGithub, SiCloudinary, SiCloudflare, SiVercel, SiRazorpay, SiPostman,
} from "react-icons/si";
import { Code2, Cpu } from "lucide-react";

const filters = ["All", "Languages", "Frontend", "Backend", "Database", "Cloud", "Tools", "Core CS"] as const;
type Filter = (typeof filters)[number];

const skillCategories: { name: Filter; skills: { name: string; icon: React.ComponentType<{ className?: string }> }[] }[] = [
  {
    name: "Languages",
    skills: [
      { name: "Python", icon: SiPython },
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "C", icon: SiC },
      { name: "C++", icon: SiCplusplus },
    ],
  },
  {
    name: "Frontend",
    skills: [
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS", icon: SiCss },
      { name: "Tailwind", icon: SiTailwindcss },
      { name: "Bootstrap", icon: SiBootstrap },
      { name: "Vite", icon: SiVite },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "Django", icon: SiDjango },
      { name: "REST APIs", icon: Code2 },
    ],
  },
  {
    name: "Database",
    skills: [
      { name: "MongoDB", icon: SiMongodb },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Firebase", icon: SiFirebase },
      { name: "Supabase", icon: SiSupabase },
    ],
  },
  {
    name: "Cloud",
    skills: [
      { name: "Vercel", icon: SiVercel },
      { name: "Cloudinary", icon: SiCloudinary },
      { name: "Cloudflare", icon: SiCloudflare },
      { name: "Razorpay", icon: SiRazorpay },
      { name: "Clerk Auth", icon: SiClerk },
      { name: "JWT", icon: SiJsonwebtokens },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "Postman", icon: SiPostman },
    ],
  },
  {
    name: "Core CS",
    skills: [
      { name: "DSA", icon: Cpu },
      { name: "OOP", icon: Cpu },
      { name: "DBMS", icon: Cpu },
      { name: "Operating Systems", icon: Cpu },
      { name: "Computer Networks", icon: Cpu },
      { name: "Software Engineering", icon: Cpu },
    ],
  },
];

function SkillCard({ skill, index }: { skill: { name: string; icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }> }; index: number }) {
  const Icon = skill.icon;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, delay: index * 0.02 }}
      className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-colors group cursor-default"
      whileHover={{ y: -4, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      data-testid={`skill-card-${skill.name.toLowerCase().replace(/[\.\s]/g, "")}`}
    >
      <Icon className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors" />
      <span className="text-xs font-medium text-center">{skill.name}</span>
    </motion.div>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const visibleCategories =
    activeFilter === "All" ? skillCategories : skillCategories.filter((c) => c.name === activeFilter);

  return (
    <section id="skills" ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/20" aria-label="Skills section">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="text-center mb-12"
        >
          <motion.p variants={fadeUp} className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            Skills &amp; Technologies
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold mb-4" data-testid="heading-skills">
            The toolkit I use
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto">
            A curated set of languages, frameworks, and tools I rely on to build
            production-grade SaaS and web applications.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
          role="tablist"
          aria-label="Filter skills by category"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              role="tab"
              aria-selected={activeFilter === f}
              className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all border ${
                activeFilter === f
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
              data-testid={`button-filter-${f.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        <div className="space-y-10">
          <AnimatePresence mode="popLayout">
            {visibleCategories.map((cat) => (
              <motion.div
                key={cat.name}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {activeFilter === "All" && (
                  <h3 className="text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-4">
                    {cat.name}
                  </h3>
                )}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {cat.skills.map((skill, i) => (
                    <SkillCard key={`${cat.name}-${skill.name}`} skill={skill} index={i} />
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 p-6 rounded-xl border border-primary/20 bg-primary/5 max-w-2xl mx-auto"
        >
          <div className="text-xs font-mono text-primary mb-2">// currently exploring</div>
          <div className="flex flex-wrap gap-2 justify-center">
            {["LangChain", "PyTorch", "FastAPI", "Docker", "AWS"].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-full border border-primary/30 text-xs text-primary bg-primary/10"
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
