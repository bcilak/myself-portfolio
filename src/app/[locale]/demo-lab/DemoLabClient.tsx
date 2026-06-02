"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import AnimatedSection from "@/components/ui/AnimatedSection";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Filter,
  Layers,
  MapPin,
  Play,
  Route,
  Workflow,
} from "lucide-react";

type Region = "all" | "north" | "center" | "south";
type Priority = "critical" | "high" | "medium";

type SiteRecord = {
  id: string;
  name: string;
  region: Exclude<Region, "all">;
  type: string;
  priority: Priority;
  completion: number;
  x: number;
  y: number;
  insight: string;
};

const records: SiteRecord[] = [
  {
    id: "station-01",
    name: "Kuzey Saha Istasyonu",
    region: "north",
    type: "Altyapi",
    priority: "high",
    completion: 74,
    x: 32,
    y: 26,
    insight: "Bakim planlandi, parca bekleniyor.",
  },
  {
    id: "asset-02",
    name: "Merkez Varlik Bolgesi",
    region: "center",
    type: "Operasyon",
    priority: "critical",
    completion: 41,
    x: 54,
    y: 48,
    insight: "Risk skoru yuksek, once saha ziyareti onerilir.",
  },
  {
    id: "route-03",
    name: "Guney Rota Hatti",
    region: "south",
    type: "Lojistik",
    priority: "medium",
    completion: 88,
    x: 67,
    y: 72,
    insight: "Akis saglikli, yalnizca periyodik kontrol gerekli.",
  },
  {
    id: "survey-04",
    name: "Bati Kontrol Noktasi",
    region: "center",
    type: "Denetim",
    priority: "high",
    completion: 63,
    x: 42,
    y: 57,
    insight: "Eksik veri tamamlaninca rapora alinabilir.",
  },
];

const workflows = [
  {
    title: "CBS karar paneli",
    text: "Konumsal kayitlari filtreler, onceliklendirir ve saha ekipleri icin okunur hale getirir.",
    icon: MapPin,
  },
  {
    title: "Otomasyon akisi",
    text: "Trigger, kontrol, bildirim ve log adimlarini tek ekranda izlenebilir hale getirir.",
    icon: Workflow,
  },
  {
    title: "Veri kalite kontrolu",
    text: "Eksik, riskli veya oncelikli kayitlari karar alinabilir sinyallere donusturur.",
    icon: BarChart3,
  },
];

const regionLabels = {
  all: "Tum bolgeler",
  north: "Kuzey",
  center: "Merkez",
  south: "Guney",
};

