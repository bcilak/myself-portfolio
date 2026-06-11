export interface GithubStats {
    followers: number;
    public_repos: number;
    total_stars: number;
    login?: string;
}

export async function getGithubStats(): Promise<GithubStats | null> {
    try {
        const username = "bcilak";
        const headers = {
            Accept: "application/vnd.github.v3+json",
        };

        const [userResponse, reposResponse] = await Promise.all([
            fetch(`https://api.github.com/users/${username}`, {
                headers,
                next: { revalidate: 3600 },
            }),
            fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
                headers,
                next: { revalidate: 3600 },
            }),
        ]);

        if (!userResponse.ok) return null;

        const user = await userResponse.json();
        const repos = reposResponse.ok ? await reposResponse.json() : [];
        const totalStars = Array.isArray(repos)
            ? repos.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0)
            : 0;

        return {
            followers: user.followers || 0,
            public_repos: user.public_repos || 0,
            total_stars: totalStars,
            login: user.login,
        };
    } catch (error) {
        console.error("GitHub stats error:", error);
        return null;
    }
}
