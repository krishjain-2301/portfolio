import { fetchTryHackMeStats } from "@/lib/tryhackme";
import { siteConfig } from "@/lib/data";
import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  try {
    const stats = await fetchTryHackMeStats(
      siteConfig.tryHackMe.username,
      siteConfig.tryHackMe.profileUrl,
      siteConfig.tryHackMe.userId
    );

    if (!stats.synced) {
      return NextResponse.json({
        username: siteConfig.tryHackMe.username,
        profileUrl: siteConfig.tryHackMe.profileUrl,
        title: siteConfig.tryHackMe.title,
        rank: siteConfig.tryHackMe.rank,
        level: siteConfig.tryHackMe.level,
        badges: siteConfig.tryHackMe.badges,
        streak: siteConfig.tryHackMe.streak,
        completedRooms: siteConfig.tryHackMe.completedRooms,
        recentRooms: siteConfig.tryHackMe.recentRooms,
        synced: false,
      });
    }

    return NextResponse.json(stats);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch TryHackMe profile" },
      { status: 500 }
    );
  }
}
