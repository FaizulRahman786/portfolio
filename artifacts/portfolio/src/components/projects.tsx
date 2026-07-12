import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";
import { ExternalLink, Github, ArrowRight, X, Users, ShoppingBag, Gem, Pizza, Star } from "lucide-react";
import mbCareerConnectImg from "@assets/project-mb-career-connect.png";
import anamikaSaasImg from "@assets/project-anamika-saas.png";
import kainnatJewelleryImg from "@assets/project-kainnat-jewellery.png";
import pizzeriaTownImg from "@assets/project-pizzeria-town.png";

const projects = [
  {
    id: "mb-career-connect",
    title: "MB Career Connect",
    tagline: "Career development SaaS platform",
    flagship: true,
    status: "Ongoing",
    image: mbCareerConnectImg,
    icon: Users,
    color: "from-primary/25 to-primary/5",
    border: "hover:border-primary/50",
    accentColor: "text-primary",
    tags: ["React", "TypeScript", "Node.js", "Firebase", "Firestore", "Cloudinary", "Cloudflare", "Razorpay", "Express"],
    problem: "Students, mentors, recruiters, and alumni operate in disconnected systems — making career guidance, mentorship, and hiring slow and fragmented.",
    solution: "Built a unified role-based SaaS ecosystem connecting students, mentors, recruiters, and alumni through career guidance, mentorship, a job portal, scholarships, and event management.",
    features: [
      "Career guidance and mentorship matching",
      "Job and internship portal with employer dashboards",
      "Scholarship discovery and alumni network",
      "Hackathon and event management",
      "Integrated payments via Razorpay",
      "Role-based dashboards with secure authentication",
    ],
    architecture: "React + TypeScript frontend, Express REST API, Firebase/Firestore for data and auth, Cloudinary for media, Cloudflare for delivery, Razorpay for payments.",
    lessons: "Designing a role-based permission model up front made every subsequent feature — payments, dashboards, mentorship — far easier to compose safely.",
    demo: "https://mb-career-connect.vercel.app",
    github: "https://github.com/FaizulRahman786/mb-carrer-connection.git",
  },
  {
    id: "anamika-saas",
    title: "Anamika SaaS",
    tagline: "Restaurant & sweet shop SaaS platform",
    status: "Live",
    image: anamikaSaasImg,
    icon: ShoppingBag,
    color: "from-amber-500/20 to-orange-500/10",
    border: "hover:border-amber-500/40",
    accentColor: "text-amber-400",
    tags: ["React", "TypeScript", "Node.js", "Firebase", "Cloudinary", "Cloudflare", "Clerk"],
    problem: "Restaurant and sweet shop owners struggle with manual order, reservation, and review management, leading to errors and poor customer experience.",
    solution: "Built a multi-tenant SaaS platform with a dynamic admin dashboard, table booking, review and gallery management, and role-based access control.",
    features: [
      "Restaurant management with admin dashboard",
      "Role-based access control for staff and owners",
      "Table booking and reservation system",
      "Clerk-based authentication",
      "SEO-optimized, fully responsive UI",
    ],
    architecture: "React + TypeScript frontend, Node.js backend, Firebase for data, Cloudinary for media, Cloudflare for delivery, Clerk for authentication.",
    lessons: "Multi-tenant data isolation needs to be designed at the schema level from day one — retrofitting it later is expensive.",
    demo: "https://restaurantadvitisment.vercel.app",
    github: "https://github.com/FaizulRahman786/restaurantadvitisment",
  },
  {
    id: "kainnat-jewellery",
    title: "Jewellery Shop Website",
    tagline: "Modern jewellery business website",
    status: "Live",
    image: kainnatJewelleryImg,
    icon: Gem,
    color: "from-purple-500/20 to-pink-500/10",
    border: "hover:border-purple-500/40",
    accentColor: "text-purple-400",
    tags: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Cloudinary", "Clerk"],
    problem: "High-end jewellery brands lack websites that match the premium feel of their products — most look like generic e-commerce templates.",
    solution: "Crafted a bespoke luxury showcase site with cinematic product presentations, a full product catalog backed by MongoDB, and secure authentication.",
    features: [
      "Cinematic product showcase with premium typography",
      "MongoDB-backed product catalog",
      "Clerk authentication for accounts and checkout",
      "Cloudinary-optimized product imagery",
      "Fully responsive, mobile-first layout",
    ],
    architecture: "React + TypeScript frontend, Express REST API, MongoDB for product data, Cloudinary CDN for media, Clerk for authentication.",
    lessons: "Less is more in luxury design — every element must earn its place, and performance is part of the premium experience.",
    demo: "https://faizul.vercel.app",
    github: "https://github.com/FaizulRahman786/jewellary-shop",
  },
  {
    id: "pizzeria-town",
    title: "Pizzeria Town",
    tagline: "Restaurant landing page",
    status: "Live",
    image: pizzeriaTownImg,
    icon: Pizza,
    color: "from-cyan-500/20 to-blue-500/10",
    border: "hover:border-cyan-500/40",
    accentColor: "text-cyan-400",
    tags: ["HTML", "CSS", "JavaScript"],
    problem: "Small restaurants often need a fast, attractive landing page without the overhead of a full web application.",
    solution: "Built a lightweight, fast-loading restaurant landing page with menu highlights and a reservation call-to-action, using only vanilla web technologies.",
    features: [
      "Menu highlights and reservation CTA",
      "Fully responsive, dependency-free layout",
      "Fast load times with vanilla HTML/CSS/JS",
    ],
    architecture: "Static HTML/CSS/JavaScript site, no framework overhead, optimized for fast first paint.",
    lessons: "Sometimes the right tool is the simplest one — vanilla JS delivers instant load times for content-first sites.",
    demo: "https://pizzeriatown.vercel.app",
    github: "https://github.com/FaizulRahman786/pizzariya",
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

const fadeUp: Variants = {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, i) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
                className={`group relative rounded-2xl border border-border bg-card overflow-hidden cursor-pointer transition-all duration-300 ${project.border} hover:shadow-xl hover:shadow-black/20`}
                onClick={() => setActiveProject(project)}
                whileHover={{ y: -6 }}
                data-testid={`card-project-${project.id}`}
              >
                <div className={`h-40 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                  {project.flagship && (
                    <span className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold tracking-wide">
                      <Star className="w-3 h-3" /> Flagship
                    </span>
                  )}
                  <span
                    className={`absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide ${
                      project.status === "Ongoing" ? "bg-amber-500/90 text-black" : "bg-background/80 text-foreground"
                    }`}
                  >
                    {project.status}
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                    <span className="px-4 py-2 rounded-full bg-background/90 text-xs font-medium flex items-center gap-1.5">
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
