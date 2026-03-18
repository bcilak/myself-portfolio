"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, Trash2 } from "lucide-react";

export function MarkReadButton({ id }: { id: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleMark = async () => {
        setLoading(true);
        await fetch(`/api/admin/messages/${id}`, { 
            method: "PATCH", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "read" }) 
        });
        setLoading(false);
        router.refresh();
    };

    return (
        <button onClick={handleMark} disabled={loading} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-cyan-700 bg-cyan-100/50 hover:bg-cyan-100 dark:text-cyan-400 dark:bg-cyan-900/20 dark:hover:bg-cyan-900/40 rounded-md transition-colors" title="Okundu İşaretle">
            <Check size={14} /> {loading ? "..." : "Okundu"}
        </button>
    );
}

export function DeleteMessageButton({ id }: { id: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Bu mesajı silmek istediğinize emin misiniz?")) return;
        setLoading(true);
        await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
        setLoading(false);
        router.refresh();
    };

    return (
        <button onClick={handleDelete} disabled={loading} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100/50 hover:bg-red-100 dark:text-red-400 dark:bg-red-900/20 dark:hover:bg-red-900/40 rounded-md transition-colors" title="Sil">
            <Trash2 size={14} /> {loading ? "..." : "Sil"}
        </button>
    );
}
