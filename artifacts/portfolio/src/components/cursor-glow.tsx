import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CursorGlow() {
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [isVisible]);

  return (
    <motion.div
      className="fixed pointer-events-none z-0 hidden md:block"
      animate={{
        x: position.x - 192,
        y: position.y - 192,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 50 }}
      data-testid="cursor-glow"
    >
      <div className="w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
    </motion.div>
  );
}
