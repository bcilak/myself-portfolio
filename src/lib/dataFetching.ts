import dbConnect from "./mongoose";
import Project from "@/models/Project";
import Blog from "@/models/Blog";
import Experience from "@/models/Experience";

// Projects Verilerini Çek
export async function getDbProjects(locale: string) {
    await dbConnect();
    const dbProjects = await Project.find({}).sort({ createdAt: -1 }).lean();

    return dbProjects.map((p: any) => ({
        id: p._id.toString(),
        slug: p.slug,
        title: p.title[locale] || p.title.en,
        shortDescription: p.shortDescription?.[locale] || p.shortDescription?.en || "",
        description: p.description?.[locale] || p.description?.en || "",
        technologies: p.technologies || [],
        githubUrl: p.githubUrl || "",
        demoUrl: p.demoUrl || "",
        featured: p.featured || false,
        problem: p.problem?.[locale] || p.problem?.en || "",
        solution: p.solution?.[locale] || p.solution?.en || "",
        architecture: p.architecture?.[locale] || p.architecture?.en || "",
        challenges: p.challenges?.[locale] || p.challenges?.en || "",
        lessons: p.lessons?.[locale] || p.lessons?.en || "",
        screenshots: p.screenshots || [],
        createdAt: p.createdAt,
        views: p.views || 0,
        likes: p.likes || 0,
    }));
}

// Blog Verilerini Çek
export async function getDbBlogPosts(locale: string) {
    await dbConnect();
    const dbBlogs = await Blog.find({}).sort({ createdAt: -1 }).lean();

    return dbBlogs.map((b: any) => ({
        id: b._id.toString(),
        slug: b.slug,
        title: b.title[locale] || b.title.en,
        excerpt: b.excerpt?.[locale] || b.excerpt?.en || "",
        content: b.content?.[locale] || b.content?.en || "",
        tags: b.tags || [],
        category: b.category || "",
        readTime: b.readTime || 5,
        createdAt: b.createdAt,
        views: b.views || 0,
        likes: b.likes || 0,
    }));
}

// Experience Verilerini Çek
export async function getDbExperiences(locale: string) {
    await dbConnect();
    const dbExperiences = await Experience.find({}).sort({ year: -1 }).lean();

    return dbExperiences.map((e: any) => ({
        id: e._id.toString(),
        year: e.year,
        title: e.title[locale] || e.title.en,
        company: e.company[locale] || e.company.en,
        description: e.description?.[locale] || e.description?.en || "",
        technologies: e.technologies || [],
    }));
}
