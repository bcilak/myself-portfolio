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
        const storageKey = `view-tracked:${type}:${slug}`;

        if (sessionStorage.getItem(storageKey)) return;
        sessionStorage.setItem(storageKey, "1");

        const payload = JSON.stringify({ type, slug });
        const blob = new Blob([payload], { type: "application/json" });

        if (navigator.sendBeacon?.("/api/stats", blob)) return;

        fetch("/api/stats", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: payload,
            keepalive: true,
        }).catch((err) => {
            sessionStorage.removeItem(storageKey);
            console.error("Failed to track view", err);
        });
    }, [type, slug]);

    return null;
}
