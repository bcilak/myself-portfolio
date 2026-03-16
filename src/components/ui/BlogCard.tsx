import { Link } from "@/i18n/routing";
import { BlogPost } from "@/data/blog";

interface BlogCardProps {
    post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
    return (
        <Link href={`/blog/${post.slug}`} className="block group">
            <article className="glass-card rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col gap-3">
                {/* Category + Read time */}
                <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-xs font-medium border border-indigo-500/20">
                        {post.category}
                    </span>
                    <span className="text-slate-600 text-xs">{post.readTime} min read</span>
                </div>

                <h3 className="text-slate-900 dark:text-slate-100 font-semibold leading-snug group-hover:text-cyan-400 transition-colors">
                    {post.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-1">
                    {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="text-xs text-slate-500 dark:text-slate-500 bg-white/5 px-2 py-0.5 rounded"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-1">
                    <time className="text-slate-600 text-xs">
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}
                    </time>
                    <span className="text-cyan-500 text-sm group-hover:translate-x-1 transition-transform inline-block">
                        Read →
                    </span>
                </div>
            </article>
        </Link>
    );
}
