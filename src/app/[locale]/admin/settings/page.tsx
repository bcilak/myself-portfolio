import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongoose";
import Settings from "@/models/Settings";
import ClientSettingsForm from "./ClientSettingsForm";

export default async function AdminSettingsPage({ params }: { params: Promise<{ locale: string }> }) {
    const session = await getServerSession(authOptions);
    const { locale } = await params;
    if (!session) redirect(`/${locale}/admin/login`);

    await dbConnect();
    let settings = await Settings.findOne({}).lean();
    if (!settings) {
        settings = await Settings.create({});
    }

    const safeSettings = {
        titleTR: settings.titleTR,
        titleEN: settings.titleEN,
        descriptionTR: settings.descriptionTR,
        descriptionEN: settings.descriptionEN,
        keywords: settings.keywords,
        ogImageUrl: settings.ogImageUrl,
        googleVerification: settings.googleVerification,
        twitterHandle: settings.twitterHandle,
        siteUrl: settings.siteUrl,
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Genel Ayarlar & SEO</h1>
            </div>
            <ClientSettingsForm initialData={safeSettings} />
        </div>
    );
}
