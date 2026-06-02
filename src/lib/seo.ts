import type { Metadata } from "next";

export const siteConfig = {
  name: "Barış Çilak",
  alternateName: "Baris Cilak",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://bariscilak.dev",
  defaultLocale: "tr",
  locales: ["tr", "en"],
  image: "/og-image.png",
  sameAs: [
    "https://github.com/bcilak",
    "https://linkedin.com/in/bariscilak",
  ],
};

type Locale = "tr" | "en" | string;

export function getSiteUrl() {
  return siteConfig.url.replace(/\/$/, "");
}

export function localizePath(path: string, locale: Locale) {
  const normalizedPath = path === "/" ? "" : `/${path.replace(/^\/+/, "").replace(/\/$/, "")}`;
  if (locale === "en") {
    return `/en${normalizedPath}`;
  }
  return normalizedPath || "/";
}

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath === "/" ? "" : normalizedPath}`;
}

export function localizedUrl(path: string, locale: Locale) {
  return absoluteUrl(localizePath(path, locale));
}

export function languageAlternates(path: string) {
  return {
    tr: localizedUrl(path, "tr"),
    en: localizedUrl(path, "en"),
    "x-default": localizedUrl(path, "tr"),
  };
}

export function createSeoMetadata({
  locale,
  path,
  title,
  description,
  keywords,
  image = siteConfig.image,
  type = "website",
  publishedTime,
  tags,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
}): Metadata {
  const url = localizedUrl(path, locale);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      type,
      url,
      siteName: siteConfig.name,
      locale: locale === "en" ? "en_US" : "tr_TR",
      alternateLocale: locale === "en" ? "tr_TR" : "en_US",
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === "article" ? { publishedTime, tags } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function baseStructuredData() {
  const url = getSiteUrl();

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${url}/#website`,
      name: siteConfig.name,
      alternateName: siteConfig.alternateName,
      url,
      inLanguage: ["tr-TR", "en-US"],
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${url}/#person`,
      name: siteConfig.name,
      alternateName: siteConfig.alternateName,
      url,
      jobTitle: ["Bilgisayar Mühendisi", "Computer Engineer", "Full Stack / AI Developer"],
      knowsAbout: [
        "Full Stack Web Development",
        "Backend APIs",
        "GIS Dashboards",
        "Automation Workflows",
        "AI Integrations",
        "Next.js",
        "FastAPI",
      ],
      sameAs: siteConfig.sameAs,
    },
  ];
}

export function breadcrumbStructuredData(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
