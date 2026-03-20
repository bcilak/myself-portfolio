import EducationForm from "@/components/admin/EducationForm";
import dbConnect from "@/lib/mongoose";
import Education from "@/models/Education";

export default async function EditEducationFormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  
  const doc = await Education.findById(id).lean();
  let initialData = null;
  if (doc) {
      initialData = JSON.parse(JSON.stringify(doc));
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Eğitim Düzenle</h1>
      <EducationForm initialData={initialData} />
    </div>
  );
}
