import { lazy, Suspense, useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScrolling } from "@/components/smooth-scrolling";
import { Spinner } from "@/components/ui/spinner";

const Home = lazy(() => import("@/pages/home"));
const Blog = lazy(() => import("@/pages/blog"));
const BlogPost = lazy(() => import("@/pages/blog-post"));
const AILab = lazy(() => import("@/pages/ai-lab"));
const NotFound = lazy(() => import("@/pages/not-found"));

const queryClient = new QueryClient();

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <Spinner className="size-8 text-primary" />
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/ai-lab" component={AILab} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  useEffect(() => {
    // Dynamic page titling
    document.title = "Faizul Rahman | Full Stack Engineer & SaaS Architect";

    // Inject JSON-LD Schema
    const schema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Faizul Rahman",
      "jobTitle": "Full Stack Engineer & SaaS Architect",
      "url": "https://faizul.vercel.app",
      "sameAs": [
        "https://github.com/FaizulRahman786",
        "https://linkedin.com/in/faizul-rahman-87974b397"
      ],
      "knowsAbout": [
        "Software Engineering",
        "Full Stack Development",
        "SaaS Architecture",
        "Database Latency Optimization",
        "API Design",
        "Artificial Intelligence",
        "Machine Learning"
      ]
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="faizul-portfolio-theme">
        <TooltipProvider>
          <SmoothScrolling>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
          </SmoothScrolling>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
