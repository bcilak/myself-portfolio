import type { Metadata } from "next";
import DemoLabClient from "./DemoLabClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";

  return {
    title: isTr ? "Canli Demo Laboratuvari" : "Live Demo Lab",
    description: isTr
      ? "Baris Cilak'in CBS, otomasyon ve veri analizi yeteneklerini gosteren interaktif demo laboratuvari."
      : "An interactive demo lab showcasing Baris Cilak's GIS, automation, and data analysis capabilities.",
  };
}

export default function DemoLabPage() {
  return <DemoLabClient />;
}
