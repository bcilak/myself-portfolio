"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function ExperienceForm({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const locale = useLocale();

    const [formData, setFormData] = useState({
        period: initialData?.year || initialData?.period || "",
        technologies: initialData?.technologies?.join(", ") || "",
        titleTR: initialData?.title?.tr || "",
        titleEN: initialData?.title?.en || "",
        companyTR: initialData?.company?.tr || "",
        companyEN: initialData?.company?.en || "",
        descriptionTR: initialData?.description?.tr || "",
        descriptionEN: initialData?.description?.en || "",
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            year: formData.period,
            technologies: formData.technologies.split(",").map((t: string) => t.trim()).filter(Boolean),
            title: { tr: formData.titleTR, en: formData.titleEN },
            company: { tr: formData.companyTR, en: formData.companyEN },
            description: { tr: formData.descriptionTR, en: formData.descriptionEN },
        };

        const url = initialData ? `/api/experience/${initialData._id}` : "/api/experience";
        const method = initialData ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                router.push(`/${locale}/admin`);
                router.refresh();
            } else {
                alert("Hata oluştu.");
            }
        } catch (err) {
            alert("Hata: " + err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <input required placeholder="Period (örn: 2022 - Present)" className="p-2 border rounded" value={formData.period} onChange={e => setFormData({ ...formData, period: e.target.value })} />
                <input required placeholder="Teknolojiler (virgülle ayırın)" className="p-2 border rounded" value={formData.technologies} onChange={e => setFormData({ ...formData, technologies: e.target.value })} />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-4 border p-4 rounded">
                    <h3 className="font-bold">Türkçe</h3>
                    <input required placeholder="Görev (Title)" className="w-full p-2 border rounded" value={formData.titleTR} onChange={e => setFormData({ ...formData, titleTR: e.target.value })} />
                    <input required placeholder="Şirket (Company)" className="w-full p-2 border rounded" value={formData.companyTR} onChange={e => setFormData({ ...formData, companyTR: e.target.value })} />
                    <textarea required placeholder="Açıklama" className="w-full p-2 border rounded" value={formData.descriptionTR} onChange={e => setFormData({ ...formData, descriptionTR: e.target.value })} />
                </div>
                <div className="space-y-4 border p-4 rounded">
                    <h3 className="font-bold">English</h3>
                    <input required placeholder="Title" className="w-full p-2 border rounded" value={formData.titleEN} onChange={e => setFormData({ ...formData, titleEN: e.target.value })} />
                    <input required placeholder="Company" className="w-full p-2 border rounded" value={formData.companyEN} onChange={e => setFormData({ ...formData, companyEN: e.target.value })} />
                    <textarea required placeholder="Description" className="w-full p-2 border rounded" value={formData.descriptionEN} onChange={e => setFormData({ ...formData, descriptionEN: e.target.value })} />
                </div>
            </div>

            <button disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded">
                {loading ? "Kaydediliyor..." : "Kaydet"}
            </button>
        </form>
    );
}