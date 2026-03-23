import dbConnect from "@/lib/mongoose";
import Skill from "@/models/Skill";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ActionButtons from "@/components/admin/ActionButtons";

export default async function AdminSkillsPage({ params }: { params: Promise<{ locale: string }> }) {
    const session = await getServerSession(authOptions);
    const { locale } = await params;

    if (!session) redirect(`/${locale}/admin/login`);

    await dbConnect();
    const skills = await Skill.find({}).sort({ order: 1, createdAt: -1 }).lean();

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Yetenekler</h1>
                <Link href={`/${locale}/admin/skills/new`} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    + Yeni Yetenek Ekle
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-900/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Yetenek</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seviye</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kategori</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {skills.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">Henüz yetenek bulunmuyor.</td>
                                </tr>
                            ) : (
                                skills.map((skill: any) => (
                                    <tr key={skill._id.toString()} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <span className="text-xl mr-2">{skill.icon}</span>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {skill.name} {skill.featured && <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Featured</span>}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {skill.level}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {skill.categoryIcon} {skill.category.tr}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <ActionButtons id={skill._id.toString()} resource="skills" />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
