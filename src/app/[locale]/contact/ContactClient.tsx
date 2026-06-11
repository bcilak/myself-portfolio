"use client";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

import { useState, useRef } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function ContactPage() {
  const t = useTranslations("Contact");
  const locale = useLocale();
  const isTr = locale === "tr";
  const selectClass =
    "w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-black/10 dark:border-white/10 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-cyan-500/50 text-sm transition-colors";
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    const projectType = String(formData.get("projectType") ?? "").trim();
    const budget = String(formData.get("budget") ?? "").trim();
    const timeline = String(formData.get("timeline") ?? "").trim();
    const existingSystem = String(formData.get("existingSystem") ?? "").trim();
    const rawMessage = String(formData.get("message") ?? "").trim();

    const briefLines = [
      projectType ? `Project type: ${projectType}` : null,
      budget ? `Budget: ${budget}` : null,
      timeline ? `Timeline: ${timeline}` : null,
      existingSystem ? `Existing system: ${existingSystem}` : null,
      "",
      rawMessage,
    ].filter((line) => line !== null);

    const data = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      subject: String(formData.get("subject") ?? "").trim() || `Project brief: ${projectType || "General inquiry"}`,
      message: briefLines.join("\n"),
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
    <div className="pt-32 md:pt-36">
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
                    href="mailto:bcilak@gmail.com"
                    className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-cyan-400 transition-colors group"
                  >
                    <span className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-lg group-hover:bg-cyan-500/10 transition-colors">
                      ✉️
                    </span>
                    <div>
                      <p className="text-xs text-slate-600 mb-0.5">Email</p>
                      <p className="text-sm">bcilak@gmail.com</p>
                    </div>
                  </a>
                  <a
                    href="https://github.com/bcilak"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-cyan-400 transition-colors group"
                  >
                    <span className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-lg group-hover:bg-cyan-500/10 transition-colors">
                      🐙
                    </span>
                    <div>
                      <p className="text-xs text-slate-600 mb-0.5">GitHub</p>
                      <p className="text-sm">github.com/bcilak</p>
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
                    "CBS / GIS Dashboards",
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
              <h2 className="text-slate-900 dark:text-slate-100 font-semibold text-lg mb-2">
                {isTr ? "Proje Ön Değerlendirme" : "Project Pre-Assessment"}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
                {isTr
                  ? "Birkaç net bilgi bırakırsanız size daha hızlı ve doğru bir dönüş yapabilirim."
                  : "Leave a few concrete details so I can respond with a sharper technical direction."}
              </p>

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
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />
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

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="projectType" className="block text-slate-600 dark:text-slate-400 text-sm mb-1.5">
                        {isTr ? "Proje tipi" : "Project type"}
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        className={selectClass}
                      >
                        <option value="">{isTr ? "Seçiniz" : "Select"}</option>
                        <option value="CBS / GIS Dashboard">CBS / GIS Dashboard</option>
                        <option value="AI Integration">AI Integration</option>
                        <option value="Automation System">Automation System</option>
                        <option value="Backend API">Backend API</option>
                        <option value="Data Pipeline">Data Pipeline</option>
                        <option value="Technical Consulting">Technical Consulting</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="timeline" className="block text-slate-600 dark:text-slate-400 text-sm mb-1.5">
                        {isTr ? "Zaman planı" : "Timeline"}
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        className={selectClass}
                      >
                        <option value="">{isTr ? "Seçiniz" : "Select"}</option>
                        <option value="Urgent / 1-2 weeks">{isTr ? "Acil / 1-2 hafta" : "Urgent / 1-2 weeks"}</option>
                        <option value="This month">{isTr ? "Bu ay" : "This month"}</option>
                        <option value="1-3 months">1-3 months</option>
                        <option value="Discovery first">{isTr ? "Önce keşif görüşmesi" : "Discovery first"}</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="budget" className="block text-slate-600 dark:text-slate-400 text-sm mb-1.5">
                        {isTr ? "Bütçe aralığı" : "Budget range"}
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        className={selectClass}
                      >
                        <option value="">{isTr ? "Belirtmek istemiyorum" : "Prefer not to say"}</option>
                        <option value="Small / Discovery">Small / Discovery</option>
                        <option value="Mid-size MVP">Mid-size MVP</option>
                        <option value="Production system">Production system</option>
                        <option value="Long-term collaboration">Long-term collaboration</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="existingSystem" className="block text-slate-600 dark:text-slate-400 text-sm mb-1.5">
                        {isTr ? "Mevcut sistem" : "Existing system"}
                      </label>
                      <select
                        id="existingSystem"
                        name="existingSystem"
                        className={selectClass}
                      >
                        <option value="">{isTr ? "Seçiniz" : "Select"}</option>
                        <option value="No existing system">{isTr ? "Henüz yok" : "No existing system"}</option>
                        <option value="Excel / manual process">Excel / manual process</option>
                        <option value="Existing web app">Existing web app</option>
                        <option value="Legacy system">Legacy system</option>
                        <option value="Needs integration">Needs integration</option>
                      </select>
                    </div>
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
