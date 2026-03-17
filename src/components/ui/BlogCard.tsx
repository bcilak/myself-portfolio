import { Link } from "@/i18n/routing";
import { BlogPost } from "@/data/blog";
import { useLocale, useTranslations } from "next-intl";

interface BlogCardProps {
    post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
    const locale = useLocale();
    const t = useTranslations("Blog");

    return (
        <Link href={`/blog/${post.slug}`} className="block group h-full">
            <article className="glass-card rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col gap-3">
                {/* Category + Read time */}
                <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-xs font-medium border border-indigo-500/20">
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

                <h3 className="text-slate-900 dark:text-slate-100 font-semibold leading-snug group-hover:text-cyan-400 transition-colors">
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
                            className="text-xs text-slate-700 dark:text-slate-400 bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-1 mt-auto">
                    <time className="text-slate-700 dark:text-slate-300 text-xs">
                        {new Date(post.createdAt).toLocaleDateString(locale, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}
                    </time>
                    <span className="text-cyan-500 text-sm group-hover:translate-x-1 transition-transform inline-block font-medium">
                        {t("readMore")} →
                    </span>
                </div>
            </article>
        </Link>
    );
}
