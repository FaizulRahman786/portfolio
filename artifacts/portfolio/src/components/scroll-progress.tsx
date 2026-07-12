import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scaleX = useSpring(scrollProgress, { stiffness: 400, damping: 40 });

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-[100]"
      style={{ scaleX }}
      data-testid="scroll-progress"
    />
  );
}
