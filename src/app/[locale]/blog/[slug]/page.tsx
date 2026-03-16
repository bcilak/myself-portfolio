import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { getBlogPosts } from "@/data/blog";

interface Props {
    params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
    return getBlogPosts("en").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const locale = (await params).locale || "en";
  const post = getBlogPosts((await params).locale).find((p) => p.slug === slug);
    if (!post) return { title: "Post Not Found" };
    return {
        title: post.title,
        description: post.excerpt,
        keywords: post.tags,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.createdAt,
            tags: post.tags,
        },
    };
}

export default async function BlogDetailPage({ params }: Props) {
    const { slug } = await params;
    const locale = (await params).locale; const post = getBlogPosts(locale).find((p) => p.slug === slug);
    if (!post) notFound();

    const relatedPosts = getBlogPosts(locale)
        .filter((p) => p.slug !== slug && p.tags.some((t) => post.tags.includes(t)))
        .slice(0, 2);

    return (
        <div className="pt-24">
            <div className="max-w-3xl mx-auto px-6 pb-24">
                {/* Back */}
                <AnimatedSection>
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-500 hover:text-cyan-400 text-sm mb-8 transition-colors"
                    >
                        ← Back to Blog
                    </Link>
                </AnimatedSection>

                {/* Header */}
                <AnimatedSection>
                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-xs font-medium border border-indigo-500/20">
                                {post.category}
                            </span>
                            <span className="text-slate-600 text-xs">{post.readTime} min read</span>
                            <time className="text-slate-600 text-xs">
                                {new Date(post.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </time>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 leading-snug mb-4">
                            {post.title}
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {post.tags.map((tag) => (
                                <span key={tag} className="text-xs text-slate-500 dark:text-slate-500 bg-white/5 px-2 py-0.5 rounded">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="w-full h-px bg-white/5 mb-10" />
                </AnimatedSection>

                {/* Content */}
                <AnimatedSection delay={0.1}>
                    <div className="prose-custom">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
                    </div>
                </AnimatedSection>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <AnimatedSection delay={0.2}>
                        <div className="mt-16 pt-10 border-t border-black/5 dark:border-white/5">
                            <h2 className="text-slate-700 dark:text-slate-300 font-semibold mb-6">Related Articles</h2>
                            <div className="space-y-4">
                                {relatedPosts.map((related) => (
                                    <Link
                                        key={related.slug}
                                        href={`/blog/${related.slug}`}
                                        className="block glass-card rounded-xl p-5 hover:border-cyan-500/20 transition-all group"
                                    >
                                        <h3 className="text-slate-800 dark:text-slate-200 font-medium group-hover:text-cyan-400 transition-colors mb-1">
                                            {related.title}
                                        </h3>
                                        <p className="text-slate-500 dark:text-slate-500 text-sm">{related.excerpt.slice(0, 100)}...</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </AnimatedSection>
                )}
            </div>
        </div>
    );
}
