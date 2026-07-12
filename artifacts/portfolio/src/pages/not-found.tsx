import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4" data-testid="page-not-found">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <motion.div
          className="text-[10rem] font-bold text-primary/10 leading-none select-none mb-4"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          404
        </motion.div>
        <h1 className="text-3xl font-bold mb-3" data-testid="text-404-heading">Page not found</h1>
        <p className="text-muted-foreground mb-8">
          Looks like this page got lost in the neural network. Let's get you back on track.
        </p>
        <div className="flex items-center justify-center gap-3">
          <motion.button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium hover:border-primary/50 hover:bg-muted/50 transition-colors"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            data-testid="button-go-back"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </motion.button>
          <motion.button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            data-testid="button-go-home"
          >
            <Home className="w-4 h-4" /> Home
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
