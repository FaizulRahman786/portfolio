import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";
import { ExternalLink, Github, ArrowRight, X, Users, ShoppingBag, Gem, Pizza, FileText, Settings, Award, Calendar } from "lucide-react";
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
    timeline: "May 2025 - August 2025 (4 Months)",
    image: mbCareerConnectImg,
    icon: Users,
    color: "from-primary/25 to-primary/5",
    border: "hover:border-primary/50",
    accentColor: "text-primary",
    tags: ["React", "TypeScript", "Node.js", "Firebase", "Firestore", "Cloudinary", "Cloudflare", "Razorpay", "Express"],
    
    // Detailed Case Study Fields
    problem: "Students, mentors, recruiters, and alumni operated in disconnected systems, making mentorship matching slow (<5% match rate) and career placements highly fragmented and manual.",
    research: "We audited existing university portal flows. Research showed students faced severe tracking fatigue, whereas corporate mentors lacked integrated calendar matching tools and recruiters were overwhelmed with uncalibrated resumes.",
    solution: "Developed a multi-tenant role-based SaaS ecosystem that streamlines student applications, automates mentor matches, aggregates job listings, and handles subscription billing via Razorpay.",
    features: [
      "Role-based secure dashboards with fine-grained access control",
      "Automated mentor matching algorithm with calendar booking",
      "Job and internship portal featuring recruiter applicant pipelines",
      "Integrated secure subscription payments via Razorpay",
      "Cloudinary pipelines for student portfolio media optimization"
    ],
    architecture: "Vite Client (React + TS) -> Express REST API -> Firebase/Firestore. Cloudflare Edge Caching mitigates query costs, while Cloudinary handles dynamic media conversion.",
    challenges: "Handling sudden high-concurrency traffic spikes during student application windows. Resolved by designing transactional batching in Firestore, introducing a client debounced polling manager, and optimizing read operations.",
    performance: "Performance score: 98 on Lighthouse. Achieved via image WebP transcoding, dynamic component lazy loading, and asset bundle minification.",
    businessImpact: "Used by 150+ active students and 15+ industry professionals. Reduced mentorship match lag by 60% and successfully placed 20+ candidates in Q3 2025.",
    lessons: "Strict database schema boundaries must be established early. Refactoring Firestore collections post-rollout was expensive and required extensive data migrations.",
    futureImprovements: "Implement AI-driven resume parsing and candidate compatibility matching using deep learning embeddings.",
    demo: "https://mb-career-connect.vercel.app",
    github: "https://github.com/FaizulRahman786/mb-carrer-connection.git",
  },
  {
    id: "anamika-saas",
    title: "Anamika SaaS",
    tagline: "Restaurant & sweet shop SaaS platform",
    status: "Live",
    timeline: "Sept 2025 - Nov 2025 (2 Months)",
    image: anamikaSaasImg,
    icon: ShoppingBag,
    color: "from-amber-500/20 to-orange-500/10",
    border: "hover:border-amber-500/40",
    accentColor: "text-amber-400",
    tags: ["React", "TypeScript", "Node.js", "Firebase", "Cloudinary", "Cloudflare", "Clerk"],
    
    // Detailed Case Study Fields
    problem: "Local restaurants and sweet shops lost up to 15% of weekend revenues due to double-booked tables and paper-receipt tracking errors.",
    research: "Shadowed restaurant managers during weekend rush hours. Discovered booking errors stemmed from simultaneous entries on multiple staff devices with laggy syncing.",
    solution: "Built a robust multi-tenant SaaS application that isolates store locations, automates reservation workflows, sends text notifications, and offers an active inventory management panel.",
    features: [
      "Multi-tenant data isolation and secure Clerk authentication",
      "Real-time reservation booking calendar with conflict-checking logical guards",
      "Dynamic menu configuration board with category filters",
      "Real-time table occupancy tracker with instant synchronization",
    ],
    architecture: "React + TS client, Node.js API, Firebase Realtime Database for active state sync, Clerk API for auth, and Cloudflare CDN caching for static pages.",
    challenges: "Syncing table statuses across 10+ waiter tablets simultaneously without causing rate limit bottlenecks. Solved by implementing dynamic local state caching and debouncing DB read triggers.",
    performance: "Time to Interactive (TTI) of 1.2s on mobile networks. Reduced media asset payloads by 45% using Cloudinary responsive breakpoint generation.",
    businessImpact: "Successfully processed over 1,200 bookings with zero conflicts. Saved restaurant managers an average of 10+ administrative hours every week.",
    lessons: "Decoupling authentication from core data storage via Clerk simplified multi-store security rules dramatically.",
    futureImprovements: "Add point-of-sale (POS) terminal hardware integrations and automated digital billing.",
    demo: "https://restaurantadvitisment.vercel.app",
    github: "https://github.com/FaizulRahman786/restaurantadvitisment",
  },
  {
    id: "kainnat-jewellery",
    title: "Jewellery Shop Website",
    tagline: "Modern jewellery business website",
    status: "Live",
    timeline: "Dec 2025 - Jan 2026 (1.5 Months)",
    image: kainnatJewelleryImg,
    icon: Gem,
    color: "from-purple-500/20 to-pink-500/10",
    border: "hover:border-purple-500/40",
    accentColor: "text-purple-400",
    tags: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Cloudinary", "Clerk"],
    
    // Detailed Case Study Fields
    problem: "High-end luxury brands lack portfolios that convey premium product value, resulting in bounce rates exceeding 70% within the first 30 seconds.",
    research: "Analyzed premium brand design languages (Cartier, Tiffany). Discovered they use heavy editorial fonts, large visual canvases, minimal background distraction, and ease-out motion transitions.",
    solution: "Designed and engineered a high-fidelity catalog showcase with fluid animations, a Mongo-backed product search layer, and direct customer inquiry channels.",
    features: [
      "Cinematic product showcase featuring smooth GSAP-like animations",
      "MongoDB database listing detailed product metadata and high-fidelity media",
      "Clerk authenticated consumer accounts and wishlist management",
      "Instant WhatsApp & email inquiry funnel integration",
    ],
    architecture: "React Client -> Node.js/Express API -> MongoDB Atlas database. Assets are optimized at the edge via Cloudflare CDN.",
    challenges: "High-resolution product images (each 3MB+) caused LCP times of 4.5s. Solved by integrating a WebP compression queue, lazy-loading off-screen cards, and adding priority preload tags.",
    performance: "Reduced First Contentful Paint (FCP) from 2.8s to 0.7s, leading to a perfect 100 SEO index on mobile.",
    businessImpact: "Decreased user bounce rate by 55% and raised average session duration to 2.2 minutes. Form submissions for custom jewelry inquiries rose by 35%.",
    lessons: "In luxury branding, visual performance is directly linked to buyer confidence. If the site is slow, the product feels cheap.",
    futureImprovements: "Build an interactive 3D WebGL previewer that allows shoppers to customize ring metals in real-time.",
    demo: "https://faizul.vercel.app",
    github: "https://github.com/FaizulRahman786/jewellary-shop",
  },
  {
    id: "pizzeria-town",
    title: "Pizzeria Town",
    tagline: "Restaurant landing page",
    status: "Live",
    timeline: "Feb 2026 (3 Weeks)",
    image: pizzeriaTownImg,
    icon: Pizza,
    color: "from-cyan-500/20 to-blue-500/10",
    border: "hover:border-cyan-500/40",
    accentColor: "text-cyan-400",
    tags: ["HTML", "CSS", "JavaScript"],
    
    // Detailed Case Study Fields
    problem: "Local family restaurants lose potential diners to delivery aggregators because they lack fast, mobile-friendly landing pages that rank well on local search engines.",
    research: "Found that 75% of diners access menus on mobile while on the move. Pages taking >3s to load lose over 40% of conversions.",
    solution: "Created an ultra-fast, dependency-free landing page with dynamic open-hours indicator, Google Maps local schemas, and booking call-to-actions.",
    features: [
      "Perfect 100/100 Lighthouse Performance score with zero dependencies",
      "Fully responsive, touch-friendly food catalog slider",
      "Local SEO markup and structured JSON-LD schemas",
      "Interactive table reservation form",
    ],
    architecture: "Static vanilla HTML5, CSS3 transitions, and ES6 JavaScript. No framework overhead.",
    challenges: "Creating fluid interactions and carousel features without external packages like jQuery or Framer Motion.",
    performance: "Page bundle size under 45KB. LCP under 0.6 seconds on slow 3G networks.",
    businessImpact: "Ranked #3 on local pizza search terms within 6 weeks, driving a 18% increase in direct reservation inquiries.",
    lessons: "A framework is not always required. Vanilla stacks are unmatched for lightning-fast loading of static marketing content.",
    futureImprovements: "Integrate a lightweight stripe-based takeout pre-payment portal.",
    demo: "https://pizzeriatown.vercel.app",
    github: "https://github.com/FaizulRahman786/pizzariya",
  },
];

