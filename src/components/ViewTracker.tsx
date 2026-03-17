"use client";

import { useEffect } from "react";

export default function ViewTracker({
    type,
    slug,
}: {
    type: "blog" | "project";
    slug: string;
}) {
    useEffect(() => {
        // Run once on mount to not block rendering
        fetch("/api/stats", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ type, slug }),
        }).catch((err) => {
            console.error("Failed to track view", err);
        });
    }, [type, slug]);

    return null;
}
