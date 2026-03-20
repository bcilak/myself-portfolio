"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function EducationForm({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const locale = useLocale();

    const [formData, setFormData] = useState({
        year: initialData?.year || "",
        degreeTR: initialData?.degree?.tr || "",
        degreeEN: initialData?.degree?.en || "",
        schoolTR: initialData?.school?.tr || "",
        schoolEN: initialData?.school?.en || "",
        descriptionTR: initialData?.description?.tr || "",
        descriptionEN: initialData?.description?.en || "",
    });

    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSaved(false);

        const payload = {
            year: formData.year,
            degree: { tr: formData.degreeTR, en: formData.degreeEN },
            school: { tr: formData.schoolTR, en: formData.schoolEN },
            description: { tr: formData.descriptionTR, en: formData.descriptionEN },
        };

        const url = initialData ? `/api/education/${initialData._id}` : "/api/education";
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
                    router.push(`/${locale}/admin/education`);
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
            {/* Success Banner */}
            {saved && (
                <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center gap-3">
                    <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
                    <span className="text-green-700 dark:text-green-300 text-sm font-medium">Başarıyla kaydedildi! Yönlendiriliyorsunuz...</span>
                </div>
            )}

            {/* General Info */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Genel Bilgiler
                </h3>
                <div>
                    <label className={labelClass}>Dönem / Yıl</label>
                    <input
                        required
                        placeholder="örn: 2018 – 2022"
                        className={inputClass}
                        value={formData.year}
                        onChange={e => setFormData({ ...formData, year: e.target.value })}
                    />
                </div>
            </div>

            {/* Language Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Turkish */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <span className="text-lg">🇹🇷</span>
                        Türkçe
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className={labelClass}>Bölüm / Derece</label>
                            <input
                                required
                                placeholder="Örn: Bilgisayar Mühendisliği"
                                className={inputClass}
                                value={formData.degreeTR}
                                onChange={e => setFormData({ ...formData, degreeTR: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Okul / Üniversite</label>
                            <input
                                required
                                placeholder="Okul adı"
                                className={inputClass}
                                value={formData.schoolTR}
                                onChange={e => setFormData({ ...formData, schoolTR: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Açıklama</label>
                            <textarea
                                placeholder="Eğitim detayları, başarılar..."
                                rows={4}
                                className={inputClass + " resize-none"}
                                value={formData.descriptionTR}
                                onChange={e => setFormData({ ...formData, descriptionTR: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* English */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <span className="text-lg">🇬🇧</span>
                        English
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className={labelClass}>Degree / Major</label>
                            <input
                                required
                                placeholder="e.g. Computer Engineering"
                                className={inputClass}
                                value={formData.degreeEN}
                                onChange={e => setFormData({ ...formData, degreeEN: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className={labelClass}>School / University</label>
                            <input
                                required
                                placeholder="University name"
                                className={inputClass}
                                value={formData.schoolEN}
                                onChange={e => setFormData({ ...formData, schoolEN: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Description</label>
                            <textarea
                                placeholder="Education details, achievements..."
                                rows={4}
                                className={inputClass + " resize-none"}
                                value={formData.descriptionEN}
                                onChange={e => setFormData({ ...formData, descriptionEN: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Kaydediliyor...
                        </>
                    ) : (
                        "💾 Kaydet"
                    )}
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors"
                >
                    İptal
                </button>
            </div>
        </form>
    );
}
