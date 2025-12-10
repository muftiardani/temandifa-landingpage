"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r 
                 from-blue-600 via-purple-600 to-yellow-500 
                 origin-left z-100 shadow-xl"
      initial={{ scaleX: 0 }}
    />
  );
}
