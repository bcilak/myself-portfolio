"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function CaseStudyForm({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const locale = useLocale();

    const [formData, setFormData] = useState({
        slug: initialData?.slug || "",
        icon: initialData?.icon || "",
        order: initialData?.order || 0,
        technologies: initialData?.technologies?.join(", ") || "",
        titleTR: initialData?.title?.tr || "",
        titleEN: initialData?.title?.en || "",
        subtitleTR: initialData?.subtitle?.tr || "",
        subtitleEN: initialData?.subtitle?.en || "",
        categoryTR: initialData?.category?.tr || "",
        categoryEN: initialData?.category?.en || "",
        problemTR: initialData?.problem?.tr || "",
        problemEN: initialData?.problem?.en || "",
        approachTR: initialData?.approach?.tr || "",
        approachEN: initialData?.approach?.en || "",
        architectureTR: initialData?.architecture?.tr || "",
        architectureEN: initialData?.architecture?.en || "",
        impactTR: initialData?.impact?.tr || "",
        impactEN: initialData?.impact?.en || "",
        challengesTR: initialData?.challenges?.tr?.join("\n") || "",
        challengesEN: initialData?.challenges?.en?.join("\n") || "",
        lessonsTR: initialData?.lessons?.tr?.join("\n") || "",
        lessonsEN: initialData?.lessons?.en?.join("\n") || "",
    });

    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSaved(false);

        const payload = {
            slug: formData.slug,
            icon: formData.icon,
            order: Number(formData.order),
            technologies: formData.technologies.split(",").map((s: string) => s.trim()).filter(Boolean),
            title: { tr: formData.titleTR, en: formData.titleEN },
            subtitle: { tr: formData.subtitleTR, en: formData.subtitleEN },
            category: { tr: formData.categoryTR, en: formData.categoryEN },
            problem: { tr: formData.problemTR, en: formData.problemEN },
            approach: { tr: formData.approachTR, en: formData.approachEN },
            architecture: { tr: formData.architectureTR, en: formData.architectureEN },
            impact: { tr: formData.impactTR, en: formData.impactEN },
            challenges: { 
                tr: formData.challengesTR.split("\n").map((s: string) => s.trim()).filter(Boolean),
                en: formData.challengesEN.split("\n").map((s: string) => s.trim()).filter(Boolean)
            },
            lessons: { 
                tr: formData.lessonsTR.split("\n").map((s: string) => s.trim()).filter(Boolean),
                en: formData.lessonsEN.split("\n").map((s: string) => s.trim()).filter(Boolean)
            },
        };

        const url = initialData ? `/api/case-studies/${initialData._id}` : "/api/case-studies";
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
                    router.push(`/${locale}/admin/case-studies`);
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
        <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl">
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
                        <label className={labelClass}>Slug (URL URL)</label>
                        <input required placeholder="örn: whatsapp-chatbot" className={inputClass} value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} />
                    </div>
                    <div>
                        <label className={labelClass}>İkon</label>
                        <input required placeholder="örn: 💬" className={inputClass} value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })} />
                    </div>
                    <div>
                        <label className={labelClass}>Teknolojiler (Virgülle ayrılmış)</label>
                        <input required placeholder="örn: Python, FastAPI, Redis" className={inputClass} value={formData.technologies} onChange={e => setFormData({ ...formData, technologies: e.target.value })} />
                    </div>
                    <div>
                        <label className={labelClass}>Sıralama (Order)</label>
                        <input type="number" className={inputClass} value={formData.order} onChange={e => setFormData({ ...formData, order: Number(e.target.value) })} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Turkish */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">🇹🇷 Türkçe</h3>
                    <div><label className={labelClass}>Başlık</label><input required className={inputClass} value={formData.titleTR} onChange={e=>setFormData({...formData, titleTR: e.target.value})} /></div>
                    <div><label className={labelClass}>Alt Başlık</label><input required className={inputClass} value={formData.subtitleTR} onChange={e=>setFormData({...formData, subtitleTR: e.target.value})} /></div>
                    <div><label className={labelClass}>Kategori</label><input required className={inputClass} value={formData.categoryTR} onChange={e=>setFormData({...formData, categoryTR: e.target.value})} /></div>
                    <div><label className={labelClass}>Problem</label><textarea required rows={3} className={inputClass} value={formData.problemTR} onChange={e=>setFormData({...formData, problemTR: e.target.value})} /></div>
                    <div><label className={labelClass}>Yaklaşım (Approach)</label><textarea required rows={3} className={inputClass} value={formData.approachTR} onChange={e=>setFormData({...formData, approachTR: e.target.value})} /></div>
                    <div><label className={labelClass}>Mimari (Architecture)</label><textarea required rows={3} className={inputClass} value={formData.architectureTR} onChange={e=>setFormData({...formData, architectureTR: e.target.value})} /></div>
                    <div><label className={labelClass}>Etki (Impact)</label><textarea required rows={2} className={inputClass} value={formData.impactTR} onChange={e=>setFormData({...formData, impactTR: e.target.value})} /></div>
                    <div><label className={labelClass}>Zorluklar (Her satıra bir tane)</label><textarea rows={3} className={inputClass} value={formData.challengesTR} onChange={e=>setFormData({...formData, challengesTR: e.target.value})} /></div>
                    <div><label className={labelClass}>Çıkarılan Dersler (Her satıra bir tane)</label><textarea rows={3} className={inputClass} value={formData.lessonsTR} onChange={e=>setFormData({...formData, lessonsTR: e.target.value})} /></div>
                </div>

                {/* English */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">🇬🇧 English</h3>
                    <div><label className={labelClass}>Title</label><input required className={inputClass} value={formData.titleEN} onChange={e=>setFormData({...formData, titleEN: e.target.value})} /></div>
                    <div><label className={labelClass}>Subtitle</label><input required className={inputClass} value={formData.subtitleEN} onChange={e=>setFormData({...formData, subtitleEN: e.target.value})} /></div>
                    <div><label className={labelClass}>Category</label><input required className={inputClass} value={formData.categoryEN} onChange={e=>setFormData({...formData, categoryEN: e.target.value})} /></div>
                    <div><label className={labelClass}>Problem</label><textarea required rows={3} className={inputClass} value={formData.problemEN} onChange={e=>setFormData({...formData, problemEN: e.target.value})} /></div>
                    <div><label className={labelClass}>Approach</label><textarea required rows={3} className={inputClass} value={formData.approachEN} onChange={e=>setFormData({...formData, approachEN: e.target.value})} /></div>
                    <div><label className={labelClass}>Architecture</label><textarea required rows={3} className={inputClass} value={formData.architectureEN} onChange={e=>setFormData({...formData, architectureEN: e.target.value})} /></div>
                    <div><label className={labelClass}>Impact</label><textarea required rows={2} className={inputClass} value={formData.impactEN} onChange={e=>setFormData({...formData, impactEN: e.target.value})} /></div>
                    <div><label className={labelClass}>Challenges (One per line)</label><textarea rows={3} className={inputClass} value={formData.challengesEN} onChange={e=>setFormData({...formData, challengesEN: e.target.value})} /></div>
                    <div><label className={labelClass}>Lessons (One per line)</label><textarea rows={3} className={inputClass} value={formData.lessonsEN} onChange={e=>setFormData({...formData, lessonsEN: e.target.value})} /></div>
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
