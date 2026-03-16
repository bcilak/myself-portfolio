import dbConnect from "@/lib/mongoose";
import Experience from "@/models/Experience";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ActionButtons from "@/components/admin/ActionButtons";

export default async function AdminExperiencePage({ params }: { params: Promise<{ locale: string }> }) {
    const session = await getServerSession(authOptions);
    const { locale } = await params;

    if (!session) {
        redirect(`/${locale}/admin/login`);
    }

    await dbConnect();
    // Geçmişten günümüze veya sıraya göre
    const experiences = await Experience.find({}).lean();

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Deneyimler</h1>
                <Link href={`/${locale}/admin/experience/new`} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    + Yeni Deneyim Ekle
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-900/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Şirket (TR / EN)
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Pozisyon (TR / EN)
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Yıl
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    İşlemler
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {experiences.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                        Henüz deneyim bulunmuyor.
                                    </td>
                                </tr>
                            ) : (
                                experiences.map((exp: any) => (
                                    <tr key={exp._id.toString()} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {exp.company.tr}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {exp.company.en}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 dark:text-white">
                                                {exp.title.tr}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {exp.title.en}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {exp.year || exp.period}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <ActionButtons id={exp._id.toString()} resource="experience" />
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
