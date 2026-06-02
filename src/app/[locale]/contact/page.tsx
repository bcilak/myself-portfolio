import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContactClient from "./ContactClient";
import { createSeoMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Contact" });
    return createSeoMetadata({
        locale,
        path: "/contact",
        title: t("metaTitle"),
        description: t("metaDescription"),
        keywords: ["Barış Çilak iletişim", "freelance developer", "AI developer", "backend developer"],
    });
}

export default function ContactPage() {
    return <ContactClient />;
}
