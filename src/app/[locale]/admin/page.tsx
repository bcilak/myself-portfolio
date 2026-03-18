import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongoose";
import Project from "@/models/Project";
import Blog from "@/models/Blog";
import Experience from "@/models/Experience";
import Message from "@/models/Message";
import AnalyticsCharts from "./components/AnalyticsCharts";

export default async function AdminDashboard({ params }: { params: Promise<{ locale: string }> }) {
    const session = await getServerSession(authOptions);
    const { locale } = await params;

    if (!session) {
        redirect(`/${locale}/admin/login`);
    }

    await dbConnect();

    const projectCount = await Project.countDocuments();
    const blogCount = await Blog.countDocuments();
    const experienceCount = await Experience.countDocuments();
    const unreadMessagesCount = await Message.countDocuments({ status: "unread" });

    const projectViews = await Project.aggregate([{ $group: { _id: null, total: { $sum: "$views" } } }]);
    const blogViews = await Blog.aggregate([{ $group: { _id: null, total: { $sum: "$views" } } }]);
    const totalViews = (projectViews[0]?.total || 0) + (blogViews[0]?.total || 0);

    const projectsData = (await Project.find({}, { title: 1, views: 1 }).lean()).map((p: any) => ({
        title: p.title || "İsimsiz Proje",
        views: p.views || 0
    }));

    const blogsData = (await Blog.find({}, { title: 1, views: 1 }).lean()).map((b: any) => ({
        title: b.title || "İsimsiz Blog",
        views: b.views || 0
    }));

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Hoşgeldin, {session.user?.name}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">Toplam Görüntülenme</h3>
                    <p className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">{totalViews}</p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">Toplam Proje</h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{projectCount}</p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">Toplam Blog Yazısı</h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{blogCount}</p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">Yeni Mesajlar</h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{unreadMessagesCount}</p>
                    {unreadMessagesCount > 0 && <span className="absolute top-6 right-6 w-3 h-3 bg-red-500 rounded-full animate-pulse" />}
                </div>
            </div>

            <AnalyticsCharts projects={projectsData} blogs={blogsData} />

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mt-8">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Hızlı Yönlendirmeler</h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Sistem trafiğini artık detaylı olarak grafikler sekmesinden okuyabilir, sol menü üzerinden mesajlara cevap verebilirsiniz.
                </p>
            </div>
        </div>
    );
}
