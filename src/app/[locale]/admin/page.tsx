import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongoose";
import Project from "@/models/Project";
import Blog from "@/models/Blog";
import Experience from "@/models/Experience";
import Education from "@/models/Education";
import Message from "@/models/Message";
import AnalyticsCharts from "./components/AnalyticsCharts";
import { getTranslations } from "next-intl/server";

export default async function AdminDashboard({ params }: { params: Promise<{ locale: string }> }) {
    const session = await getServerSession(authOptions);
    const { locale } = await params;

    if (!session) {
        redirect(`/${locale}/admin/login`);
    }

    const t = await getTranslations({ locale, namespace: "Admin" });

    await dbConnect();

    const [
        projectCount,
        blogCount,
        experienceCount,
        educationCount,
        unreadMessagesCount,
        projectViews,
        blogViews,
        projectsRaw,
        blogsRaw,
    ] = await Promise.all([
        Project.countDocuments(),
        Blog.countDocuments({ status: "published" }),
        Experience.countDocuments(),
        Education.countDocuments(),
        Message.countDocuments({ status: "unread" }),
        Project.aggregate([{ $group: { _id: null, total: { $sum: "$views" } } }]),
        Blog.aggregate([{ $group: { _id: null, total: { $sum: "$views" } } }]),
        Project.find({}, { title: 1, views: 1 }).lean(),
        Blog.find({}, { title: 1, views: 1 }).lean(),
    ]);

    const totalViews = (projectViews[0]?.total || 0) + (blogViews[0]?.total || 0);

    const projectsData = (projectsRaw as any[]).map((p) => ({
        title: p.title?.en || p.title || "—",
        views: p.views || 0,
    }));

    const blogsData = (blogsRaw as any[]).map((b) => ({
        title: b.title?.en || b.title || "—",
        views: b.views || 0,
    }));

    const statCards = [
        { label: t("totalViews"), value: totalViews, highlight: true },
        { label: t("totalProjects"), value: projectCount },
        { label: t("totalBlogs"), value: blogCount },
        { label: t("totalExperiences"), value: experienceCount },
        { label: t("totalEducations"), value: educationCount },
        { label: t("newMessages"), value: unreadMessagesCount, pulse: unreadMessagesCount > 0 },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t("welcome")} {session.user?.name}
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                {statCards.map((card) => (
                    <div
                        key={card.label}
                        className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden"
                    >
                        <h3 className="text-gray-500 dark:text-gray-400 text-xs font-medium mb-2 leading-tight">
                            {card.label}
                        </h3>
                        <p className={`text-3xl font-bold ${card.highlight ? "text-cyan-600 dark:text-cyan-400" : "text-gray-900 dark:text-white"}`}>
                            {card.value}
                        </p>
                        {card.pulse && (
                            <span className="absolute top-4 right-4 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                        )}
                    </div>
                ))}
            </div>

            <AnalyticsCharts projects={projectsData} blogs={blogsData} />

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mt-8">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {t("quickLinks")}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {t("quickLinksDesc")}
                </p>
            </div>
        </div>
    );
}
