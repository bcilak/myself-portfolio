"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Globe, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

export default function Navbar() {
    const t = useTranslations("Navbar");
    const tCommon = useTranslations("Common");

    const navLinks = [
        { href: "/", label: t("home") },
        { href: "/about", label: t("about") },
        { href: "/projects", label: t("projects") },
        { href: "/demo-lab", label: t("demoLab") },
        { href: "/case-studies", label: t("caseStudies") },
        { href: "/blog", label: t("blog") },
        { href: "/tech-stack", label: t("techStack") },
        { href: "/resume", label: t("resume") },
        { href: "/contact", label: t("contact") },
    ];

    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { setTheme } = useTheme();

    // i18n
    const locale = useLocale();
    const router = useRouter();

    const toggleLocale = () => {
        router.replace(pathname, { locale: locale === "en" ? "tr" : "en" });
    };

    useEffect(() => {
        setTheme("light");
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [setTheme]);

    if (pathname.includes("/admin")) return null;

    return (
        <header
            className={`fixed top-3 left-0 right-0 z-50 px-3 transition-all duration-300 ${scrolled
                ? "translate-y-0"
                : ""
                }`}
        >
            <nav className="paper-card max-w-[1440px] mx-auto px-4 sm:px-6 min-h-16 flex items-center justify-between gap-4 -rotate-[0.35deg]">
                {/* Logo */}
                <Link href="/" className="shrink-0 font-bold text-xl tracking-tight rotate-[0.5deg]">
                    <span className="gradient-text">Barış</span>
                    <span className="text-slate-600 dark:text-slate-400"> Çilak</span>
                </Link>

                {/* Desktop Links */}
                <ul className="hidden lg:flex flex-1 min-w-0 items-center justify-center gap-0.5 xl:gap-1">
                    {navLinks.map((link) => {
                        const isActive =
                            link.href === "/"
                                ? pathname === "/"
                                : pathname.startsWith(link.href);
                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`block whitespace-nowrap px-2.5 xl:px-3 py-2 text-sm xl:text-base font-medium leading-none transition-all duration-100 hover:-rotate-1 ${isActive
                                        ? "paper-tag"
                                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <div className="flex shrink-0 items-center">
                    {/* Language Toggle (Desktop) */}
                    <button
                        onClick={toggleLocale}
                        className="hidden lg:flex items-center gap-1.5 p-2 text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors mr-1"
                        aria-label={tCommon("toggleLanguage")}
                    >
                        <Globe size={18} />
                        <span className="text-sm font-medium uppercase">{locale}</span>
                    </button>

                    {/* CTA */}
                    <Link
                        href="/contact"
                        className="hidden lg:block whitespace-nowrap px-5 py-2.5 sketch-button text-sm font-semibold leading-none"
                    >
                        {t("hireMe")}
                    </Link>
                </div>

                {/* Hamburger */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="lg:hidden inline-flex items-center justify-center p-2 sketch-button"
                    aria-label={tCommon("toggleMenu")}
                >
                    {menuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden overflow-hidden"
                    >
                        <ul className="paper-card mx-auto mt-3 max-w-[1440px] px-6 py-4 flex flex-col gap-2 rotate-[0.25deg]">
                            {navLinks.map((link) => {
                                const isActive =
                                    link.href === "/"
                                        ? pathname === "/"
                                        : pathname.startsWith(link.href);
                                return (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            onClick={() => setMenuOpen(false)}
                                            className={`block px-3 py-2 text-base font-medium transition-colors ${isActive
                                                ? "paper-tag"
                                                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                );
                            })}
                            {/* Language Toggle (Mobile) */}
                            <li className="pt-2 mt-2 border-t border-black/5 dark:border-white/5">
                                <button
                                    onClick={() => {
                                        toggleLocale();
                                        setMenuOpen(false);
                                    }}
                                    className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                                >
                                    <Globe size={18} />
                                    <span>{locale === "en" ? tCommon("switchToTurkish") : tCommon("switchToEnglish")}</span>
                                </button>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
