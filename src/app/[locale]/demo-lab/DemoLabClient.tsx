"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import AnimatedSection from "@/components/ui/AnimatedSection";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  CheckCircle2,
  Cpu,
  Database,
  Filter,
  Gauge,
  Layers,
  MapPin,
  MessageSquare,
  Play,
  Route,
  Server,
  Shield,
  Workflow,
} from "lucide-react";

type Region = "all" | "north" | "center" | "south";
type Priority = "critical" | "high" | "medium";
type DemoKey = "gis" | "ai" | "automation" | "api";
type ProjectType = "gis" | "ai" | "automation" | "dashboard" | "api";
type CurrentState = "manual" | "legacy" | "new" | "mixed";
type Goal = "speed" | "reporting" | "cost" | "experience" | "integration";

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

const projectDemos = [
  {
    key: "gis",
    title: "CBS Saha Takip Paneli",
    category: "GIS / Dashboard",
    problem: "Dağinik saha kayitlari, manuel rapor ve geciken onceliklendirme.",
    output: "Harita, risk skoru, bolge filtresi ve takip aksiyonu tek karar ekraninda.",
    metrics: ["4 bolge", "92% veri eslesme", "24s rapor"],
    icon: MapPin,
  },
  {
    key: "ai",
    title: "AI Destek Asistani",
    category: "AI / Support",
    problem: "Tekrarlayan sorular ve gec cevaplanan musteri talepleri.",
    output: "Bilgi tabani, niyet algilama, ozetleme ve insan devri olan akilli destek akisi.",
    metrics: ["7/24 cevap", "3 adim eskalasyon", "Webhook bildirim"],
    icon: Bot,
  },
  {
    key: "automation",
    title: "Operasyon Otomasyonu",
    category: "Workflow / Webhook",
    problem: "Excel, e-posta ve manuel kontrol arasinda kaybolan isler.",
    output: "Trigger, kural kontrolu, bildirim, log ve durum takibi olan otomasyon zinciri.",
    metrics: ["5 otomatik adim", "SLA takibi", "Log kaydi"],
    icon: Workflow,
  },
  {
    key: "api",
    title: "API Entegrasyon Merkezi",
    category: "Backend / Integration",
    problem: "Farkli servislerden gelen veri tek yerde okunamiyor.",
    output: "Guvenli API katmani, veri normalize etme, cache ve izlenebilir endpoint yapisi.",
    metrics: ["REST API", "Rate limit", "Health check"],
    icon: Server,
  },
] satisfies Array<{
  key: DemoKey;
  title: string;
  category: string;
  problem: string;
  output: string;
  metrics: string[];
  icon: typeof MapPin;
}>;

const analyzerOptions = {
  projectType: [
    { value: "gis", label: "CBS / GIS" },
    { value: "ai", label: "AI chatbot" },
    { value: "automation", label: "Otomasyon" },
    { value: "dashboard", label: "Dashboard" },
    { value: "api", label: "Backend API" },
  ],
  currentState: [
    { value: "manual", label: "Excel / manuel surec" },
    { value: "legacy", label: "Eski sistem var" },
    { value: "new", label: "Sifirdan proje" },
    { value: "mixed", label: "Dağinik araclar" },
  ],
  goal: [
    { value: "speed", label: "Hiz kazanmak" },
    { value: "reporting", label: "Raporlama" },
    { value: "cost", label: "Maliyet dusurmek" },
    { value: "experience", label: "Kullanici deneyimi" },
    { value: "integration", label: "Entegrasyon" },
  ],
} satisfies {
  projectType: Array<{ value: ProjectType; label: string }>;
  currentState: Array<{ value: CurrentState; label: string }>;
  goal: Array<{ value: Goal; label: string }>;
};

