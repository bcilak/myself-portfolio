import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";
import Script from "next/script";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import dbConnect from "@/lib/mongoose";
import Settings from "@/models/Settings";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  await dbConnect();
  
  let settings = await Settings.findOne({}).lean() as any;
  if (!settings) {
    settings = {
      titleTR: "Barış Çilak — Full Stack & AI Developer",
      titleEN: "Barış Çilak — Full Stack & AI Developer",
      descriptionTR: "AI destekli scalable web uygulamaları geliştiriyorum.",
      descriptionEN: "I build scalable AI-powered web applications.",
      keywords: "AI developer, Full Stack",
      ogImageUrl: "/og-image.png",
    };
  }

  const isTr = locale === "tr";
  const title = isTr ? settings.titleTR : settings.titleEN;
  const description = isTr ? settings.descriptionTR : settings.descriptionEN;

  return {
    title: {
      default: title,
      template: `%s | ${title.split("—")[0]?.trim() || "Barış Çilak"}`,
    },
    description: description,
    keywords: settings.keywords.split(",").map((k: string) => k.trim()),
    authors: [{ name: "Barış Çilak" }],
    openGraph: {
      type: "website",
      locale: isTr ? "tr_TR" : "en_US",
      alternateLocale: isTr ? "en_US" : "tr_TR",
      siteName: title,
      title: title,
      description: description,
      images: [
        {
          url: settings.ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [settings.ogImageUrl],
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

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script defer data-domain="bariscilak.dev" src="https://plausible.io/js/script.js"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <NextIntlClientProvider messages={messages}>
              <Navbar />
              <main className="min-h-screen">{children}</main>
              <Footer />
              <Script 
                src="https://chatbot.altikodtech.com.tr/embed.js" 
                data-api-base="https://chatbot.altikodtech.com.tr" 
                data-workflow="bariscilak_dev_mn2wpy15" 
                data-title="AsistChat" 
                data-position="right" 
                data-primary="#2d8cff" 
                data-theme="light" 
                data-accent="#2D8CFF" 
                data-radius="pill" 
                data-density="normal" 
                data-greeting="Merhaba Ben Barış'ın Kişisel Yapay Zeka Asistanıyım"
                strategy="afterInteractive"
              />
            </NextIntlClientProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
