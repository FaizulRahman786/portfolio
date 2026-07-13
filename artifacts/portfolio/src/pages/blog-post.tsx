import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getBlogPost, blogPosts } from "@/data/blog-posts";
import NotFound from "@/pages/not-found";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post) {
    return <NotFound />;
  }

  const more = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-background" data-testid="page-blog-post">
      <Navbar />
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <article className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            data-testid="link-post-back-blog"
          >
            <ArrowLeft className="w-4 h-4" /> Back to blog
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight" data-testid="heading-blog-post">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-10">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>

            <div className="prose prose-neutral dark:prose-invert max-w-none space-y-5 text-base sm:text-lg leading-relaxed text-foreground/90">
              {post.content.map((paragraph, i) => (
                <p key={i} data-testid={`text-blog-paragraph-${i}`}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          {more.length > 0 && (
            <div className="mt-16 pt-10 border-t border-border">
              <h3 className="text-lg font-bold mb-5">More posts</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {more.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="block p-5 rounded-2xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all"
                    data-testid={`link-related-post-${p.slug}`}
                  >
                    <h4 className="font-semibold mb-1.5 line-clamp-2">{p.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
