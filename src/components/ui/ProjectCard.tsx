import { Link } from "@/i18n/routing";
import { Project } from "@/data/projects";
import { useTranslations } from "next-intl";

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
        <div className="glass-card rounded-xl p-6 flex flex-col gap-4 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1 group h-full">
            <div>
                <div className="flex justify-between items-start gap-4">
                    <h3 className="text-slate-900 dark:text-slate-100 font-semibold text-lg group-hover:text-cyan-400 transition-colors">
                        {project.title}
                    </h3>
                    {project.views !== undefined && (
                        <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1 whitespace-nowrap">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                            {project.views}
                        </span>
                    )}
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-sm mt-2 leading-relaxed flex-1">
                    {project.shortDescription}
                </p>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 5).map((tech) => (
                    <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-medium border border-cyan-500/20"
                    >
                        {tech}
                    </span>
                ))}
                {project.technologies.length > 5 && (
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-400 text-xs mt-auto">
                        +{project.technologies.length - 5}
                    </span>
                )}
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center gap-3 mt-auto pt-2">
                {showDetail && (
                    <Link
                        href={`/projects/${project.slug}`}
                        className="text-sm text-slate-700 dark:text-slate-300 hover:text-cyan-400 font-medium transition-colors"
                    >
                        {t("viewDetails") || "View Details"} →
                    </Link>
                )}
                <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors ml-auto whitespace-nowrap"
                >
                    {t("github") || "GitHub"} ↗
                </a>
                {project.demoUrl !== "#" && (
                    <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-slate-700 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors whitespace-nowrap"
                    >
                        {t("demo") || "Demo"} ↗
                    </a>
                )}
            </div>
        </div>
    );
}
