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

type ProjectFormData = {
  _id?: string;
  slug?: string;
  featured?: boolean;
  githubUrl?: string;
  demoUrl?: string;
  technologies?: string[];
  createdAt?: string;
  title?: LocalizedText;
  shortDescription?: LocalizedText;
  description?: LocalizedText;
  problem?: LocalizedText;
  solution?: LocalizedText;
  architecture?: LocalizedText;
  challenges?: LocalizedText;
  lessons?: LocalizedText;
};

export default function ProjectForm({
  initialData,
}: {
  initialData?: ProjectFormData;
}) {
  const router = useRouter();
  const locale = useLocale();
  const isEditing = Boolean(initialData?._id);

  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState("");
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleAIGenerate = async () => {
    if (!formData.titleTR || !formData.technologies) {
      setError("AI uretimi icin once Turkce baslik ve teknolojileri girin.");
      return;
    }

    setError("");
    setAiLoading(true);

    try {
      const res = await fetch("/api/admin/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Proje Adi: ${formData.titleTR}\nTeknolojiler: ${formData.technologies}\nBu proje icin etkileyici bir kisa aciklama ve Markdown formatinda detayli aciklama yaz. Once 'KISA:' sonra 'UZUN:' bolumlerini kullan.`,
          type: "project",
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.result) {
        throw new Error(data.error || "AI icerik uretemedi.");
      }

      const parts = String(data.result).split("UZUN:");
      const shortDesc = parts[0]?.replace("KISA:", "").trim();
      const longDesc = parts[1]?.trim();

      setFormData((prev) => ({
        ...prev,
        shortDescriptionTR: shortDesc || prev.shortDescriptionTR,
        descriptionTR: longDesc || data.result,
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
      featured: formData.featured,
      githubUrl: formData.githubUrl.trim(),
      demoUrl: formData.demoUrl.trim(),
      technologies: formData.technologies
        .split(",")
        .map((technology) => technology.trim())
        .filter(Boolean),
      createdAt: formData.createdAt,
      title: { tr: formData.titleTR, en: formData.titleEN },
      shortDescription: {
        tr: formData.shortDescriptionTR,
        en: formData.shortDescriptionEN,
      },
      description: { tr: formData.descriptionTR, en: formData.descriptionEN },
      problem: { tr: formData.problemTR, en: formData.problemEN },
      solution: { tr: formData.solutionTR, en: formData.solutionEN },
      architecture: {
        tr: formData.architectureTR,
        en: formData.architectureEN,
      },
      challenges: { tr: formData.challengesTR, en: formData.challengesEN },
      lessons: { tr: formData.lessonsTR, en: formData.lessonsEN },
    };

    try {
      const url = isEditing ? `/api/projects/${initialData?._id}` : "/api/projects";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Proje kaydedilemedi.");
      }

      router.push(`/${locale}/admin/projects`);
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
        title="Proje bilgileri"
        description="Listeleme, detay sayfasi ve anasayfa kartlari icin kullanilan temel alanlar."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className={adminLabelClass}>Slug</label>
            <input
              required
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className={adminInputClass}
              placeholder="ornek-proje"
            />
            <p className={adminHelpTextClass}>URL icinde kullanilir.</p>
          </div>
          <div>
            <label className={adminLabelClass}>Tarih</label>
            <input
              type="date"
              required
              name="createdAt"
              value={formData.createdAt}
              onChange={handleChange}
              className={adminInputClass}
            />
          </div>
          <div>
            <label className={adminLabelClass}>Teknolojiler</label>
            <input
              required
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              className={adminInputClass}
              placeholder="Next.js, MongoDB, OpenAI"
            />
            <p className={adminHelpTextClass}>Virgulle ayirarak yazin.</p>
          </div>
          <div>
            <label className={adminLabelClass}>Linkler</label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                className={adminInputClass}
                placeholder="GitHub URL"
              />
              <input
                name="demoUrl"
                value={formData.demoUrl}
                onChange={handleChange}
                className={adminInputClass}
                placeholder="Demo URL"
              />
            </div>
          </div>
          <label className="flex items-center gap-3 rounded-md border border-gray-200 bg-gray-50 px-3 py-3 text-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-300 md:col-span-2">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-600"
            />
            Anasayfada one cikan proje olarak goster
          </label>
        </div>
      </FormSection>

      <FormSection
        title="Icerik"
        description="Turkce ve Ingilizce metinleri ayni ekranda karsilastirarak duzenleyin."
        actions={
          <button
            type="button"
            onClick={handleAIGenerate}
            disabled={aiLoading || !formData.titleTR || !formData.technologies}
            className="inline-flex items-center gap-2 rounded-md bg-purple-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Sparkles size={16} />
            {aiLoading ? "Uretiliyor" : "AI ile uret"}
          </button>
        }
      >
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <LanguageFields
            localeName="Turkce"
            titleName="titleTR"
            titleValue={formData.titleTR}
            shortName="shortDescriptionTR"
            shortValue={formData.shortDescriptionTR}
            descriptionName="descriptionTR"
            descriptionValue={formData.descriptionTR}
            onChange={handleChange}
          />
          <LanguageFields
            localeName="English"
            titleName="titleEN"
            titleValue={formData.titleEN}
            shortName="shortDescriptionEN"
            shortValue={formData.shortDescriptionEN}
            descriptionName="descriptionEN"
            descriptionValue={formData.descriptionEN}
            onChange={handleChange}
          />
        </div>
      </FormSection>

      <FormSection
        title="Detay sayfasi"
        description="Problem, cozum, mimari ve ogrenimler bolumleri proje detayinda kullanilir."
      >
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <DetailFields suffix="TR" formData={formData} onChange={handleChange} />
          <DetailFields suffix="EN" formData={formData} onChange={handleChange} />
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
          {loading ? "Kaydediliyor" : isEditing ? "Guncelle" : "Olustur"}
        </button>
      </div>
    </form>
  );
}

function LanguageFields({
  localeName,
  titleName,
  titleValue,
  shortName,
  shortValue,
  descriptionName,
  descriptionValue,
  onChange,
}: {
  localeName: string;
  titleName: string;
  titleValue: string;
  shortName: string;
  shortValue: string;
  descriptionName: string;
  descriptionValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {localeName}
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
        <label className={adminLabelClass}>Kisa aciklama</label>
        <textarea
          rows={3}
          name={shortName}
          value={shortValue}
          onChange={onChange}
          className={adminInputClass}
        />
      </div>
      <div>
        <label className={adminLabelClass}>Uzun aciklama</label>
        <textarea
          rows={7}
          name={descriptionName}
          value={descriptionValue}
          onChange={onChange}
          className={adminInputClass}
        />
      </div>
    </div>
  );
}

function DetailFields({
  suffix,
  formData,
  onChange,
}: {
  suffix: "TR" | "EN";
  formData: Record<string, string | boolean>;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  const labels =
    suffix === "TR"
      ? {
          problem: "Problem",
          solution: "Cozum",
          architecture: "Mimari",
          challenges: "Zorluklar",
          lessons: "Ogrenimler",
        }
      : {
          problem: "Problem",
          solution: "Solution",
          architecture: "Architecture",
          challenges: "Challenges",
          lessons: "Lessons",
        };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {suffix === "TR" ? "Turkce" : "English"}
      </h3>
      {Object.entries(labels).map(([field, label]) => (
        <div key={field}>
          <label className={adminLabelClass}>{label}</label>
          <textarea
            rows={3}
            name={`${field}${suffix}`}
            value={String(formData[`${field}${suffix}`] || "")}
            onChange={onChange}
            className={adminInputClass}
          />
        </div>
      ))}
    </div>
  );
}