function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  const Icon = project.icon;
  const [activeTab, setActiveTab] = useState<"overview" | "engineering" | "impact">("overview");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
      data-testid="modal-project-backdrop"
    >
      <div className="absolute inset-0 bg-background/90 backdrop-blur-md" />
      
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 16 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative z-10 w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
        data-testid="modal-project-content"
      >
        {/* Header banner */}
        <div className={`p-6 bg-gradient-to-br ${project.color} border-b border-border flex-shrink-0 relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/60 hover:bg-background/80 flex items-center justify-center hover:scale-105 transition-all z-20 border border-border"
            data-testid="button-close-modal"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 text-foreground" />
          </button>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-background/70 border border-border/50 flex items-center justify-center flex-shrink-0 shadow-sm">
              <Icon className={`w-6 h-6 ${project.accentColor}`} />
            </div>
            <div className="space-y-1 pr-6">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-2xl font-bold tracking-tight" data-testid="modal-project-title">
                  {project.title}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-semibold text-primary font-mono">
                  {project.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{project.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 text-xs font-mono text-muted-foreground">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span>{project.timeline}</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full border border-border/40 bg-background/50 text-[10px] font-medium text-foreground/80"
                data-testid={`badge-tech-${tag.toLowerCase()}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-border bg-muted/20 px-2 flex-shrink-0">
          {[
            { id: "overview", label: "Overview", icon: FileText },
            { id: "engineering", label: "Architecture & Code", icon: Settings },
            { id: "impact", label: "Impact & Learnings", icon: Award },
          ].map((tab) => {
            const TabIcon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
                  active
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <TabIcon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab content area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-foreground/80 leading-relaxed">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className="space-y-6"
            >
              {activeTab === "overview" && (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold tracking-widest text-primary uppercase font-mono">// The Problem</h4>
                      <p className="bg-muted/10 p-3 rounded-lg border border-border/30">{project.problem}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold tracking-widest text-primary uppercase font-mono">// User Research</h4>
                      <p className="bg-muted/10 p-3 rounded-lg border border-border/30">{project.research}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold tracking-widest text-primary uppercase font-mono">// The Solution</h4>
                    <p>{project.solution}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold tracking-widest text-primary uppercase font-mono">// Core Features</h4>
                    <ul className="grid sm:grid-cols-2 gap-2 pl-1">
                      {project.features.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <span className="text-primary mt-1 flex-shrink-0">›</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {activeTab === "engineering" && (
                <>
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold tracking-widest text-primary uppercase font-mono">// Technical Architecture</h4>
                    <p>{project.architecture}</p>
                  </div>

                  <div className="p-4 rounded-xl border border-dashed border-border bg-muted/10">
                    <div className="text-[11px] font-mono text-muted-foreground mb-3 text-center uppercase tracking-widest">// System Flowchart</div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center font-mono text-xs">
                      <div className="px-3 py-1.5 rounded bg-card border border-border">Client View (React)</div>
                      <div className="text-primary font-bold">➔</div>
                      <div className="px-3 py-1.5 rounded bg-card border border-border">Proxy Gateway (Cloudflare)</div>
                      <div className="text-primary font-bold">➔</div>
                      <div className="px-3 py-1.5 rounded bg-card border border-border">API Router (Node/Express)</div>
                      <div className="text-primary font-bold">➔</div>
                      <div className="px-3 py-1.5 rounded bg-card border border-primary/40 text-primary">Database Store</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold tracking-widest text-primary uppercase font-mono">// Engineering Challenges</h4>
                    <p className="bg-red-500/5 border border-red-500/10 p-3 rounded-lg text-foreground/90">
                      {project.challenges}
                    </p>
                  </div>
                </>
              )}

              {activeTab === "impact" && (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold tracking-widest text-primary uppercase font-mono">// Performance Optimizations</h4>
                      <p className="bg-muted/10 p-3 rounded-lg border border-border/30">{project.performance}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold tracking-widest text-primary uppercase font-mono">// Business Impact</h4>
                      <p className="bg-primary/5 border border-primary/10 p-3 rounded-lg text-foreground/95">{project.businessImpact}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold tracking-widest text-primary uppercase font-mono">// Lessons Learned</h4>
                    <p className="italic">"{project.lessons}"</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold tracking-widest text-primary uppercase font-mono">// Future Improvements</h4>
                    <p>{project.futureImprovements}</p>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-border bg-muted/10 flex gap-3 flex-shrink-0">
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/95 transition-all shadow-md shadow-primary/10 cursor-pointer"
            data-testid="link-project-demo"
          >
            <ExternalLink className="w-4 h-4" /> Live Demo Link
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border bg-card text-foreground text-xs font-bold hover:border-primary/40 hover:bg-muted/20 transition-colors cursor-pointer"
            data-testid="link-project-github"
          >
            <Github className="w-4 h-4" /> GitHub Repository
          </a>
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
  
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(() => {
    const params = new URLSearchParams(window.location.search);
    const projId = params.get("project");
    return projects.find((p) => p.id === projId) || null;
  });

  const handleSelectProject = (project: typeof projects[0] | null) => {
    setSelectedProject(project);
    const url = new URL(window.location.href);
    if (project) {
      url.searchParams.set("project", project.id);
    } else {
      url.searchParams.delete("project");
    }
    window.history.pushState({}, "", url.pathname + url.search + url.hash);
  };

  return (
    <section id="projects" ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-background" aria-label="Projects section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            Portfolio
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold mb-4" data-testid="heading-projects">
            Featured case studies
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto">
            Deep-dives into systems architecture, production latency, and real-world engineering metrics.
          </motion.p>
        </motion.div>

        {/* Asymmetrical Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const Icon = project.icon;
            // Flagship project takes up 2 columns on large viewports for visual asymmetry
            const colSpan = project.flagship ? "lg:col-span-2" : "lg:col-span-1";
            return (
              <motion.div
                key={project.id}
                id={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`${colSpan} scroll-mt-20`}
              >
                <div
                  onClick={() => handleSelectProject(project)}
                  className={`group h-full rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 cursor-pointer flex flex-col ${project.border}`}
                  data-testid={`card-project-${project.id}`}
                >
                  <div className="relative aspect-video overflow-hidden bg-muted/40 border-b border-border flex-shrink-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                          <Icon className={`w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors`} />
                        </div>
                        <h3 className="font-bold text-lg leading-snug group-hover:text-primary transition-colors" data-testid={`project-title-${project.id}`}>
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{project.tagline}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-border/40 pt-4 mt-auto">
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-medium text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-medium text-muted-foreground">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
                        Case Study <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => handleSelectProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
