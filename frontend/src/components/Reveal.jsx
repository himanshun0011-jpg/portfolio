import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const useOnceInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, shown];
};

export const Reveal = ({ children, delay = 0, className = "" }) => {
  const [ref, shown] = useOnceInView(0.1);

  return (
    <span ref={ref} className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={false}
        animate={{ y: shown ? 0 : "112%" }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
};

export default Reveal;
