import PDFDocument from "pdfkit";
import fs from "node:fs";
import path from "node:path";

const outPath = path.resolve(import.meta.dirname, "../../artifacts/portfolio/public/resume.pdf");

const doc = new PDFDocument({ size: "A4", margins: { top: 50, bottom: 50, left: 56, right: 56 } });
doc.pipe(fs.createWriteStream(outPath));

const GREEN = "#1b6b45";
const DARK = "#161616";
const GREY = "#5a5a5a";

function heading(text: string) {
  doc.moveDown(0.6);
  doc
    .fillColor(GREEN)
    .font("Helvetica-Bold")
    .fontSize(11)
    .text(text.toUpperCase(), { characterSpacing: 1.5 });
  doc
    .moveTo(doc.x, doc.y + 2)
    .lineTo(doc.page.width - doc.page.margins.right, doc.y + 2)
    .strokeColor(GREEN)
    .lineWidth(1)
    .stroke();
  doc.moveDown(0.5);
}

function bullet(text: string) {
  doc
    .fillColor(DARK)
    .font("Helvetica")
    .fontSize(9.5)
    .text(`•  ${text}`, { indent: 0, lineGap: 2 });
}

// Header
doc.fillColor(DARK).font("Helvetica-Bold").fontSize(26).text("FAIZUL RAHMAN");
doc
  .fillColor(GREEN)
  .font("Helvetica-Bold")
  .fontSize(11)
  .text("FULL STACK DEVELOPER  ·  AI & ML UNDERGRADUATE  ·  SAAS DEVELOPER");
doc.moveDown(0.3);
doc
  .fillColor(GREY)
  .font("Helvetica")
  .fontSize(9.5)
  .text(
    "Bihar, India   |   rahmanadnan412@gmail.com   |   +91-7858062571   |   github.com/FaizulRahman786   |   linkedin.com/in/faizul-rahman-87974b397   |   faizul.vercel.app"
  );

doc.moveDown(0.4);
doc
  .moveTo(doc.page.margins.left, doc.y)
  .lineTo(doc.page.width - doc.page.margins.right, doc.y)
  .strokeColor(GREEN)
  .lineWidth(1.5)
  .stroke();

// Summary
heading("Professional Summary");
doc
  .fillColor(DARK)
  .font("Helvetica")
  .fontSize(9.5)
  .text(
    "Full Stack Developer and B.Tech Computer Science (AI & ML) undergraduate with hands-on experience designing and shipping production-ready SaaS platforms and modern web applications using React, TypeScript, Node.js, Express, Firebase, and PostgreSQL. Skilled in REST API development, authentication, payment integration, cloud deployment, and responsive UI engineering. Passionate about scalable software engineering, applied AI, and solving real-world business problems.",
    { lineGap: 3 }
  );

// Experience
heading("Experience");
doc.font("Helvetica-Bold").fontSize(10).fillColor(DARK).text("Independent Full Stack Developer — Freelance", { continued: true });
doc.font("Helvetica").fontSize(9.5).fillColor(GREY).text("   ·   March 2026 – Present", { align: "left" });
bullet("Design and build scalable SaaS platforms end-to-end, from database schema to deployment.");
bullet("Develop production React applications, REST APIs, authentication, and role-based dashboards.");
bullet("Own the full lifecycle: client discovery, UX design, backend architecture, and cloud deployment.");

// Projects
heading("Featured Projects");

