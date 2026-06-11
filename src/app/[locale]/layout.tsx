import { ThemeProvider } from "@/components/ThemeProvider";
import Script from "next/script";
import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { baseStructuredData, getSiteUrl, languageAlternates, siteConfig } from "@/lib/seo";

import dbConnect from "@/lib/mongoose";
import Settings from "@/models/Settings";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  await dbConnect();

  let settings = await Settings.findOne({}).lean() as any;
  if (!settings) {
    settings = {
      titleTR: "Barış Çilak — Bilgisayar Mühendisi, Full Stack & AI Developer",
      titleEN: "Barış Çilak — Computer Engineer, Full Stack & AI Developer",
      descriptionTR:
        "Web uygulamaları, backend servisleri, CBS/GIS dashboardları, otomasyon akışları ve yapay zeka destekli sistemler geliştiriyorum.",
      descriptionEN:
        "I build web applications, backend services, GIS dashboards, automation workflows, and AI-powered systems.",
      keywords:
        "Barış Çilak, Bilgisayar Mühendisi, Full Stack Developer, AI Developer, CBS, GIS, Backend API, Otomasyon",
      ogImageUrl: siteConfig.image,
    };
  }

  const isTr = locale === "tr";
  const title = isTr ? settings.titleTR : settings.titleEN;
  const description = isTr ? settings.descriptionTR : settings.descriptionEN;
  const siteUrl = getSiteUrl();
  const ogImageUrl = settings.ogImageUrl || siteConfig.image;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    keywords: settings.keywords.split(",").map((k: string) => k.trim()),
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: {
      canonical: locale === "en" ? `${siteUrl}/en` : siteUrl,
      languages: languageAlternates("/"),
    },
    verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : undefined,
    openGraph: {
      type: "website",
      locale: isTr ? "tr_TR" : "en_US",
      alternateLocale: isTr ? "en_US" : "tr_TR",
      siteName: siteConfig.name,
      url: locale === "en" ? `${siteUrl}/en` : siteUrl,
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const structuredData = baseStructuredData();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script defer data-domain="bariscilak.dev" src="https://plausible.io/js/script.js"></script>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <Script 
              src="https://chatbot.altikodtech.com.tr/static/widget.js" 
              data-bot-id="1"
              strategy="lazyOnload"
            />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
