export interface CaseStudy {
    slug: string;
    title: string;
    subtitle: string;
    category: string;
    icon: string;
    problem: string;
    approach: string;
    architecture: string;
    challenges: string[];
    lessons: string[];
    impact: string;
    technologies: string[];
}

export const caseStudiesEn: CaseStudy[] = [
    {
        slug: "whatsapp-chatbot",
        title: "Building a WhatsApp AI Chatbot",
        subtitle: "From 0 to 1,000 conversations/day",
        category: "AI Integration",
        icon: "💬",
        problem:
            "A customer support team was drowning in repetitive WhatsApp messages, spending 4+ hours daily on questions that could be answered automatically.",
        approach:
            "Integrated WhatsApp Business API with a FastAPI backend and OpenAI GPT-4, building a context-aware conversational agent with Redis-backed session memory.",
        architecture:
            "Webhook receives WhatsApp messages → FastAPI processes → Redis retrieves conversation context → GPT-4 generates response → WhatsApp API sends reply. All in under 2 seconds.",
        challenges: [
            "Maintaining conversation context across sessions",
            "Staying under 2-second response latency",
            "Handling WhatsApp rate limits gracefully",
            "Message deduplication to prevent double responses",
        ],
        lessons: [
            "Redis session caching is non-negotiable for context-aware chatbots",
            "Webhook idempotency keys prevent duplicate processing",
            "GPT-4 system prompts need exhaustive testing with real user inputs",
            "Fallback to human agent must be seamless and fast",
        ],
        impact: "70% reduction in support tickets, 4 hours saved daily",
        technologies: ["Python", "FastAPI", "OpenAI GPT-4", "Redis", "WhatsApp Business API", "Docker"],
    },
    {
        slug: "speech-to-text",
        title: "AI Speech-to-Text Architecture",
        subtitle: "Real-time transcription at scale",
        category: "AI / Backend",
        icon: "🎙️",
        problem:
            "A business needed accurate Turkish speech transcription with speaker identification and automatic meeting summaries, but off-the-shelf tools had poor Turkish accuracy.",
        approach:
            "Built a streaming transcription pipeline using OpenAI Whisper fine-tuned approach with custom post-processing NLP chain for Turkish language accuracy.",
        architecture:
            "Audio stream → chunking layer → Redis queue → Whisper inference workers → NLP post-processing (diarization, sentiment, summary) → WebSocket push to client.",
        challenges: [
            "Real-time processing with Whisper latency constraints",
            "Speaker diarization in Turkish with limited training data",
            "GPU resource management for cost efficiency",
            "WebSocket reconnection and stream recovery",
        ],
        lessons: [
            "Audio preprocessing (noise reduction, normalization) is as important as the model",
            "Chunk overlap strategy is critical for accurate sentence boundaries",
            "GPU spot instances with failover reduce costs by 60%",
            "Speaker embeddings need continuous learning from user feedback",
        ],
        impact: "95% transcription accuracy, 3x cheaper than existing solution",
        technologies: ["Python", "OpenAI Whisper", "WebSocket", "Redis", "Docker", "GPU Computing"],
    },
    {
        slug: "automation-pipelines",
        title: "Enterprise Automation Pipelines",
        subtitle: "Eliminating manual business processes",
        category: "Automation",
        icon: "⚙️",
        problem:
            "A company had 12+ manual data entry processes between CRM, ERP, email systems, and communication tools, consuming 20+ person-hours per week.",
        approach:
            "Built a visual workflow automation platform with 50+ service connectors, enabling business teams to create automations without engineering involvement.",
        architecture:
            "React workflow editor → Node.js execution engine → JSON DAG workflow storage → distributed worker pool → execution logs and monitoring dashboard.",
        challenges: [
            "Reliable retry logic for long-running multi-step workflows",
            "Rate limiting across 50+ different external API providers",
            "Schema evolution without breaking existing workflows",
            "Real-time execution visibility for non-technical users",
        ],
        lessons: [
            "Event-driven architecture with dead letter queues handles failures gracefully",
            "Visual error indicators are more valuable than detailed logs for business users",
            "Idempotent workflow steps prevent data duplication on retries",
            "A well-designed connector SDK accelerates adding new integrations 10x",
        ],
        impact: "20 person-hours/week saved, 12 manual processes automated",
        technologies: ["Node.js", "React", "PostgreSQL", "Redis", "Docker", "Power Automate"],
    },
];