const decisionMap = [
  {
    title: "Next.js",
    reason: "SEO, hizli sayfa gecisleri ve admin tarafini ayni urunde toplamak icin.",
    when: "Portfolyo, dashboard, panel ve icerik yonetimi gereken projeler.",
    icon: Cpu,
  },
  {
    title: "FastAPI / API Katmani",
    reason: "Yuksek performansli servisler, otomasyon endpointleri ve entegrasyon mantigi icin.",
    when: "Harici servislerle konusan, veri isleyen veya AI kullanan sistemler.",
    icon: Server,
  },
  {
    title: "MongoDB / PostgreSQL",
    reason: "Veri modeline gore esnek dokuman ya da iliskisel veri yapisi secimi.",
    when: "Icerik, log, mesaj, lokasyon ve operasyon verilerini saklamak icin.",
    icon: Database,
  },
  {
    title: "Webhook Bildirimleri",
    reason: "Mesaj, hata, basvuru ve kritik olaylari aninda haber vermek icin.",
    when: "Admin panel beklemeden aksiyon alinmasi gereken is akislari.",
    icon: Bell,
  },
  {
    title: "Docker / DigitalOcean",
    reason: "Taşinabilir deploy, daha net runtime ve canli ortam kontrolu icin.",
    when: "Canliya alinacak ve surdurulebilir olmasi gereken projeler.",
    icon: Shield,
  },
  {
    title: "AI Entegrasyonu",
    reason: "Kullaniciyi yonlendirmek, veriyi ozetlemek ve tekrar eden isleri azaltmak icin.",
    when: "Destek, analiz, dokuman, raporlama veya akilli form senaryolari.",
    icon: MessageSquare,
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
  const [activeDemo, setActiveDemo] = useState<DemoKey>("gis");
  const [projectType, setProjectType] = useState<ProjectType>("gis");
  const [currentState, setCurrentState] = useState<CurrentState>("manual");
  const [goal, setGoal] = useState<Goal>("reporting");

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

  const selectedDemo = projectDemos.find((demo) => demo.key === activeDemo) || projectDemos[0];

  const analysis = useMemo(() => {
    const architectureByType: Record<ProjectType, string> = {
      gis: "Harita tabanli dashboard + lokasyon verisi + risk skoru",
      ai: "AI asistan + bilgi tabani + insan devri + mesaj loglari",
      automation: "Trigger + kural motoru + webhook + operasyon loglari",
      dashboard: "Yonetim paneli + metrikler + filtrelenebilir raporlar",
      api: "Guvenli API katmani + veri normalizasyonu + health check",
    };

    const firstStepByState: Record<CurrentState, string> = {
      manual: "Mevcut Excel ve manuel adimlari tek tek modellemek",
      legacy: "Eski sistemdeki veri, rol ve entegrasyon noktalarini cikarmak",
      new: "MVP kapsamını daraltip ilk calisan prototipi tasarlamak",
      mixed: "Dağinik araclari veri akisi ve sorumluluklara gore birlestirmek",
    };

    const successByGoal: Record<Goal, string> = {
      speed: "Tekrarlayan adimlari otomatiklestirip bekleme surelerini azaltmak",
      reporting: "Karar verilebilir, filtrelenebilir ve export edilebilir raporlar uretmek",
      cost: "Manuel kontrol ve tekrar isleri azaltarak operasyon maliyetini dusurmek",
      experience: "Kullaniciya daha az tiklama ve daha net yonlendirme vermek",
      integration: "Sistemleri API ve webhook mantigi ile birbirine baglamak",
    };

    return {
      architecture: architectureByType[projectType],
      firstStep: firstStepByState[currentState],
      success: successByGoal[goal],
      modules: [
        "Kullanici ve rol yapisi",
        "Veri modeli ve validasyon",
        "Bildirim / takip sistemi",
        "Admin panel ve rapor ekrani",
      ],
      risks: [
        currentState === "manual" ? "Veri standardi eksik olabilir" : "Mevcut sistem entegrasyonu dikkat ister",
        goal === "integration" ? "Harici servis limitleri planlanmali" : "Kapsam buyumesi MVP hizini dusurebilir",
      ],
    };
  }, [currentState, goal, projectType]);

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

        <AnimatedSection delay={0.12}>
          <section className="mt-8 glass-card rounded-2xl p-6">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-cyan-500">
                  {isTr ? "Ornek proje demolari" : "Sample project demos"}
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">
                  {isTr ? "Farkli is problemleri icin kucuk cozum vitrinleri" : "Small solution previews for different business problems"}
                </h2>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-500/30 px-4 py-2 text-sm font-semibold text-cyan-600 transition hover:bg-cyan-500/10 dark:text-cyan-400"
              >
                {isTr ? "Bunu kendi projem icin konusalim" : "Discuss this for my project"}
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {projectDemos.map((demo) => {
                  const Icon = demo.icon;
                  return (
                    <button
                      key={demo.key}
                      onClick={() => setActiveDemo(demo.key)}
                      className={`rounded-xl border p-4 text-left transition ${
                        activeDemo === demo.key
                          ? "border-cyan-500/40 bg-cyan-500/10"
                          : "border-black/10 bg-black/[0.02] hover:border-cyan-500/30 dark:border-white/10 dark:bg-white/[0.03]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500">
                          <Icon size={20} />
                        </span>
                        <div>
                          <p className="text-sm font-bold text-slate-950 dark:text-white">{demo.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{demo.category}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="rounded-2xl border border-black/10 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-950/70">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">{selectedDemo.category}</p>
                    <h3 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">{selectedDemo.title}</h3>
                  </div>
                  <Gauge className="text-cyan-500" size={28} />
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-500">
                      {isTr ? "Problem" : "Problem"}
                    </p>
                    <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      {selectedDemo.problem}
                    </p>
                  </div>
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-500">
                      {isTr ? "Cikti" : "Output"}
                    </p>
                    <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      {selectedDemo.output}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {selectedDemo.metrics.map((metric) => (
                    <div key={metric} className="rounded-lg border border-black/10 bg-white p-3 text-center dark:border-white/10 dark:bg-slate-900">
                      <p className="text-sm font-bold text-slate-950 dark:text-white">{metric}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.16}>
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-cyan-500">
                <Workflow size={17} />
                {isTr ? "Is akisi oncesi analiz" : "Pre-workflow analysis"}
              </div>
              <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">
                {isTr ? "Proje daha baslamadan yol haritasi cikar" : "Get a roadmap before the project starts"}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {isTr
                  ? "Birkac secimle ihtiyaci siniflandirir, ilk mimariyi, riskleri ve MVP modullerini gorunur hale getirir."
                  : "A few choices classify the need and reveal the first architecture, risks, and MVP modules."}
              </p>

              <div className="mt-6 space-y-4">
                <AnalyzerSelect
                  label={isTr ? "Proje tipi" : "Project type"}
                  value={projectType}
                  options={analyzerOptions.projectType}
                  onChange={(value) => setProjectType(value as ProjectType)}
                />
                <AnalyzerSelect
                  label={isTr ? "Mevcut durum" : "Current state"}
                  value={currentState}
                  options={analyzerOptions.currentState}
                  onChange={(value) => setCurrentState(value as CurrentState)}
                />
                <AnalyzerSelect
                  label={isTr ? "Ana hedef" : "Main goal"}
                  value={goal}
                  options={analyzerOptions.goal}
                  onChange={(value) => setGoal(value as Goal)}
                />
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-cyan-500">
                    {isTr ? "Onerilen analiz sonucu" : "Suggested analysis result"}
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-slate-950 dark:text-white">
                    {isTr ? "Ilk teknik yol haritasi" : "First technical roadmap"}
                  </h3>
                </div>
                <CheckCircle2 className="text-emerald-500" size={26} />
              </div>

              <div className="space-y-4">
                <AnalysisBlock title={isTr ? "Mimari" : "Architecture"} text={analysis.architecture} />
                <AnalysisBlock title={isTr ? "Ilk adim" : "First step"} text={analysis.firstStep} />
                <AnalysisBlock title={isTr ? "Basari olcutu" : "Success measure"} text={analysis.success} />

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {isTr ? "MVP modulleri" : "MVP modules"}
                    </p>
                    <ul className="space-y-2">
                      {analysis.modules.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <CheckCircle2 size={15} className="text-cyan-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {isTr ? "Dikkat edilecekler" : "Watch points"}
                    </p>
                    <ul className="space-y-2">
                      {analysis.risks.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <Shield size={15} className="text-amber-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.18}>
          <section className="mt-8 glass-card rounded-2xl p-6">
            <div className="mb-6 max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-cyan-500">
                {isTr ? "Teknik karar haritasi" : "Technical decision map"}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">
                {isTr ? "Teknoloji secimini ezbere degil, probleme gore yapiyorum" : "Technology choices are matched to the problem"}
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {decisionMap.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-xl border border-black/10 bg-black/[0.02] p-5 dark:border-white/10 dark:bg-white/[0.03]">
                    <Icon className="mb-4 text-cyan-500" size={24} />
                    <h3 className="font-bold text-slate-950 dark:text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.reason}</p>
                    <p className="mt-4 rounded-lg bg-cyan-500/10 p-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                      {item.when}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        </AnimatedSection>

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

function AnalyzerSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-400">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-black/10 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-cyan-500/50 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-200"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function AnalysisBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.03]">
      <p className="text-xs font-semibold uppercase tracking-wider text-cyan-500">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{text}</p>
    </div>
  );
}
