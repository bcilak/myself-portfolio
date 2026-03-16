import BlogForm from "@/components/admin/BlogForm";
import dbConnect from "@/lib/mongoose";
import Blog from "@/models/Blog";

export default async function EditBlogFormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  
  const doc = await Blog.findById(id).lean();
  let initialData = null;
  if (doc) {
      initialData = JSON.parse(JSON.stringify(doc));
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Düzenle</h1>
      <BlogForm initialData={initialData} />
    </div>
  );
}