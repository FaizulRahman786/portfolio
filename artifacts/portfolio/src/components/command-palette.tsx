import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "wouter";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Home, User, Code2, Briefcase, Trophy, GraduationCap, Mail, Github, Linkedin, MessageCircle, Download, Sun, Moon, Newspaper } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

const sections = [
  { label: "Hero", id: "#hero", icon: Home },
  { label: "About", id: "#about", icon: User },
  { label: "Skills", id: "#skills", icon: Code2 },
  { label: "Projects", id: "#projects", icon: Briefcase },
  { label: "Achievements", id: "#achievements", icon: Trophy },
  { label: "Education", id: "#education", icon: GraduationCap },
  { label: "Contact", id: "#contact", icon: Mail },
];

const links = [
  { label: "GitHub", href: "https://github.com/FaizulRahman786", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/faizul-rahman-87974b397", icon: Linkedin },
  { label: "WhatsApp", href: "https://wa.me/917858062571", icon: MessageCircle },
  { label: "Email", href: "mailto:rahmanadnan412@gmail.com", icon: Mail },
];

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const { theme, setTheme } = useTheme();
  const [location, navigateTo] = useLocation();

  const navigate = (id: string) => {
    onOpenChange(false);
    if (location !== "/") {
      navigateTo("/");
      setTimeout(() => {
        document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
      return;
    }
    setTimeout(() => {
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const goToBlog = () => {
    onOpenChange(false);
    navigateTo("/blog");
  };

  const openLink = (href: string) => {
    onOpenChange(false);
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    onOpenChange(false);
  };

  const downloadResume = () => {
    onOpenChange(false);
    const a = document.createElement("a");
    a.href = "/resume.pdf";
    a.download = "faizul-rahman-resume.pdf";
    a.click();
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} data-testid="command-palette">
      <CommandInput placeholder="Type a command or search..." data-testid="input-command-palette" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          {sections.map(({ label, id, icon: Icon }) => (
            <CommandItem
              key={id}
              onSelect={() => navigate(id)}
              data-testid={`command-nav-${label.toLowerCase()}`}
            >
              <Icon className="mr-2 h-4 w-4" />
              Go to {label}
            </CommandItem>
          ))}
          <CommandItem onSelect={goToBlog} data-testid="command-nav-blog">
            <Newspaper className="mr-2 h-4 w-4" />
            Go to Blog
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Links">
          {links.map(({ label, href, icon: Icon }) => (
            <CommandItem
              key={href}
              onSelect={() => openLink(href)}
              data-testid={`command-link-${label.toLowerCase()}`}
            >
              <Icon className="mr-2 h-4 w-4" />
              {label}
            </CommandItem>
          ))}
          <CommandItem onSelect={downloadResume} data-testid="command-download-resume">
            <Download className="mr-2 h-4 w-4" />
            Download Resume
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Preferences">
          <CommandItem onSelect={toggleTheme} data-testid="command-toggle-theme">
            {theme === "dark" ? (
              <Sun className="mr-2 h-4 w-4" />
            ) : (
              <Moon className="mr-2 h-4 w-4" />
            )}
            Toggle {theme === "dark" ? "Light" : "Dark"} Mode
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export function CommandPaletteHint() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3, duration: 0.5 }}
      className="fixed bottom-8 left-8 z-40 hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card/80 backdrop-blur-sm text-xs text-muted-foreground shadow-sm"
      data-testid="command-palette-hint"
    >
      <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-[10px]">⌘</kbd>
      <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-[10px]">K</kbd>
      <span>Command palette</span>
    </motion.div>
  );
}
