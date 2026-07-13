import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Calendar, Clock, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { blogPosts } from "@/data/blog-posts";

export default function Blog() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-blog">
      <Navbar />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            data-testid="link-blog-back-home"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-14 text-center sm:text-left"
          >
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">Blog</p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4" data-testid="heading-blog">
              Thoughts on code, AI, and building real things
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Notes on my journey as a developer — lessons from freelance projects, the path into AI &amp; ML,
              and what I'm learning along the way.
            </p>
          </motion.div>

          <div className="grid gap-6">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block p-6 sm:p-8 rounded-2xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all"
                  data-testid={`link-blog-post-${post.slug}`}
                >
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                    <span className="flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
