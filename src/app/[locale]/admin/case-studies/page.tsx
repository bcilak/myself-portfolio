import dbConnect from "@/lib/mongoose";
import CaseStudy from "@/models/CaseStudy";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ActionButtons from "@/components/admin/ActionButtons";

export default async function AdminCaseStudiesPage({ params }: { params: Promise<{ locale: string }> }) {
    const session = await getServerSession(authOptions);
    const { locale } = await params;

    if (!session) redirect(`/${locale}/admin/login`);

    await dbConnect();
    const items = await CaseStudy.find({}).sort({ order: 1, createdAt: -1 }).lean();

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Örnek Olaylar (Case Studies)</h1>
                <Link href={`/${locale}/admin/case-studies/new`} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    + Yeni Ekle
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-900/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Başlık (TR/EN)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kategori</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {items.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">Henüz kayıt bulunmuyor.</td>
                                </tr>
                            ) : (
                                items.map((item: any) => (
                                    <tr key={item._id.toString()} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <span className="text-xl mr-2">{item.icon}</span>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{item.title.tr}</div>
                                                    <div className="text-xs text-gray-500">{item.title.en}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {item.category.tr}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {item.slug}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <ActionButtons id={item._id.toString()} resource="case-studies" />
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
