export type TryHackMeRoom = {
  name: string;
  difficulty: string;
  description: string;
};

export type TryHackMeStats = {
  username: string;
  profileUrl: string;
  title: string;
  rank: string;
  level: string;
  badges: number;
  streak: number;
  completedRooms: number;
  profileImage?: string;
  recentRooms: TryHackMeRoom[];
  synced?: boolean;
};

type CompletedRoomApiItem = {
  title?: string;
  name?: string;
  description?: string;
  difficulty?: string;
  level?: string;
};

const THM_HEADERS = {
  Accept: "application/json",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Referer: "https://tryhackme.com/",
};

function unwrapPayload<T>(payload: T | { data?: T; status?: string }): T {
  if (
    payload &&
    typeof payload === "object" &&
    "data" in payload &&
    payload.data
  ) {
    return payload.data as T;
  }
  return payload as T;
}

function pickString(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

function pickNumber(...values: unknown[]): number {
  for (const value of values) {
    if (typeof value === "number" && !Number.isNaN(value)) return value;
    if (typeof value === "string") {
      const num = parseInt(value.replace(/\D/g, ""), 10);
      if (!Number.isNaN(num)) return num;
    }
  }
  return 0;
}

function formatRank(profile: Record<string, unknown>): string {
  const topPercent = pickString(
    profile.topPercent,
    profile.rankPercent,
    profile.topRank
  );
  if (topPercent) return topPercent.includes("%") ? `Top ${topPercent.replace(/top\s*/i, "")}` : topPercent;

  const rank = profile.rank;
  if (typeof rank === "string" && rank.includes("%")) return rank;
  if (typeof rank === "string" && rank.toLowerCase().includes("top")) return rank;

  const rankNumber = pickNumber(profile.rank, profile.globalRank);
  return rankNumber > 0 ? `#${rankNumber.toLocaleString()}` : "—";
}

function parseProfile(data: Record<string, unknown>): Partial<TryHackMeStats> {
  return {
    title:
      pickString(
        data.title,
        data.levelTitle,
        data.rankTitle,
        data.level,
        data.hackerLevel
      ) || "[0x8][HACKER]",
    rank: formatRank(data),
    level: String(
      pickNumber(data.levelNumber, data.userLevel, data.points) ||
        pickString(data.level, data.levelTitle).replace(/\D/g, "") ||
        "—"
    ),
    badges: pickNumber(
      data.badges,
      data.badgeCount,
      data.totalBadges,
      data.badgesCount
    ),
    streak: pickNumber(
      data.streak,
      data.currentStreak,
      data.streakDays,
      data.loginStreak
    ),
    completedRooms: pickNumber(
      data.completedRooms,
      data.roomsCompleted,
      data.totalCompletedRooms,
      data.completedRoomCount
    ),
    profileImage: pickString(data.avatar, data.profileImage, data.image),
  };
}

async function fetchJson<T>(url: string): Promise<T | null> {
  const res = await fetch(url, {
    headers: THM_HEADERS,
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;

  try {
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchTryHackMeStats(
  username: string,
  profileUrl: string,
  userId: string
): Promise<TryHackMeStats> {
  const [profileRes, roomsRes, badgesRes, countRes] = await Promise.all([
    fetchJson<Record<string, unknown>>(
      `https://tryhackme.com/api/v2/public-profile?username=${username}`
    ),
    fetchJson<{ docs?: CompletedRoomApiItem[]; totalDocs?: number }>(
      `https://tryhackme.com/api/v2/public-profile/completed-rooms?username=${username}&limit=4&page=1`
    ),
    fetchJson<{ docs?: unknown[]; data?: unknown[]; badges?: unknown[] }>(
      `https://tryhackme.com/api/v2/badges?username=${username}`
    ),
    fetchJson<Record<string, unknown>>(
      `https://tryhackme.com/api/v2/public-profile/count?userId=${userId}`
    ),
  ]);

  const profileData = profileRes ? unwrapPayload(profileRes) : {};
  const countData = countRes ? unwrapPayload(countRes) : {};
  const parsedProfile = parseProfile({
    ...profileData,
    ...countData,
  });

  if (!parsedProfile.badges) {
    const badgeList =
      (badgesRes && "docs" in badgesRes && badgesRes.docs) ||
      (badgesRes && "data" in badgesRes && badgesRes.data) ||
      (badgesRes && "badges" in badgesRes && badgesRes.badges) ||
      [];
    parsedProfile.badges = Array.isArray(badgeList) ? badgeList.length : 0;
  }

  const roomsPayload = roomsRes ? unwrapPayload(roomsRes) : { docs: [] };
  const docs = roomsPayload.docs ?? [];

  const recentRooms: TryHackMeRoom[] = docs.slice(0, 4).map((room) => ({
    name: room.title ?? room.name ?? "Unknown Room",
    difficulty: room.difficulty ?? room.level ?? "Easy",
    description: room.description ?? "Completed TryHackMe room.",
  }));

  const completedRooms =
    parsedProfile.completedRooms ||
    pickNumber(roomsPayload.totalDocs, countData.completedRooms) ||
    docs.length;

  return {
    username,
    profileUrl,
    title: parsedProfile.title ?? "[0x8][HACKER]",
    rank: parsedProfile.rank ?? "—",
    level: parsedProfile.level ?? "—",
    badges: parsedProfile.badges ?? 0,
    streak: parsedProfile.streak ?? 0,
    completedRooms,
    profileImage: parsedProfile.profileImage,
    recentRooms,
    synced: Boolean(profileRes || roomsRes || countRes),
  };
}
