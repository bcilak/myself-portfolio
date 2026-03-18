"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();
  const t = useTranslations("Footer");

  if (pathname.includes("/admin")) return null;

  return (
    <footer className="border-t border-black/5 dark:border-white/5 bg-white dark:bg-[#080b11]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg mb-2">
              <span className="gradient-text">Barış</span>
              <span className="text-slate-600 dark:text-slate-400">Çilak</span>
            </h3>
            <p className="text-slate-500 dark:text-slate-300 text-sm leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-slate-700 dark:text-slate-300 font-semibold mb-3 text-sm uppercase tracking-wider">
              {t("navigation")}
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/projects", label: t("links.projects") },
                { href: "/blog", label: t("links.blog") },
                { href: "/case-studies", label: t("links.caseStudies") },
                { href: "/tech-stack", label: t("links.techStack") },
                { href: "/resume", label: t("links.resume") },
                { href: "/contact", label: t("links.contact") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-500 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-slate-700 dark:text-slate-300 font-semibold mb-3 text-sm uppercase tracking-wider">
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
                    className="flex items-center gap-2 text-slate-500 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 text-sm transition-colors"
                  >
                    <span>{link.icon}</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/contact" className="inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white text-sm font-bold rounded-lg shadow-md hover:shadow-cyan-500/25 transition-all w-full md:w-auto">
                {t("links.contact") || "Let's Talk"}
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-black/5 dark:border-white/5 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
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
