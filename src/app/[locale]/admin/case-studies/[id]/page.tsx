import dbConnect from "@/lib/mongoose";
import CaseStudy from "@/models/CaseStudy";
import CaseStudyForm from "@/components/admin/CaseStudyForm";
import { notFound } from "next/navigation";

export default async function EditCaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
    await dbConnect();
    const { id } = await params;
    const item = await CaseStudy.findById(id).lean();

    if (!item) notFound();

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Örnek Olay Düzenle</h1>
            <CaseStudyForm initialData={JSON.parse(JSON.stringify(item))} />
        </div>
    );
}
