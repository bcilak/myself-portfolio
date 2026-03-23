"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function SkillForm({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const locale = useLocale();

    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        icon: initialData?.icon || "",
        level: initialData?.level || "Intermediate",
        categoryTR: initialData?.category?.tr || "",
        categoryEN: initialData?.category?.en || "",
        categoryIcon: initialData?.categoryIcon || "",
        featured: initialData?.featured || false,
        order: initialData?.order || 0,
    });

    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSaved(false);

        const payload = {
            name: formData.name,
            icon: formData.icon,
            level: formData.level,
            category: { tr: formData.categoryTR, en: formData.categoryEN },
            categoryIcon: formData.categoryIcon,
            featured: formData.featured,
            order: Number(formData.order),
        };

        const url = initialData ? `/api/skills/${initialData._id}` : "/api/skills";
        const method = initialData ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setSaved(true);
                setTimeout(() => {
                    router.push(`/${locale}/admin/skills`);
                    router.refresh();
                }, 800);
            } else {
                alert("Hata oluştu.");
            }
        } catch (err) {
            alert("Hata: " + err);
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm";
    const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5";

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
            {saved && (
                <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center gap-3">
                    <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
                    <span className="text-green-700 dark:text-green-300 text-sm font-medium">Başarıyla kaydedildi! Yönlendiriliyorsunuz...</span>
                </div>
            )}

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Genel Bilgiler</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Yetenek Adı</label>
                        <input required placeholder="örn: React" className={inputClass} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div>
                        <label className={labelClass}>İkon (Emoji veya URL)</label>
                        <input required placeholder="örn: ⚛️" className={inputClass} value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })} />
                    </div>
                    <div>
                        <label className={labelClass}>Seviye</label>
                        <select className={inputClass} value={formData.level} onChange={e => setFormData({ ...formData, level: e.target.value })}>
                            <option value="Expert">Uzman (Expert)</option>
                            <option value="Advanced">İleri (Advanced)</option>
                            <option value="Intermediate">Orta (Intermediate)</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelClass}>Sıralama (Order)</label>
                        <input type="number" className={inputClass} value={formData.order} onChange={e => setFormData({ ...formData, order: Number(e.target.value) })} />
                    </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                    <input type="checkbox" id="featured" checked={formData.featured} onChange={e => setFormData({ ...formData, featured: e.target.checked })} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                    <label htmlFor="featured" className={labelClass + " !mb-0"}>Öne Çıkan Yetenek (Featured)</label>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Kategori Bilgileri</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Kategori Adı (TR)</label>
                        <input required placeholder="örn: Frontend" className={inputClass} value={formData.categoryTR} onChange={e => setFormData({ ...formData, categoryTR: e.target.value })} />
                    </div>
                    <div>
                        <label className={labelClass}>Kategori Adı (EN)</label>
                        <input required placeholder="örn: Frontend" className={inputClass} value={formData.categoryEN} onChange={e => setFormData({ ...formData, categoryEN: e.target.value })} />
                    </div>
                    <div className="md:col-span-2">
                        <label className={labelClass}>Kategori İkonu</label>
                        <input required placeholder="örn: 🎨" className={inputClass} value={formData.categoryIcon} onChange={e => setFormData({ ...formData, categoryIcon: e.target.value })} />
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button type="submit" disabled={loading} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg text-sm font-medium">
                    {loading ? "Kaydediliyor..." : "💾 Kaydet"}
                </button>
                <button type="button" onClick={() => router.back()} className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium">İptal</button>
            </div>
        </form>
    );
}
