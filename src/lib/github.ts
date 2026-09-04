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

type GraphQLCalendarDay = {
  date: string;
  contributionCount: number;
};

function getLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

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

async function fetchPullRequestAndIssueCounts(username: string) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "krish-jain-portfolio",
    ...(process.env.GITHUB_TOKEN
      ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
      : {}),
  };

  const [pullRequestsRes, issuesRes] = await Promise.all([
    fetch(
      `https://api.github.com/search/issues?q=author:${username}+type:pr&per_page=1`,
      { headers, next: { revalidate: 3600 } }
    ),
    fetch(
      `https://api.github.com/search/issues?q=author:${username}+type:issue&per_page=1`,
      { headers, next: { revalidate: 3600 } }
    ),
  ]);

  return {
    totalPullRequests: pullRequestsRes.ok
      ? ((await pullRequestsRes.json()) as { total_count: number }).total_count
      : 0,
    totalIssues: issuesRes.ok
      ? ((await issuesRes.json()) as { total_count: number }).total_count
      : 0,
  };
}

async function fetchFromGitHubGraphQL(
  username: string
): Promise<Pick<GitHubStats, "contributions" | "totalContributions"> | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "krish-jain-portfolio",
    },
    body: JSON.stringify({ query, variables: { username } }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;

  const payload = (await res.json()) as {
    errors?: unknown[];
    data?: {
      user?: {
        contributionsCollection?: {
          contributionCalendar?: {
            totalContributions: number;
            weeks: Array<{ contributionDays: GraphQLCalendarDay[] }>;
          };
        };
      };
    };
  };

  if (payload.errors?.length) return null;

  const calendar = payload.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) return null;

  const contributions = calendar.weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: getLevel(day.contributionCount),
    }))
  );

  return {
    contributions,
    totalContributions: calendar.totalContributions,
  };
}

async function fetchFromContributionsApi(username: string) {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch GitHub contributions");
  }

  const payload = (await res.json()) as ContributionsApiResponse;
  const contributions = payload.contributions ?? [];

  return {
    contributions,
    totalContributions: contributions.reduce((sum, day) => sum + day.count, 0),
  };
}

export async function fetchGitHubStats(
  username: string
): Promise<GitHubStats> {
  const graphData = await fetchFromGitHubGraphQL(username);
  const contributionData =
    graphData ?? (await fetchFromContributionsApi(username));

  const { maxStreak, currentStreak } = computeStreaks(
    contributionData.contributions
  );
  const { totalPullRequests, totalIssues } =
    await fetchPullRequestAndIssueCounts(username);

  return {
    contributions: contributionData.contributions,
    totalContributions: contributionData.totalContributions,
    maxStreak,
    currentStreak,
    totalPullRequests,
    totalIssues,
    username,
  };
}
