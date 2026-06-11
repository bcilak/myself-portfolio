import { NextResponse } from "next/server";
import { getGithubStats } from "@/lib/githubStats";

export async function GET() {
    const stats = await getGithubStats();

    if (!stats) {
        return NextResponse.json({ error: "Failed to fetch GitHub stats" }, { status: 500 });
    }

    return NextResponse.json(stats, {
        headers: {
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
    });
}
