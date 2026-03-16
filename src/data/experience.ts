export interface Experience {
    year: string;
    title: string;
    company: string;
    description: string;
    technologies: string[];
}

export const experiencesEn: Experience[] = [
    {
        year: "2024 – Present",
        title: "Backend & Automation Developer",
        company: "Freelance",
        description:
            "Developing custom automation systems, AI-powered chatbots, and backend APIs for multiple clients across different industries. Specializing in Python/FastAPI backends with OpenAI integrations.",
        technologies: ["Python", "FastAPI", "OpenAI API", "Docker", "PostgreSQL"],
    },
    {
        year: "2023 – 2024",
        title: "Software Developer",
        company: "Tech Startup",
        description:
            "Built and maintained REST APIs, data processing pipelines, and automation workflows. Led migration of legacy services to Docker-based microservices architecture.",
        technologies: ["Python", "Node.js", "Docker", "Redis", "PostgreSQL"],
    },
    {
        year: "2022 – 2023",
        title: "Junior Backend Developer",
        company: "Software Agency",
        description:
            "Developed backend services for web applications, integrated third-party APIs, and implemented automation scripts for business processes.",
        technologies: ["Python", "Node.js", "Express", "MongoDB", "REST APIs"],
    },
    {
        year: "2021 – 2022",
        title: "Software Engineering Intern",
        company: "Technology Company",
        description:
            "Contributed to backend services development, learned CI/CD practices, Docker containerization, and database optimization techniques.",
        technologies: ["Python", "SQL", "Git", "Linux"],
    },
];


export const experiencesTr: Experience[] = [
    {
        year: "2024 – Present",
        title: "Backend & Otomasyon Geliştirici",
        company: "Serbest Çalışan",
        description:
            "Farklı sektörlerdeki birden çok müşteri için özel otomasyon sistemleri, yapay zeka destekli sohbet robotları ve backend API'leri geliştiriliyor. OpenAI entegrasyonlu Python/FastAPI backend projelerinde uzmanlaştım.",
        technologies: ["Python", "FastAPI", "OpenAI API", "Docker", "PostgreSQL"],
    },
    {
        year: "2023 – 2024",
        title: "Yazılım Geliştirici",
        company: "Teknoloji Girişimi",
        description:
            "REST API'leri, veri işleme hatları ve otomasyon iş akışları oluşturuldu ve sürdürüldü. Eski servislerin Docker tabanlı mikro servis mimarisine taşınmasına öncülük ettim.",
        technologies: ["Python", "Node.js", "Docker", "Redis", "PostgreSQL"],
    },
    {
        year: "2022 – 2023",
        title: "Junior Backend Geliştirici",
        company: "Yazılım Ajansı",
        description:
            "Web uygulamaları için backend servisleri geliştirdim, üçüncü taraf API'leri entegre ettim ve iş süreçleri için otomasyon scriptleri uyguladım.",
        technologies: ["Python", "Node.js", "Express", "MongoDB", "REST APIs"],
    },
    {
        year: "2021 – 2022",
        title: "Yazılım Mühendisliği Stajyeri",
        company: "Teknoloji Şirketi",
        description:
            "Backend servislerinin geliştirilmesine katkıda bulundum, CI/CD pratiklerini, Docker tabanlı kapsayıcılaştırmayı ve veritabanı optimizasyon tekniklerini öğrendim.",
        technologies: ["Python", "SQL", "Git", "Linux"],
    },
];


export const getExperiences = (locale: string) => locale === "tr" ? experiencesTr : experiencesEn;
