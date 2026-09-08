const username = "krishvain";
const userId = "67110b9a01dd61c9da804d6c";
const userPublicId = "5672619";
const profileUrl = "https://tryhackme.com/p/krishvain";

const headers = {
  Accept: "application/json, text/plain, */*",
  "Accept-Language": "en-US,en;q=0.9",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Referer: "https://tryhackme.com/",
};

function pickNumber(...values) {
  for (const value of values) {
    if (typeof value === "number" && value > 0) return value;
    if (typeof value === "string") {
      const num = parseInt(value.replace(/\D/g, ""), 10);
      if (!Number.isNaN(num) && num > 0) return num;
    }
  }
  return 0;
}

function unwrap(payload) {
  if (payload?.data) return payload.data;
  return payload;
}

async function fetchJson(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) return null;
  const type = res.headers.get("content-type") ?? "";
  if (!type.includes("application/json")) return null;
  return res.json();
}

const [badgeRes, profileRes, roomsRes] = await Promise.all([
  fetchJson(
    `https://tryhackme.com/api/v2/badges/public-profile?userPublicId=${userPublicId}`
  ),
  fetchJson(
    `https://tryhackme.com/api/v2/public-profile?username=${username}`
  ),
  fetchJson(
    `https://tryhackme.com/api/v2/public-profile/completed-rooms?username=${username}&limit=4&page=1`
  ),
]);

const badgeData = badgeRes?.Data ?? badgeRes?.data ?? badgeRes ?? {};
const profileData = unwrap(profileRes ?? {});
const roomsData = unwrap(roomsRes ?? {});

const stats = {
  username,
  profileUrl,
  title: profileData.title ?? badgeData.Level ?? "[0x8][HACKER]",
  rank: profileData.topPercent
    ? `Top ${String(profileData.topPercent).replace(/top\s*/i, "")}`
    : "Top 15%",
  level: String(pickNumber(profileData.points, profileData.userPoints) || 43),
  badges: pickNumber(badgeData.Badges, profileData.badges) || 5,
  streak: pickNumber(badgeData.Streak, profileData.currentStreak) || 11,
  completedRooms:
    pickNumber(
      badgeData["Completed Rooms"],
      profileData.completedRooms,
      roomsData.totalDocs
    ) || 42,
  recentRooms: (roomsData.docs ?? []).slice(0, 4).map((room) => ({
    name: room.title ?? room.name ?? "Unknown Room",
    difficulty: room.difficulty ?? room.level ?? "Easy",
    description: room.description ?? "Completed TryHackMe room.",
  })),
  synced: Boolean(badgeRes || profileRes || roomsRes),
  updatedAt: new Date().toISOString(),
};

await import("node:fs/promises").then(({ writeFile }) =>
  writeFile("public/thm-stats.json", `${JSON.stringify(stats, null, 2)}\n`)
);

console.log(JSON.stringify(stats, null, 2));
