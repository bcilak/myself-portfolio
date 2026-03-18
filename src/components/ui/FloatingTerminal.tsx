"use client";
import { motion } from "framer-motion";

export default function FloatingTerminal() {
  return (
    <motion.div
      animate={{ y: [0, -20, 0], rotate: [0, 2, -2, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="absolute right-[5%] bottom-[15%] w-72 bg-[#0d1117] rounded-xl border border-white/10 shadow-2xl hidden lg:block overflow-hidden z-30 hover:scale-105 transition-transform"
    >
      <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
        </div>
        <div className="flex-1 text-center text-[10px] text-slate-400 font-mono">ai_agent.py</div>
      </div>
      <div className="p-4 font-mono text-[11px] leading-relaxed text-slate-300">
        <div className="flex gap-2">
          <span className="text-pink-400">import</span> <span className="text-cyan-400">openai</span>
        </div>
        <div className="flex gap-2 mt-2">
          <span className="text-pink-400">def</span> <span className="text-blue-400">init_AI</span>():
        </div>
        <div className="pl-4 mt-1">
          <span className="text-slate-500"># Building robust intelligence...</span>
        </div>
        <div className="pl-4 text-green-400 mt-1">
          return System.ready(True)
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-green-500">➜</span>
          <span className="animate-pulse font-bold text-cyan-400">_</span>
        </div>
      </div>
    </motion.div>
  );
}
