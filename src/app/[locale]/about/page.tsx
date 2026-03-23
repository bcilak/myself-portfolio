import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { getDbExperiences, getDbSkills } from "@/lib/dataFetching";

const principles = [
    {
        icon: "🏗️",
        titleKey: "principleCleanTitle",
        descKey: "principleCleanDesc",
    },
    {
        icon: "📈",
        titleKey: "principleScalableTitle",
        descKey: "principleScalableDesc",
    },
    {
        icon: "⚡",
        titleKey: "principleAutoTitle",
        descKey: "principleAutoDesc",
    },
    {
        icon: "🔒",
        titleKey: "principleSecurityTitle",
        descKey: "principleSecurityDesc",
    },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "About" });
    return {
        title: t("metaTitle"),
        description: t("metaDescription"),
    };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const tAbout = await getTranslations({ locale, namespace: "About" });
    const tSection = await getTranslations({ locale, namespace: "Sections" });
    const tTech = await getTranslations({ locale, namespace: "TechStack" });

    // Fetch experiences from DB (falls back to empty array if none)
    const experiences = await getDbExperiences(locale);
    const skillCategories = await getDbSkills(locale);

    return (
        <div className="pt-24">
            <div className="max-w-5xl mx-auto px-6 pb-24">
                {/* Header */}
                <AnimatedSection>
                    <div className="mb-16">
                        <p className="text-cyan-400 text-sm font-medium uppercase tracking-widest mb-3">{tAbout("title")}</p>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                            {tAbout("subtitle")}
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
                            <AnimatedSection key={p.titleKey} delay={i * 0.1}>
                                <div className="glass-card rounded-xl p-6 hover:border-cyan-500/20 transition-colors">
                                    <div className="text-2xl mb-3">{p.icon}</div>
                                    <h3 className="text-slate-900 dark:text-slate-100 font-semibold mb-2">
                                        {tAbout(p.titleKey as any)}
                                    </h3>
                                    <p className="text-slate-500 dark:text-slate-500 text-sm leading-relaxed">
                                        {tAbout(p.descKey as any)}
                                    </p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </AnimatedSection>

                {/* Skills by Category */}
                <AnimatedSection>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8">{tSection("coreTech")}</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                        {skillCategories.map((cat: any, i: number) => (
                            <AnimatedSection key={cat.name} delay={i * 0.08}>
                                <div className="glass-card rounded-xl p-5">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-xl">{cat.icon}</span>
                                        <h3 className="text-slate-900 dark:text-slate-100 font-semibold">
                                            {tTech(`categories.${cat.name}` as any) || cat.name}
                                        </h3>
                                    </div>
                                    <div className="space-y-2">
                                        {cat.skills.map((skill: any) => (
                                            <div key={skill.name} className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-base">{skill.icon}</span>
                                                    <span className="text-slate-700 dark:text-slate-300 text-sm">{skill.name}</span>
                                                </div>
                                                <span
                                                    className={`text-xs px-2 py-0.5 rounded-full ${
                                                        skill.level === "Expert"
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

                {/* Experience — from DB */}
                {experiences.length > 0 && (
                    <AnimatedSection>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8">
                            {tAbout("experience")}
                        </h2>
                        <div className="space-y-6">
                            {experiences.map((exp, i) => (
                                <AnimatedSection key={exp.id} delay={i * 0.1}>
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
                                            {exp.technologies.map((tech: string) => (
                                                <span key={tech} className="text-xs text-slate-500 dark:text-slate-500 bg-white/5 px-2 py-0.5 rounded">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </AnimatedSection>
                )}
            </div>
        </div>
    );
}
