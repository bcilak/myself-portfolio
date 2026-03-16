export interface SkillCategory {
    name: string;
    icon: string;
    skills: Skill[];
}

export interface Skill {
    name: string;
    icon: string;
    level: "Expert" | "Advanced" | "Intermediate";
}

export const skillCategories: SkillCategory[] = [
    {
        name: "Backend",
        icon: "⚙️",
        skills: [
            { name: "Python", icon: "🐍", level: "Expert" },
            { name: "FastAPI", icon: "⚡", level: "Expert" },
            { name: "Node.js", icon: "🟢", level: "Advanced" },
            { name: "Express", icon: "🚂", level: "Advanced" },
            { name: "REST APIs", icon: "🔗", level: "Expert" },
        ],
    },
    {
        name: "Databases",
        icon: "🗄️",
        skills: [
            { name: "PostgreSQL", icon: "🐘", level: "Advanced" },
            { name: "MongoDB", icon: "🍃", level: "Advanced" },
            { name: "Redis", icon: "🔴", level: "Advanced" },
            { name: "SQLAlchemy", icon: "🔧", level: "Advanced" },
        ],
    },
    {
        name: "DevOps",
        icon: "🚀",
        skills: [
            { name: "Docker", icon: "🐳", level: "Advanced" },
            { name: "Linux", icon: "🐧", level: "Advanced" },
            { name: "Nginx", icon: "🌐", level: "Intermediate" },
            { name: "Git", icon: "📦", level: "Expert" },
        ],
    },
    {
        name: "AI & Automation",
        icon: "🤖",
        skills: [
            { name: "OpenAI API", icon: "🧠", level: "Expert" },
            { name: "Speech Recognition", icon: "🎙️", level: "Advanced" },
            { name: "Power Automate", icon: "⚡", level: "Advanced" },
            { name: "LangChain", icon: "🔗", level: "Intermediate" },
        ],
    },
    {
        name: "Frontend",
        icon: "🎨",
        skills: [
            { name: "React", icon: "⚛️", level: "Intermediate" },
            { name: "Next.js", icon: "▲", level: "Intermediate" },
            { name: "TypeScript", icon: "🔷", level: "Intermediate" },
            { name: "TailwindCSS", icon: "🎨", level: "Advanced" },
        ],
    },
];

export const featuredSkills = [
    { name: "Python", icon: "🐍" },
    { name: "Node.js", icon: "🟢" },
    { name: "Docker", icon: "🐳" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "OpenAI API", icon: "🧠" },
    { name: "FastAPI", icon: "⚡" },
    { name: "Power Automate", icon: "⚡" },
    { name: "Redis", icon: "🔴" },
];
