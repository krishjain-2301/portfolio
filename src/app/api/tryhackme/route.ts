import { fetchTryHackMeStats } from "@/lib/tryhackme";
import { siteConfig } from "@/lib/data";
import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = await fetchTryHackMeStats(
      siteConfig.tryHackMe.username,
      siteConfig.tryHackMe.profileUrl,
      siteConfig.tryHackMe.userId,
      siteConfig.tryHackMe.userPublicId,
      siteConfig.tryHackMe
    );

    if (stats.synced) {
      return NextResponse.json(stats);
    }

    try {
      const filePath = path.join(process.cwd(), "public", "thm-stats.json");
      const cached = JSON.parse(await readFile(filePath, "utf8"));
      return NextResponse.json({
        ...cached,
        username: siteConfig.tryHackMe.username,
        profileUrl: siteConfig.tryHackMe.profileUrl,
        synced: true,
      });
    } catch {
      return NextResponse.json(stats);
    }
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch TryHackMe profile" },
      { status: 500 }
    );
  }
}
