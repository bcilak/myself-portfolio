import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { skillCategories } from "@/data/skills";

export const metadata: Metadata = {
    title: "Tech Stack",
    description:
        "The technologies, frameworks, and tools Barış Çilak uses to build backend systems, AI applications, and automation pipelines.",
};

const levelColors: Record<string, string> = {
    Expert: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
    Advanced: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
    Intermediate: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20",
};

export default function TechStackPage() {
    return (
        <div className="pt-24">
            <div className="max-w-5xl mx-auto px-6 pb-24">
                <AnimatedSection>
                    <div className="mb-16">
                        <p className="text-cyan-400 text-sm font-medium uppercase tracking-widest mb-3">Tools</p>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">Tech Stack</h1>
                        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
                            Technologies I work with daily to build scalable backends, AI integrations, and automation systems.
                        </p>
                        <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full mt-6" />
                    </div>
                </AnimatedSection>

                {/* Legend */}
                <AnimatedSection>
                    <div className="flex flex-wrap gap-3 mb-12">
                        {["Expert", "Advanced", "Intermediate"].map((level) => (
                            <span key={level} className={`text-xs px-3 py-1.5 rounded-full font-medium ${levelColors[level]}`}>
                                {level}
                            </span>
                        ))}
                    </div>
                </AnimatedSection>

                {/* Categories */}
                <div className="space-y-12">
                    {skillCategories.map((cat, ci) => (
                        <AnimatedSection key={cat.name} delay={ci * 0.08}>
                            <div>
                                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                                    <span>{cat.icon}</span>
                                    {cat.name}
                                </h2>
                                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {cat.skills.map((skill, i) => (
                                        <AnimatedSection key={skill.name} delay={ci * 0.05 + i * 0.05}>
                                            <div className="glass-card rounded-xl p-5 flex flex-col items-center text-center gap-3 hover:border-cyan-500/20 transition-all group hover:-translate-y-1">
                                                <span className="text-3xl">{skill.icon}</span>
                                                <span className="text-slate-800 dark:text-slate-200 font-medium text-sm">{skill.name}</span>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${levelColors[skill.level]}`}>
                                                    {skill.level}
                                                </span>
                                            </div>
                                        </AnimatedSection>
                                    ))}
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>

                {/* Tools & Resources */}
                <AnimatedSection delay={0.3}>
                    <div className="mt-16 glass-card rounded-2xl p-8">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">Development Workflow</h2>
                        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { icon: "🖥️", title: "OS", items: ["Ubuntu Linux", "Windows WSL2"] },
                                { icon: "✏️", title: "Editor", items: ["VS Code", "Vim"] },
                                { icon: "🗂️", title: "Version Control", items: ["Git", "GitHub"] },
                                { icon: "🚀", title: "Hosting", items: ["Vercel", "DigitalOcean", "Docker"] },
                            ].map((tool) => (
                                <div key={tool.title}>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span>{tool.icon}</span>
                                        <span className="text-slate-700 dark:text-slate-300 font-medium text-sm">{tool.title}</span>
                                    </div>
                                    <ul className="space-y-1">
                                        {tool.items.map((item) => (
                                            <li key={item} className="text-slate-500 dark:text-slate-500 text-sm">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    );
}
