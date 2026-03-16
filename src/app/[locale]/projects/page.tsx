import { useTranslations, useLocale } from "next-intl";
import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ProjectCard from "@/components/ui/ProjectCard";
import { getProjects } from "@/data/projects";

export const metadata: Metadata = {
    title: "Projects",
    description:
        "Explore Barış Çilak's backend and automation projects including AI chatbots, speech-to-text platforms, and data pipelines.",
};

export default function ProjectsPage() {
  const locale = typeof useLocale === 'function' ? useLocale() : require('next-intl').useLocale();
  const projects = getProjects(locale);
  const t = useTranslations("Projects");
    const featuredProjects = projects.filter((p) => p.featured);
    const otherProjects = projects.filter((p) => !p.featured);

    return (
        <div className="pt-24">
            <div className="max-w-6xl mx-auto px-6 pb-24">
                <AnimatedSection>
                    <div className="mb-16">
                        <p className="text-cyan-400 text-sm font-medium uppercase tracking-widest mb-3">{t("work")}</p>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">{t("title")}</h1>
                        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">{t("description")}</p>
                        <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full mt-6" />
                    </div>
                </AnimatedSection>

                {/* Featured */}
                <AnimatedSection>
                    <h2 className="text-slate-500 dark:text-slate-500 text-sm uppercase tracking-widest font-medium mb-6">{t("featured")}</h2 >
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        {featuredProjects.map((project, i) => (
                            <AnimatedSection key={project.id} delay={i * 0.1}>
                                <ProjectCard project={project} />
                            </AnimatedSection>
                        ))}
                    </div>
                </AnimatedSection>

                {/* Other projects */}
                {otherProjects.length > 0 && (
                    <AnimatedSection>
                        <h2 className="text-slate-500 dark:text-slate-500 text-sm uppercase tracking-widest font-medium mb-6">{t("other")}</h2 >
                        <div className="grid md:grid-cols-2 gap-6">
                            {otherProjects.map((project, i) => (
                                <AnimatedSection key={project.id} delay={i * 0.1}>
                                    <ProjectCard project={project} />
                                </AnimatedSection>
                            ))}
                        </div>
                    </AnimatedSection>
                )}
            </div>
        </div>
    );
}
