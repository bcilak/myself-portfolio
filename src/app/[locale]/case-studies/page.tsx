import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { getTranslations } from "next-intl/server";
import { getDbCaseStudies } from "@/lib/dataFetching";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "CaseStudies" });
    return {
        title: t("title"),
        description: t("description"),
    };
}

export default async function CaseStudiesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations("CaseStudies");
    const caseStudies = await getDbCaseStudies(locale);

    return (
        <div className="pt-24">
            <div className="max-w-5xl mx-auto px-6 pb-24">
                <AnimatedSection>
                    <div className="mb-16">
                        <p className="text-cyan-400 text-sm font-medium uppercase tracking-widest mb-3">{t("analysis")}</p>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">{t("title")}</h1>
                        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
                            {t("description")}
                        </p>
                        <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full mt-6" />
                    </div>
                </AnimatedSection>

                <div className="space-y-12">
                    {caseStudies.map((cs, i) => (
                        <AnimatedSection key={cs.slug} delay={i * 0.1}>
                            <div className="glass-card rounded-2xl overflow-hidden">
                                {/* Header */}
                                <div className="p-8 border-b border-black/5 dark:border-white/5">
                                    <div className="flex flex-wrap items-center gap-3 mb-4">
                                        <span className="text-3xl">{cs.icon}</span>
                                        <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-xs font-medium border border-cyan-500/20">
                                            {cs.category}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                                        {cs.title}
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-400">{cs.subtitle}</p>

                                    {/* Impact */}
                                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20">
                                        <span className="text-green-400 text-sm">📊</span>
                                        <span className="text-green-400 text-sm font-medium">{cs.impact}</span>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-8 grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-slate-700 dark:text-slate-300 font-semibold mb-3 flex items-center gap-2">
                                            <span className="text-red-400">🎯</span> {t("problem")}
                                        </h3>
                                        <p className="text-slate-500 dark:text-slate-500 text-sm leading-relaxed mb-6">{cs.problem}</p>

                                        <h3 className="text-slate-700 dark:text-slate-300 font-semibold mb-3 flex items-center gap-2">
                                            <span className="text-blue-400">🔍</span> {t("approach")}
                                        </h3>
                                        <p className="text-slate-500 dark:text-slate-500 text-sm leading-relaxed mb-6">{cs.approach}</p>

                                        <h3 className="text-slate-700 dark:text-slate-300 font-semibold mb-3 flex items-center gap-2">
                                            <span className="text-purple-400">🏗️</span> {t("architecture")}
                                        </h3>
                                        <p className="text-slate-500 dark:text-slate-500 text-sm leading-relaxed font-mono text-xs bg-white/5 p-3 rounded-lg">
                                            {cs.architecture}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-slate-700 dark:text-slate-300 font-semibold mb-3 flex items-center gap-2">
                                            <span className="text-orange-400">⚠️</span> {t("challenges")}
                                        </h3>
                                        <ul className="space-y-2 mb-6">
                                            {cs.challenges.map((c: string) => (
                                                <li key={c} className="flex items-start gap-2 text-slate-500 dark:text-slate-500 text-sm">
                                                    <span className="text-orange-400 mt-0.5">•</span>
                                                    {c}
                                                </li>
                                            ))}
                                        </ul>

                                        <h3 className="text-slate-700 dark:text-slate-300 font-semibold mb-3 flex items-center gap-2">
                                            <span className="text-green-400">📚</span> {t("lessonsLearned")}
                                        </h3>
                                        <ul className="space-y-2 mb-6">
                                            {cs.lessons.map((l: string) => (
                                                <li key={l} className="flex items-start gap-2 text-slate-500 dark:text-slate-500 text-sm">
                                                    <span className="text-green-400 mt-0.5">✓</span>
                                                    {l}
                                                </li>
                                            ))}
                                        </ul>

                                        <div>
                                            <h3 className="text-slate-700 dark:text-slate-300 font-semibold mb-3">{t("technologies")}</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {cs.technologies.map((t: string) => (
                                                    <span
                                                        key={t}
                                                        className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-medium border border-cyan-500/20"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>

                <AnimatedSection delay={0.3}>
                    <div className="mt-16 text-center">
                        <p className="text-slate-600 dark:text-slate-400 mb-4">{t("discussPrompt")}</p>
                        <Link
                            href="/contact"
                            className="px-8 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition-colors duration-200"
                        >
                            {t("getInTouch")}
                        </Link>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    );
}
