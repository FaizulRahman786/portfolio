import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowRight, X, Layers, Cpu, ShoppingBag } from "lucide-react";

const projects = [
  {
    id: "anamika-sweets",
    title: "Anamika Sweets SaaS",
    tagline: "Modern SaaS platform for restaurants & sweet shops",
    icon: ShoppingBag,
    color: "from-amber-500/20 to-orange-500/10",
    border: "hover:border-amber-500/40",
    accentColor: "text-amber-400",
    tags: ["React", "Node.js", "PostgreSQL", "Cloudinary", "Express", "JWT"],
    problem: "Restaurant and sweet shop owners struggle with manual order management, leading to errors, slow service, and poor customer experience.",
    solution: "Built a comprehensive SaaS platform with real-time order management, cloud-based media storage, and a polished admin dashboard that any shop owner can operate.",
    features: [
      "Secure authentication with JWT + refresh tokens",
      "Real-time order tracking and management dashboard",
      "Cloudinary integration for optimized product images",
      "Responsive design for mobile POS use",
      "Role-based access control for staff and admin",
    ],
    architecture: "React frontend with Express REST API, PostgreSQL database, and Cloudinary CDN for media assets. JWT-based auth with refresh token rotation.",
    lessons: "Learned the importance of role-based access design upfront and how Cloudinary upload presets dramatically simplify media workflows.",
    demo: "#",
    github: "https://github.com/faizulrahman",
  },
  {
    id: "kainnat-jewellery",
    title: "Kainnat Art Jewellery",
    tagline: "Premium luxury jewellery e-commerce experience",
    icon: Layers,
    color: "from-purple-500/20 to-pink-500/10",
    border: "hover:border-purple-500/40",
    accentColor: "text-purple-400",
    tags: ["React", "CSS3", "JavaScript", "Responsive Design", "Animation"],
    problem: "High-end jewellery brands lack websites that match the premium feel of their products — most look like generic e-commerce templates.",
    solution: "Crafted a bespoke luxury showcase site with cinematic product presentations, smooth animations, and a shopping experience that feels as premium as the jewellery itself.",
    features: [
      "Cinematic product showcase with parallax effects",
      "Custom animations and micro-interactions",
      "Mobile-first responsive layout with touch gestures",
      "Optimized images with lazy loading for performance",
      "Premium typography and refined whitespace design",
    ],
    architecture: "Pure React with CSS custom animations, no heavy libraries. Lighthouse score above 95 for performance and accessibility.",
    lessons: "Less is more in luxury design — every element must earn its place. Performance is part of the luxury experience.",
    demo: "#",
    github: "https://github.com/faizulrahman",
  },
  {
    id: "face-recognition",
    title: "Face Recognition System",
    tagline: "Python AI application with computer vision pipeline",
    icon: Cpu,
    color: "from-cyan-500/20 to-blue-500/10",
    border: "hover:border-cyan-500/40",
    accentColor: "text-cyan-400",
    tags: ["Python", "OpenCV", "face_recognition", "NumPy", "Machine Learning"],
    problem: "Manual attendance systems are error-prone and time-consuming — the need for automated identity verification is growing rapidly.",
    solution: "Built a real-time face detection and recognition pipeline using deep learning embeddings that identifies individuals with high accuracy from a live camera feed.",
    features: [
      "Real-time face detection from webcam or video stream",
      "128-dimensional face embedding comparison",
      "Multi-face simultaneous recognition",
      "Confidence scoring with threshold tuning",
      "Enrollment pipeline for adding new identities",
    ],
    architecture: "OpenCV for video capture and preprocessing, face_recognition (dlib) for 128-d embeddings, NumPy for vector distance computation.",
    lessons: "Understanding the full ML pipeline — data collection, preprocessing, embedding, and inference — is more valuable than any individual library.",
    demo: "#",
    github: "https://github.com/faizulrahman",
  },
];

function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  const Icon = project.icon;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
      data-testid="modal-project-backdrop"
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        data-testid="modal-project-content"
      >
        <div className={`p-6 bg-gradient-to-br ${project.color} border-b border-border`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-background/50 flex items-center justify-center">
                <Icon className={`w-5 h-5 ${project.accentColor}`} />
              </div>
              <div>
                <h3 className="text-xl font-bold" data-testid="modal-project-title">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.tagline}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-background/50 flex items-center justify-center hover:bg-background/80 transition-colors"
              data-testid="button-close-modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-full bg-background/50 text-xs font-medium" data-testid={`badge-tech-${tag.toLowerCase()}`}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-2">Problem</h4>
            <p className="text-sm text-foreground/80 leading-relaxed">{project.problem}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-2">Solution</h4>
            <p className="text-sm text-foreground/80 leading-relaxed">{project.solution}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-2">Key Features</h4>
            <ul className="space-y-2">
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                  <span className="text-primary mt-0.5">›</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-2">Architecture</h4>
            <p className="text-sm text-foreground/80 leading-relaxed font-mono bg-muted/50 p-3 rounded-lg">{project.architecture}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-2">Lessons Learned</h4>
            <p className="text-sm text-foreground/80 leading-relaxed italic">"{project.lessons}"</p>
          </div>
          <div className="flex gap-3 pt-2">
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              data-testid="link-project-demo"
            >
              <ExternalLink className="w-4 h-4" /> Live Demo
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border text-sm font-medium hover:border-primary/50 hover:bg-muted/50 transition-colors"
              data-testid="link-project-github"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeProject, setActiveProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" ref={ref} className="py-24 px-4 sm:px-6 lg:px-8" aria-label="Projects section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            Selected Work
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold mb-4" data-testid="heading-projects">
            Projects that ship
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto">
            Not just tutorials — real products solving real problems, built with production-grade architecture.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className={`group relative rounded-2xl border border-border bg-card overflow-hidden cursor-pointer transition-all duration-300 ${project.border} hover:shadow-xl hover:shadow-black/20`}
                onClick={() => setActiveProject(project)}
                whileHover={{ y: -6 }}
                data-testid={`card-project-${project.id}`}
              >
                <div className={`h-48 bg-gradient-to-br ${project.color} relative overflow-hidden flex items-center justify-center`}>
                  <Icon className={`w-16 h-16 ${project.accentColor} opacity-30`} />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="px-4 py-2 rounded-full bg-background/80 text-xs font-medium flex items-center gap-1.5">
                      View Case Study <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-lg mb-1.5 group-hover:text-primary transition-colors" data-testid={`heading-project-${project.id}`}>
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.tagline}</p>

                  <div className="flex items-center gap-2">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                      data-testid={`link-demo-${project.id}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Demo
                    </a>
                    <span className="text-border">•</span>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                      data-testid={`link-code-${project.id}`}
                    >
                      <Github className="w-3.5 h-3.5" /> Code
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
