"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Globe } from "lucide-react";
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
        { href: "/case-studies", label: t("caseStudies") },
        { href: "/blog", label: t("blog") },
        { href: "/tech-stack", label: t("techStack") },
        { href: "/resume", label: t("resume") },
        { href: "/contact", label: t("contact") },
    ];

    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();

    // i18n
    const locale = useLocale();
    const router = useRouter();

    const toggleLocale = () => {
        router.replace(pathname, { locale: locale === "en" ? "tr" : "en" });
    };

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-white dark:bg-[#080b11]/90 backdrop-blur-md border-b border-black/5 dark:border-white/5 shadow-lg"
                : "bg-white/75 dark:bg-[#080b11]/70 backdrop-blur-sm border-b border-black/5 dark:border-white/5"
                }`}
        >
            <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="font-bold text-lg tracking-tight">
                    <span className="gradient-text">Barış</span>
                    <span className="text-slate-600 dark:text-slate-400">Çilak</span>
                </Link>

                {/* Desktop Links */}
                <ul className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => {
                        const isActive =
                            link.href === "/"
                                ? pathname === "/"
                                : pathname.startsWith(link.href);
                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${isActive
                                        ? "text-cyan-400 bg-cyan-400/10"
                                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <div className="flex items-center">
                    {/* Language Toggle (Desktop) */}
                    <button
                        onClick={toggleLocale}
                        className="hidden md:flex items-center gap-1.5 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors mr-1"
                        aria-label={tCommon("toggleLanguage")}
                    >
                        <Globe size={18} />
                        <span className="text-sm font-medium uppercase">{locale}</span>
                    </button>

                    {/* Theme Toggle (Desktop) */}
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="hidden md:flex p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors mr-2"
                        aria-label={tCommon("toggleTheme")}
                    >
                        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    {/* CTA */}
                    <Link
                        href="/contact"
                        className="hidden md:block px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-semibold transition-colors duration-200"
                    >
                        {t("hireMe")}
                    </Link>
                </div>

                {/* Hamburger */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    aria-label={tCommon("toggleMenu")}
                >
                    <span
                        className={`w-5 h-0.5 bg-slate-800 dark:bg-slate-300 transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
                    />
                    <span
                        className={`w-5 h-0.5 bg-slate-800 dark:bg-slate-300 transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
                    />
                    <span
                        className={`w-5 h-0.5 bg-slate-800 dark:bg-slate-300 transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                    />
                </button>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-slate-50 dark:bg-[#0f1420] border-b border-black/5 dark:border-white/5 overflow-hidden"
                    >
                        <ul className="px-6 py-4 flex flex-col gap-1">
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
                                            className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                                                ? "text-cyan-600 bg-cyan-600/10 dark:text-cyan-400 dark:bg-cyan-400/10"
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
                                    className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                                >
                                    <Globe size={18} />
                                    <span>{locale === "en" ? tCommon("switchToTurkish") : tCommon("switchToEnglish")}</span>
                                </button>
                            </li>
                            {/* Theme Toggle (Mobile) */}
                            <li>
                                <button
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                    className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                                >
                                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                                    <span>{theme === "dark" ? tCommon("lightMode") : tCommon("darkMode")}</span>
                                </button>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
