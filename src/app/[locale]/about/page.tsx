import { useTranslations, useLocale } from "next-intl";
import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { skillCategories } from "@/data/skills";
import { getExperiences } from "@/data/experience";

export const metadata: Metadata = {
    title: "About",
    description:
        "Learn about Barış Çilak — a backend developer and automation engineer specializing in Python, FastAPI, and AI integrations.",
};

const principles = [
    {
        icon: "🏗️",
        title: "Clean Architecture",
        description:
            "Code should be readable, testable, and maintainable. Structure matters more than cleverness.",
    },
    {
        icon: "📈",
        title: "Scalable Systems",
        description:
            "Build for today, design for tomorrow. Every architectural decision considers future growth.",
    },
    {
        icon: "⚡",
        title: "Automation Mindset",
        description:
            "If it happens more than twice, automate it. Manual processes are bugs waiting to happen.",
    },
    {
        icon: "🔒",
        title: "Security First",
        description:
            "Security is not a feature, it is a requirement built into every layer from day one.",
    },
];

export default function AboutPage() {
  const tAbout = useTranslations("About");
  const locale = useLocale();
  const experiences = getExperiences(locale);
  const tSection = useTranslations("Sections");
    return (
        <div className="pt-24">
            <div className="max-w-5xl mx-auto px-6 pb-24">
                {/* Header */}
                <AnimatedSection>
                    <div className="mb-16">
                        <p className="text-cyan-400 text-sm font-medium uppercase tracking-widest mb-3">{tAbout("title")}</p>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                            Backend Developer &amp;<br />Automation Engineer
                        </h1>
                        <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full" />
                    </div>
                </AnimatedSection>

                <div className="grid md:grid-cols-5 gap-12 mb-20">
                    {/* Story */}
                    <AnimatedSection className="md:col-span-3">
                        <div className="space-y-5 text-slate-600 dark:text-slate-400 leading-relaxed">
                            <p className="text-slate-700 dark:text-slate-300 text-lg">{tAbout("p1")}</p>
                            <p>{tAbout("p2")}</p>
                            <p>{tAbout("p3")}</p>
                            <p>{tAbout("p4")}</p>
                        </div>
                    </AnimatedSection>

                    {/* Expertise */}
                    <AnimatedSection className="md:col-span-2" delay={0.1}>
                        <h2 className="text-slate-900 dark:text-slate-100 font-semibold mb-4">{tAbout("expertise")}</h2>
                        <div className="space-y-3">
                            {[
                                { area: "Backend Development", pct: 95 },
                                { area: "Automation Systems", pct: 90 },
                                { area: "AI Integrations", pct: 85 },
                                { area: "Data Processing", pct: 80 },
                                { area: "DevOps & Docker", pct: 75 },
                            ].map((item) => (
                                <div key={item.area}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-slate-700 dark:text-slate-300">{item.area}</span>
                                        <span className="text-slate-500 dark:text-slate-500">{item.pct}%</span>
                                    </div>
                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
                                            style={{ width: `${item.pct}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>

                {/* Working Principles */}
                <AnimatedSection>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8">{tAbout("principles")}</h2>
                    <div className="grid sm:grid-cols-2 gap-4 mb-20">
                        {principles.map((p, i) => (
                            <AnimatedSection key={p.title} delay={i * 0.1}>
                                <div className="glass-card rounded-xl p-6 hover:border-cyan-500/20 transition-colors">
                                    <div className="text-2xl mb-3">{p.icon}</div>
                                    <h3 className="text-slate-900 dark:text-slate-100 font-semibold mb-2">{p.title}</h3>
                                    <p className="text-slate-500 dark:text-slate-500 text-sm leading-relaxed">{p.description}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </AnimatedSection>

                {/* Skills by Category */}
                <AnimatedSection>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8">{tSection("coreTech")}</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                        {skillCategories.map((cat, i) => (
                            <AnimatedSection key={cat.name} delay={i * 0.08}>
                                <div className="glass-card rounded-xl p-5">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-xl">{cat.icon}</span>
                                        <h3 className="text-slate-900 dark:text-slate-100 font-semibold">{cat.name}</h3>
                                    </div>
                                    <div className="space-y-2">
                                        {cat.skills.map((skill) => (
                                            <div key={skill.name} className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-base">{skill.icon}</span>
                                                    <span className="text-slate-700 dark:text-slate-300 text-sm">{skill.name}</span>
                                                </div>
                                                <span
                                                    className={`text-xs px-2 py-0.5 rounded-full ${skill.level === "Expert"
                                                            ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                                                            : skill.level === "Advanced"
                                                                ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                                                                : "bg-white/5 text-slate-500 dark:text-slate-500"
                                                        }`}
                                                >
                                                    {skill.level}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </AnimatedSection>

                {/* Experience */}
                <AnimatedSection>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8">{tAbout("experience") || "Experience"}</h2>
                    <div className="space-y-6">
                        {experiences.map((exp, i) => (
                            <AnimatedSection key={i} delay={i * 0.1}>
                                <div className="glass-card rounded-xl p-6 hover:border-cyan-500/20 transition-colors">
                                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                                        <div>
                                            <h3 className="text-slate-900 dark:text-slate-100 font-semibold">{exp.title}</h3>
                                            <p className="text-cyan-400/70 text-sm mt-0.5">{exp.company}</p>
                                        </div>
                                        <span className="text-slate-500 dark:text-slate-500 text-sm font-mono bg-white/5 px-3 py-1 rounded-full">
                                            {exp.year}
                                        </span>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
                                        {exp.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {exp.technologies.map((t) => (
                                            <span key={t} className="text-xs text-slate-500 dark:text-slate-500 bg-white/5 px-2 py-0.5 rounded">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </AnimatedSection>
            </div>
        </div>
    );
}
