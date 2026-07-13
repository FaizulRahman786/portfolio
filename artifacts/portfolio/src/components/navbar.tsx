import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Menu, X, Sun, Moon, ChevronDown, ChevronUp } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import profileImage from "@assets/profile-faizul.png";

const aboutLinks = [
  { label: "About Me", href: "#about" },
  { label: "Blog", href: "/blog", isRoute: true },
  { label: "AI Lab", href: "/ai-lab", isRoute: true },
  { label: "Contact", href: "#contact" },
];

const navLinks = [
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Education", href: "#education" },
];

const projectLinks = [
  { label: "All Projects", href: "#projects" },
  { label: "MB Career Connection", href: "#mb-career-connect" },
  { label: "Anamika SaaS Platform", href: "#anamika-saas" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [location, navigate] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    if (location === "/") {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        window.location.hash = href;
      }, 50);
    }
  };

  const goHome = () => {
    setMobileOpen(false);
    if (location === "/") {
      document.querySelector("#hero")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/10"
            : "bg-transparent"
        }`}
        data-testid="navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); goHome(); }}
              className="flex items-center gap-2 font-bold text-base text-foreground hover:text-primary transition-colors focus-ring rounded"
              data-testid="link-logo"
            >
              <img
                src={profileImage}
                alt="Faizul Rahman"
                className="w-8 h-8 rounded-lg object-cover border border-border"
                data-testid="img-navbar-profile"
              />
              <span className="tracking-tight">FR.</span>
            </a>

            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50 focus:outline-none cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    data-testid="link-nav-about"
                  >
                    About <ChevronDown className="w-3 h-3" />
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" data-testid="dropdown-about">
                  {aboutLinks.map((link) =>
                    link.isRoute ? (
                      <DropdownMenuItem key={link.href} asChild className="cursor-pointer">
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          data-testid={`link-nav-about-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {link.label}
                        </Link>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                        key={link.href}
                        onClick={() => scrollTo(link.href)}
                        className="cursor-pointer"
                        data-testid={`link-nav-about-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {link.label}
                      </DropdownMenuItem>
                    )
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Skills (Render Skills first in list) */}
              <a
                href="#skills"
                onClick={(e) => { e.preventDefault(); scrollTo("#skills"); }}
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/40 relative group"
                data-testid="link-nav-skills"
              >
                Skills
                <span className="absolute inset-x-3 bottom-0.5 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" aria-hidden="true" />
              </a>

              {/* Projects Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50 focus:outline-none cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    data-testid="link-nav-projects"
                  >
                    Projects <ChevronDown className="w-3 h-3" />
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" data-testid="dropdown-projects">
                  {projectLinks.map((link) => (
                    <DropdownMenuItem
                      key={link.href}
                      onClick={() => scrollTo(link.href)}
                      className="cursor-pointer"
                      data-testid={`link-nav-projects-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Other Links */}
              {navLinks.filter((l) => l.label !== "Skills").map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/40 relative group"
                  data-testid={`link-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                  <span className="absolute inset-x-3 bottom-0.5 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" aria-hidden="true" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle theme"
                data-testid="button-theme-toggle"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.button>

              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
                className="hidden md:inline-flex items-center px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 active:scale-[0.97] transition-all focus-ring press-effect"
                data-testid="link-nav-contact-me"
              >
                Contact Me
              </a>

              <button
                className="md:hidden w-8 h-8 flex items-center justify-center text-foreground"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle mobile menu"
                data-testid="button-mobile-menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 left-0 right-0 z-40 bg-background dark:bg-card border-b border-border shadow-xl md:hidden"
            data-testid="mobile-menu"
          >
            <nav className="flex flex-col p-4 gap-1 text-foreground" aria-label="Mobile navigation">
              {/* About Dropdown */}
              <div className="w-full">
                <button
                  onClick={() => setAboutOpen(!aboutOpen)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setAboutOpen(!aboutOpen);
                    }
                  }}
                  aria-expanded={aboutOpen}
                  aria-controls="about-submenu"
                  className="w-full h-[50px] px-4 flex justify-between items-center rounded-lg transition-colors hover:bg-muted dark:hover:bg-secondary/10 text-foreground focus:outline-none"
                  data-testid="link-mobile-about-trigger"
                >
                  <span className="text-sm font-medium">About</span>
                  {aboutOpen ? (
                    <ChevronUp className="w-4 h-4 transition-transform duration-300 rotate-180 text-current" />
                  ) : (
                    <ChevronDown className="w-4 h-4 transition-transform duration-300 text-current" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {aboutOpen && (
                    <motion.div
                      id="about-submenu"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden pl-6 flex flex-col gap-1 mt-1"
                    >
                      {aboutLinks.map((link) => {
                        const isActive = location === link.href || (location === "/" && link.href === "#about");
                        return link.isRoute ? (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => {
                              setMobileOpen(false);
                              setAboutOpen(false);
                            }}
                            className={`w-full h-[42px] px-4 flex items-center rounded-lg text-xs transition-colors hover:bg-muted dark:hover:bg-secondary/10 hover:text-primary ${
                              isActive
                                ? "text-primary font-semibold bg-muted dark:bg-secondary/20"
                                : "text-foreground/80 dark:text-muted-foreground"
                            }`}
                            data-testid={`link-mobile-about-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                          >
                            {link.label}
                          </Link>
                        ) : (
                          <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => {
                              e.preventDefault();
                              scrollTo(link.href);
                              setAboutOpen(false);
                            }}
                            className={`w-full h-[42px] px-4 flex items-center rounded-lg text-xs transition-colors hover:bg-muted dark:hover:bg-secondary/10 hover:text-primary ${
                              isActive
                                ? "text-primary font-semibold bg-muted dark:bg-secondary/20"
                                : "text-foreground/80 dark:text-muted-foreground"
                            }`}
                            data-testid={`link-mobile-about-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                          >
                            {link.label}
                          </a>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Skills */}
              <a
                href="#skills"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#skills");
                }}
                className={`w-full h-[50px] px-4 flex items-center text-sm rounded-lg transition-colors hover:bg-muted dark:hover:bg-secondary/10 hover:text-primary ${
                  location === "/" && window.location.hash === "#skills"
                    ? "text-primary font-medium bg-muted dark:bg-secondary/20"
                    : "text-foreground"
                }`}
                data-testid="link-mobile-skills"
              >
                Skills
              </a>

              {/* Projects Dropdown */}
              <div className="w-full">
                <button
                  onClick={() => setProjectsOpen(!projectsOpen)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setProjectsOpen(!projectsOpen);
                    }
                  }}
                  aria-expanded={projectsOpen}
                  aria-controls="projects-submenu"
                  className="w-full h-[50px] px-4 flex justify-between items-center rounded-lg transition-colors hover:bg-muted dark:hover:bg-secondary/10 text-foreground focus:outline-none"
                  data-testid="link-mobile-projects-trigger"
                >
                  <span className="text-sm font-medium">Projects</span>
                  {projectsOpen ? (
                    <ChevronUp className="w-4 h-4 transition-transform duration-300 rotate-180 text-current" />
                  ) : (
                    <ChevronDown className="w-4 h-4 transition-transform duration-300 text-current" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {projectsOpen && (
                    <motion.div
                      id="projects-submenu"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden pl-6 flex flex-col gap-1 mt-1"
                    >
                      {projectLinks.map((link) => {
                        const isActive = location === link.href || (location === "/" && window.location.hash === link.href);
                        return (
                          <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => {
                              e.preventDefault();
                              scrollTo(link.href);
                              setProjectsOpen(false);
                            }}
                            className={`w-full h-[42px] px-4 flex items-center rounded-lg text-xs transition-colors hover:bg-muted dark:hover:bg-secondary/10 hover:text-primary ${
                              isActive
                                ? "text-primary font-semibold bg-muted dark:bg-secondary/20"
                                : "text-foreground/80 dark:text-muted-foreground"
                            }`}
                            data-testid={`link-mobile-projects-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                          >
                            {link.label}
                          </a>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other Links */}
              {navLinks.filter((l) => l.label !== "Skills").map((link) => {
                const isActive = location === link.href || (location === "/" && window.location.hash === link.href);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className={`w-full h-[50px] px-4 flex items-center text-sm rounded-lg transition-colors hover:bg-muted dark:hover:bg-secondary/10 hover:text-primary ${
                      isActive
                        ? "text-primary font-medium bg-muted dark:bg-secondary/20"
                        : "text-foreground"
                    }`}
                    data-testid={`link-mobile-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </a>
                );
              })}

              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
                className="mt-2 w-full h-[50px] flex items-center justify-center text-sm text-primary-foreground bg-primary rounded-lg text-center font-medium"
                data-testid="link-mobile-contact-me"
              >
                Contact Me
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
