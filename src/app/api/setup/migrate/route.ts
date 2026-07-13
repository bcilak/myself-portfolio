import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Project from "@/models/Project";
import Blog from "@/models/Blog";
import Experience from "@/models/Experience";
import CaseStudy from "@/models/CaseStudy";

import { projectsEn, projectsTr } from "@/data/projects";
import { blogPostsEn, blogPostsTr } from "@/data/blog";
import { experiencesEn, experiencesTr } from "@/data/experience";
import { getCaseStudies } from "@/data/case-studies";
import { validateSetupRequest } from "@/lib/setupGuard";

export async function GET(req: Request) {
    const guardResponse = validateSetupRequest(req);
    if (guardResponse) return guardResponse;

    try {
        await dbConnect();

        // 1. PROJELERİ TAŞI
        const projectsTrMap = new Map(projectsTr.map((p) => [p.slug, p]));
        const mergedProjects = projectsEn.map((enProj) => {
            const trProj = projectsTrMap.get(enProj.slug) || enProj;
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

        for (const project of mergedProjects) {
            await Project.updateOne(
                { slug: project.slug },
                { $set: project },
                { upsert: true }
            );
        }

        // 2. BLOG YAZILARINI TAŞI
        const blogCount = await Blog.countDocuments();
        if (blogCount === 0) {
            const blogPostsTrMap = new Map(blogPostsTr.map((b) => [b.slug, b]));
            const mergedBlogs = blogPostsEn.map((enBlog) => {
                const trBlog = blogPostsTrMap.get(enBlog.slug) || enBlog;
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

        // 4. ORNEK OLAYLARI TASIMA / GUNCELLEME
        const englishStudies = getCaseStudies("en");
        const turkishStudies = getCaseStudies("tr");
        const turkishStudiesMap = new Map(turkishStudies.map((s) => [s.slug, s]));

        for (let i = 0; i < englishStudies.length; i++) {
            const en = englishStudies[i];
            const tr = turkishStudiesMap.get(en.slug) || en;

            await CaseStudy.updateOne(
                { slug: en.slug },
                {
                    $set: {
                        slug: en.slug,
                        icon: en.icon,
                        title: { en: en.title, tr: tr.title },
                        subtitle: { en: en.subtitle, tr: tr.subtitle },
                        category: { en: en.category, tr: tr.category },
                        problem: { en: en.problem, tr: tr.problem },
                        approach: { en: en.approach, tr: tr.approach },
                        architecture: { en: en.architecture, tr: tr.architecture },
                        impact: { en: en.impact, tr: tr.impact },
                        challenges: { en: en.challenges, tr: tr.challenges },
                        lessons: { en: en.lessons, tr: tr.lessons },
                        technologies: en.technologies,
                        order: i,
                    },
                },
                { upsert: true }
            );
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
