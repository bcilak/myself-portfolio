export interface Project {
    id: string;
    slug: string;
    title: string;
    shortDescription: string;
    description: string;
    technologies: string[];
    githubUrl: string;
    demoUrl: string;
    featured: boolean;
    problem: string;
    solution: string;
    architecture: string;
    challenges: string;
    lessons: string;
    screenshots: string[];
    createdAt: string;
    views?: number;
    likes?: number;
}

export const projectsEn: Project[] = [
    {
        id: "1",
        slug: "whatsapp-ai-chatbot",
        title: "WhatsApp AI Chatbot",
        shortDescription:
            "An intelligent WhatsApp chatbot powered by OpenAI GPT-4 for automated customer support.",
        description:
            "A production-ready WhatsApp chatbot that integrates the WhatsApp Business API with OpenAI GPT-4 to deliver intelligent, context-aware automated responses. The bot handles FAQs, appointment scheduling, and escalates complex queries to human agents.",
        technologies: ["Python", "FastAPI", "OpenAI API", "WhatsApp Business API", "PostgreSQL", "Redis", "Docker"],
        githubUrl: "https://github.com/bcilak",
        demoUrl: "#",
        featured: true,
        problem:
            "Customer support teams were overwhelmed with repetitive queries, causing long response times and poor customer satisfaction scores.",
        solution:
            "Built an AI-powered chatbot using OpenAI GPT-4 with a custom knowledge base and conversation memory, reducing support load by 70%.",
        architecture:
            "FastAPI backend handles incoming webhook messages from WhatsApp Business API. Messages are processed through a pipeline: intent classification → knowledge base retrieval → GPT-4 completion → response delivery. Redis caches conversation context for multi-turn dialogues. PostgreSQL stores conversation history and user profiles.",
        challenges:
            "The main challenge was maintaining conversation context across sessions while keeping response latency under 2 seconds. Also had to handle WhatsApp's rate limiting and message deduplication.",
        lessons:
            "Learned the importance of prompt engineering for consistent output quality. Redis proved essential for sub-second context retrieval. Proper webhook validation prevents significant security issues.",
        screenshots: [],
        createdAt: "2024-11-01",
    },
    {
        id: "2",
        slug: "ai-speech-to-text-platform",
        title: "AI Speech-to-Text Platform",
        shortDescription:
            "Real-time speech transcription and analysis platform using OpenAI Whisper and custom NLP pipelines.",
        description:
            "A scalable platform for real-time audio transcription with speaker diarization, sentiment analysis, and keyword extraction. Used for meeting transcription, call center analytics, and content accessibility.",
        technologies: ["Python", "FastAPI", "OpenAI Whisper", "Docker", "PostgreSQL", "WebSocket", "React"],
        githubUrl: "https://github.com/bcilak",
        demoUrl: "#",
        featured: true,
        problem:
            "Organizations needed accurate, real-time transcription of meetings and calls with actionable insights, but existing solutions were expensive or inaccurate in Turkish.",
        solution:
            "Built a custom pipeline around OpenAI Whisper with post-processing NLP steps for speaker identification, sentiment analysis, and automatic summarization.",
        architecture:
            "WebSocket server receives audio streams in chunks, queues them in Redis for processing, and runs Whisper inference on GPU. NLP pipeline extracts entities, sentiments, and generates summaries. Results are streamed back to clients in real-time via WebSocket.",
        challenges:
            "Real-time processing with Whisper required careful chunking strategy to balance accuracy and latency. Speaker diarization was complex and required training custom embeddings.",
        lessons:
            "GPU resource management is critical for cost efficiency. Proper audio preprocessing (noise reduction, normalization) dramatically improves Whisper accuracy.",
        screenshots: [],
        createdAt: "2024-08-15",
    },
    {
        id: "3",
        slug: "automation-pipeline-engine",
        title: "Automation Pipeline Engine",
        shortDescription:
            "A no-code automation engine integrating 50+ services with visual workflow builder.",
        description:
            "A Power Automate-inspired automation platform allowing business teams to create multi-step workflows connecting CRM, ERP, email, and communication tools without writing code.",
        technologies: ["Node.js", "Express", "React", "PostgreSQL", "Docker", "Redis", "Power Automate"],
        githubUrl: "https://github.com/bcilak",
        demoUrl: "#",
        featured: true,
        problem:
            "Business teams spent hours on manual data entry between disconnected systems. IT was the bottleneck for every integration request.",
        solution:
            "Developed a visual workflow builder with 50+ pre-built connectors, enabling business users to automate cross-system workflows themselves.",
        architecture:
            "React-based drag-and-drop workflow editor sends workflow definitions to Node.js execution engine. Workflows are stored as JSON DAGs in PostgreSQL. Worker processes execute workflow steps with retry logic, error handling, and execution logs stored per step.",
        challenges:
            "Building reliable retry and error recovery for long-running workflows involving external API calls was complex. Rate limiting across different provider APIs required an intelligent throttling layer.",
        lessons:
            "Event-driven architecture significantly improves reliability over polling. Clear error messages and visual debugging tools are more valuable than extra features.",
        screenshots: [],
        createdAt: "2024-05-20",
    },
    {
        id: "4",
        slug: "data-processing-etl",
        title: "Data Processing & ETL Framework",
        shortDescription:
            "High-performance ETL framework processing millions of records daily with data quality checks.",
        description:
            "A Python-based ETL framework for processing large-scale data from multiple sources (APIs, databases, files), applying transformations, running quality checks, and loading into a data warehouse.",
        technologies: ["Python", "PostgreSQL", "Docker", "Pandas", "SQLAlchemy", "Airflow", "Redis"],
        githubUrl: "https://github.com/bcilak",
        demoUrl: "#",
        featured: false,
        problem:
            "Multiple legacy data pipelines were failing silently, delivering stale and incorrect data to business dashboards.",
        solution:
            "Rewrote all pipelines using a unified ETL framework with comprehensive logging, data quality assertions, and automated alerts.",
        architecture:
            "Airflow orchestrates daily ETL runs. Python extraction modules pull data from sources, pandas transforms and validates records, SQLAlchemy loads to PostgreSQL. Data quality checks run as separate tasks with anomaly detection.",
        challenges:
            "Handling schema evolution in source systems without breaking downstream pipelines required a flexible schema registry approach.",
        lessons:
            "Data contracts between teams prevent most pipeline failures. Monitoring data freshness is as important as monitoring errors.",
        screenshots: [],
        createdAt: "2024-02-10",
    },
];


