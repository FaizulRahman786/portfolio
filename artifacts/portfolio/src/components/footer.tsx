import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Github, Linkedin, Mail, MessageCircle, Heart, ExternalLink, ArrowUp } from "lucide-react";
import profileImage from "@assets/profile-faizul.png";
import { brand } from "@/data/brand";

const sectionLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const pageLinks = [
  { label: "Blog", href: "/blog", isRoute: true },
  { label: "AI Lab", href: "/ai-lab", isRoute: true },
];

const socialLinks = [
  { icon: Github, href: brand.social.github, label: "GitHub" },
  { icon: Linkedin, href: brand.social.linkedin, label: "LinkedIn" },
  { icon: MessageCircle, href: brand.contact.whatsapp, label: "WhatsApp" },
  { icon: Mail, href: `mailto:${brand.contact.email}`, label: "Email" },
];

export function Footer() {
  const [location, navigate] = useLocation();

  const scrollTo = (href: string) => {
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

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="border-t border-border bg-muted/10 pt-16 pb-8 px-4 sm:px-6 lg:px-8"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto">

        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand column */}
          <div className="lg:col-span-2 space-y-4">
            <motion.a
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
              className="inline-flex items-center gap-2.5 text-primary font-bold text-lg focus-ring rounded"
              whileHover={{ scale: 1.03 }}
              data-testid="link-footer-logo"
            >
              <img
                src={profileImage}
                alt="Faizul Rahman"
                className="w-8 h-8 rounded-lg object-cover border border-primary/40"
              />
              <span>{brand.name}</span>
            </motion.a>

            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              {brand.tagline}
            </p>
            <p className="text-xs text-muted-foreground/70">
              Full Stack Engineer building scalable SaaS platforms, APIs, and AI integrations.
            </p>

            <span className="badge-status-available" data-testid="badge-footer-availability">
              Available for contracts — {brand.availability.startDate}
            </span>

            {/* Social icons */}
            <div className="flex items-center gap-2.5 pt-1">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all focus-ring"
                  whileHover={{ scale: 1.1, y: -1 }}
                  aria-label={label}
                  data-testid={`link-footer-social-${label.toLowerCase()}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Navigate
            </h3>
            <nav className="flex flex-col gap-2" aria-label="Footer section navigation">
              {sectionLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-0.5 transition-all focus-ring rounded inline-block"
                  data-testid={`link-footer-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </a>
              ))}
              {pageLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-0.5 transition-all focus-ring rounded inline-flex items-center gap-1"
                  data-testid={`link-footer-${link.label.toLowerCase()}`}
                >
                  {link.label}
                  <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Contact
            </h3>
            <div className="space-y-2">
              <a
                href={`mailto:${brand.contact.email}`}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors focus-ring rounded"
                data-testid="link-footer-email"
              >
                {brand.contact.email}
              </a>
              <a
                href={brand.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors focus-ring rounded"
                data-testid="link-footer-whatsapp"
              >
                WhatsApp →
              </a>
              <motion.a
                href={brand.contact.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-2 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all shadow-sm shadow-primary/20 focus-ring press-effect"
                whileHover={{ scale: 1.03 }}
                data-testid="button-footer-calendly"
              >
                Book a Call →
              </motion.a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span data-testid="text-copyright">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </span>
          <span className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-primary fill-primary mx-0.5" aria-hidden="true" /> using React, TypeScript &amp; Framer Motion
          </span>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors focus-ring rounded"
            aria-label="Scroll back to top"
            data-testid="button-footer-back-to-top"
          >
            Back to top <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
