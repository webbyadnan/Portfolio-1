export async function getRepoStats(githubUrl: string) {
    if (process.env.NODE_ENV === 'development') return null;
    if (!githubUrl || !githubUrl.includes('github.com')) return null;

    try {
        const repoPath = githubUrl.split('github.com/')[1];
        const res = await fetch(`https://api.github.com/repos/${repoPath}`, {
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!res.ok) return null;

        const data = await res.json();
        return {
            stars: data.stargazers_count,
            forks: data.forks_count,
        };
    } catch {
        return null;
    }
}
