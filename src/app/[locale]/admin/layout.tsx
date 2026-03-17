"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const locale = useLocale();
    const t = useTranslations("Admin");
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Eğer sayfa login sayfasıysa sidebar'ı gösterme
    if (pathname.includes("/login")) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900">
            {/* Mobile Sidebar Toggle */}
            <div className="md:hidden flex items-center justify-between bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
                <span className="text-xl font-bold text-gray-900 dark:text-white">{t("title")}</span>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`w-full md:w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 md:block ${isSidebarOpen ? "block" : "hidden"}`}>
                <div className="h-full flex flex-col pt-5 pb-4">
                    <div className="hidden md:flex items-center flex-shrink-0 px-6">
                        <span className="text-xl font-bold text-gray-900 dark:text-white">{t("title")}</span>
                    </div>
                    <div className="mt-4 md:mt-8 flex-1 flex flex-col">
                        <nav className="px-4 flex-1 space-y-2">
                            <Link
                                href={`/${locale}/admin`}
                                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                            >
                                {t("dashboard")}
                            </Link>
                            <Link
                                href={`/${locale}/admin/projects`}
                                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                            >
                                {t("projects")}
                            </Link>
                            <Link
                                href={`/${locale}/admin/blog`}
                                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                            >
                                {t("blogPosts")}
                            </Link>
                            <Link
                                href={`/${locale}/admin/experience`}
                                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                            >
                                {t("experiences")}
                            </Link>
                        </nav>
                        <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
                            <button
                                onClick={() => signOut({ callbackUrl: `/${locale}` })}
                                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                            >
                                {t("signOut")}
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-4 sm:p-6 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
