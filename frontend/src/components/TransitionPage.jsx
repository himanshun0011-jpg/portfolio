import { motion } from "framer-motion";

export default function TransitionPage({ children }) {
  return (
    <>
      <motion.div
        className="fixed inset-0 z-[150] bg-ink pointer-events-none"
        initial={{ scaleY: 1, transformOrigin: "50% 0%" }}
        animate={{ scaleY: 0, transformOrigin: "50% 0%" }}
        exit={{ scaleY: 1, transformOrigin: "50% 100%" }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        data-testid="page-transition-curtain"
      />
      {children}
    </>
  );
}
