import { MetadataRoute } from "next";
import { getDbProjects } from "@/lib/dataFetching";
import { getDbBlogPosts } from "@/lib/dataFetching";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://bariscilak.dev";

    const staticPages: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
        { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
        { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
        { url: `${baseUrl}/case-studies`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/tech-stack`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
        { url: `${baseUrl}/resume`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
        // Turkish equivalents
        { url: `${baseUrl}/tr`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
        { url: `${baseUrl}/tr/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/tr/projects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
        { url: `${baseUrl}/tr/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
        { url: `${baseUrl}/tr/resume`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
        { url: `${baseUrl}/tr/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    ];

    // Fetch projects and blog posts from DB in parallel
    const [projects, blogPosts] = await Promise.all([
        getDbProjects("en").catch(() => []),
        getDbBlogPosts("en").catch(() => []),
    ]);

    const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
        url: `${baseUrl}/projects/${p.slug}`,
        lastModified: new Date(p.createdAt),
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    const blogPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
        url: `${baseUrl}/blog/${p.slug}`,
        lastModified: new Date(p.createdAt),
        changeFrequency: "yearly",
        priority: 0.6,
    }));

    return [...staticPages, ...projectPages, ...blogPages];
}
