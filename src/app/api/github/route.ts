import { NextResponse } from "next/server";

export async function GET() {
    try {
        // "bcilak" username'i kullanılacak / ya da kendi username'ini yazabilir.
        const username = "bcilak";
        
        const response = await fetch(`https://api.github.com/users/${username}`, {
            headers: {
                Accept: "application/vnd.github.v3+json",
            },
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            throw new Error(`GitHub API returned ${response.status}`);
        }

        const data = await response.json();

        // Also fetch repos for stars count
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
            headers: {
                Accept: "application/vnd.github.v3+json",
            },
            next: { revalidate: 3600 }
        });

        let totalStars = 0;
        if (reposResponse.ok) {
            const repos = await reposResponse.json();
            totalStars = repos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
        }

        return NextResponse.json({
            followers: data.followers,
            public_repos: data.public_repos,
            total_stars: totalStars,
            login: data.login,
        });

    } catch (error) {
        console.error("GitHub API error:", error);
        return NextResponse.json({ error: "Failed to fetch GitHub stats" }, { status: 500 });
    }
}
