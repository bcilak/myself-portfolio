"use client";
import React, { useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function TiltCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Values from -15 to 15 degrees max
    const rX = ((e.clientY - rect.top) / height - 0.5) * -20;
    const rY = ((e.clientX - rect.left) / width - 0.5) * 20;
    
    x.set(rY);
    y.set(rX);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        rotateX: mouseYSpring, 
        rotateY: mouseXSpring,
        perspective: 1000,
        transformStyle: "preserve-3d"
      }}
      className={`relative group ${className}`}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-colors duration-500 rounded-xl z-0" 
        style={{ transform: "translateZ(-10px)" }} 
      />
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10 h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}
