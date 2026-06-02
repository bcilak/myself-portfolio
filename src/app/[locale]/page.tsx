import { getDbProjects, getDbBlogPosts, getDbExperiences, getDbSkills } from "@/lib/dataFetching";
import HomeClient from "./HomeClient";
import type { Metadata } from "next";
import { createSeoMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";

  return createSeoMetadata({
    locale,
    path: "/",
    title: isTr
      ? "Barış Çilak | Bilgisayar Mühendisi, Full Stack & AI Developer"
      : "Barış Çilak | Computer Engineer, Full Stack & AI Developer",
    description: isTr
      ? "Web uygulamaları, backend servisleri, CBS/GIS dashboardları, otomasyon akışları ve yapay zeka destekli sistemler geliştiren Bilgisayar Mühendisi."
      : "Computer Engineer building web applications, backend services, GIS dashboards, automation workflows, and AI-powered systems.",
    keywords: [
      "Barış Çilak",
      "Bilgisayar Mühendisi",
      "Full Stack Developer",
      "AI Developer",
      "CBS GIS dashboard",
      "Backend API",
    ],
  });
}

// Server Component
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  const projects = await getDbProjects(locale);
  const featuredProjects = projects.filter(p => p.featured);

  const recentPosts = await getDbBlogPosts(locale);
  const postsToShow = recentPosts.slice(0, 3);

  const experiences = await getDbExperiences(locale);
  const skills = await getDbSkills(locale);
  
  const featuredSkills: any[] = [];
  skills.forEach((cat: any) => {
      cat.skills.forEach((skill: any) => {
          if (skill.featured) {
              featuredSkills.push(skill);
          }
      });
  });

  return (
    <HomeClient
      featuredProjects={featuredProjects}
      recentPosts={postsToShow}
      experiences={experiences}
      featuredSkills={featuredSkills}
    />
  );
}
