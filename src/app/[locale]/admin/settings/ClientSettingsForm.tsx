"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Globe, Search, Share2, Save, LayoutTemplate, Activity } from "lucide-react";

export default function ClientSettingsForm({ initialData }: { initialData: any }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        titleTR: initialData?.titleTR || "",
        titleEN: initialData?.titleEN || "",
        descriptionTR: initialData?.descriptionTR || "",
        descriptionEN: initialData?.descriptionEN || "",
        keywords: initialData?.keywords || "",
        ogImageUrl: initialData?.ogImageUrl || "/og-image.png",
        googleVerification: initialData?.googleVerification || "",
        twitterHandle: initialData?.twitterHandle || "@bariscilak",
        siteUrl: initialData?.siteUrl || "https://bariscilak.dev",
    });

    const [activeTab, setActiveTab] = useState<"general" | "seo" | "social">("general");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/admin/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                alert("Ayarlar basariyla guncellendi.");
                router.refresh();
            } else {
                alert("Guncelleme basarisiz.");
            }
        } catch (error) {
            alert(String(error));
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { id: "general", label: "Genel Ayarlar", icon: <LayoutTemplate size={18} /> },
        { id: "seo", label: "Arama Motoru (SEO)", icon: <Search size={18} /> },
        { id: "social", label: "Sosyal Medya", icon: <Share2 size={18} /> },
    ];

    return (
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="w-full lg:w-64 flex-shrink-0">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden sticky top-24">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            <Activity size={18} className="text-cyan-500" /> Site Ayarlari
                        </h3>
                    </div>
                    <div className="flex flex-col p-2">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? "bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"}`}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Form Area */}
            <form onSubmit={handleSubmit} className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col min-h-[500px]">
                <div className="p-6 md:p-8 flex-1">
                    {/* GENERAL TAB */}
                    {activeTab === "general" && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Genel Ayarlar</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Sitenizin temel konfigurasyonlari.</p>
                            </div>
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Site URL</label>
                                    <input name="siteUrl" value={formData.siteUrl} onChange={handleChange} required className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2.5 dark:bg-gray-700 dark:text-white" placeholder="https://..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Site Basligi (TR)</label>
                                    <input name="titleTR" value={formData.titleTR} onChange={handleChange} required className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2.5 dark:bg-gray-700 dark:text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Site Title (EN)</label>
                                    <input name="titleEN" value={formData.titleEN} onChange={handleChange} required className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2.5 dark:bg-gray-700 dark:text-white" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SEO TAB */}
                    {activeTab === "seo" && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Arama Motoru (SEO)</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Google aramalarindaki gorunumunuz.</p>
                            </div>
                            
                            {/* Live Google Search Preview */}
                            <div className="mb-8 p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                                    <Search size={14} /> Canli Google Onizleme
                                </h3>
                                <div className="max-w-[600px]">
                                    <div className="text-xs text-[#202124] dark:text-[#dadce0] mb-1 flex items-center gap-2 truncate">
                                        <span className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-xs">W</span>
                                        {formData.siteUrl} <span className="text-[#5f6368] dark:text-[#9aa0a6]">- tr</span>
                                    </div>
                                    <div className="text-lg md:text-xl text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer mb-1 truncate">
                                        {formData.titleTR || "Site Basligi"}
                                    </div>
                                    <div className="text-sm text-[#4d5156] dark:text-[#bdc1c6] line-clamp-2 leading-snug">
                                        {formData.descriptionTR || "Sitenizin arama motorlarinda gorunecek aciklamasi."}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Aciklama / Meta Desc (TR)</label>
                                    <textarea name="descriptionTR" value={formData.descriptionTR} onChange={handleChange} rows={4} required className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2.5 dark:bg-gray-700 dark:text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Aciklama / Meta Desc (EN)</label>
                                    <textarea name="descriptionEN" value={formData.descriptionEN} onChange={handleChange} rows={4} required className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2.5 dark:bg-gray-700 dark:text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Anahtar Kelimeler (Keywords)</label>
                                    <input name="keywords" value={formData.keywords} onChange={handleChange} required className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2.5 dark:bg-gray-700 dark:text-white" placeholder="Yazilim, AI, Backend, Python..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Google Site Verification Kodu</label>
                                    <input name="googleVerification" value={formData.googleVerification} onChange={handleChange} className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2.5 dark:bg-gray-700 dark:text-white" placeholder="A1B2..."/>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SOCIAL TAB */}
                    {activeTab === "social" && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Sosyal Medya Kartlari</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Linkiniz paylasildigindaki gorunumu belirler.</p>
                            </div>

                            {/* Live Twitter Card Preview */}
                            <div className="mb-8 flex justify-center">
                                <div className="w-[400px] border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm">
                                    <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={formData.ogImageUrl || "/og-image.png"} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                                    </div>
                                    <div className="p-3">
                                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-0.5 truncate">{formData.siteUrl.replace(/^https?:\/\//, '')}</div>
                                        <h3 className="text-base font-bold text-gray-900 dark:text-white truncate mb-1">{formData.titleTR || "Baslik"}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-snug">{formData.descriptionTR || "Aciklama girilmedi."}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Varsayilan Kapak Resmi URL (Open Graph Image)</label>
                                    <input name="ogImageUrl" value={formData.ogImageUrl} onChange={handleChange} required className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2.5 dark:bg-gray-700 dark:text-white" placeholder="https://..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Twitter Hesabi (@handle)</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 font-medium">@</div>
                                        <input name="twitterHandle" value={formData.twitterHandle.replace('@', '')} onChange={(e) => setFormData(p => ({...p, twitterHandle: `@${e.target.value}`}))} className="w-full rounded-lg border border-gray-300 dark:border-gray-600 pl-8 pr-3 py-2.5 dark:bg-gray-700 dark:text-white" placeholder="bariscilak" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                    <button type="submit" disabled={loading} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm flex items-center gap-2 transition-colors disabled:opacity-50">
                        <Save size={18} /> {loading ? "Kaydediliyor..." : "Tum Ayarlari Kaydet"}
                    </button>
                </div>
            </form>
        </div>
    );
}
