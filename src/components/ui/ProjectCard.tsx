import { Link } from "@/i18n/routing";
import { Project } from "@/data/projects";

interface ProjectCardProps {
    project: Project;
    showDetail?: boolean;
}

export default function ProjectCard({
    project,
    showDetail = true,
}: ProjectCardProps) {
    return (
        <div className="glass-card rounded-xl p-6 flex flex-col gap-4 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1 group">
            <div>
                <h3 className="text-slate-900 dark:text-slate-100 font-semibold text-lg group-hover:text-cyan-400 transition-colors">
                    {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 leading-relaxed">
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
                    <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-500 dark:text-slate-500 text-xs">
                        +{project.technologies.length - 5}
                    </span>
                )}
            </div>

            {/* Links */}
            <div className="flex items-center gap-3 mt-auto pt-2">
                {showDetail && (
                    <Link
                        href={`/projects/${project.slug}`}
                        className="text-sm text-slate-700 dark:text-slate-300 hover:text-cyan-400 font-medium transition-colors"
                    >
                        View Details →
                    </Link>
                )}
                <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:text-slate-300 transition-colors ml-auto"
                >
                    GitHub ↗
                </a>
                {project.demoUrl !== "#" && (
                    <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-slate-500 dark:text-slate-500 hover:text-cyan-400 transition-colors"
                    >
                        Demo ↗
                    </a>
                )}
            </div>
        </div>
    );
}
