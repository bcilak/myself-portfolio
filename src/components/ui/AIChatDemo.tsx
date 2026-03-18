"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send } from "lucide-react";

export default function AIChatDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'agent', text: string}[]>([
    { role: 'agent', text: 'Hi! I am the Barış AI agent. Ask me anything about my creator\'s skills or projects!' }
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', text: input }];
    setMessages(newMessages as any);
    setInput("");
    setIsThinking(true);

    setTimeout(() => {
      setMessages([...newMessages, { role: 'agent', text: 'This is a UI demo for the portfolio showcasing frontend capabilities! In production, I would use OpenAI to analyze Barış\'s portfolio and answer this intelligently.' }] as any);
      setIsThinking(false);
    }, 1500);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/25 flex items-center justify-center z-[100] overflow-hidden group hover:shadow-cyan-500/40 transition-shadow"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <Bot className="w-6 h-6 z-10" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-[350px] bg-slate-50 dark:bg-slate-900 rounded-2xl border border-black/10 dark:border-white/10 shadow-2xl z-[100] flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-black/5 dark:border-white/5 bg-white dark:bg-slate-800">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">Barış AI Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 h-80 p-4 overflow-y-auto space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-2.5 text-sm ${msg.role === 'user' ? 'bg-cyan-600 text-white rounded-2xl rounded-br-sm' : 'glass-card text-slate-700 dark:text-slate-100 rounded-2xl rounded-bl-sm border border-black/5 dark:border-white/5 shadow-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="glass-card rounded-2xl rounded-bl-sm px-4 py-3 border border-black/5 dark:border-white/5 shadow-sm flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 bg-white dark:bg-slate-800 border-t border-black/5 dark:border-white/5 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 bg-slate-100 dark:bg-white/5 border border-transparent focus:border-cyan-500/50 rounded-xl px-4 py-2 text-sm text-slate-800 dark:text-slate-200 focus:outline-none transition-colors"
                autoFocus
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isThinking}
                className="w-10 h-10 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:hover:bg-cyan-600 text-white flex items-center justify-center transition-colors shrink-0"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
