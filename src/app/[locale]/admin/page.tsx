import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongoose";
import Project from "@/models/Project";
import Blog from "@/models/Blog";
import Experience from "@/models/Experience";

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

    const projectViews = await Project.aggregate([{ $group: { _id: null, total: { $sum: "$views" } } }]);
    const blogViews = await Blog.aggregate([{ $group: { _id: null, total: { $sum: "$views" } } }]);
    const totalViews = (projectViews[0]?.total || 0) + (blogViews[0]?.total || 0);

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Hoşgeldin, {session.user?.name}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">Deneyimler</h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{experienceCount}</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Hızlı İşlemler</h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Deneyim, Proje veya Blog yazılarınızı sol menü üzerinden yönetebilirsiniz.
                </p>
            </div>
        </div>
    );
}
