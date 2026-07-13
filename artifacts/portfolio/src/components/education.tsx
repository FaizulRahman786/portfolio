import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { GraduationCap, BookOpen, Award } from "lucide-react";

const educationItems = [
  {
    icon: GraduationCap,
    degree: "B.Tech – Computer Science & Engineering (AI & ML)",
    specialization: "Artificial Intelligence & Machine Learning Specialization",
    institution: "Lovely Professional University",
    location: "Phagwara, Punjab, India",
    period: "Expected Graduation: 2029",
    grade: "CGPA: 8.1",
    highlights: [
      "Core CS: Data Structures & Algorithms, OOP, DBMS, Operating Systems, Computer Networks, Software development",
      "Hands-on experience building production-ready SaaS platforms and full-stack web applications",
      "Active freelance developer partnering directly with founders and clients"
    ],
    color: "from-amber-500/20 to-primary/10",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    icon: BookOpen,
    degree: "High School (12th Grade – Science)",
    specialization: "Physics, Chemistry, Mathematics (PCM)",
    institution: "High School, Fatuha",
    location: "Fatuha, Bihar, India",
    period: "2023 – 2025",
    grade: "Percentage: 80%",
    highlights: [
      "Completed higher secondary school education with 80% marks",
      "Developed a solid foundation in Physics, Chemistry, and Mathematics"
    ],
    color: "from-blue-500/20 to-cyan-500/10",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-400/10",
  },
  {
    icon: BookOpen,
    degree: "10th Grade",
    specialization: "Secondary School Education",
    institution: "Infant Jesus, Baktiyarpur",
    location: "Baktiyarpur, Bihar, India",
    period: "Completed: 2023",
    grade: "Percentage: 90.6%",
    highlights: [
      "Secured outstanding academic performance of 90.6% marks",
      "Gained foundational skills in Mathematics, Sciences, and Languages"
    ],
    color: "from-purple-500/20 to-pink-500/10",
    iconColor: "text-purple-400",
    iconBg: "bg-purple-400/10",
  },
];

const certifications = [
  { name: "Leadership fundamental", provider: "Edutech", date: "November 2025" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Education() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/20" aria-label="Education section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            Education
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold mb-4" data-testid="heading-education">
            Academic background
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto">
            A strong foundation in computer science, reinforced by continuous self-learning in AI and software engineering.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {educationItems.map((edu, i) => {
              const Icon = edu.icon;
              return (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                  className="rounded-2xl border border-border overflow-hidden bg-card hover:border-primary/30 transition-colors group"
                  whileHover={{ y: -4 }}
                  data-testid={`card-education-${i}`}
                >
                  <div className={`p-6 bg-gradient-to-br ${edu.color}`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl ${edu.iconBg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-6 h-6 ${edu.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div>
                            <h3 className="font-bold text-lg" data-testid={`text-degree-${i}`}>{edu.degree}</h3>
                            <p className="text-sm text-primary font-medium">{edu.specialization}</p>
                          </div>
                          <span className="font-mono text-xs bg-background/50 px-2.5 py-1 rounded-full flex-shrink-0 text-muted-foreground">
                            {edu.period}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{edu.institution} — {edu.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-primary">{edu.grade}</span>
                    </div>
                    <ul className="space-y-2">
                      {edu.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-0.5">›</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-bold mb-4 text-sm tracking-widest uppercase text-muted-foreground">
                Certifications
              </h3>
              <div className="space-y-3">
                {certifications.map((course, i) => (
                  <div
                    key={course.name}
                    className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 hover:bg-muted/60 transition-colors border border-border/60"
                    data-testid={`card-course-${i}`}
                  >
                    <Award className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium leading-tight">{course.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{course.provider} · {course.date}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
                <div className="text-xs font-mono text-primary mb-1">// learning philosophy</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Education doesn't stop at graduation. Every project is a curriculum.
                  Every bug is a lesson. Every shipped feature is a degree.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
