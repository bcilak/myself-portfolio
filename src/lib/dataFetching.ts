import dbConnect from "./mongoose";
import Project from "@/models/Project";
import Blog from "@/models/Blog";
import Experience from "@/models/Experience";
import Education from "@/models/Education";
import Skill from "@/models/Skill";
import CaseStudy from "@/models/CaseStudy";
import { getProjects as getStaticProjects } from "@/data/projects";
import { getBlogPosts as getStaticBlogPosts } from "@/data/blog";
import { getCaseStudies as getStaticCaseStudies } from "@/data/case-studies";

const projectCardFields = {
    slug: 1,
    technologies: 1,
    githubUrl: 1,
    demoUrl: 1,
    featured: 1,
    createdAt: 1,
    views: 1,
    likes: 1,
    title: 1,
    shortDescription: 1,
    problem: 1,
    solution: 1,
};

const projectDetailFields = {
    ...projectCardFields,
    description: 1,
    architecture: 1,
    challenges: 1,
    lessons: 1,
    screenshots: 1,
};

const blogCardFields = {
    slug: 1,
    tags: 1,
    category: 1,
    readTime: 1,
    createdAt: 1,
    views: 1,
    likes: 1,
    title: 1,
    excerpt: 1,
};

const blogDetailFields = {
    ...blogCardFields,
    content: 1,
};

function localized<T = string>(value: any, locale: string, fallback: T = "" as T): T | string {
    if (typeof value === "string") return value;
    return value?.[locale] || value?.en || fallback;
}

function localizedList(value: any, locale: string) {
    const localizedValue = value?.[locale] || value?.en || [];
    return Array.isArray(localizedValue) ? localizedValue : [];
}

function mapProject(p: any, locale: string, includeDetail = true) {
    return {
        id: p._id?.toString() || p.id,
        slug: p.slug,
        title: localized(p.title, locale),
        shortDescription: localized(p.shortDescription, locale),
        description: includeDetail ? localized(p.description, locale) : "",
        technologies: p.technologies || [],
        githubUrl: p.githubUrl || "",
        demoUrl: p.demoUrl || "",
        featured: p.featured || false,
        problem: localized(p.problem, locale),
        solution: localized(p.solution, locale),
        architecture: includeDetail ? localized(p.architecture, locale) : "",
        challenges: includeDetail ? localized(p.challenges, locale) : "",
        lessons: includeDetail ? localized(p.lessons, locale) : "",
        screenshots: includeDetail ? p.screenshots || [] : [],
        createdAt: p.createdAt,
        views: p.views || 0,
        likes: p.likes || 0,
    };
}

function mapBlogPost(b: any, locale: string, includeContent = true) {
    return {
        id: b._id?.toString() || b.id,
        slug: b.slug,
        title: localized(b.title, locale),
        excerpt: localized(b.excerpt, locale),
        content: includeContent ? localized(b.content, locale) : "",
        tags: b.tags || [],
        category: b.category || "",
        readTime: b.readTime || 5,
        createdAt: b.createdAt,
        views: b.views || 0,
        likes: b.likes || 0,
    };
}

export async function getDbProjects(locale: string) {
    await dbConnect();
    const dbProjects = await Project.find({}, projectDetailFields).sort({ createdAt: -1 }).lean();

    const projects = dbProjects.map((p: any) => mapProject(p, locale));
    const projectSlugs = new Set(projects.map((project) => project.slug));
    const missingStaticProjects = getStaticProjects(locale)
        .filter((project) => !projectSlugs.has(project.slug))
        .map((project) => ({
            ...project,
            views: project.views || 0,
            likes: project.likes || 0,
        }));

    return [...projects, ...missingStaticProjects];
}

export async function getHomeProjects(locale: string) {
    await dbConnect();
    const dbProjects = await Project.find({ featured: true }, projectCardFields)
        .sort({ createdAt: -1 })
        .limit(6)
        .lean();

    const projects = dbProjects.map((p: any) => mapProject(p, locale, false));
    const projectSlugs = new Set(projects.map((project) => project.slug));
    const missingStaticProjects = getStaticProjects(locale)
        .filter((project) => project.featured && !projectSlugs.has(project.slug))
        .slice(0, Math.max(0, 6 - projects.length))
        .map((project) => ({
            ...project,
            views: project.views || 0,
            likes: project.likes || 0,
        }));

    return [...projects, ...missingStaticProjects];
}

