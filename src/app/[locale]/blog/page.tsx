import { useLocale } from "next-intl";
﻿import type { Metadata } from "next";
import BlogClientPage from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical articles by Baris Cilak on backend development, AI integrations, automation, and software architecture.",
};

export default function BlogPage() {
  return <BlogClientPage />;
}