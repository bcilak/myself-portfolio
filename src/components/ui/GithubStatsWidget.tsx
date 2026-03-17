"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface GithubData {
    followers: number;
    public_repos: number;
    total_stars: number;
}

export default function GithubStatsWidget() {
    const [data, setData] = useState<GithubData | null>(null);
    const [loading, setLoading] = useState(true);
    const t = useTranslations("Sections"); // We can just use general strings or create new ones, I'll fallback to english strings if needed

    useEffect(() => {
        fetch("/api/github")
            .then((res) => res.json())
            .then((d) => {
                if (!d.error) setData(d);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading || !data) {
        return (
            <div className="glass-card rounded-xl p-6 flex items-center justify-center h-full min-h-[140px]">
                <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="glass-card rounded-xl p-6 glow-accent h-full">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-900 dark:text-slate-100 font-semibold flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                    GitHub Live Stats
                </h3>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center mt-6">
                <div>
                    <div className="text-2xl font-bold gradient-text">{data.public_repos}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Repositories</div>
                </div>
                <div>
                    <div className="text-2xl font-bold gradient-text">{data.total_stars}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Total Stars</div>
                </div>
                <div>
                    <div className="text-2xl font-bold gradient-text">{data.followers}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Followers</div>
                </div>
            </div>
        </div>
    );
}
