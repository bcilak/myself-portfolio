import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Project from "@/models/Project";
import Blog from "@/models/Blog";
import Experience from "@/models/Experience";

import { projectsEn, projectsTr } from "@/data/projects";
import { blogPostsEn, blogPostsTr } from "@/data/blog";
import { experiencesEn, experiencesTr } from "@/data/experience";

export async function GET() {
    try {
        await dbConnect();

        // 1. PROJELERİ TAŞI
        const projectCount = await Project.countDocuments();
        if (projectCount === 0) {
            const mergedProjects = projectsEn.map((enProj) => {
                const trProj = projectsTr.find((p) => p.slug === enProj.slug) || enProj;
                return {
                    slug: enProj.slug,
                    technologies: enProj.technologies,
                    githubUrl: enProj.githubUrl,
                    demoUrl: enProj.demoUrl,
                    featured: enProj.featured,
                    screenshots: enProj.screenshots,
                    createdAt: enProj.createdAt,
                    title: { en: enProj.title, tr: trProj.title },
                    shortDescription: { en: enProj.shortDescription, tr: trProj.shortDescription },
                    description: { en: enProj.description, tr: trProj.description },
                    problem: { en: enProj.problem, tr: trProj.problem },
                    solution: { en: enProj.solution, tr: trProj.solution },
                    architecture: { en: enProj.architecture, tr: trProj.architecture },
                    challenges: { en: enProj.challenges, tr: trProj.challenges },
                    lessons: { en: enProj.lessons, tr: trProj.lessons },
                };
            });
            await Project.insertMany(mergedProjects);
        }

        // 2. BLOG YAZILARINI TAŞI
        const blogCount = await Blog.countDocuments();
        if (blogCount === 0) {
            const mergedBlogs = blogPostsEn.map((enBlog) => {
                const trBlog = blogPostsTr.find((b) => b.slug === enBlog.slug) || enBlog;
                return {
                    slug: enBlog.slug,
                    tags: enBlog.tags,
                    category: enBlog.category,
                    readTime: enBlog.readTime,
                    createdAt: enBlog.createdAt,
                    title: { en: enBlog.title, tr: trBlog.title },
                    excerpt: { en: enBlog.excerpt, tr: trBlog.excerpt },
                    content: { en: enBlog.content, tr: trBlog.content },
                };
            });
            await Blog.insertMany(mergedBlogs);
        }

        // 3. DENEYİMLERİ TAŞI
        const expCount = await Experience.countDocuments();
        if (expCount === 0) {
            // index bazlı eşleştirme yapalım çünkü slug yok
            const mergedExperiences = experiencesEn.map((enExp, index) => {
                const trExp = experiencesTr[index] || enExp;
                return {
                    year: enExp.year,
                    technologies: enExp.technologies,
                    title: { en: enExp.title, tr: trExp.title },
                    company: { en: enExp.company, tr: trExp.company },
                    description: { en: enExp.description, tr: trExp.description },
                };
            });
            await Experience.insertMany(mergedExperiences);
        }

        return NextResponse.json(
            {
                message: "Mükemmel! Tüm veriler başarıyla eski statik dosyalardan MongoDB veritabanına aktarıldı."
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Migration Error:", error);
        return NextResponse.json(
            { message: "Veri aktarımı sırasında bir hata oluştu", error: (error as Error).message },
            { status: 500 }
        );
    }
}
