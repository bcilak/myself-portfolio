import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import BlogClientPage from "./BlogClient";
import { createSeoMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  return createSeoMetadata({
    locale,
    path: "/blog",
    title: t("metaTitle"),
    description: t("metaDescription"),
    keywords: ["backend geliştirme", "AI entegrasyonları", "otomasyon", "CBS", "Next.js", "FastAPI"],
  });
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  await params;
  return <BlogClientPage />;
}
