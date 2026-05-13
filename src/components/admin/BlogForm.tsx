"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Save, Sparkles, X } from "lucide-react";
import {
  FormSection,
  adminHelpTextClass,
  adminInputClass,
  adminLabelClass,
} from "@/components/admin/FormShell";

type LocalizedText = {
  tr?: string;
  en?: string;
};

type BlogFormData = {
  _id?: string;
  slug?: string;
  category?: string;
  readTime?: string | number;
  tags?: string[];
  status?: "draft" | "published";
  createdAt?: string;
  title?: LocalizedText;
  excerpt?: LocalizedText;
  content?: LocalizedText;
};

export default function BlogForm({ initialData }: { initialData?: BlogFormData }) {
  const router = useRouter();
  const locale = useLocale();
  const isEditing = Boolean(initialData?._id);

  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    slug: initialData?.slug || "",
    category: initialData?.category || "Tech",
    readTime: String(initialData?.readTime || "5 min"),
    tags: initialData?.tags?.join(", ") || "",
    status: initialData?.status || "published",
    createdAt: initialData?.createdAt
      ? new Date(initialData.createdAt).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    titleTR: initialData?.title?.tr || "",
    titleEN: initialData?.title?.en || "",
    excerptTR: initialData?.excerpt?.tr || "",
    excerptEN: initialData?.excerpt?.en || "",
    contentTR: initialData?.content?.tr || "",
    contentEN: initialData?.content?.en || "",
  });

  const updateField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAIGenerate = async () => {
    if (!formData.titleTR) {
      setError("AI uretimi icin once Turkce baslik girin.");
      return;
    }

    setError("");
    setAiLoading(true);

    try {
      const res = await fetch("/api/admin/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Baslik: ${formData.titleTR}. SEO uyumlu, markdown formatinda uzun bir blog yazisi ve kisa ozet uret. Once 'OZET:' sonra 'ICERIK:' bolumlerini kullan.`,
          type: "blog",
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.result) {
        throw new Error(data.error || "AI icerik uretemedi.");
      }

      const parts = String(data.result).split("ICERIK:");
      const excerpt = parts[0]?.replace("OZET:", "").trim();
      const content = parts[1]?.trim();

      setFormData((prev) => ({
        ...prev,
        excerptTR: excerpt || prev.excerptTR,
        contentTR: content || data.result,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "AI istegi basarisiz oldu.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      slug: formData.slug.trim(),
      category: formData.category.trim(),
      readTime: formData.readTime.trim(),
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      status: formData.status,
      createdAt: formData.createdAt,
      title: { tr: formData.titleTR, en: formData.titleEN },
      excerpt: { tr: formData.excerptTR, en: formData.excerptEN },
      content: { tr: formData.contentTR, en: formData.contentEN },
    };

    try {
      const url = isEditing ? `/api/blog/${initialData?._id}` : "/api/blog";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Blog yazisi kaydedilemedi.");
      }

      router.push(`/${locale}/admin/blog`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Beklenmeyen bir hata olustu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      ) : null}

      <FormSection
        title="Yayin bilgileri"
        description="Blog listesindeki filtreleme, URL ve yayin durumu bu alanlardan gelir."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div>
            <label className={adminLabelClass}>Slug</label>
            <input
              required
              name="slug"
              value={formData.slug}
              onChange={updateField}
              className={adminInputClass}
              placeholder="blog-yazisi"
            />
            <p className={adminHelpTextClass}>URL icinde kullanilir.</p>
          </div>
          <div>
            <label className={adminLabelClass}>Kategori</label>
            <input
              required
              name="category"
              value={formData.category}
              onChange={updateField}
              className={adminInputClass}
              placeholder="Tech"
            />
          </div>
          <div>
            <label className={adminLabelClass}>Okuma suresi</label>
            <input
              required
              name="readTime"
              value={formData.readTime}
              onChange={updateField}
              className={adminInputClass}
              placeholder="5 min"
            />
          </div>
          <div>
            <label className={adminLabelClass}>Etiketler</label>
            <input
              required
              name="tags"
              value={formData.tags}
              onChange={updateField}
              className={adminInputClass}
              placeholder="Next.js, AI, MongoDB"
            />
            <p className={adminHelpTextClass}>Virgulle ayirarak yazin.</p>
          </div>
          <div>
            <label className={adminLabelClass}>Yayin tarihi</label>
            <input
              type="date"
              required
              name="createdAt"
              value={formData.createdAt}
              onChange={updateField}
              className={adminInputClass}
            />
          </div>
          <div>
            <label className={adminLabelClass}>Durum</label>
            <select
              name="status"
              value={formData.status}
              onChange={updateField}
              className={adminInputClass}
            >
              <option value="draft">Taslak</option>
              <option value="published">Yayinda</option>
            </select>
          </div>
        </div>
      </FormSection>

      <FormSection
        title="Icerik"
        description="Turkce ve Ingilizce baslik, ozet ve markdown icerigini yan yana duzenleyin."
        actions={
          <button
            type="button"
            onClick={handleAIGenerate}
            disabled={aiLoading || !formData.titleTR}
            className="inline-flex items-center gap-2 rounded-md bg-purple-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Sparkles size={16} />
            {aiLoading ? "Uretiliyor" : "AI ile uret"}
          </button>
        }
      >
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <BlogLanguageFields
            label="Turkce"
            titleName="titleTR"
            titleValue={formData.titleTR}
            excerptName="excerptTR"
            excerptValue={formData.excerptTR}
            contentName="contentTR"
            contentValue={formData.contentTR}
            onChange={updateField}
          />
          <BlogLanguageFields
            label="English"
            titleName="titleEN"
            titleValue={formData.titleEN}
            excerptName="excerptEN"
            excerptValue={formData.excerptEN}
            contentName="contentEN"
            contentValue={formData.contentEN}
            onChange={updateField}
          />
        </div>
      </FormSection>

      <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 dark:border-gray-700 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <X size={16} />
          Iptal
        </button>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save size={16} />
          {loading ? "Kaydediliyor" : isEditing ? "Guncelle" : "Kaydet"}
        </button>
      </div>
    </form>
  );
}

function BlogLanguageFields({
  label,
  titleName,
  titleValue,
  excerptName,
  excerptValue,
  contentName,
  contentValue,
  onChange,
}: {
  label: string;
  titleName: string;
  titleValue: string;
  excerptName: string;
  excerptValue: string;
  contentName: string;
  contentValue: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {label}
      </h3>
      <div>
        <label className={adminLabelClass}>Baslik</label>
        <input
          required
          name={titleName}
          value={titleValue}
          onChange={onChange}
          className={adminInputClass}
        />
      </div>
      <div>
        <label className={adminLabelClass}>Ozet</label>
        <textarea
          required
          rows={4}
          name={excerptName}
          value={excerptValue}
          onChange={onChange}
          className={adminInputClass}
        />
      </div>
      <div>
        <label className={adminLabelClass}>Icerik</label>
        <textarea
          required
          rows={14}
          name={contentName}
          value={contentValue}
          onChange={onChange}
          className={`${adminInputClass} font-mono`}
        />
      </div>
    </div>
  );
}
