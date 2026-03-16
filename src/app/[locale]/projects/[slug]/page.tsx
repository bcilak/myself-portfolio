import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { getProjects } from "@/data/projects";

interface Props {
    params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
    return getProjects("en").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const locale = (await params).locale || "en";
  const project = getProjects(locale).find((p) => p.slug === slug);
    if (!project) return { title: "Project Not Found" };
    return {
        title: project.title,
        description: project.shortDescription,
    };
}

export default async function ProjectDetailPage({ params }: Props) {
    const { slug } = await params;
    const locale = (await params).locale; const project = getProjects(locale).find((p) => p.slug === slug);
    if (!project) notFound();

    const sections = [
        { title: "Problem", icon: "🎯", content: project.problem },
        { title: "Solution", icon: "💡", content: project.solution },
        { title: "Architecture", icon: "🏗️", content: project.architecture },
        { title: "Challenges", icon: "⚠️", content: project.challenges },
        { title: "Lessons Learned", icon: "📚", content: project.lessons },
    ];

    return (
        <div className="pt-24">
            <div className="max-w-4xl mx-auto px-6 pb-24">
                {/* Back */}
                <AnimatedSection>
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-500 hover:text-cyan-400 text-sm mb-8 transition-colors"
                    >
                        ← Back to Projects
                    </Link>
                </AnimatedSection>

                {/* Header */}
                <AnimatedSection>
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                            {project.title}
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6">
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 text-sm font-medium border border-cyan-500/20"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-4">
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 py-2.5 rounded-lg border border-black/10 dark:border-white/10 hover:border-cyan-500/40 text-slate-700 dark:text-slate-300 hover:text-cyan-400 text-sm font-semibold transition-all"
                            >
                                View Source ↗
                            </a>
                            {project.demoUrl !== "#" && (
                                <a
                                    href={project.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-semibold transition-colors"
                                >
                                    Live Demo ↗
                                </a>
                            )}
                        </div>
                    </div>
                </AnimatedSection>

                {/* Sections */}
                <div className="space-y-8">
                    {sections.map((section, i) => (
                        <AnimatedSection key={section.title} delay={i * 0.08}>
                            <div className="glass-card rounded-xl p-7">
                                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                                    <span>{section.icon}</span>
                                    {section.title}
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{section.content}</p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>

                {/* Navigation */}
                <AnimatedSection delay={0.3}>
                    <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-between">
                        <Link
                            href="/projects"
                            className="px-6 py-3 rounded-lg border border-black/10 dark:border-white/10 hover:border-cyan-500/40 text-slate-700 dark:text-slate-300 hover:text-cyan-400 text-sm font-semibold transition-all text-center"
                        >
                            ← All Projects
                        </Link>
                        <Link
                            href="/contact"
                            className="px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-semibold transition-colors text-center"
                        >
                            Discuss a Similar Project
                        </Link>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    );
}
