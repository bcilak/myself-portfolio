"use client";

import { useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import BlogCard from "@/components/ui/BlogCard";
import { getBlogPosts } from "@/data/blog";
import { useLocale } from "next-intl";



export default function BlogClientPage() {
    const locale = useLocale();
    const [activeCategory, setActiveCategory] = useState("All");
    const allCategories = ["All", ...Array.from(new Set(getBlogPosts(locale).map((p) => p.category)))];
    const [searchQuery, setSearchQuery] = useState("");

    const filtered = getBlogPosts(locale).filter((post) => {
        const matchesCategory = activeCategory === "All" || post.category === activeCategory;
        const matchesSearch =
            searchQuery === "" ||
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="pt-24">
            <div className="max-w-6xl mx-auto px-6 pb-24">
                <AnimatedSection>
                    <div className="mb-12">
                        <p className="text-cyan-400 text-sm font-medium uppercase tracking-widest mb-3">Writing</p>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">Blog</h1>
                        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
                            Technical articles about backend development, AI integrations, automation, and software architecture.
                        </p>
                        <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full mt-6" />
                    </div>
                </AnimatedSection>

                {/* Filters */}
                <AnimatedSection>
                    <div className="flex flex-col sm:flex-row gap-4 mb-10">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1 px-4 py-2.5 rounded-lg bg-white/5 border border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 text-sm"
                        />
                        <div className="flex gap-2 flex-wrap">
                            {allCategories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === cat
                                        ? "bg-cyan-500 text-black"
                                        : "bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:text-slate-200 hover:bg-white/10"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>

                {/* Posts Grid */}
                {filtered.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((post, i) => (
                            <AnimatedSection key={post.id} delay={i * 0.08}>
                                <BlogCard post={post} />
                            </AnimatedSection>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-slate-600">
                        No articles found for &quot;{searchQuery}&quot;
                    </div>
                )}
            </div>
        </div>
    );
}