export async function getProjectBySlug(locale: string, slug: string) {
    await dbConnect();
    const dbProject = await Project.findOne({ slug }, projectDetailFields).lean();

    if (dbProject) {
        return mapProject(dbProject, locale);
    }

    const staticProject = getStaticProjects(locale).find((project) => project.slug === slug);
    if (!staticProject) return null;

    return {
        ...staticProject,
        views: staticProject.views || 0,
        likes: staticProject.likes || 0,
    };
}

export async function getDbBlogPosts(locale: string) {
    await dbConnect();
    const dbBlogs = await Blog.find({ status: "published" }, blogDetailFields).sort({ createdAt: -1 }).lean();

    return dbBlogs.map((b: any) => mapBlogPost(b, locale));
}

export async function getHomeBlogPosts(locale: string) {
    await dbConnect();
    const dbBlogs = await Blog.find({ status: "published" }, blogCardFields)
        .sort({ createdAt: -1 })
        .limit(3)
        .lean();

    return dbBlogs.map((b: any) => mapBlogPost(b, locale, false));
}

export async function getBlogPostBySlug(locale: string, slug: string) {
    await dbConnect();
    const dbBlog = await Blog.findOne({ slug, status: "published" }, blogDetailFields).lean();

    if (dbBlog) {
        return mapBlogPost(dbBlog, locale);
    }

    const staticPost = getStaticBlogPosts(locale).find((post) => post.slug === slug);
    if (!staticPost) return null;

    return {
        ...staticPost,
        views: staticPost.views || 0,
        likes: staticPost.likes || 0,
    };
}

export async function getDbExperiences(locale: string) {
    await dbConnect();
    const dbExperiences = await Experience.find(
        {},
        { year: 1, technologies: 1, title: 1, company: 1, description: 1 }
    )
        .sort({ year: -1 })
        .lean();

    return dbExperiences.map((e: any) => ({
        id: e._id.toString(),
        year: e.year,
        title: localized(e.title, locale),
        company: localized(e.company, locale),
        description: localized(e.description, locale),
        technologies: e.technologies || [],
    }));
}

export async function getDbEducations(locale: string) {
    await dbConnect();
    const dbEducations = await Education.find({}, { year: 1, degree: 1, school: 1, description: 1 })
        .sort({ year: -1 })
        .lean();

    return dbEducations.map((e: any) => ({
        id: e._id.toString(),
        year: e.year,
        degree: localized(e.degree, locale),
        school: localized(e.school, locale),
        description: localized(e.description, locale),
    }));
}

export async function getDbCaseStudies(locale: string) {
    await dbConnect();
    const dbCaseStudies = await CaseStudy.find(
        {},
        {
            slug: 1,
            icon: 1,
            title: 1,
            subtitle: 1,
            category: 1,
            problem: 1,
            approach: 1,
            architecture: 1,
            impact: 1,
            challenges: 1,
            lessons: 1,
            technologies: 1,
        }
    )
        .sort({ order: 1, createdAt: -1 })
        .lean();

    const caseStudies = dbCaseStudies.map((cs: any) => ({
        slug: cs.slug,
        icon: cs.icon,
        title: localized(cs.title, locale),
        subtitle: localized(cs.subtitle, locale),
        category: localized(cs.category, locale),
        problem: localized(cs.problem, locale),
        approach: localized(cs.approach, locale),
        architecture: localized(cs.architecture, locale),
        impact: localized(cs.impact, locale),
        challenges: localizedList(cs.challenges, locale),
        lessons: localizedList(cs.lessons, locale),
        technologies: cs.technologies || [],
    }));

    const caseStudySlugs = new Set(caseStudies.map((caseStudy) => caseStudy.slug));
    const missingStaticCaseStudies = getStaticCaseStudies(locale).filter(
        (caseStudy) => !caseStudySlugs.has(caseStudy.slug)
    );

    return [...caseStudies, ...missingStaticCaseStudies];
}

export async function getDbSkills(locale: string) {
    await dbConnect();
    const dbSkills = await Skill.find(
        {},
        { name: 1, icon: 1, level: 1, category: 1, categoryIcon: 1, featured: 1 }
    )
        .sort({ order: 1, createdAt: -1 })
        .lean();

    const categoriesMap = new Map();

    dbSkills.forEach((skill: any) => {
        const catName = localized(skill.category, locale);
        if (!categoriesMap.has(catName)) {
            categoriesMap.set(catName, {
                name: catName,
                icon: skill.categoryIcon || "",
                skills: [],
            });
        }
        categoriesMap.get(catName).skills.push({
            name: skill.name,
            icon: skill.icon,
            level: skill.level,
            featured: skill.featured || false,
        });
    });

    return Array.from(categoriesMap.values());
}
