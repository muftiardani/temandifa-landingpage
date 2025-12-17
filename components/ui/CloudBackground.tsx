"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const CloudBackground = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) return null;

  const clouds = [
    {
      w: 300,
      h: 100,
      top: 10,
      left: -20,
      duration: 25,
      delay: 0,
      opacity: 0.3,
    },
    {
      w: 400,
      h: 120,
      top: 30,
      left: -40,
      duration: 35,
      delay: 5,
      opacity: 0.2,
    },
    {
      w: 250,
      h: 90,
      top: 60,
      left: -20,
      duration: 20,
      delay: 2,
      opacity: 0.25,
    },
    {
      w: 350,
      h: 110,
      top: 15,
      left: -30,
      duration: 30,
      delay: 10,
      opacity: 0.15,
    },
    {
      w: 500,
      h: 150,
      top: 40,
      left: -50,
      duration: 40,
      delay: 0,
      opacity: 0.1,
    },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {clouds.map((cloud, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white blur-3xl"
          style={{
            width: cloud.w,
            height: cloud.h,
            top: `${cloud.top}%`,
            left: `${cloud.left}%`,
            opacity: cloud.opacity,
          }}
          animate={{
            x: ["0vw", "140vw"],
          }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            ease: "linear",
            delay: cloud.delay,
          }}
        />
      ))}
    </div>
  );
};
