"use client";
import { useTranslations } from "next-intl";

import { useState, useRef } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function ContactPage() {
  const t = useTranslations("Contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      subject: String(formData.get("subject") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Server error");
      setStatus("success");
      formRef.current?.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="pt-24">
      <div className="max-w-5xl mx-auto px-6 pb-24">
        <AnimatedSection>
          <div className="mb-16">
            <p className="text-cyan-400 text-sm font-medium uppercase tracking-widest mb-3">{t("title")}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">{t("subtitle")}</h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl">{t("description")}</p>
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full mt-6" />
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-5 gap-10">
          {/* Contact Info */}
          <AnimatedSection className="md:col-span-2">
            <div className="space-y-6">
              <div className="glass-card rounded-xl p-5">
                <h3 className="text-slate-700 dark:text-slate-300 font-semibold mb-4">Contact Info</h3>
                <div className="space-y-4">
                  <a
                    href="mailto:bariscilak@email.com"
                    className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-cyan-400 transition-colors group"
                  >
                    <span className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-lg group-hover:bg-cyan-500/10 transition-colors">
                      ✉️
                    </span>
                    <div>
                      <p className="text-xs text-slate-600 mb-0.5">Email</p>
                      <p className="text-sm">bariscilak@email.com</p>
                    </div>
                  </a>
                  <a
                    href="https://github.com/bariscilak"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-cyan-400 transition-colors group"
                  >
                    <span className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-lg group-hover:bg-cyan-500/10 transition-colors">
                      🐙
                    </span>
                    <div>
                      <p className="text-xs text-slate-600 mb-0.5">GitHub</p>
                      <p className="text-sm">github.com/bariscilak</p>
                    </div>
                  </a>
                  <a
                    href="https://linkedin.com/in/bariscilak"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-cyan-400 transition-colors group"
                  >
                    <span className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-lg group-hover:bg-cyan-500/10 transition-colors">
                      💼
                    </span>
                    <div>
                      <p className="text-xs text-slate-600 mb-0.5">LinkedIn</p>
                      <p className="text-sm">linkedin.com/in/bariscilak</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="glass-card rounded-xl p-5">
                <h3 className="text-slate-700 dark:text-slate-300 font-semibold mb-3">Availability</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-sm">Available for freelance</span>
                </div>
                <p className="text-slate-500 dark:text-slate-500 text-sm">
                  Currently taking on new projects. Typical response time: within 24 hours.
                </p>
              </div>

              <div className="glass-card rounded-xl p-5">
                <h3 className="text-slate-700 dark:text-slate-300 font-semibold mb-3">Services</h3>
                <ul className="space-y-2 text-slate-500 dark:text-slate-500 text-sm">
                  {[
                    "Backend API Development",
                    "AI Chatbot Integration",
                    "Automation Systems",
                    "Data Pipeline Engineering",
                    "Technical Consulting",
                  ].map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <span className="text-cyan-500 text-xs">▸</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection className="md:col-span-3" delay={0.1}>
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-slate-900 dark:text-slate-100 font-semibold text-lg mb-6">Send a Message</h2>

              {status === "success" ? (
                <div className="text-center py-10">
                  <div className="text-4xl mb-4">✅</div>
                  <h3 className="text-slate-900 dark:text-slate-100 font-semibold mb-2">{t("form.success")}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-slate-600 dark:text-slate-400 text-sm mb-1.5">
                        {t("form.name")} <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        minLength={2}
                        maxLength={100}
                        placeholder={t("form.namePlaceholder")}
                        className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 text-sm transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-slate-600 dark:text-slate-400 text-sm mb-1.5">
                        {t("form.email")} <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        maxLength={200}
                        placeholder={t("form.emailPlaceholder")}
                        className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 text-sm transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-slate-600 dark:text-slate-400 text-sm mb-1.5">{t("form.subject")}</label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      maxLength={200}
                      placeholder={t("form.subjectPlaceholder")}
                      className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-slate-600 dark:text-slate-400 text-sm mb-1.5">
                      {t("form.message")} <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      minLength={10}
                      maxLength={2000}
                      rows={6}
                      placeholder={t("form.messagePlaceholder")}
                      className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 text-sm resize-none transition-colors"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-lg">{t("form.error")}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed text-black font-semibold text-sm transition-colors"
                  >
                    {status === "sending" ? t("form.sending") : t("form.send")}
                  </button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