const projects: { title: string; meta: string; tech: string; points: string[] }[] = [
  {
    title: "MB Career Connection — Career Development SaaS Platform (Flagship)",
    meta: "restaurantadvitisment.vercel.app  ·  github.com/FaizulRahman786/MB",
    tech: "React.js, TypeScript, Node.js, Express.js, Firebase, Cloudinary, Cloudflare, Razorpay, Vite",
    points: [
      "Full-stack ecosystem connecting students, mentors, recruiters, and alumni with role-based dashboards.",
      "Built career guidance, mentorship, job/internship portal, scholarships, hackathons, and payments.",
    ],
  },
  {
    title: "Anamika SaaS Platform — Restaurant & Sweet Shop Platform",
    meta: "restaurantadvitisment.vercel.app  ·  github.com/FaizulRahman786/restaurantadvitisment",
    tech: "React.js, TypeScript, Node.js, Express.js, Firebase, Cloudinary, Cloudflare, Razorpay, Vite",
    points: [
      "Multi-tenant restaurant management SaaS with admin dashboard, RBAC, and table booking.",
      "Implemented authentication, SEO-optimized responsive UI, and production deployment.",
    ],
  },
  {
    title: "Jewellery Shop Website — Modern Jewellery Business Website",
    meta: "faizul.vercel.app  ·  github.com/FaizulRahman786/jewellary-shop",
    tech: "React, TypeScript, Node.js, Express, MongoDB, Cloudinary, Clerk",
    points: ["Cinematic luxury e-commerce showcase with authentication and optimized media pipeline."],
  },
  {
    title: "Pizzeria Town — Restaurant Landing Page",
    meta: "pizzeriatown.vercel.app  ·  github.com/FaizulRahman786/pizzariya",
    tech: "HTML, CSS, JavaScript",
    points: ["Fast, responsive restaurant landing page with reservation and menu highlights."],
  },
];

for (const p of projects) {
  doc.font("Helvetica-Bold").fontSize(9.8).fillColor(DARK).text(p.title);
  doc.font("Helvetica-Oblique").fontSize(8.5).fillColor(GREY).text(p.meta);
  doc.font("Helvetica-Oblique").fontSize(8.5).fillColor(GREEN).text(p.tech);
  doc.moveDown(0.15);
  for (const pt of p.points) bullet(pt);
  doc.moveDown(0.35);
}

// Skills
heading("Technical Skills");
const skillLines = [
  ["Languages", "Python, JavaScript, TypeScript, C, C++"],
  ["Frontend", "React, TypeScript, HTML, CSS, Tailwind, Bootstrap, Vite, Responsive Design"],
  ["Backend", "Node.js, Express.js, Django, REST APIs"],
  ["Databases", "MongoDB, PostgreSQL, Firebase, Supabase"],
  ["Authentication", "Firebase Auth, Clerk, JWT, RBAC"],
  ["Cloud & Payments", "Vercel, Cloudinary, Cloudflare, Razorpay"],
  ["Tools", "Git, GitHub, VS Code, Postman"],
  ["Core CS", "Data Structures & Algorithms, OOP, DBMS, Operating Systems, Computer Networks, Software Engineering"],
];
for (const [label, val] of skillLines) {
  doc.font("Helvetica-Bold").fontSize(9).fillColor(DARK).text(`${label}:  `, { continued: true });
  doc.font("Helvetica").fontSize(9).fillColor(GREY).text(val);
}

// Education
heading("Education");
doc.font("Helvetica-Bold").fontSize(9.8).fillColor(DARK).text("B.Tech, Computer Science & Engineering (AI & ML)");
doc.font("Helvetica").fontSize(9).fillColor(GREY).text("Lovely Professional University   ·   CGPA: 8.1   ·   2025 – 2029");
doc.moveDown(0.2);
doc.font("Helvetica-Bold").fontSize(9.8).fillColor(DARK).text("High School (12th Grade – Science)");
doc.font("Helvetica").fontSize(9).fillColor(GREY).text("High School, Fatuha   ·   Percentage: 80%   ·   2023 – 2025");
doc.moveDown(0.2);
doc.font("Helvetica-Bold").fontSize(9.8).fillColor(DARK).text("Secondary School Education (10th Grade)");
doc.font("Helvetica").fontSize(9).fillColor(GREY).text("Infant Jesus, Baktiyarpur   ·   Percentage: 90.6%   ·   Completed: 2023");

// Certifications
heading("Certifications");
bullet("Leadership Fundamentals — EduTech Hub (November 2025)");

// Soft skills / languages
heading("Soft Skills & Languages");
doc.font("Helvetica").fontSize(9).fillColor(DARK).text("Problem Solving, Communication, Leadership, Adaptability, Analytical Thinking, Continuous Learning");
doc.font("Helvetica").fontSize(9).fillColor(GREY).text("Languages: English, Hindi, Urdu");

doc.end();

console.log("Resume PDF written to", outPath);
