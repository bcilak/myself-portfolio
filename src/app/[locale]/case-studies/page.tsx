import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
    title: "Case Studies",
    description:
        "Deep technical case studies from Barış Çilak — WhatsApp AI chatbot, speech-to-text architecture, and automation pipelines.",
};

const caseStudies = [
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

export default function CaseStudiesPage() {
    return (
        <div className="pt-24">
            <div className="max-w-5xl mx-auto px-6 pb-24">
                <AnimatedSection>
                    <div className="mb-16">
                        <p className="text-cyan-400 text-sm font-medium uppercase tracking-widest mb-3">Analysis</p>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">Case Studies</h1>
                        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
                            Deep technical analysis of complex projects — the problems, approaches,
                            architectures, and lessons learned.
                        </p>
                        <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full mt-6" />
                    </div>
                </AnimatedSection>

                <div className="space-y-12">
                    {caseStudies.map((cs, i) => (
                        <AnimatedSection key={cs.slug} delay={i * 0.1}>
                            <div className="glass-card rounded-2xl overflow-hidden">
                                {/* Header */}
                                <div className="p-8 border-b border-black/5 dark:border-white/5">
                                    <div className="flex flex-wrap items-center gap-3 mb-4">
                                        <span className="text-3xl">{cs.icon}</span>
                                        <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-xs font-medium border border-cyan-500/20">
                                            {cs.category}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                                        {cs.title}
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-400">{cs.subtitle}</p>

                                    {/* Impact */}
                                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20">
                                        <span className="text-green-400 text-sm">📊</span>
                                        <span className="text-green-400 text-sm font-medium">{cs.impact}</span>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-8 grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-slate-700 dark:text-slate-300 font-semibold mb-3 flex items-center gap-2">
                                            <span className="text-red-400">🎯</span> Problem
                                        </h3>
                                        <p className="text-slate-500 dark:text-slate-500 text-sm leading-relaxed mb-6">{cs.problem}</p>

                                        <h3 className="text-slate-700 dark:text-slate-300 font-semibold mb-3 flex items-center gap-2">
                                            <span className="text-blue-400">🔍</span> Approach
                                        </h3>
                                        <p className="text-slate-500 dark:text-slate-500 text-sm leading-relaxed mb-6">{cs.approach}</p>

                                        <h3 className="text-slate-700 dark:text-slate-300 font-semibold mb-3 flex items-center gap-2">
                                            <span className="text-purple-400">🏗️</span> Architecture
                                        </h3>
                                        <p className="text-slate-500 dark:text-slate-500 text-sm leading-relaxed font-mono text-xs bg-white/5 p-3 rounded-lg">
                                            {cs.architecture}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-slate-700 dark:text-slate-300 font-semibold mb-3 flex items-center gap-2">
                                            <span className="text-orange-400">⚠️</span> Challenges
                                        </h3>
                                        <ul className="space-y-2 mb-6">
                                            {cs.challenges.map((c) => (
                                                <li key={c} className="flex items-start gap-2 text-slate-500 dark:text-slate-500 text-sm">
                                                    <span className="text-orange-400 mt-0.5">•</span>
                                                    {c}
                                                </li>
                                            ))}
                                        </ul>

                                        <h3 className="text-slate-700 dark:text-slate-300 font-semibold mb-3 flex items-center gap-2">
                                            <span className="text-green-400">📚</span> Lessons Learned
                                        </h3>
                                        <ul className="space-y-2 mb-6">
                                            {cs.lessons.map((l) => (
                                                <li key={l} className="flex items-start gap-2 text-slate-500 dark:text-slate-500 text-sm">
                                                    <span className="text-green-400 mt-0.5">✓</span>
                                                    {l}
                                                </li>
                                            ))}
                                        </ul>

                                        <div>
                                            <h3 className="text-slate-700 dark:text-slate-300 font-semibold mb-3">Technologies</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {cs.technologies.map((t) => (
                                                    <span
                                                        key={t}
                                                        className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-medium border border-cyan-500/20"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>

                <AnimatedSection delay={0.3}>
                    <div className="mt-16 text-center">
                        <p className="text-slate-600 dark:text-slate-400 mb-4">Want to discuss a similar project?</p>
                        <Link
                            href="/contact"
                            className="px-8 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition-colors duration-200"
                        >
                            Get In Touch
                        </Link>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    );
}
