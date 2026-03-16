import { getDbProjects, getDbBlogPosts, getDbExperiences } from "@/lib/dataFetching";
import HomeClient from "./HomeClient";

// Server Component
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  const projects = await getDbProjects(locale);
  const featuredProjects = projects.filter(p => p.featured);

  const recentPosts = await getDbBlogPosts(locale);
  const postsToShow = recentPosts.slice(0, 3);

  const experiences = await getDbExperiences(locale);

  return (
    <HomeClient
      featuredProjects={featuredProjects}
      recentPosts={postsToShow}
      experiences={experiences}
    />
  );
}
