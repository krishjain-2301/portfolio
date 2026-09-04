export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type GitHubStats = {
  contributions: ContributionDay[];
  totalContributions: number;
  maxStreak: number;
  currentStreak: number;
  totalPullRequests: number;
  totalIssues: number;
  username: string;
};

type ContributionsApiResponse = {
  total?: { lastYear?: number };
  contributions?: ContributionDay[];
};

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function computeStreaks(contributions: ContributionDay[]) {
  const sorted = [...contributions].sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  let maxStreak = 0;
  let currentStreak = 0;
  let running = 0;

  for (const day of sorted) {
    if (day.count > 0) {
      running += 1;
      maxStreak = Math.max(maxStreak, running);
    } else {
      running = 0;
    }
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 400; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const key = toDateKey(date);
    const entry = sorted.find((item) => item.date === key);

    if (entry && entry.count > 0) {
      currentStreak += 1;
    } else if (i === 0) {
      continue;
    } else {
      break;
    }
  }

  return { maxStreak, currentStreak };
}

export async function fetchGitHubStats(
  username: string
): Promise<GitHubStats> {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "krish-jain-portfolio",
  };

  const [contributionsRes, pullRequestsRes, issuesRes] = await Promise.all([
    fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { next: { revalidate: 3600 } }
    ),
    fetch(
      `https://api.github.com/search/issues?q=author:${username}+type:pr&per_page=1`,
      { headers, next: { revalidate: 3600 } }
    ),
    fetch(
      `https://api.github.com/search/issues?q=author:${username}+type:issue&per_page=1`,
      { headers, next: { revalidate: 3600 } }
    ),
  ]);

  if (!contributionsRes.ok) {
    throw new Error("Failed to fetch GitHub contributions");
  }

  const payload = (await contributionsRes.json()) as ContributionsApiResponse;
  const contributions = payload.contributions ?? [];
  const totalContributions =
    payload.total?.lastYear ??
    contributions.reduce((sum, day) => sum + day.count, 0);
  const { maxStreak, currentStreak } = computeStreaks(contributions);

  const pullRequests = pullRequestsRes.ok
    ? ((await pullRequestsRes.json()) as { total_count: number }).total_count
    : 0;
  const issues = issuesRes.ok
    ? ((await issuesRes.json()) as { total_count: number }).total_count
    : 0;

  return {
    contributions,
    totalContributions,
    maxStreak,
    currentStreak,
    totalPullRequests: pullRequests,
    totalIssues: issues,
    username,
  };
}
