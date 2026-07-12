import { motion } from "framer-motion";
import { Code2, Github, Linkedin, Mail, Heart } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border bg-muted/10 py-12 px-4 sm:px-6 lg:px-8" aria-label="Footer">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
            className="flex items-center gap-2 text-primary font-bold text-lg"
            whileHover={{ scale: 1.05 }}
            data-testid="link-footer-logo"
          >
            <Code2 className="w-5 h-5" />
            <span>Faizul Rahman</span>
          </motion.a>

          <nav className="flex items-center gap-1 flex-wrap justify-center" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="px-3 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid={`link-footer-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: "https://github.com/faizulrahman", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/faizulrahman", label: "LinkedIn" },
              { icon: Mail, href: "mailto:faizul@example.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                whileHover={{ scale: 1.1 }}
                aria-label={label}
                data-testid={`link-footer-social-${label.toLowerCase()}`}
              >
                <Icon className="w-3.5 h-3.5" />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span data-testid="text-copyright">
            &copy; {new Date().getFullYear()} Faizul Rahman. All rights reserved.
          </span>
          <span className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-primary fill-primary mx-0.5" /> using React, TypeScript &amp; Framer Motion
          </span>
        </div>
      </div>
    </footer>
  );
}