export const projectsTr: Project[] = [
    {
        id: "1",
        slug: "whatsapp-ai-chatbot",
        title: "WhatsApp Yapay Zeka Botu",
        shortDescription:
            "Otomatik müşteri desteği için OpenAI GPT-4 tarafından desteklenen akıllı bir WhatsApp sohbet robotu.",
        description:
            "Akıllı, bağlama duyarlı otomatik yanıtlar sunmak için WhatsApp Business API'sini OpenAI GPT-4 ile entegre eden, üretime hazır bir WhatsApp sohbet robotu. Bot, SSS'leri, randevu planlamasını yönetir ve karmaşık sorguları insan temsilcilere aktarır.",
        technologies: ["Python", "FastAPI", "OpenAI API", "WhatsApp Business API", "PostgreSQL", "Redis", "Docker"],
        githubUrl: "https://github.com/bcilak",
        demoUrl: "#",
        featured: true,
        problem:
            "Müşteri destek ekipleri tekrarlayan sorgularla boğuşuyordu, bu da uzun yanıt sürelerine ve düşük müşteri memnuniyeti puanlarına neden oluyordu.",
        solution:
            "Özel bir bilgi tabanı ve konuşma belleği ile OpenAI GPT-4 kullanarak, destek yükünü %70 oranında azaltan yapay zeka destekli bir sohbet robotu geliştirdik.",
        architecture:
            "FastAPI arka ucu, WhatsApp Business API'sinden gelen webhook mesajlarını işler. Mesajlar bir boru hattından geçer: niyet sınıflandırması → bilgi tabanı alımı → GPT-4 tamamlama → yanıt teslimi. Redis, çok turlu diyaloglar için konuşma bağlamını önbelleğe alır. PostgreSQL, konuşma geçmişini ve kullanıcı profillerini saklar.",
        challenges:
            "Ana zorluk, yanıt gecikmesini 2 saniyenin altında tutarken oturumlar arasında konuşma bağlamını korumaktı. Ayrıca WhatsApp'ın hız sınırlamasını ve mesaj tekilleştirmesini de yönetmek gerekiyordu.",
        lessons:
            "Tutarlı çıktı kalitesi için istem mühendisliğinin önemini öğrendim. Redis'in saniyenin altında bağlam alımı için çok önemli olduğu kanıtlandı. Uygun webhook doğrulaması önemli güvenlik sorunlarını önler.",
        screenshots: [],
        createdAt: "2024-11-01",
    },
    {
        id: "2",
        slug: "ai-speech-to-text-platform",
        title: "Yapay Zeka Ses-Metin Platformu",
        shortDescription:
            "OpenAI Whisper ve özel NLP ardışık düzenleri kullanan gerçek zamanlı konuşma transkripsiyon ve analiz platformu.",
        description:
            "Konuşmacı ayrıştırma, duygu analizi ve anahtar kelime çıkarma ile gerçek zamanlı ses transkripsiyonu için ölçeklenebilir bir platform. Toplantı transkripsiyonu, çağrı merkezi analitiği ve içerik erişilebilirliği için kullanılır.",
        technologies: ["Python", "FastAPI", "OpenAI Whisper", "Docker", "PostgreSQL", "WebSocket", "React"],
        githubUrl: "https://github.com/bcilak",
        demoUrl: "#",
        featured: true,
        problem:
            "Kuruluşların eyleme dönüştürülebilir içgörülerle toplantı ve çağrıların doğru, gerçek zamanlı transkripsiyonuna ihtiyacı vardı, ancak mevcut çözümler pahalıydı veya Türkçe için hatalıydı.",
        solution:
            "Konuşmacı tanıma, duygu analizi ve otomatik özetleme için işlem sonrası NLP adımları ile OpenAI Whisper etrafında özel bir ardışık düzen oluşturduk.",
        architecture:
            "WebSocket sunucusu ses akışlarını parçalar halinde alır, işlenmek üzere Redis'te sıraya koyar ve GPU üzerinde Whisper çıkarımı çalıştırır. NLP boru hattı varlıkları, duyguları çıkarır ve özetler üretir. Sonuçlar WebSocket aracılığıyla gerçek zamanlı olarak istemcilere geri aktarılır.",
        challenges:
            "Whisper ile gerçek zamanlı işleme, doğruluk ve gecikmeyi dengelemek için dikkatli bir parçalama stratejisi gerektiriyordu. Konuşmacı ayrıştırma karmaşıktı ve özel yerleştirmelerin eğitilmesini gerektiriyordu.",
        lessons:
            "GPU kaynak yönetimi maliyet verimliliği için kritik öneme sahiptir. Uygun ses ön işleme (gürültü azaltma, normalleştirme) Whisper doğruluğunu önemli ölçüde artırır.",
        screenshots: [],
        createdAt: "2024-08-15",
    },
    {
        id: "3",
        slug: "automation-pipeline-engine",
        title: "Otomasyon Boru Hattı Motoru",
        shortDescription:
            "Görsel iş akışı oluşturucu ile 50'den fazla hizmeti entegre eden kodsuz bir otomasyon motoru.",
        description:
            "İş ekiplerinin kod yazmadan CRM, ERP, e-posta ve iletişim araçlarını birbirine bağlayan çok adımlı iş akışları oluşturmasına olanak tanıyan Power Automate ilhamlı bir otomasyon platformu.",
        technologies: ["Node.js", "Express", "React", "PostgreSQL", "Docker", "Redis", "Power Automate"],
        githubUrl: "https://github.com/bcilak",
        demoUrl: "#",
        featured: true,
        problem:
            "İş ekipleri bağlantısız sistemler arasında manuel veri girişi için saatler harcıyordu. BT, her entegrasyon talebi için darboğaz oluşturuyordu.",
        solution:
            "İş kullanıcılarının sistemler arası iş akışlarını kendilerinin otomatikleştirmesini sağlayan 50'den fazla önceden oluşturulmuş konektöre sahip görsel bir iş akışı oluşturucu geliştirildi.",
        architecture:
            "React tabanlı sürükle-bırak iş akışı düzenleyicisi, iş akışı tanımlarını Node.js yürütme motoruna gönderir. İş akışları PostgreSQL'de JSON DAG'ler olarak saklanır. İşçi süreçleri, yeniden deneme mantığı, hata işleme ve her adımda saklanan yürütme günlükleri ile iş akışı adımlarını yürütür.",
        challenges:
            "Harici API çağrıları içeren uzun süreli iş akışları için güvenilir yeniden deneme ve hata kurtarma mekanizmaları oluşturmak karmaşıktı. Farklı sağlayıcı API'leri arasında oran sınırlaması, akıllı bir kısıtlama katmanı gerektiriyordu.",
        lessons:
            "Olay güdümlü mimari, sistem yoklamasına (polling) kıyasla güvenilirliği önemli ölçüde artırır. Net hata mesajları ve görsel hata ayıklama araçları, ekstra özelliklerden daha değerlidir.",
        screenshots: [],
        createdAt: "2024-05-20",
    },
    {
        id: "4",
        slug: "data-processing-etl",
        title: "Veri İşleme ve ETL Çerçevesi",
        shortDescription:
            "Her gün milyonlarca kaydı veri kalitesi kontrolleriyle işleyen yüksek performanslı ETL çerçevesi.",
        description:
            "Birden fazla kaynaktan (API'ler, veritabanları, dosyalar) gelen büyük ölçekli verileri işlemek, dönüşümler uygulamak, kalite kontrolleri yapmak ve bir veri ambarına yüklemek için Python tabanlı bir ETL çerçevesi.",
        technologies: ["Python", "PostgreSQL", "Docker", "Pandas", "SQLAlchemy", "Airflow", "Redis"],
        githubUrl: "https://github.com/bcilak",
        demoUrl: "#",
        featured: false,
        problem:
            "Birden fazla eski veri hattı sessizce çöküyor, yöneticilere bayat ve yanlış veriler iletiyordu.",
        solution:
            "Kapsamlı günlük tutma, veri doğrulama ifadeleri ve otomatik uyarılarla birleşik bir ETL çerçevesi kullanarak tüm veri hatlarını yeniden yazdık.",
        architecture:
            "Airflow günlük ETL çalışmalarını yönetir. Python çıkarma modülleri kaynaklardan veri çeker, pandas kayıtları dönüştürür ve doğrular, SQLAlchemy PostgreSQL'e yükler. Veri kalitesi kontrolleri anomali tespiti ile ayrı görevler olarak çalıştırılır.",
        challenges:
            "Akıştaki alt sistemleri bozmadan kaynak sistemlerde şema değişimlerini yönetmek, esnek bir şema sicili yaklaşımına ihtiyaç duyuyordu.",
        lessons:
            "Ekipler arasındaki veri sözleşmeleri çoğu veri hattı hatasını önler. Veri tazeliğini izlemek, hataları izlemek kadar önemlidir.",
        screenshots: [],
        createdAt: "2024-02-10",
    },
];


export const getProjects = (locale: string) => locale === "tr" ? projectsTr : projectsEn;
