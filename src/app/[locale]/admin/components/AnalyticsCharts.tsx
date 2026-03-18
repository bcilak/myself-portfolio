"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AnalyticsCharts({ projects, blogs }: { projects: any[], blogs: any[] }) {
    // Top 5 projects by views
    const topProjects = [...projects].sort((a, b) => b.views - a.views).slice(0, 5).map(p => ({
        name: p.title.length > 20 ? p.title.substring(0, 20) + "..." : p.title,
        Görüntülenme: p.views
    }));

    // Top 5 blogs by views
    const topBlogs = [...blogs].sort((a, b) => b.views - a.views).slice(0, 5).map(b => ({
        name: b.title.length > 20 ? b.title.substring(0, 20) + "..." : b.title,
        value: b.views
    }));

    const COLORS = ['#0891b2', '#0284c7', '#0369a1', '#0f766e', '#0d9488'];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">En Çok İncelenen Projeler</h2>
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={topProjects} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-gray-700" />
                            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                            <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                            <Bar dataKey="Görüntülenme" fill="#06b6d4" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">En Çok Okunan Blog Yazıları</h2>
                <div className="h-72 flex items-center justify-center">
                    {topBlogs.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={topBlogs}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {topBlogs.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <p className="text-gray-500 text-sm">Yeterli blog verisi yok.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
