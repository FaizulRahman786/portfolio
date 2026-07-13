import { motion } from "framer-motion";

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
