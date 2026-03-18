"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Copy, Trash2, Plus, Search, LayoutGrid, List, CheckCircle2, Link as LinkIcon, Image as ImageIcon } from "lucide-react";

export default function ClientMediaGallery({ mediaList }: { mediaList: any[] }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [isAddOpen, setIsAddOpen] = useState(false);

    const filteredMedia = useMemo(() => {
        return mediaList.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.url.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [mediaList, searchQuery]);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/admin/media", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, url })
            });
            if (res.ok) {
                setName("");
                setUrl("");
                setIsAddOpen(false);
                router.refresh();
            } else {
                alert("Ekleme basarisiz.");
            }
        } catch (error) {
            alert(String(error));
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, mediaName: string) => {
        if (!confirm(`"${mediaName}" gorselini kutuphaneden silmek istediginize emin misiniz?`)) return;
        setLoading(true);
        await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
        setLoading(false);
        router.refresh();
    };

    const handleCopy = (url: string, id: string) => {
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header / Actions Row */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="relative w-full sm:w-80">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Medyalarda ara..." 
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 outline-none transition-all dark:text-white"
                    />
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-lg border border-gray-200 dark:border-gray-700">
                        <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white" : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"}`} title="Izgara Gorunumu">
                            <LayoutGrid size={18} />
                        </button>
                        <button onClick={() => setViewMode("list")} className={`p-1.5 rounded-md transition-colors ${viewMode === "list" ? "bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white" : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"}`} title="Liste Gorunumu">
                            <List size={18} />
                        </button>
                    </div>
                    <button onClick={() => setIsAddOpen(!isAddOpen)} className="flex-1 sm:flex-none px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 shadow-sm transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900">
                        <Plus size={18} /> Yeni Medya
                    </button>
                </div>
            </div>

            {/* Add Media Panel */}
            {isAddOpen && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-blue-100 dark:border-blue-900/50 relative overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Yeni URL Ekle</h3>
                    <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex-1 w-full">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gorsel Adi / Aciklama</label>
                            <input required value={name} onChange={e => setName(e.target.value)} placeholder="Orn: Proje X Kapak Resmi" className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2.5 dark:bg-gray-700 dark:text-white focus:border-blue-500 transition-colors" />
                        </div>
                        <div className="flex-1 w-full">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Resim URL</label>
                            <input required type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2.5 dark:bg-gray-700 dark:text-white focus:border-blue-500 transition-colors" />
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                            <button type="button" onClick={() => setIsAddOpen(false)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors">Iptal</button>
                            <button disabled={loading} type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50">
                                Kaydet
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Empty State */}
            {filteredMedia.length === 0 && (
                <div className="bg-white dark:bg-gray-800 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center py-20 text-center px-4">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 text-gray-400">
                        <ImageIcon size={32} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Gorsel Bulunamadi</h3>
                    <p className="text-gray-500 max-w-sm mb-6">Mevcut kutuphanede aradiginiz kriterlere uygun gorsel yok.</p>
                </div>
            )}

            {/* Grid View */}
            {filteredMedia.length > 0 && viewMode === "grid" && (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {filteredMedia.map((m) => (
                        <div key={m._id.toString()} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 flex flex-col group transition-all">
                            <div className="aspect-square bg-gray-100 dark:bg-gray-900 relative overflow-hidden flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-300">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={m.url} alt={m.name} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px] gap-3">
                                    <button 
                                        onClick={() => handleCopy(m.url, m._id.toString())} 
                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-transform transform translate-y-4 group-hover:translate-y-0 ${copiedId === m._id.toString() ? "bg-green-500 text-white" : "bg-white text-gray-800 hover:bg-gray-100"}`}
                                    >
                                        {copiedId === m._id.toString() ? <CheckCircle2 size={16} /> : <LinkIcon size={16} />} 
                                        {copiedId === m._id.toString() ? "Kopyalandi" : "URL Kopyala"}
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(m._id.toString(), m.name)} 
                                        className="p-2 bg-red-500/90 hover:bg-red-500 rounded-full text-white transition-transform transform translate-y-4 group-hover:translate-y-0" 
                                        title="Sil"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-3 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 relative z-10">
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate" title={m.name}>{m.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* List View */}
            {filteredMedia.length > 0 && viewMode === "list" && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                                <th className="px-6 py-4 font-medium">Gorsel</th>
                                <th className="px-6 py-4 font-medium">Isim</th>
                                <th className="px-6 py-4 font-medium hidden md:table-cell">Baglanti URL</th>
                                <th className="px-6 py-4 font-medium text-right">Islemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {filteredMedia.map(m => (
                                <tr key={m._id.toString()} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                                    <td className="px-6 py-3 w-24">
                                        <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-900 overflow-hidden relative shadow-sm">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={m.url} alt="" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                                        </div>
                                    </td>
                                    <td className="px-6 py-3 font-medium text-gray-900 dark:text-white text-sm">
                                        {m.name}
                                    </td>
                                    <td className="px-6 py-3 text-sm text-gray-500 dark:text-gray-400 truncate max-w-[200px] hidden md:table-cell" title={m.url}>
                                        {m.url}
                                    </td>
                                    <td className="px-6 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button 
                                                onClick={() => handleCopy(m.url, m._id.toString())} 
                                                className={`p-2 rounded-lg transition-colors ${copiedId === m._id.toString() ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"}`}
                                                title="URL Kopyala"
                                            >
                                                {copiedId === m._id.toString() ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(m._id.toString(), m.name)} 
                                                className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400 transition-colors"
                                                title="Sil"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
