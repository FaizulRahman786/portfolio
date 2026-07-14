export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "from-curious-student-to-building-real-software",
    title: "From a Curious Student to Building Real Software: My Journey",
    excerpt:
      "How curiosity about how websites work turned into building full-stack SaaS products for real clients — and why AI & ML is where I'm headed next.",
    date: "2026-06-18",
    readTime: "6 min read",
    tags: ["Journey", "Career"],
    content: [
      "I'm Faizul Rahman. I'm an AI & Machine Learning undergraduate and a Full Stack Developer from Bihar, India. While I'm currently pursuing my degree, most of my learning has come from solving real-world problems rather than simply completing classroom assignments.",
      "My journey into technology didn't begin with a perfect roadmap. It started with curiosity — wanting to understand how websites work, how software is built, and how technology can solve everyday problems. That curiosity gradually turned into countless hours of learning HTML, CSS, JavaScript, React, Node.js, Express.js, MongoDB, and modern development tools.",
      "As I gained confidence, I realized that writing code wasn't enough. I wanted to build products that people could actually use. That mindset pushed me beyond tutorials and into creating complete applications with authentication, databases, payment integration, admin dashboards, responsive interfaces, and scalable architectures.",
      "One of the biggest milestones in my journey has been developing SaaS products and business websites for real clients. Working directly with business owners taught me something that technical documentation never could: successful software isn't just about clean code — it's about understanding people, solving business problems, and delivering value.",
      "Although I enjoy full-stack development, my long-term passion lies in Artificial Intelligence and Machine Learning. I believe AI will redefine how businesses operate, how people interact with technology, and how software is built. My goal is to combine AI with modern web technologies to create intelligent products that automate workflows, improve decision-making, and provide meaningful user experiences.",
      "Every project I build teaches me something new. Whether it's improving performance, designing better user experiences, implementing secure backend systems, or learning new AI concepts, I treat every challenge as an opportunity to grow.",
      "Outside of coding, I enjoy exploring emerging technologies, reading about software architecture, experimenting with new frameworks, and continuously improving my problem-solving skills. I strongly believe that consistency beats talent when talent stops learning.",
      "Looking ahead, my vision is simple: build impactful AI-powered products, work with talented teams, contribute to meaningful open-source projects, and create software that genuinely improves people's lives.",
      "I'm still at the beginning of my journey, but every line of code brings me one step closer to becoming the engineer I aspire to be. Thank you for visiting my portfolio — I hope we get the opportunity to build something amazing together.",
    ],
  },
  {
    slug: "lessons-from-shipping-mb-career-connect",
    title: "Lessons from Shipping MB Career Connect, a Real SaaS Platform",
    excerpt:
      "Building a job-and-career SaaS platform end to end taught me more about authentication, admin tooling, and client feedback than any tutorial could.",
    date: "2026-05-04",
    readTime: "5 min read",
    tags: ["Projects", "SaaS"],
    content: [
      "MB Career Connect is the project I'm proudest of — a full SaaS platform built for real users, not a portfolio exercise. Going from a client's rough idea to a deployed, working product forced me to think about the whole lifecycle of an application, not just individual features.",
      "The biggest technical lesson was around authentication and access control. A career platform has multiple types of users with different permissions, and getting that right — secure sessions, protected routes, sensible defaults — took far more care than I expected going in.",
      "The second lesson was about admin tooling. Once real users started interacting with the platform, the client needed visibility into what was happening — who signed up, what content existed, what needed moderation. Building a clean, usable admin dashboard turned out to be just as important as the user-facing product.",
      "The last lesson was about feedback loops. Working directly with a business owner means requirements change as they see the product come to life. I learned to build features in a way that could flex — clear data models, modular components, and interfaces that don't assume the first version of a requirement is the last.",
      "Shipping something real, with a real client depending on it, is a different kind of pressure than a class project — and it's exactly the kind of pressure that made me a better engineer.",
    ],
  },
  {
    slug: "why-i-freelanced-before-graduating",
    title: "Why I Started Freelancing Before Graduating",
    excerpt:
      "Freelancing while still in school gave me something coursework alone couldn't: real clients, real deadlines, and real consequences.",
    date: "2026-03-22",
    readTime: "4 min read",
    tags: ["Freelance", "Career"],
    content: [
      "I started freelancing in March 2026, while still working through my B.Tech in Computer Science with a specialization in AI & ML at Lovely Professional University. It wasn't part of any plan laid out for me — it came from wanting to test what I was learning against something with real stakes.",
      "The first thing freelancing taught me is that clients don't care about your tech stack — they care about whether their problem gets solved. That reframed how I approach every project: start with the business outcome, then choose the tools, not the other way around.",
      "The second thing it taught me is scope discipline. Left unmanaged, every project grows new requirements every week. Learning to scope a first version, ship it, and iterate — rather than trying to build the 'perfect' version up front — made me faster and made clients happier.",
      "The third thing, and maybe the most valuable, is that freelancing filled in exactly the gaps that coursework leaves open: deployment, payments, client communication, pricing, and maintaining something after it ships. Those are the skills that turn a student who can code into an engineer who can deliver.",
      "I'm still early in this path, but freelancing before graduating has already shaped how I think about every project I take on — including the ones still ahead of me in AI and machine learning.",
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
