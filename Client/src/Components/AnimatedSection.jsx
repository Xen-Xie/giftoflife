/* eslint-disable no-unused-vars */
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

function AnimatedSection({
  children,
  delay = 0.2,
  y = 40,
  scale = 0.98,
  skew = 0,
  rotate = 0,
  threshold = 0.15,
  once = true,
}) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [controls, inView, once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 18,
        delay,
      }}
      variants={{
        hidden: {
          opacity: 0,
          y,
          scale,
          rotate,
          skewX: skew,
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          skewX: 0,
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedSection;
