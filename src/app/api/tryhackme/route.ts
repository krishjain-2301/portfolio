import { fetchTryHackMeStats } from "@/lib/tryhackme";
import { siteConfig } from "@/lib/data";
import { NextResponse } from "next/server";

export const revalidate = 900;

export async function GET() {
  try {
    const stats = await fetchTryHackMeStats(
      siteConfig.tryHackMe.username,
      siteConfig.tryHackMe.profileUrl,
      siteConfig.tryHackMe.userId,
      siteConfig.tryHackMe.userPublicId,
      siteConfig.tryHackMe
    );

    return NextResponse.json(stats);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch TryHackMe profile" },
      { status: 500 }
    );
  }
}
