"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function BlogForm({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const locale = useLocale();

    const [formData, setFormData] = useState({
        slug: initialData?.slug || "",
        category: initialData?.category || "Tech",
        readTime: initialData?.readTime || "5 min",
        tags: initialData?.tags?.join(", ") || "",
        createdAt: initialData?.createdAt ? new Date(initialData.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        titleTR: initialData?.title?.tr || "",
        titleEN: initialData?.title?.en || "",
        excerptTR: initialData?.excerpt?.tr || "",
        excerptEN: initialData?.excerpt?.en || "",
        contentTR: initialData?.content?.tr || "",
        contentEN: initialData?.content?.en || "",
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            slug: formData.slug,
            category: formData.category,
            readTime: formData.readTime,
            tags: formData.tags.split(",").map((t: string) => t.trim()).filter(Boolean),
            createdAt: formData.createdAt,
            title: { tr: formData.titleTR, en: formData.titleEN },
            excerpt: { tr: formData.excerptTR, en: formData.excerptEN },
            content: { tr: formData.contentTR, en: formData.contentEN },
        };

        const url = initialData ? `/api/blog/${initialData._id}` : "/api/blog";
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
                <input required placeholder="Slug (örn: my-post)" className="p-2 border rounded" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} />
                <input required placeholder="Kategori" className="p-2 border rounded" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                <input required placeholder="Okuma Süresi (örn: 5 min)" className="p-2 border rounded" value={formData.readTime} onChange={e => setFormData({ ...formData, readTime: e.target.value })} />
                <input required placeholder="Etiketler (virgülle ayırın)" className="p-2 border rounded" value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })} />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-4 border p-4 rounded">
                    <h3 className="font-bold">Türkçe</h3>
                    <input required placeholder="Başlık" className="w-full p-2 border rounded" value={formData.titleTR} onChange={e => setFormData({ ...formData, titleTR: e.target.value })} />
                    <textarea required placeholder="Özet" className="w-full p-2 border rounded" value={formData.excerptTR} onChange={e => setFormData({ ...formData, excerptTR: e.target.value })} />
                    <textarea required placeholder="İçerik (Markdown HTML)" rows={6} className="w-full p-2 border rounded" value={formData.contentTR} onChange={e => setFormData({ ...formData, contentTR: e.target.value })} />
                </div>
                <div className="space-y-4 border p-4 rounded">
                    <h3 className="font-bold">English</h3>
                    <input required placeholder="Title" className="w-full p-2 border rounded" value={formData.titleEN} onChange={e => setFormData({ ...formData, titleEN: e.target.value })} />
                    <textarea required placeholder="Excerpt" className="w-full p-2 border rounded" value={formData.excerptEN} onChange={e => setFormData({ ...formData, excerptEN: e.target.value })} />
                    <textarea required placeholder="Content (Markdown HTML)" rows={6} className="w-full p-2 border rounded" value={formData.contentEN} onChange={e => setFormData({ ...formData, contentEN: e.target.value })} />
                </div>
            </div>

            <button disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded">
                {loading ? "Kaydediliyor..." : "Kaydet"}
            </button>
        </form>
    );
}