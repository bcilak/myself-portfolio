import { MetadataRoute } from "next";
import { getDbBlogPosts, getDbProjects } from "@/lib/dataFetching";
import { localizedUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

const staticPages = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.9 },
  { path: "/demo-lab", changeFrequency: "weekly", priority: 0.85 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.85 },
  { path: "/case-studies", changeFrequency: "monthly", priority: 0.75 },
  { path: "/tech-stack", changeFrequency: "monthly", priority: 0.65 },
  { path: "/resume", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.75 },
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const locales = ["tr", "en"] as const;

  const localizedStaticPages: MetadataRoute.Sitemap = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: localizedUrl(page.path, locale),
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: locale === "tr" ? page.priority : Math.max(page.priority - 0.05, 0.5),
    }))
  );

  const [trProjects, enProjects, trBlogPosts, enBlogPosts] = await Promise.all([
    getDbProjects("tr").catch(() => []),
    getDbProjects("en").catch(() => []),
    getDbBlogPosts("tr").catch(() => []),
    getDbBlogPosts("en").catch(() => []),
  ]);

  const projectPages: MetadataRoute.Sitemap = [
    ...trProjects.map((project) => ({
      url: localizedUrl(`/projects/${project.slug}`, "tr"),
      lastModified: new Date(project.createdAt || now),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...enProjects.map((project) => ({
      url: localizedUrl(`/projects/${project.slug}`, "en"),
      lastModified: new Date(project.createdAt || now),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  ];

  const blogPages: MetadataRoute.Sitemap = [
    ...trBlogPosts.map((post) => ({
      url: localizedUrl(`/blog/${post.slug}`, "tr"),
      lastModified: new Date(post.createdAt || now),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...enBlogPosts.map((post) => ({
      url: localizedUrl(`/blog/${post.slug}`, "en"),
      lastModified: new Date(post.createdAt || now),
      changeFrequency: "yearly" as const,
      priority: 0.55,
    })),
  ];

  return [...localizedStaticPages, ...projectPages, ...blogPages];
}
