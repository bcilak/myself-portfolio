import ExperienceForm from "@/components/admin/ExperienceForm";
import dbConnect from "@/lib/mongoose";
import Experience from "@/models/Experience";

export default async function EditExperienceFormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  
  const doc = await Experience.findById(id).lean();
  let initialData = null;
  if (doc) {
      initialData = JSON.parse(JSON.stringify(doc));
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Düzenle</h1>
      <ExperienceForm initialData={initialData} />
    </div>
  );
}