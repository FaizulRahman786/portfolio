import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import { ScrollProgress } from "@/components/scroll-progress";
import {
  Brain, Cpu, Lightbulb, ExternalLink, Clock, ArrowRight
} from "lucide-react";

interface Experiment {
  title: string;
  description: string;
  tags: string[];
  status: "complete" | "in-progress" | "planned";
  metric?: string;
  link?: string;
}

interface ResearchNote {
  title: string;
  summary: string;
  date: string;
  tags: string[];
}

const experiments: Experiment[] = [
  {
    title: "Face Recognition Attendance System",
    description: "Real-time face detection pipeline using OpenCV and deep learning. Achieves 94% accuracy on LFW dataset in controlled lighting.",
    tags: ["Python", "OpenCV", "Deep Learning", "Computer Vision"],
    status: "complete",
    metric: "94% accuracy",
  },
  {
    title: "RAG Pipeline with LangChain",
    description: "Retrieval-Augmented Generation system for document Q&A using LangChain, FAISS vector store, and OpenAI embeddings.",
    tags: ["LangChain", "FAISS", "OpenAI", "Python"],
    status: "in-progress",
    metric: "< 2s retrieval",
  },
  {
    title: "Sentiment Analysis API",
    description: "Fine-tuned BERT model for domain-specific sentiment classification, served as a FastAPI microservice.",
    tags: ["PyTorch", "BERT", "FastAPI", "Hugging Face"],
    status: "complete",
    metric: "89% F1 score",
  },
  {
    title: "Custom Object Detection Pipeline",
    description: "YOLOv8-based object detection system trained on custom dataset for product defect identification.",
    tags: ["YOLOv8", "Python", "ONNX"],
    status: "in-progress",
    metric: "mAP 0.78",
  },
  {
    title: "MLflow Experiment Tracker",
    description: "Self-hosted MLflow setup with automated experiment tracking, model registry, and artifact storage on S3.",
    tags: ["MLflow", "AWS S3", "Docker", "Python"],
    status: "planned",
  },
  {
    title: "LLM Prompt Engineering Library",
    description: "Curated collection of structured prompt templates for code review, API design, and documentation generation.",
    tags: ["LLM", "Prompt Engineering", "TypeScript"],
    status: "in-progress",
  },
];

const researchNotes: ResearchNote[] = [
  {
    title: "Attention Is All You Need — Reading Notes",
    summary: "Key insights from the original Transformer paper: multi-head attention, positional encodings, and why RNNs fail at long-range dependencies.",
    date: "2026-06-15",
    tags: ["Transformers", "NLP", "Research"],
  },
  {
    title: "RAG vs Fine-tuning: When to Use Which",
    summary: "Analysis of retrieval-augmented generation vs fine-tuning trade-offs. RAG wins for dynamic knowledge; fine-tuning wins for style/persona.",
    date: "2026-05-28",
    tags: ["RAG", "Fine-tuning", "LLM"],
  },
  {
    title: "Vector Databases Compared: Pinecone vs FAISS vs Weaviate",
    summary: "Benchmark and architectural comparison across three leading vector search solutions for production RAG pipelines.",
    date: "2026-05-10",
    tags: ["Vector DB", "FAISS", "Pinecone", "Weaviate"],
  },
];

const futureIdeas = [
  "Real-time emotion detection browser extension using WebRTC + TensorFlow.js",
  "Autonomous code review agent with LangGraph + GitHub Actions integration",
  "Multi-modal document understanding pipeline (PDFs + images → structured data)",
  "Open-source ML experiment dashboard built with React and MLflow REST API",
  "Voice-to-SQL query engine using Whisper + GPT-4 + PostgreSQL function calling",
];

