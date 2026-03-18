"use client";
import { motion } from "framer-motion";
import React from "react";

export default function InfiniteMarquee({ children, speed = 40 }: { children: React.ReactNode, speed?: number }) {
  return (
    <div className="relative flex overflow-hidden group w-full full-width-mask py-4 -mx-6 px-6 sm:mx-0 sm:px-0">
      <motion.div
        className="flex whitespace-nowrap min-w-full gap-6 px-3"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        <div className="flex gap-6 shrink-0 group-hover:[animation-play-state:paused]">{children}</div>
        <div className="flex gap-6 shrink-0 group-hover:[animation-play-state:paused]">{children}</div>
      </motion.div>
    </div>
  );
}