export const caseStudiesTr: CaseStudy[] = [
    {
        slug: "whatsapp-chatbot",
        title: "WhatsApp Yapay Zeka Botu Geliştirme",
        subtitle: "Günde 0'dan 1.000 sohbete",
        category: "AI Entegrasyonu",
        icon: "💬",
        problem:
            "Müşteri destek ekibi tekrarlayan WhatsApp mesajlarıyla boğuşuyor, otomatik yanıtlanabilecek sorulara günde 4 saatten fazla zaman harcıyordu.",
        approach:
            "WhatsApp Business API'sini FastAPI arka ucu ve OpenAI GPT-4 ile birleştirerek Redis destekli oturum belleğine sahip, bağlamı anlayan konuşmaya dayalı bir ajan geliştirdim.",
        architecture:
            "Webhook WhatsApp mesajlarını alır → FastAPI işler → Redis konuşma bağlamını çeker → GPT-4 yanıt üretir → WhatsApp API yanıtı gönderir. Tümü 2 saniyenin altında.",
        challenges: [
            "Oturumlar arasında sohbet bağlamını koruma",
            "2 saniyenin altında yanıt süresinde kalma",
            "WhatsApp mesaj limitlerini sorunsuzca yönetme",
            "Çift yanıtı önlemek için mesajları tekilleştirme",
        ],
        lessons: [
            "Bağlam farkındalığına sahip botlar için Redis ile oturum önbellekleme tartışılmazdır",
            "Webhook idem-potency anahtarları (idempotency keys) tekrarlanan işlemleri önler",
            "GPT-4 sistem komutları gerçek kullanıcı girdileriyle kapsamlı şekilde test edilmelidir",
            "İnsan temsilciye dönüş süreci hızlı ve pürüzsüz olmalıdır",
        ],
        impact: "Destek taleplerinde %70 azalma, günde 4 saat tasarruf",
        technologies: ["Python", "FastAPI", "OpenAI GPT-4", "Redis", "WhatsApp Business API", "Docker"],
    },
    {
        slug: "speech-to-text",
        title: "Yapay Zeka Ses-Metin (Speech-to-Text) Mimarisi",
        subtitle: "Büyük ölçekte gerçek zamanlı deşifre",
        category: "AI / Backend",
        icon: "🎙️",
        problem:
            "Bir şirketin konuşmacı tanıma ve toplantı özetleme özellikleriyle doğru Türkçe ses deşifresine (transcription) ihtiyacı vardı ancak mevcut araçların Türkçe başarı oranı düşüktü.",
        approach:
            "Türkçe doğruluğunu artırmak için OpenAI Whisper tabanlı ve özel NLP son işleme (post-processing) zincirine sahip canlı (streaming) bir deşifre boru hattı oluşturdum.",
        architecture:
            "Ses akışı → parçalama katmanı → Redis kuyruğu → Whisper inference işçileri → NLP son işleme (ayırt etme, duygu analizi, özet) → İstemciye WebSocket bildirimi.",
        challenges: [
            "Whisper gecikme sınırları dahilinde gerçek zamanlı işlem",
            "Sınırlı eğitim verisiyle Türkçe konuşmacı ayrıştırma (diarization)",
            "Maliyet verimliliği için GPU kaynak yönetimi",
            "WebSocket kopmaları ve akış kurtarma",
        ],
        lessons: [
            "Ses ön işleme (gürültü azaltma vb.), modelin kendisi kadar önemlidir",
            "Ses parçası çakışma stratejisi (chunk overlap), doğru cümle sınırları için kritik öneme sahiptir",
            "Geri dönüş (failover) sistemine sahip kiralık (spot) GPU'lar maliyetleri %60 oranında azaltır",
            "Konuşmacı gömme (embedding) vektörleri kullanıcı geri dönüşleriyle sürekli öğrenmelidir",
        ],
        impact: "%95 deşifre doğruluğu ve mevcut çözümlerden 3 kat daha ucuz",
        technologies: ["Python", "OpenAI Whisper", "WebSocket", "Redis", "Docker", "GPU İşleme"],
    },
    {
        slug: "automation-pipelines",
        title: "Kurumsal Otomasyon Boru Hatları",
        subtitle: "Manuel iş süreçlerinin ortadan kaldırılması",
        category: "Otomasyon",
        icon: "⚙️",
        problem:
            "Bir şirket CRM, ERP, e-posta sistemleri ve iletişim araçları arasında her hafta 20+ adam/saat harcayan 12'den fazla manuel veri giriş sürecine sahipti.",
        approach:
            "50'den fazla servis bağlayıcısına (connector) sahip görsel iş akışı platformu kurdum. Böylece iş ekipleri mühendislere ihtiyaç duymadan otomasyonlar oluşturabiliyor.",
        architecture:
            "React iş akışı düzenleyici → Node.js yürütme motoru → JSON DAG iş akışı depolama → Dağıtık işçi havuzu → Yürütme logları ve izleme panosu.",
        challenges: [
            "Uzun süren çok adımlı iş akışları için güvenilir yeniden deneme (retry) mantığı",
            "50'den fazla dış API sağlayıcısında hız sınırları (rate limit) ve kota yönetimi",
            "Mevcut iş akışlarını bozmadan şema güncellemeleri yapma",
            "Teknik olmayan kullanıcılar için anlaşılır anlık akış izleme (monitoring)",
        ],
        lessons: [
            "Ölü mektup kuyruklarıyla (DLQ) olay güdümlü mimari, hataları ustaca idare eder",
            "İş kullanıcıları için görsel hata göstergeleri, detaylı loglardan bile daha değerlidir",
            "Üst üste binen iş akışı adımları (idempotent), yeniden denemelerde veri tekrarını önler",
            "İyi tasarlanmış bağlayıcı (connector) SDK, yeni entegrasyonlar ekleme hızını 10 kat artırır",
        ],
        impact: "Haftada 20 saat adam/saat tasarruf, 12 manuel sürecin tam otomasyonu",
        technologies: ["Node.js", "React", "PostgreSQL", "Redis", "Docker", "Power Automate"],
    },
];

export const getCaseStudies = (locale: string) => locale === "tr" ? caseStudiesTr : caseStudiesEn;
