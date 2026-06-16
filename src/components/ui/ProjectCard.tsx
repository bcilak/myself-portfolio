import { Link } from "@/i18n/routing";
import { Project } from "@/data/projects";
import { useTranslations } from "next-intl";
import SpotlightCard from "@/components/ui/SpotlightCard";

interface ProjectCardProps {
    project: Project;
    showDetail?: boolean;
}

export default function ProjectCard({
    project,
    showDetail = true,
}: ProjectCardProps) {
    const t = useTranslations("Projects");

    return (
        <SpotlightCard className="glass-card hover:-rotate-1 transition-transform duration-100 group h-full">
            <div className="p-6 flex flex-col gap-4 h-full relative z-10 w-full">
                <div className="absolute left-1/2 top-[-14px] h-7 w-24 -translate-x-1/2 rotate-2 border border-black/20 bg-[#e5e0d8]/80" />
                <div>
                    <div className="flex justify-between items-start gap-4">
                        <h3 className="text-slate-900 dark:text-slate-100 font-semibold text-xl group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                            {project.title}
                        </h3>
                        {project.views !== undefined && (
                            <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1 whitespace-nowrap">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                                {project.views}
                            </span>
                        )}
                    </div>
                    <div className="mt-4 flex-1 space-y-3 bg-[#fff9c4] p-4 rounded-xl border-2 border-dashed border-black shadow-none">
                        <div>
                            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                <span className="text-cyan-500 text-sm">🎯</span> {t("problem")}
                            </div>
                            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed line-clamp-2">
                                {project.problem}
                            </p>
                        </div>
                        <div className="pt-3 border-t-2 border-dashed border-black">
                            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                <span className="text-cyan-500 text-sm">💡</span> {t("solution")}
                            </div>
                            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed line-clamp-2">
                                {project.solution}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 5).map((tech) => (
                        <span
                            key={tech}
                            className="paper-tag px-2 py-0.5 text-xs font-medium"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 5 && (
                        <span className="paper-tag px-2 py-0.5 text-xs mt-auto">
                            +{project.technologies.length - 5}
                        </span>
                    )}
                </div>

                {/* Links */}
                <div className="flex flex-wrap items-center gap-3 mt-auto pt-2">
                    {showDetail && (
                        <Link
                            href={`/projects/${project.slug}`}
                            className="text-base text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 font-medium transition-colors underline decoration-wavy decoration-[#ff4d4d]"
                        >
                            {t("viewDetails") || "View Details"} →
                        </Link>
                    )}
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors ml-auto whitespace-nowrap underline decoration-dashed"
                    >
                        {t("github") || "GitHub"} ↗
                    </a>
                    {project.demoUrl !== "#" && (
                        <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors whitespace-nowrap underline decoration-dashed"
                        >
                            {t("demo") || "Demo"} ↗
                        </a>
                    )}
                </div>
            </div>
        </SpotlightCard>
    );
}
