"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ActionButtons({ id, resource = "projects" }: { id: string; resource?: string }) {
    const locale = useLocale();
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm("Bunu silmek istediğinize emin misiniz?")) return;

        try {
            const res = await fetch(`/api/${resource}/${id}`, { method: "DELETE" });
            if (res.ok) {
                router.refresh();
            } else {
                alert("Silinirken bir hata oluştu.");
            }
        } catch (err) {
            alert("Hata: " + err);
        }
    };

    return (
        <>
            <Link href={`/${locale}/admin/${resource}/${id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                Düzenle
            </Link>
            <button onClick={handleDelete} className="text-red-600 hover:text-red-900">
                Sil
            </button>
        </>
    );
}
