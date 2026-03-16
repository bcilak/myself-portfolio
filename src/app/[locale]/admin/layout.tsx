"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const locale = useLocale();
    const pathname = usePathname();

    // Eğer sayfa login sayfasıysa sidebar'ı gösterme
    if (pathname.includes("/login")) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
                <div className="h-full flex flex-col pt-5 pb-4">
                    <div className="flex items-center flex-shrink-0 px-6">
                        <span className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</span>
                    </div>
                    <div className="mt-8 flex-1 flex flex-col">
                        <nav className="px-4 flex-1 space-y-2">
                            <Link
                                href={`/${locale}/admin`}
                                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href={`/${locale}/admin/projects`}
                                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                            >
                                Projeler
                            </Link>
                            <Link
                                href={`/${locale}/admin/blog`}
                                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                            >
                                Blog Yazıları
                            </Link>
                            <Link
                                href={`/${locale}/admin/experience`}
                                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                            >
                                Deneyimler
                            </Link>
                        </nav>
                        <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
                            <button
                                onClick={() => signOut({ callbackUrl: `/${locale}` })}
                                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                            >
                                Çıkış Yap
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
