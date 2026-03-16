import ProjectForm from "@/components/admin/ProjectForm";
import dbConnect from "@/lib/mongoose";
import Project from "@/models/Project";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await dbConnect();

    const project = await Project.findById(id).lean();

    if (!project) notFound();

    // Modeldeki _id obje olacağı için string'e çevirmeliyiz
    const serializedProject = {
        ...project,
        _id: project._id.toString(),
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Projeyi Düzenle</h1>
            <ProjectForm initialData={serializedProject} />
        </div>
    );
}
