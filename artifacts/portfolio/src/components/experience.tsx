import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Briefcase, Plus } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const timeline = [
  { year: "Aug 2025", label: "Frontend Development Foundations", desc: "Started learning Frontend Development. Focused on HTML, CSS, JavaScript, responsive design, Git, and building static websites." },
  { year: "Dec 2025", label: "MERN Stack Full Stack Transition", desc: "Transitioned into Full Stack Development. Learned the MERN Stack (MongoDB, Express.js, React.js, Node.js) and started building complete web applications." },
  { year: "Mar 2026", label: "Began Freelancing Journey", desc: "Started freelancing. Worked with clients, developed production-ready applications, improved communication skills, and learned real-world software development workflows." },
  { year: "May 2026", label: "Delivered First SaaS Product", desc: "Successfully delivered first SaaS application. Designed, developed, tested, and deployed a complete SaaS product for a real client using modern web technologies." },
  { year: "Jun 2026", label: "Machine Learning & AI Specialization", desc: "Started learning Machine Learning and Artificial Intelligence. Shifted focus toward AI/ML while continuing full-stack development, exploring data science, neural networks, and model development." },
  { year: "Aug 2026", label: "Data Structures & Algorithms (DSA)", desc: "Started learning Data Structures and Algorithms (DSA). Focused on problem solving, algorithmic thinking, optimization, and interview preparation." },
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
            Professional Journey
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto">
            From architecture to deployment: engineering systems designed to optimize business operations.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* Main Card (Left) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div
              className="rounded-2xl border border-border bg-card p-6 h-full hover:border-primary/30 transition-colors flex flex-col justify-between"
              data-testid="card-experience-current"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
                  <h3 className="font-bold text-lg" data-testid="text-experience-title">
                    Independent Full Stack Developer
                  </h3>
                </div>
                <p className="text-sm text-primary font-medium mb-1">Freelance Software Consultant</p>
                <p className="text-xs font-mono text-muted-foreground mb-6">March 2026 – Present</p>
                
                {/* Measurable Google XYZ Achievements */}
                <ul className="space-y-4">
                  {[
                    "Leveraged academic foundations in AI & ML and full-stack development to build production-ready SaaS platforms, e-commerce solutions, and business websites, transforming business requirements into scalable digital products.",
                    "Owned the complete software development lifecycle by collaborating with clients, designing intuitive user experiences, developing scalable backend systems, and deploying secure, high-performance applications for real-world use."
                  ].map((r, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                      <Plus className="w-3.5 h-3.5 text-primary mt-1 flex-shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 mt-8 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/95 transition-all shadow-md shadow-primary/10 cursor-pointer"
                data-testid="button-open-to-work"
              >
                Let's Connect
              </a>
            </div>
          </motion.div>

          {/* Timeline Milestones (Right) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="relative pl-8 h-full flex flex-col justify-between py-2">
              <div className="absolute left-2.5 top-4 bottom-4 w-px bg-border" aria-hidden="true" />
              <div className="space-y-6">
                {timeline.map((t, i) => (
                  <motion.div
                    key={t.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                    className="relative"
                    data-testid={`timeline-item-${i}`}
                  >
                    <div className="absolute -left-8 top-1.5 w-2.5 h-2.5 rounded-full bg-primary border-2 border-background shadow-sm" />
                    <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider">{t.year}</span>
                    <h4 className="font-bold text-sm mt-0.5 text-foreground">{t.label}</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{t.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
