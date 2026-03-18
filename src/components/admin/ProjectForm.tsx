"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function ProjectForm({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const locale = useLocale();
    const isEditing = !!initialData;

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        slug: initialData?.slug || "",
        featured: initialData?.featured || false,
        githubUrl: initialData?.githubUrl || "",
        demoUrl: initialData?.demoUrl || "",
        technologies: initialData?.technologies?.join(", ") || "",
        createdAt: initialData?.createdAt || new Date().toISOString().split("T")[0],

        titleTR: initialData?.title?.tr || "",
        titleEN: initialData?.title?.en || "",

        shortDescriptionTR: initialData?.shortDescription?.tr || "",
        shortDescriptionEN: initialData?.shortDescription?.en || "",

        descriptionTR: initialData?.description?.tr || "",
        descriptionEN: initialData?.description?.en || "",

        problemTR: initialData?.problem?.tr || "",
        problemEN: initialData?.problem?.en || "",

        solutionTR: initialData?.solution?.tr || "",
        solutionEN: initialData?.solution?.en || "",

        architectureTR: initialData?.architecture?.tr || "",
        architectureEN: initialData?.architecture?.en || "",

        challengesTR: initialData?.challenges?.tr || "",
        challengesEN: initialData?.challenges?.en || "",

        lessonsTR: initialData?.lessons?.tr || "",
        lessonsEN: initialData?.lessons?.en || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === "checkbox") {
            setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const [aiLoading, setAiLoading] = useState(false);

    const handleAIGenerate = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!formData.titleTR || !formData.technologies) {
            alert("Lütfen önce başlık (Title TR) ve Teknolojiler alanlarını doldurun.");
            return;
        }
        setAiLoading(true);
        try {
            const res = await fetch("/api/admin/generate-content", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: `Proje Adı: ${formData.titleTR}\nTeknolojiler: ${formData.technologies}\nLütfen bu proje için etkileyici bir kısa açıklama (short description) ve Markdown formatında detaylı bir uzun açıklama (description) yaz. Önce 'KISA:' yazıp kısasını, sonra 'UZUN:' yazıp uzunu ver.`, type: "project" })
            });
            const data = await res.json();
            if (data.result) {
                const parts = data.result.split("UZUN:");
                const shortDesc = parts[0]?.replace("KISA:", "").trim();
                const longDesc = parts[1]?.trim();
                if (shortDesc && longDesc) {
                    setFormData(prev => ({ ...prev, shortDescriptionTR: shortDesc, descriptionTR: longDesc }));
                } else {
                    setFormData(prev => ({ ...prev, descriptionTR: data.result }));
                }
            } else {
                alert("AI Hatası: " + data.error);
            }
        } catch (err) {
            alert("Hata: " + err);
        } finally {
            setAiLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            slug: formData.slug,
            featured: formData.featured,
            githubUrl: formData.githubUrl,
            demoUrl: formData.demoUrl,
            technologies: formData.technologies.split(",").map((t: string) => t.trim()).filter(Boolean),
            createdAt: formData.createdAt,
            title: { tr: formData.titleTR, en: formData.titleEN },
            shortDescription: { tr: formData.shortDescriptionTR, en: formData.shortDescriptionEN },
            description: { tr: formData.descriptionTR, en: formData.descriptionEN },
            problem: { tr: formData.problemTR, en: formData.problemEN },
            solution: { tr: formData.solutionTR, en: formData.solutionEN },
            architecture: { tr: formData.architectureTR, en: formData.architectureEN },
            challenges: { tr: formData.challengesTR, en: formData.challengesEN },
            lessons: { tr: formData.lessonsTR, en: formData.lessonsEN },
        };

        try {
            const url = isEditing ? `/api/projects/${initialData._id}` : "/api/projects";
            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error("Bir hata oluştu.");

            router.push(`/${locale}/admin/projects`);
            router.refresh();
        } catch (error) {
            alert(error);
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Slug (URL)</label>
                    <input required name="slug" value={formData.slug} onChange={handleChange} className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tarih</label>
                    <input type="date" required name="createdAt" value={formData.createdAt} onChange={handleChange} className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Teknolojiler (Virgülle ayırın)</label>
                    <input required name="technologies" value={formData.technologies} onChange={handleChange} className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 dark:bg-gray-700 dark:text-white" />
                </div>
                <div className="flex items-center space-x-4 pt-8">
                    <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="h-5 w-5 rounded border-gray-300" />
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Öne Çıkan Proje mi? (Anasayfada göster)</label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GitHub URL</label>
                    <input name="githubUrl" value={formData.githubUrl} onChange={handleChange} className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Demo URL</label>
                    <input name="demoUrl" value={formData.demoUrl} onChange={handleChange} className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 dark:bg-gray-700 dark:text-white" />
                </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">İçerikler (Türkçe / İngilizce)</h3>
                    <button onClick={handleAIGenerate} disabled={aiLoading || !formData.titleTR || !formData.technologies} className="px-4 py-2 text-sm font-medium bg-purple-100 text-purple-700 hover:bg-purple-200 disabled:opacity-50 rounded-lg flex items-center gap-2 transition-colors">
                        ✨ {aiLoading ? "AI Yazıyor..." : "AI ile Açıklama Üret"}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Başlık (TR)</label>
                        <input required name="titleTR" value={formData.titleTR} onChange={handleChange} className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title (EN)</label>
                        <input required name="titleEN" value={formData.titleEN} onChange={handleChange} className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 dark:bg-gray-700 dark:text-white" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Kısa Açıklama (TR)</label>
                        <textarea rows={3} name="shortDescriptionTR" value={formData.shortDescriptionTR} onChange={handleChange} className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Short Description (EN)</label>
                        <textarea rows={3} name="shortDescriptionEN" value={formData.shortDescriptionEN} onChange={handleChange} className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 dark:bg-gray-700 dark:text-white" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Uzun Açıklama (TR)</label>
                        <textarea rows={5} name="descriptionTR" value={formData.descriptionTR} onChange={handleChange} className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Long Description (EN)</label>
                        <textarea rows={5} name="descriptionEN" value={formData.descriptionEN} onChange={handleChange} className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 dark:bg-gray-700 dark:text-white" />
                    </div>
                </div>

                {/* Diğer metinler (Problem, Solution vb. burada eklenebilir, şimdilik gereksiz kalabalığı önleyelim) */}

            </div>

            <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="mr-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                    İptal
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium disabled:opacity-50"
                >
                    {loading ? "Kaydediliyor..." : isEditing ? "Güncelle" : "Oluştur"}
                </button>
            </div>
        </form>
    );
}
