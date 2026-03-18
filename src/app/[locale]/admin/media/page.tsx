import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongoose";
import Media from "@/models/Media";
import ClientMediaGallery from "./ClientMediaGallery";

export default async function AdminMediaPage({ params }: { params: Promise<{ locale: string }> }) {
    const session = await getServerSession(authOptions);
    const { locale } = await params;

    if (!session) {
        redirect(`/${locale}/admin/login`);
    }

    await dbConnect();
    const mediaList = await Media.find({}).sort({ createdAt: -1 }).lean();

    const safeMediaList = mediaList.map((m: any) => ({
        _id: m._id.toString(),
        name: m.name,
        url: m.url
    }));

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Medya Kütüphanesi</h1>
            </div>
            <ClientMediaGallery mediaList={safeMediaList} />
        </div>
    );
}