export default function DemoLabClient() {
  const locale = useLocale();
  const isTr = locale === "tr";
  const [region, setRegion] = useState<Region>("all");
  const [selectedId, setSelectedId] = useState(records[1].id);
  const [simulationStep, setSimulationStep] = useState(2);

  const filteredRecords = useMemo(
    () => records.filter((record) => region === "all" || record.region === region),
    [region]
  );

  const selected =
    filteredRecords.find((record) => record.id === selectedId) ||
    filteredRecords[0] ||
    records[0];

  const averageCompletion = Math.round(
    filteredRecords.reduce((sum, record) => sum + record.completion, 0) /
      Math.max(filteredRecords.length, 1)
  );

  const criticalCount = filteredRecords.filter(
    (record) => record.priority === "critical" || record.priority === "high"
  ).length;

  const copy = {
    eyebrow: isTr ? "Canli Demo Laboratuvari" : "Live Demo Lab",
    title: isTr
      ? "Okumak yerine deneyimleyin: sistem tasarlama kasim burada calisiyor."
      : "Do not just read the portfolio. Try the thinking behind the systems.",
    description: isTr
      ? "Bu alan, CBS, otomasyon ve veri analizi yaklasimimi kucuk ama calisan urun parcalariyla gosterir. Amacim sadece teknoloji listesi sunmak degil; karmasik operasyonu sade karar ekranina cevirebildigimi kanitlamak."
      : "This space shows my GIS, automation, and data-analysis approach through small working product slices. The point is not a technology list; it is proof that I can turn messy operations into clear decision systems.",
    contact: isTr ? "Benzer sistemi konusalim" : "Discuss a similar system",
    projects: isTr ? "Projeleri incele" : "View projects",
  };

  return (
    <div className="pt-24">
      <div className="mx-auto max-w-6xl px-6 pb-24">
        <AnimatedSection>
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-cyan-500">
              {copy.eyebrow}
            </p>
            <h1 className="mb-5 text-4xl font-bold leading-tight text-slate-950 dark:text-slate-100 md:text-5xl">
              {copy.title}
            </h1>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              {copy.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-400"
              >
                {copy.contact}
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-black/10 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-500/40 hover:text-cyan-500 dark:border-white/10 dark:text-slate-300"
              >
                {copy.projects}
              </Link>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid gap-6 lg:grid-cols-[1.45fr_0.9fr]">
          <AnimatedSection>
            <section className="glass-card overflow-hidden rounded-2xl">
              <div className="border-b border-black/5 p-5 dark:border-white/5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-cyan-500">
                      <Layers size={17} />
                      {isTr ? "CBS mini panel" : "GIS mini panel"}
                    </div>
                    <h2 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">
                      {isTr ? "Bolge ve oncelik analizi" : "Region and priority analysis"}
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(regionLabels) as Region[]).map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setRegion(item);
                          const first = records.find(
                            (record) => item === "all" || record.region === item
                          );
                          if (first) setSelectedId(first.id);
                        }}
                        className={`rounded-md px-3 py-2 text-xs font-semibold transition ${
                          region === item
                            ? "bg-cyan-500 text-black"
                            : "bg-black/5 text-slate-600 hover:bg-cyan-500/10 hover:text-cyan-600 dark:bg-white/5 dark:text-slate-300"
                        }`}
                      >
                        {regionLabels[item]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-0 md:grid-cols-[1.25fr_0.75fr]">
                <div className="relative min-h-[430px] overflow-hidden bg-slate-100 dark:bg-slate-950">
                  <div className="absolute inset-0 opacity-70">
                    <div className="absolute left-[12%] top-[18%] h-48 w-64 rounded-[45%] border border-cyan-500/20" />
                    <div className="absolute left-[38%] top-[28%] h-56 w-72 rounded-[48%] border border-blue-500/20" />
                    <div className="absolute left-[24%] top-[56%] h-36 w-80 rounded-[50%] border border-emerald-500/20" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.08)_1px,transparent_1px)] bg-[size:34px_34px] dark:bg-[linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)]" />
                  </div>

                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path
                      d="M32 26 C42 34, 48 42, 54 48 S62 62, 67 72"
                      fill="none"
                      stroke="rgba(6,182,212,.55)"
                      strokeWidth="1.4"
                      strokeDasharray="2 2"
                    />
                  </svg>

                  {filteredRecords.map((record) => (
                    <button
                      key={record.id}
                      onClick={() => setSelectedId(record.id)}
                      className={`absolute z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 shadow-lg transition ${
                        selected.id === record.id
                          ? "scale-110 border-cyan-300 bg-cyan-500 text-black"
                          : record.priority === "critical"
                            ? "border-red-300 bg-red-500 text-white"
                            : record.priority === "high"
                              ? "border-amber-300 bg-amber-500 text-black"
                              : "border-emerald-300 bg-emerald-500 text-black"
                      }`}
                      style={{ left: `${record.x}%`, top: `${record.y}%` }}
                      aria-label={record.name}
                    >
                      <MapPin size={18} />
                    </button>
                  ))}

                  <div className="absolute bottom-4 left-4 right-4 z-20 grid gap-3 sm:grid-cols-3">
                    <Metric label={isTr ? "Kayit" : "Records"} value={filteredRecords.length} />
                    <Metric label={isTr ? "Oncelikli" : "Priority"} value={criticalCount} />
                    <Metric label={isTr ? "Tamamlanma" : "Completion"} value={`${averageCompletion}%`} />
                  </div>
                </div>

                <aside className="border-t border-black/5 p-5 dark:border-white/5 md:border-l md:border-t-0">
                  <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                    <Filter size={16} />
                    {isTr ? "Secili kayit" : "Selected record"}
                  </div>
                  <h3 className="text-xl font-bold text-slate-950 dark:text-white">{selected.name}</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {regionLabels[selected.region]} · {selected.type}
                  </p>

                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <span>{isTr ? "Saha tamamlanma" : "Field completion"}</span>
                      <span>{selected.completion}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-black/10 dark:bg-white/10">
                      <div
                        className="h-2 rounded-full bg-cyan-500"
                        style={{ width: `${selected.completion}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-5 rounded-lg border border-cyan-500/20 bg-cyan-500/10 p-4">
                    <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      {selected.insight}
                    </p>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      isTr ? "Bolge bazli filtreleme" : "Region filtering",
                      isTr ? "Risk ve oncelik sinyali" : "Risk and priority signal",
                      isTr ? "Raporlamaya hazir veri" : "Reporting-ready data",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <CheckCircle2 size={16} className="text-emerald-500" />
                        {item}
                      </div>
                    ))}
                  </div>
                </aside>
              </div>
            </section>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <section className="glass-card h-full rounded-2xl p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-cyan-500">
                <Play size={17} />
                {isTr ? "Otomasyon simülasyonu" : "Automation simulation"}
              </div>
              <h2 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">
                {isTr ? "Is akisi nasil dusunulur?" : "How the workflow is designed"}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {isTr
                  ? "Bir kayit riskli oldugunda sistem sadece uyari vermez; kontrol, bildirim ve takip adimlarini siraya koyar."
                  : "When a record becomes risky, the system does more than warn; it coordinates checks, notifications, and follow-up."}
              </p>

              <div className="mt-6 space-y-3">
                {[
                  isTr ? "Kayit tetiklendi" : "Record triggered",
                  isTr ? "Risk kurali calisti" : "Risk rule evaluated",
                  isTr ? "Bildirim hazirlandi" : "Notification prepared",
                  isTr ? "Takip raporu olustu" : "Follow-up report created",
                ].map((step, index) => (
                  <button
                    key={step}
                    onClick={() => setSimulationStep(index)}
                    className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition ${
                      index <= simulationStep
                        ? "border-cyan-500/30 bg-cyan-500/10"
                        : "border-black/10 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.03]"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        index <= simulationStep ? "bg-cyan-500 text-black" : "bg-slate-200 text-slate-500 dark:bg-slate-800"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{step}</span>
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-lg bg-slate-950 p-4 text-xs text-cyan-100 shadow-inner dark:bg-black">
                <div className="mb-2 flex items-center gap-2 text-cyan-400">
                  <Route size={15} />
                  {isTr ? "Sistem ciktisi" : "System output"}
                </div>
                <p className="font-mono leading-relaxed">
                  {simulationStep >= 3
                    ? "status: ready_for_report · owner: field-team · priority: high"
                    : simulationStep >= 2
                      ? "notification: queued · channel: webhook · sla: 24h"
                      : simulationStep >= 1
                        ? "rule: risk_score > threshold · action: review"
                        : "event: location_record.updated"}
                </p>
              </div>
            </section>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.15}>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {workflows.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="glass-card rounded-xl p-5">
                  <Icon className="mb-4 text-cyan-500" size={24} />
                  <h3 className="font-semibold text-slate-950 dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-lg border border-white/50 bg-white/80 p-3 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/80">
      <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-bold text-slate-950 dark:text-white">{value}</p>
    </div>
  );
}
