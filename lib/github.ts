/**
 * Build-time fetch of public repos from Ahmad's GitHub.
 * Falls back gracefully when API is rate-limited or offline.
 */

import { request } from "@octokit/request";

const USERNAME = "AhmadNassar03";

export interface GithubRepo {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  updatedAt: string;
  topics: string[];
}

export async function fetchTopRepos(limit = 6): Promise<GithubRepo[]> {
  try {
    const response = await request("GET /users/{username}/repos", {
      username: USERNAME,
      sort: "updated",
      direction: "desc",
      per_page: 30,
      type: "owner",
      headers: {
        accept: "application/vnd.github+json",
        "x-github-api-version": "2022-11-28",
      },
      // 10 second timeout via fetch options would need custom request; skip for now
    });

    const repos = response.data
      .filter((r) => !r.fork && !r.archived)
      .slice(0, limit)
      .map<GithubRepo>((r) => ({
        name: r.name,
        description: r.description ?? null,
        url: r.html_url,
        language: r.language ?? null,
        stars: r.stargazers_count ?? 0,
        updatedAt: r.updated_at ?? "",
        topics: r.topics ?? [],
      }));

    return repos;
  } catch (err) {
    console.warn("[github] failed to fetch repos — returning empty list:", err);
    return [];
  }
}
