"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ProjectCard from "@/components/ui/ProjectCard";
import BlogCard from "@/components/ui/BlogCard";
import { type Project } from "@/data/projects";
import { type BlogPost } from "@/data/blog";
import { type Experience } from "@/data/experience";
import { useTranslations } from "next-intl";
import { type GithubStats } from "@/lib/githubStats";
import { Terminal, Code2, Database, Cpu } from "lucide-react";

const GithubStatsWidget = dynamic(() => import("@/components/ui/GithubStatsWidget"), {
  ssr: false,
  loading: () => <div className="glass-card p-6 h-full min-h-[140px]" />,
});
const TypewriterRole = dynamic(() => import("@/components/ui/TypewriterRole"), { ssr: false });
const MagneticButton = dynamic(() => import("@/components/ui/MagneticButton"), { ssr: false });
const TiltCard = dynamic(() => import("@/components/ui/TiltCard"), { ssr: false });
const InfiniteMarquee = dynamic(() => import("@/components/ui/InfiniteMarquee"), { ssr: false });
const ParallaxText = dynamic(() => import("@/components/ui/ParallaxText"), { ssr: false });

export default function HomeClient({
  featuredProjects,
  recentPosts,
  experiences,
  featuredSkills,
  githubStats,
}: {
  featuredProjects: Project[];
  recentPosts: BlogPost[];
  experiences: Experience[];
  featuredSkills: any[];
  githubStats: GithubStats | null;
}) {
  const t = useTranslations("Home");
  const tSection = useTranslations("Sections");

  return (
    <div className="pt-20">
      <section className="relative min-h-[calc(100svh-4rem)] md:min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-x-6 top-8 hidden h-28 border-t-2 border-dashed border-black/30 md:block -rotate-1" />
        <div className="absolute right-10 top-28 hidden text-6xl font-bold text-[#ff4d4d] md:block rotate-12">!</div>

        <div className="absolute inset-0 flex flex-col justify-center gap-12 pointer-events-none z-0 mt-32 opacity-100 dark:opacity-80">
          <ParallaxText baseVelocity={2}>FULL STACK</ParallaxText>
          <ParallaxText baseVelocity={-2}>AI DEVELOPER</ParallaxText>
        </div>

        {/* Floating Tech Icons */}
        <motion.div animate={{ y: [0, -18, 0], rotate: [0, 5, -5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute right-[15%] top-[20%] p-4 paper-card hidden lg:block z-10">
          <Terminal className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
        </motion.div>
        <motion.div animate={{ y: [0, 22, 0], rotate: [0, -10, 5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute right-[5%] top-[55%] p-4 paper-card hidden lg:block z-10">
          <Code2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </motion.div>
        <motion.div animate={{ y: [0, -16, 0], rotate: [0, 8, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute left-[3%] top-[30%] p-4 paper-card hidden lg:block z-10">
          <Database className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        </motion.div>
        <motion.div animate={{ y: [0, 16, 0], rotate: [0, -5, 5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 3 }} className="absolute left-[10%] bottom-[20%] p-4 paper-card hidden lg:block z-10">
          <Cpu className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
        </motion.div>

        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 w-full relative z-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 100, damping: 10 }} className="mb-4">
                <span className="paper-tag px-4 py-1 text-base font-medium inline-block hover:scale-105 transition-transform cursor-default -rotate-1">
                  {t("available")}
                </span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.1 }} className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                {t("greeting")} <span className="gradient-text">Barış Çilak</span>
              </motion.h1>
              <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.15 }} className="text-2xl md:text-3xl font-semibold mt-2 text-slate-800 dark:text-slate-200">
                {t("title")}
              </motion.h2>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2 }} className="text-xl mt-4 font-medium h-8">
                <TypewriterRole roles={[t("role"), "AI Integrations Expert", "Backend Architecture Specialist"]} speed={80} pause={2500} />
              </motion.div>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.3 }} className="text-slate-700 dark:text-slate-400 mt-6 leading-relaxed text-lg">
                {t("description")}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.4 }} className="flex flex-wrap gap-4 mt-8">
                <MagneticButton className="w-full sm:w-auto">
                  <Link href="/contact" className="sketch-button w-full px-8 py-3.5 text-xl font-bold flex items-center justify-center">
                    {t("discussProject")}
                  </Link>
                </MagneticButton>
                <MagneticButton className="w-full sm:w-auto">
                  <Link href="/projects" className="sketch-button w-full px-8 py-3.5 text-xl font-bold flex items-center justify-center">
                    {t("viewProjects")}
                  </Link>
                </MagneticButton>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.3 }} className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <GithubStatsWidget initialData={githubStats} />
              </div>
              {[
                { value: "15+", label: t("stats.projects") },
                { value: "3+", label: t("stats.experience") },
                { value: "10+", label: t("stats.clients") },
                { value: "50+", label: t("stats.apis") },
              ].map((stat) => (
                <div key={stat.label} className="glass-card p-6 text-center glow-accent odd:-rotate-1 even:rotate-1">
                  <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-slate-700 dark:text-slate-400 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatedSection>
        <section className="py-16 border-t-2 border-dashed border-black/30">
          <div className="max-w-6xl mx-auto px-6">
            <p className="paper-tag mx-auto px-4 py-1 text-center text-slate-600 text-sm uppercase tracking-widest font-medium mb-8">{tSection("coreTech")}</p>
            <div className="w-[100vw] relative left-1/2 -translate-x-1/2">
              <InfiniteMarquee speed={25}>
                {featuredSkills.map((skill) => (
                  <div key={skill.name} className="shrink-0">
                    <TiltCard>
                      <div className="flex items-center gap-3 px-6 py-3 glass-card text-slate-700 dark:text-slate-300 font-bold cursor-default group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors h-16">
                        <span className="text-2xl">{skill.icon}</span>
                        <span className="text-base tracking-wide">{skill.name}</span>
                      </div>
                    </TiltCard>
                  </div>
                ))}
              </InfiniteMarquee>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="paper-tag px-4 py-1 text-cyan-700 dark:text-cyan-400 text-sm font-medium uppercase tracking-widest mb-3">{tSection("portfolio")}</p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100">{tSection("featuredProjects")}</h2>
              </div>
              <Link href="/projects" className="hidden sm:block text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 text-sm font-medium transition-colors">{tSection("allProjects")}</Link>
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
        <section className="py-20 bg-transparent border-y-2 border-dashed border-black/30">
          <div className="max-w-4xl mx-auto px-6">
            <div className="mb-12 text-center">
              <p className="paper-tag mx-auto px-4 py-1 text-cyan-400 text-sm font-medium uppercase tracking-widest mb-3">{tSection("background")}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-100">{tSection("experienceTimeline")}</h2>
            </div>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />
              <div className="space-y-8">
                {experiences.map((exp, i) => (
                  <AnimatedSection key={i} delay={i * 0.1}>
                    <div className="relative pl-12">
                      <div className="absolute left-3.5 top-5 w-3 h-3 rounded-full bg-cyan-500 border-2 border-[#2d2d2d] -translate-x-1/2 z-10" />
                      <div className="glass-card p-5">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <h3 className="text-slate-900 dark:text-slate-100 font-semibold">{exp.title}</h3>
                          <span className="text-cyan-600/80 dark:text-cyan-400/70 font-mono text-xs">{exp.year}</span>
                        </div>
                        <p className="text-cyan-700 dark:text-cyan-300 text-sm">{exp.company}</p>
                        <p className="text-slate-700 dark:text-slate-300 text-sm mt-2 leading-relaxed">{exp.description}</p>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {exp.technologies.map((t: string) => (
                            <span key={t} className="text-xs text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded">{t}</span>
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
                <p className="paper-tag px-4 py-1 text-cyan-700 dark:text-cyan-400 text-sm font-medium uppercase tracking-widest mb-3">{tSection("insights")}</p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100">{tSection("latestArticles")}</h2>
              </div>
              <Link href="/blog" className="hidden sm:block text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 text-sm font-medium transition-colors">{tSection("readBlog")}</Link>
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
            <div className="glass-card p-12 border border-cyan-500/10 rotate-[0.4deg]">
              <div className="absolute left-1/2 top-[-14px] h-7 w-32 -translate-x-1/2 -rotate-2 border border-black/20 bg-[#e5e0d8]/80" />
              <p className="paper-tag mx-auto px-4 py-1 text-cyan-700 dark:text-cyan-400 text-sm font-medium uppercase tracking-widest mb-4">{t("cta.label")}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">{t("cta.title")}</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed">{t("cta.description")}</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/contact" className="sketch-button px-8 py-3 font-bold transition-colors duration-200">{t("cta.primary")}</Link>
                <Link href="/projects" className="sketch-button px-8 py-3 font-bold transition-all duration-200">{t("cta.secondary")}</Link>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>


    </div>
  );
}