const statusColors: Record<string, string> = {
  complete: "text-green-400 border-green-400/30 bg-green-400/10",
  "in-progress": "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  planned: "text-blue-400 border-blue-400/30 bg-blue-400/10",
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function SectionHeader({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-12">
      <p className="text-label mb-3">{label}</p>
      <h2 className="text-heading mb-4">{title}</h2>
      {subtitle && <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>}
    </div>
  );
}

function ExperimentCard({ exp }: { exp: Experiment }) {
  return (
    <motion.div
      className="card-premium p-5 space-y-3 hover-glow"
      whileHover={{ y: -2 }}
      data-testid={`card-experiment-${exp.title.toLowerCase().replace(/\s+/g, "-").slice(0, 20)}`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold leading-tight">{exp.title}</h3>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border flex-shrink-0 ${statusColors[exp.status]}`}>
          {exp.status === "in-progress" ? "In Progress" : exp.status.charAt(0).toUpperCase() + exp.status.slice(1)}
        </span>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">{exp.description}</p>

      {exp.metric && (
        <div className="flex items-center gap-1.5 text-xs text-primary font-mono">
          <Cpu className="w-3 h-3" />
          {exp.metric}
        </div>
      )}

      <div className="flex flex-wrap gap-1.5 pt-1">
        {exp.tags.map((tag) => (
          <span key={tag} className="badge-tech">{tag}</span>
        ))}
      </div>

      {exp.link && (
        <a
          href={exp.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1 focus-ring rounded"
        >
          View project <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </motion.div>
  );
}

export default function AILab() {
  const heroRef = useRef<HTMLDivElement>(null);
  const experimentsRef = useRef<HTMLElement>(null);
  const researchRef = useRef<HTMLElement>(null);
  const ideasRef = useRef<HTMLElement>(null);

  const experimentsInView = useInView(experimentsRef, { once: true, margin: "-80px" });
  const researchInView = useInView(researchRef, { once: true, margin: "-80px" });
  const ideasInView = useInView(ideasRef, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen bg-background text-foreground" data-testid="page-ai-lab">
      <ScrollProgress />
      <Navbar />

      {/* Hero */}
      <section
        className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden mesh-gradient"
        aria-label="AI Lab — hero"
      >
        <motion.div
          ref={heroRef}
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl border border-primary/20 bg-primary/10 flex items-center justify-center animate-glow-pulse">
              <Brain className="w-7 h-7 text-primary" />
            </div>
          </motion.div>

          <motion.p variants={fadeUp} className="text-label mb-3">AI Research Lab</motion.p>

          <motion.h1 variants={fadeUp} className="text-heading mb-5">
            Where I explore<br />
            <span className="gradient-text">machine intelligence</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-muted-foreground text-base leading-relaxed">
            AI/ML is not a line item on my CV — it's a core part of how I think about engineering.
            This lab documents real experiments, research notes, and ideas I'm actively exploring.
          </motion.p>
        </motion.div>
      </section>

      {/* Experiments */}
      <section
        id="experiments"
        ref={experimentsRef}
        className="py-24 px-4 sm:px-6 lg:px-8"
        aria-label="AI Experiments"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={experimentsInView ? "show" : "hidden"}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.div variants={fadeUp}>
              <SectionHeader
                label="Experiments"
                title="What I'm building & testing"
                subtitle="Real projects with documented results. No toy demos."
              />
            </motion.div>

            <motion.div
              variants={{ show: { transition: { staggerChildren: 0.06 } } }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {experiments.map((exp) => (
                <motion.div key={exp.title} variants={fadeUp}>
                  <ExperimentCard exp={exp} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider mx-auto max-w-5xl" />

      {/* Research Notes */}
      <section
        id="research"
        ref={researchRef}
        className="py-24 px-4 sm:px-6 lg:px-8 section-alt"
        aria-label="Research Notes"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            animate={researchInView ? "show" : "hidden"}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.div variants={fadeUp}>
              <SectionHeader
                label="Research Notes"
                title="Papers & concepts I've studied"
                subtitle="Reading notes from papers, blog posts, and books I've worked through."
              />
            </motion.div>

            <motion.div
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
              className="space-y-5"
            >
              {researchNotes.map((note) => (
                <motion.div
                  key={note.title}
                  variants={fadeUp}
                  className="card-premium p-6 hover-glow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                    <h3 className="text-sm font-semibold">{note.title}</h3>
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground flex-shrink-0">
                      <Clock className="w-3 h-3" />
                      {new Date(note.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{note.summary}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {note.tags.map((tag) => (
                      <span key={tag} className="badge-tech">{tag}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="text-center mt-8">
              <a
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium focus-ring rounded"
              >
                Read all technical articles <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider mx-auto max-w-5xl" />

      {/* Future Ideas */}
      <section
        id="future-ideas"
        ref={ideasRef}
        className="py-24 px-4 sm:px-6 lg:px-8"
        aria-label="Future AI Ideas"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            animate={ideasInView ? "show" : "hidden"}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.div variants={fadeUp}>
              <SectionHeader
                label="Future Ideas"
                title="What I'm planning to build"
                subtitle="Projects on the horizon — ideas I've validated enough to commit to."
              />
            </motion.div>

            <motion.div
              variants={{ show: { transition: { staggerChildren: 0.07 } } }}
              className="space-y-3"
            >
              {futureIdeas.map((idea, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/20 hover:bg-primary/5 transition-all group"
                >
                  <Lightbulb className="w-4 h-4 text-primary mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{idea}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
}
