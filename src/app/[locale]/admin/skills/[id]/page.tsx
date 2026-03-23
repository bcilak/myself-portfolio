import dbConnect from "@/lib/mongoose";
import Skill from "@/models/Skill";
import SkillForm from "@/components/admin/SkillForm";
import { notFound } from "next/navigation";

export default async function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
    await dbConnect();
    const { id } = await params;
    const skill = await Skill.findById(id).lean();

    if (!skill) notFound();

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Yetenek Düzenle</h1>
            <SkillForm initialData={JSON.parse(JSON.stringify(skill))} />
        </div>
    );
}
