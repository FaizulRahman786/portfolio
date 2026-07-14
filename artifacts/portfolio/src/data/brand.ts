/**
 * Brand Identity — Faizul Rahman
 * Single source of truth for brand voice, tagline, mission, and value proposition.
 * Referenced across Hero, About, Footer, and SEO metadata.
 */

export const brand = {
  name: "Faizul Rahman",
  monogram: "FR",

  /** One-line distillation of engineering identity */
  tagline: "Engineering products that scale.",

  /** Full value proposition — visible above the fold in Hero */
  valueProposition:
    "I engineer multi-tenant SaaS platforms, low-latency APIs, and production AI pipelines. Focused on performance engineering and business outcomes.",

  /** 2–3 sentence personal mission — embedded in About section */
  mission:
    "My mission is to engineer software that is fast by default, maintainable by design, and impactful by measure. I partner with founders and teams to ship full-stack products — from schema to deployment — that users love and businesses rely on.",

  /** Short role line used in social/bio contexts */
  role: "Full Stack Engineer & SaaS Architect",

  /** Extended bio for About section */
  bio: [
    "I'm a Full Stack Engineer who specializes in building high-availability SaaS platforms, scalable backend APIs, and AI integrations. I bridge clean frontend engineering with robust database-backed architectures.",
    "My stack spans React, TypeScript, Node.js, PostgreSQL, and Python, with a specialization in AI/ML that lets me build intelligent, data-driven features directly into production systems.",
    "As a freelance developer and consultant, I own the entire product lifecycle — from initial database schema design and secure authentication, to optimized cloud deployments and measurable performance benchmarks.",
  ],

  /** AI Mission status */
  availability: {
    open: true,
    label: "🤖 Integrating AI into Modern Products",
    startDate: "Q3 2026",
    responseTime: "< 24 hours",
  },

  /** Contact */
  contact: {
    email: "rahmanadnan412@gmail.com",
    whatsapp: "https://wa.me/917858062571",
    calendly: "https://calendly.com/faizul",
  },

  /** Social links */
  social: {
    github: "https://github.com/FaizulRahman786",
    linkedin: "https://linkedin.com/in/faizul-rahman-87974b397",
    twitter: "https://twitter.com/faizulrahman",
  },

  /** Hero trust numbers — social proof above fold */
  trustNumbers: [
    { value: "4+", label: "SaaS Apps Shipped" },
    { value: "99", label: "Lighthouse Score" },
    { value: "40%", label: "Avg Latency Reduction" },
    { value: "20+", label: "Technologies" },
  ],

  /** Design personality guide */
  designVoice: {
    tone: ["Confident", "Precise", "Minimal hype", "Engineering-first"],
    avoid: ["Passive voice", "Vague claims", "Student language", "Overuse of adjectives"],
    prefer: ["Specific metrics", "Outcome language", "Active verbs", "Short punchy sentences"],
  },

  /** Copywriting rules */
  copyRules: {
    headings: "Verb + outcome. E.g. 'Building systems that scale' not 'I am a developer'.",
    ctas: "Action + value. E.g. 'Book Discovery Call' not 'Contact Me'.",
    body: "Max 3 sentences per paragraph. Lead with outcome, support with evidence.",
    badges: "Use monospace font for tech badges. Keep under 12px, uppercase tracking.",
  },
} as const;

export type Brand = typeof brand;
