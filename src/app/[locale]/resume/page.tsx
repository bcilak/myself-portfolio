import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { getExperiences } from "@/data/experience";
import { skillCategories } from "@/data/skills";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Resume" });
    return {
        title: t("title"),
        description: t("description"),
    };
}

export default async function ResumePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("Resume");
  const tTech = await getTranslations("TechStack");
  const experiences = getExperiences(locale);
    return (
        <div className="pt-24">
            <div className="max-w-4xl mx-auto px-6 pb-24">
                {/* Header */}
                <AnimatedSection>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
                        <div>
                            <p className="text-cyan-400 text-sm font-medium uppercase tracking-widest mb-2">{t("cv")}</p>
                            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100">{t("title")}</h1>
                        </div>
                        <a
                            href="/resume.pdf"
                            download
                            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm transition-colors"
                        >
                            <span>↓</span>
                            {t("downloadPdf")}
                        </a>
                    </div>
                    <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full mb-12" />
                </AnimatedSection>

                {/* Profile */}
                <AnimatedSection>
                    <div className="glass-card rounded-2xl p-8 mb-10">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">Barış Çilak</h2>
                        <p className="text-cyan-400 font-medium mb-4">{t("role")}</p>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {t("summary")}
                        </p>
                        <div className="flex flex-wrap gap-4 mt-5">
                            <a href="mailto:bariscilak@email.com" className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-cyan-400 text-sm transition-colors">
                                <span>✉️</span> bariscilak@email.com
                            </a>
                            <a href="https://github.com/bariscilak" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-cyan-400 text-sm transition-colors">
                                <span>🐙</span> github.com/bariscilak
                            </a>
                            <a href="https://linkedin.com/in/bariscilak" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-cyan-400 text-sm transition-colors">
                                <span>💼</span> linkedin.com/in/bariscilak
                            </a>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Experience */}
                <AnimatedSection>
                    <section className="mb-10">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-cyan-500 inline-block"></span>
                            {t("workExperience")}
                        </h2>
                        <div className="space-y-5">
                            {experiences.map((exp, i) => (
                                <AnimatedSection key={i} delay={i * 0.08}>
                                    <div className="glass-card rounded-xl p-6 hover:border-cyan-500/20 transition-colors">
                                        <div className="flex flex-wrap justify-between gap-2 mb-2">
                                            <div>
                                                <h3 className="text-slate-900 dark:text-slate-100 font-semibold">{exp.title}</h3>
                                                <p className="text-cyan-400/70 text-sm">{exp.company}</p>
                                            </div>
                                            <span className="text-slate-500 dark:text-slate-500 text-sm font-mono">{exp.year}</span>
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">{exp.description}</p>
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
                    </section>
                </AnimatedSection>

                {/* Technical Skills */}
                <AnimatedSection>
                    <section className="mb-10">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block"></span>
                            {t("technicalSkills")}
                        </h2>
                        <div className="glass-card rounded-xl p-6">
                            <div className="space-y-4">
                                {skillCategories.map((cat) => (
                                    <div key={cat.name} className="flex flex-wrap items-start gap-3">
                                        <span className="text-slate-600 dark:text-slate-400 text-sm font-medium w-24 shrink-0 pt-0.5">
                                            {tTech(`categories.${cat.name}` as any) || cat.name}
                                        </span>
                                        <div className="flex flex-wrap gap-2 flex-1">
                                            {cat.skills.map((skill) => (
                                                <span
                                                    key={skill.name}
                                                    className="text-xs text-slate-700 dark:text-slate-300 bg-white/5 px-2 py-0.5 rounded border border-black/5 dark:border-white/5"
                                                >
                                                    {skill.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </AnimatedSection>

                {/* Education */}
                <AnimatedSection>
                    <section className="mb-10">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                            {t("education")}
                        </h2>
                        <div className="glass-card rounded-xl p-6">
                            <div className="flex flex-wrap justify-between gap-2 mb-1">
                                <h3 className="text-slate-900 dark:text-slate-100 font-semibold">{t("computerEngineering")}</h3>
                                <span className="text-slate-500 dark:text-slate-500 text-sm font-mono">2018 – 2022</span>
                            </div>
                            <p className="text-cyan-400/70 text-sm">{t("university")}</p>
                            <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
                                {t("eduDescription")}
                            </p>
                        </div>
                    </section>
                </AnimatedSection>

                {/* CTA */}
                <AnimatedSection delay={0.2}>
                    <div className="flex flex-col sm:flex-row gap-4 mt-12">
                        <Link
                            href="/contact"
                            className="flex-1 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm text-center transition-colors"
                        >
                            {t("getInTouch")}
                        </Link>
                        <Link
                            href="/projects"
                            className="flex-1 py-3 rounded-lg border border-black/10 dark:border-white/10 hover:border-cyan-500/40 text-slate-700 dark:text-slate-300 hover:text-cyan-400 font-semibold text-sm text-center transition-all"
                        >
                            {t("viewProjects")}
                        </Link>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    );
}
