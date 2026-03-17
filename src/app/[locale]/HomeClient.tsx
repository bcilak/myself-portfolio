"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ProjectCard from "@/components/ui/ProjectCard";
import BlogCard from "@/components/ui/BlogCard";
import { type Project } from "@/data/projects";
import { type BlogPost } from "@/data/blog";
import { featuredSkills } from "@/data/skills";
import { type Experience } from "@/data/experience";
import { useTranslations } from "next-intl";


export default function HomeClient({
  featuredProjects,
  recentPosts,
  experiences
}: {
  featuredProjects: Project[];
  recentPosts: BlogPost[];
  experiences: Experience[];
}) {
  const t = useTranslations("Home");
  const tSection = useTranslations("Sections");

  return (
    <div className="pt-16">
      <section className="relative min-h-[calc(100svh-4rem)] md:min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-3xl" />
          <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-4">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium border border-cyan-500/20">
                  {t("available")}
                </span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
                {t("greeting")} <span className="gradient-text">Baris Cilak</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-xl text-slate-600 dark:text-slate-400 mt-4 font-medium">
                {t("role")}
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-slate-500 dark:text-slate-500 mt-4 leading-relaxed text-lg">
                {t("description")}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-wrap gap-3 mt-8">
                <Link href="/projects" className="px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition-colors duration-200">{t("viewProjects")}</Link>
                <Link href="/contact" className="px-6 py-3 rounded-lg border border-black/10 dark:border-white/10 hover:border-cyan-500/40 text-slate-700 dark:text-slate-300 hover:text-cyan-400 font-semibold transition-all duration-200">{t("contactMe")}</Link>
                <a href="/resume.pdf" download className="px-6 py-3 rounded-lg border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-semibold transition-all duration-200">{t("downloadCv")}</a>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.3 }} className="grid grid-cols-2 gap-4">
              {[
                { value: "15+", label: t("stats.projects") },
                { value: "3+", label: t("stats.experience") },
                { value: "10+", label: t("stats.clients") },
                { value: "50+", label: t("stats.apis") },
              ].map((stat) => (
                <div key={stat.label} className="glass-card rounded-xl p-6 text-center glow-accent">
                  <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-slate-500 dark:text-slate-500 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatedSection>
        <section className="py-16 border-t border-black/5 dark:border-white/5">
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-center text-slate-600 text-sm uppercase tracking-widest font-medium mb-8">{tSection("coreTech")}</p>
            <div className="flex flex-wrap justify-center gap-3">
              {featuredSkills.map((skill, i) => (
                <motion.div key={skill.name} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-center gap-2 px-4 py-2 glass-card rounded-full text-slate-700 dark:text-slate-300 text-sm font-medium hover:border-cyan-500/30 hover:text-cyan-300 transition-all cursor-default">
                  <span>{skill.icon}</span>
                  {skill.name}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-cyan-400 text-sm font-medium uppercase tracking-widest mb-2">{tSection("portfolio")}</p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100">{tSection("featuredProjects")}</h2>
              </div>
              <Link href="/projects" className="hidden sm:block text-slate-600 dark:text-slate-400 hover:text-cyan-400 text-sm font-medium transition-colors">{tSection("allProjects")}</Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredProjects.map((project, i) => (
                <AnimatedSection key={project.id} delay={i * 0.1}>
                  <ProjectCard project={project} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="py-20 bg-slate-900 dark:bg-[#0a0d14]">
          <div className="max-w-4xl mx-auto px-6">
            <div className="mb-12 text-center">
              <p className="text-cyan-400 text-sm font-medium uppercase tracking-widest mb-2">{tSection("background")}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-100">{tSection("experienceTimeline")}</h2>
            </div>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />
              <div className="space-y-8">
                {experiences.map((exp, i) => (
                  <AnimatedSection key={i} delay={i * 0.1}>
                    <div className="relative pl-12">
                      <div className="absolute left-3.5 top-5 w-2.5 h-2.5 rounded-full bg-cyan-500 border-2 border-[#0a0d14] -translate-x-1/2 z-10" />
                      <div className="glass-card rounded-xl p-5">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <h3 className="text-slate-100 font-semibold">{exp.title}</h3>
                          <span className="text-cyan-400/70 font-mono text-xs">{exp.year}</span>
                        </div>
                        <p className="text-cyan-400/60 text-sm">{exp.company}</p>
                        <p className="text-slate-300 dark:text-slate-400 text-sm mt-2 leading-relaxed">{exp.description}</p>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {exp.technologies.map((t: string) => (
                            <span key={t} className="text-xs text-slate-300 bg-white/5 px-2 py-0.5 rounded">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-cyan-400 text-sm font-medium uppercase tracking-widest mb-2">{tSection("insights")}</p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100">{tSection("latestArticles")}</h2>
              </div>
              <Link href="/blog" className="hidden sm:block text-slate-600 dark:text-slate-400 hover:text-cyan-400 text-sm font-medium transition-colors">{tSection("readBlog")}</Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {recentPosts.map((post, i) => (
                <AnimatedSection key={post.id} delay={i * 0.1}>
                  <BlogCard post={post} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="py-24">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <div className="glass-card rounded-2xl p-12 border border-cyan-500/10">
              <p className="text-cyan-400 text-sm font-medium uppercase tracking-widest mb-4">{t("cta.label")}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">{t("cta.title")}</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed">{t("cta.description")}</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/contact" className="px-8 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition-colors duration-200">{t("cta.primary")}</Link>
                <Link href="/projects" className="px-8 py-3 rounded-lg border border-black/10 dark:border-white/10 hover:border-cyan-500/40 text-slate-700 dark:text-slate-300 hover:text-cyan-400 font-semibold transition-all duration-200">{t("cta.secondary")}</Link>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}