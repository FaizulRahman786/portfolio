import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Calendar, Clock, ArrowLeft, Search, Filter } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { blogPosts } from "@/data/blog-posts";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  // Get all unique tags from blog posts
  const tags = useMemo(() => {
    const allTags = new Set<string>();
    blogPosts.forEach((post) => post.tags.forEach((t) => allTags.add(t)));
    return ["All", ...Array.from(allTags)];
  }, []);

  // Filtered posts based on search query and category/tag selection
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag === "All" || post.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  return (
    <div className="min-h-screen bg-background text-foreground" data-testid="page-blog">
      <Navbar />
      
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Back Home */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 cursor-pointer"
            data-testid="link-blog-back-home"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center sm:text-left"
          >
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">// engineering logs</p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight" data-testid="heading-blog">
              Thoughts on code, scale, &amp; SaaS architecture
            </h1>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Notes on software engineering — latency optimizations, SaaS building experiences, 
              API routing methodologies, and AI integration systems.
            </p>
          </motion.div>

          {/* Search and Category Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 pb-6 border-b border-border/40">
            {/* Search Input */}
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles by title or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:border-primary/50 transition-colors"
                data-testid="input-blog-search"
              />
            </div>

            {/* Category Tags */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto py-1 scrollbar-none">
              <Filter className="w-3.5 h-3.5 text-muted-foreground hidden md:inline flex-shrink-0" />
              <div className="flex gap-1.5">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
                      selectedTag === tag
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-border/80"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Blog Feed */}
          <div className="grid gap-6">
            <AnimatePresence mode="wait">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group block p-6 sm:p-8 rounded-2xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all shadow-sm cursor-pointer"
                      data-testid={`link-blog-post-${post.slug}`}
                    >
                      <div className="flex flex-wrap items-center gap-1.5 mb-3">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold tracking-wide uppercase border border-primary/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-primary transition-colors tracking-tight">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground text-sm sm:text-base mb-4 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(post.date).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime}
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
                          Read Article <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 text-center text-muted-foreground bg-card border border-border rounded-2xl"
                >
                  <p className="text-sm">No articles matched your search query or tags.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
