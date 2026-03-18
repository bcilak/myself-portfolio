import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";
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

export const metadata: Metadata = {
  title: {
    default: "Barış Çilak — Full Stack & AI Developer",
    template: "%s | Barış Çilak",
  },
  description:
    "AI destekli scalable web uygulamaları geliştiriyorum. Akıllı backend sistemleri, yapay zeka entegrasyonları ve otomasyon süreçlerinde uzmanım.",
  keywords: [
    "AI developer portfolio",
    "Full Stack developer",
    "Backend developer",
    "Python developer",
    "FastAPI",
    "OpenAI API",
    "Barış Çilak",
  ],
  authors: [{ name: "Barış Çilak" }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    alternateLocale: "en_US",
    siteName: "Barış Çilak Portfolio",
    title: "Barış Çilak — Full Stack & AI Developer",
    description:
      "AI destekli scalable web uygulamaları ve akıllı backend sistemleri geliştiriyorum.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Barış Çilak - Full Stack & AI Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Barış Çilak — Full Stack & AI Developer",
    description:
      "AI destekli scalable web uygulamaları ve akıllı backend sistemleri geliştiriyorum.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
            </NextIntlClientProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
