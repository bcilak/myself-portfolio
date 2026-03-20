import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import BlogClientPage from "./BlogClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  await params;
  return <BlogClientPage />;
}