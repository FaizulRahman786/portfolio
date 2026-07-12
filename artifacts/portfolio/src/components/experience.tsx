import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Plus } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

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
            My professional experience — from internships and freelance to research and open-source contributions.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <div className="rounded-2xl border border-dashed border-border/60 bg-card/40 p-10 text-center" data-testid="experience-placeholder">
            <div className="w-14 h-14 rounded-2xl border border-border bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Building experience</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Currently focused on academics and building projects. Open to internships,
              freelance opportunities, and open-source collaborations.
            </p>
            <div className="grid grid-cols-2 gap-3 text-left">
              {[
                { label: "Internships", desc: "Open to summer/winter internships in AI/ML or Full Stack roles" },
                { label: "Freelance", desc: "Available for web development and AI integration projects" },
                { label: "Research", desc: "Interested in ML research collaborations and paper implementations" },
                { label: "Open Source", desc: "Contributing to and learning from open-source AI/ML projects" },
              ].map(({ label, desc }) => (
                <div
                  key={label}
                  className="p-4 rounded-xl border border-border bg-background/50 hover:border-primary/30 transition-colors"
                  data-testid={`card-opportunity-${label.toLowerCase()}`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Plus className="w-3 h-3 text-primary" />
                    <span className="text-xs font-semibold">{label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              data-testid="button-open-to-work"
            >
              Let's Connect
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
