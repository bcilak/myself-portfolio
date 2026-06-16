"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();
  const t = useTranslations("Footer");

  if (pathname.includes("/admin")) return null;

  return (
    <footer className="border-t-2 border-dashed border-black bg-transparent">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="paper-card p-6 -rotate-1">
            <h3 className="font-bold text-2xl mb-2">
              <span className="gradient-text">Barış</span>
              <span className="text-slate-600 dark:text-slate-400"> Çilak</span>
            </h3>
            <p className="text-slate-500 dark:text-slate-300 text-base leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Navigation */}
          <div className="paper-card p-6 rotate-1">
            <h4 className="paper-tag px-3 py-1 text-slate-700 dark:text-slate-300 font-semibold mb-4 text-sm uppercase tracking-wider">
              {t("navigation")}
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/projects", label: t("links.projects") },
                { href: "/demo-lab", label: t("links.demoLab") },
                { href: "/blog", label: t("links.blog") },
                { href: "/case-studies", label: t("links.caseStudies") },
                { href: "/tech-stack", label: t("links.techStack") },
                { href: "/resume", label: t("links.resume") },
                { href: "/contact", label: t("links.contact") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-500 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 text-base transition-colors hover:line-through"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="paper-card p-6 -rotate-[0.5deg]">
            <h4 className="paper-tag px-3 py-1 text-slate-700 dark:text-slate-300 font-semibold mb-4 text-sm uppercase tracking-wider">
              {t("connect")}
            </h4>
            <ul className="space-y-2">
              {[
                {
                  href: "https://github.com/bariscilak",
                  label: "GitHub",
                  icon: "🐙",
                },
                {
                  href: "https://linkedin.com/in/bariscilak",
                  label: "LinkedIn",
                  icon: "💼",
                },
                {
                  href: "mailto:bariscilak@email.com",
                  label: "Email",
                  icon: "✉️",
                },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-center gap-2 text-slate-500 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 text-base transition-colors hover:line-through"
                  >
                    <span>{link.icon}</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/contact" className="sketch-button inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold transition-all w-full md:w-auto">
                {t("links.contact") || "Let's Talk"}
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-dashed border-black mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-slate-600 dark:text-slate-300 text-sm">
            © {year} Barış Çilak. {t("rights")}
          </p>
          <p className="text-slate-700 dark:text-slate-400 text-xs">
            {t("builtWith")}
          </p>
        </div>
      </div>
    </footer>
  );
}
