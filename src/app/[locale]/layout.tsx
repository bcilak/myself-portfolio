import { ThemeProvider } from "@/components/ThemeProvider";
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
    default: "Barış Çilak — Backend & Automation Developer",
    template: "%s | Barış Çilak",
  },
  description:
    "Backend developer specializing in Python, FastAPI, Node.js, AI integrations, and automation systems. Building scalable and intelligent software solutions.",
  keywords: [
    "backend developer",
    "automation developer",
    "AI developer portfolio",
    "Python developer",
    "FastAPI",
    "OpenAI API",
    "Barış Çilak",
  ],
  authors: [{ name: "Barış Çilak" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Barış Çilak Portfolio",
    title: "Barış Çilak — Backend & Automation Developer",
    description:
      "Backend developer specializing in Python, FastAPI, AI integrations, and automation systems.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Barış Çilak — Backend & Automation Developer",
    description:
      "Backend developer specializing in Python, FastAPI, AI integrations, and automation systems.",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
