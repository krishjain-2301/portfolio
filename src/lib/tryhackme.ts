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

type TryHackMeFallback = {
  title: string;
  rank: string;
  level: string | number;
  badges: number;
  streak: number;
  completedRooms: number;
  recentRooms: TryHackMeRoom[];
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

function pickPositiveNumber(...values: unknown[]): number | null {
  for (const value of values) {
    if (typeof value === "number" && !Number.isNaN(value) && value > 0) {
      return value;
    }
    if (typeof value === "string") {
      const num = parseInt(value.replace(/\D/g, ""), 10);
      if (!Number.isNaN(num) && num > 0) return num;
    }
  }
  return null;
}

function pickNumber(...values: unknown[]): number {
  return pickPositiveNumber(...values) ?? 0;
}

function formatRank(profile: Record<string, unknown>): string {
  const topPercent = pickString(
    profile.topPercent,
    profile.rankPercent,
    profile.topRank
  );
  if (topPercent) {
    return topPercent.includes("%")
      ? `Top ${topPercent.replace(/top\s*/i, "")}`
      : topPercent;
  }

  const rank = profile.rank;
  if (typeof rank === "string" && rank.includes("%")) return rank;
  if (typeof rank === "string" && rank.toLowerCase().includes("top")) return rank;

  const rankNumber = pickNumber(profile.rank, profile.globalRank, profile.Rank);
  return rankNumber > 0 ? `#${rankNumber.toLocaleString()}` : "—";
}

function parseStreak(data: Record<string, unknown>): number {
  return pickNumber(
    data.currentStreak,
    data.streakDays,
    data.loginStreak,
    data.Streak,
    data.streak
  );
}

function parseProfile(data: Record<string, unknown>): Partial<TryHackMeStats> {
  return {
    title:
      pickString(
        data.title,
        data.levelTitle,
        data.rankTitle,
        data.hackerLevel,
        data.Level
      ) || "[0x8][HACKER]",
    rank: formatRank(data),
    level: String(
      pickNumber(
        data.points,
        data.userPoints,
        data.levelNumber,
        data.userLevel
      ) || "—"
    ),
    badges: pickNumber(
      data.badges,
      data.badgeCount,
      data.totalBadges,
      data.badgesCount,
      data.Badges
    ),
    streak: parseStreak(data),
    completedRooms: pickNumber(
      data.completedRooms,
      data.roomsCompleted,
      data.totalCompletedRooms,
      data.completedRoomCount,
      data["Completed Rooms"],
      data.CompletedRooms
    ),
    profileImage: pickString(
      data.avatar,
      data.profileImage,
      data.image,
      data.ProfileImage
    ),
  };
}

function parseBadgePayload(
  payload: Record<string, unknown> | null
): Partial<TryHackMeStats> {
  if (!payload) return {};

  const data =
    (payload.Data as Record<string, unknown> | undefined) ??
    (payload.data as Record<string, unknown> | undefined) ??
    payload;

  return parseProfile(data);
}

async function fetchJson<T>(url: string): Promise<T | null> {
  const res = await fetch(url, {
    headers: THM_HEADERS,
    next: { revalidate: 900 },
  });

  if (!res.ok) return null;

  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return null;

  try {
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchTryHackMeStats(
  username: string,
  profileUrl: string,
  userId: string,
  userPublicId: string,
  fallback: TryHackMeFallback
): Promise<TryHackMeStats> {
  const [badgeRes, profileRes, roomsRes, badgesRes, countRes] =
    await Promise.all([
      userPublicId
        ? fetchJson<Record<string, unknown>>(
            `https://tryhackme.com/api/v2/badges/public-profile?userPublicId=${userPublicId}`
          )
        : Promise.resolve(null),
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

  const badgeProfile = parseBadgePayload(
    badgeRes ? unwrapPayload(badgeRes) : null
  );
  const profileData = profileRes ? unwrapPayload(profileRes) : {};
  const profileParsed = parseProfile(profileData);
  const countData = countRes ? unwrapPayload(countRes) : {};

  let badges =
    badgeProfile.badges ||
    profileParsed.badges ||
    pickNumber(countData.badges, countData.badgeCount);

  if (!badges) {
    const badgeList =
      (badgesRes && "docs" in badgesRes && badgesRes.docs) ||
      (badgesRes && "data" in badgesRes && badgesRes.data) ||
      (badgesRes && "badges" in badgesRes && badgesRes.badges) ||
      [];
    badges = Array.isArray(badgeList) ? badgeList.length : 0;
  }

  const roomsPayload = roomsRes ? unwrapPayload(roomsRes) : { docs: [] };
  const docs = roomsPayload.docs ?? [];

  const recentRooms: TryHackMeRoom[] =
    docs.length > 0
      ? docs.slice(0, 4).map((room) => ({
          name: room.title ?? room.name ?? "Unknown Room",
          difficulty: room.difficulty ?? room.level ?? "Easy",
          description: room.description ?? "Completed TryHackMe room.",
        }))
      : fallback.recentRooms;

  const streak =
    pickPositiveNumber(
      badgeProfile.streak,
      profileParsed.streak,
      parseStreak(countData)
    ) ?? fallback.streak;

  const completedRooms =
    pickPositiveNumber(
      badgeProfile.completedRooms,
      profileParsed.completedRooms,
      countData.completedRooms,
      countData.roomsCompleted,
      countData.totalCompletedRooms,
      roomsPayload.totalDocs
    ) ?? fallback.completedRooms;

  const synced = Boolean(
    badgeRes || profileRes || roomsRes || badgesRes || countRes
  );

  return {
    username,
    profileUrl,
    title:
      profileParsed.title ||
      badgeProfile.title ||
      fallback.title,
    rank:
      (profileParsed.rank !== "—" ? profileParsed.rank : "") ||
      badgeProfile.rank ||
      fallback.rank,
    level: String(
      pickPositiveNumber(
        profileParsed.level !== "—" ? Number(profileParsed.level) : null,
        countData.points,
        countData.userPoints,
        fallback.level
      ) ?? fallback.level
    ),
    badges: pickPositiveNumber(badges) ?? fallback.badges,
    streak,
    completedRooms,
    profileImage:
      badgeProfile.profileImage ||
      profileParsed.profileImage ||
      undefined,
    recentRooms,
    synced,
  };
}
