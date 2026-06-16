import { Link } from "@/i18n/routing";
import { BlogPost } from "@/data/blog";
import { useLocale, useTranslations } from "next-intl";

interface BlogCardProps {
    post: BlogPost;
}

export default function BlogCard({ post }: { post: BlogPost }) {
    const t = useTranslations("Blog");
    const locale = useLocale();
    const dateLocale = locale === "tr" ? "tr-TR" : "en-US";

    return (
        <Link href={`/blog/${post.slug}`} className="block group h-full">
            <article className="glass-card p-6 hover:rotate-1 transition-transform duration-100 h-full flex flex-col gap-3">
                <div className="absolute right-6 top-[-10px] h-5 w-16 -rotate-6 border border-black/20 bg-[#e5e0d8]/80" />
                {/* Category + Read time */}
                <div className="flex items-center justify-between">
                    <span className="paper-tag px-2 py-0.5 text-xs font-medium">
                        {post.category}
                    </span>
                    <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 text-xs">
                        {post.views !== undefined && (
                            <span className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                                {post.views}
                            </span>
                        )}
                        <span>{post.readTime} {t("minRead")}</span>
                    </div>
                </div>

                <h3 className="text-slate-900 dark:text-slate-100 font-semibold text-xl leading-snug group-hover:text-cyan-400 transition-colors">
                    {post.title}
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed flex-1">
                    {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="paper-tag text-xs px-2 py-0.5"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-1 mt-auto">
                    <time className="text-slate-600 text-xs">
                        {new Date(post.createdAt).toLocaleDateString(dateLocale, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </time>
                    <span className="text-cyan-500 text-base group-hover:translate-x-1 transition-transform inline-block font-medium underline decoration-wavy decoration-[#ff4d4d]">
                        {t("readMore")} →
                    </span>
                </div>
            </article>
        </Link>
    );
}
