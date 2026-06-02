import type { Metadata } from "next";
import DemoLabClient from "./DemoLabClient";
import { createSeoMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";

  return createSeoMetadata({
    locale,
    path: "/demo-lab",
    title: isTr ? "Canli Demo Laboratuvari" : "Live Demo Lab",
    description: isTr
      ? "Baris Cilak'in CBS, otomasyon ve veri analizi yeteneklerini gosteren interaktif demo laboratuvari."
      : "An interactive demo lab showcasing Baris Cilak's GIS, automation, and data analysis capabilities.",
    keywords: ["Demo Lab", "CBS demo", "GIS dashboard", "AI assistant demo", "otomasyon demo"],
  });
}

export default function DemoLabPage() {
  return <DemoLabClient />;
}
