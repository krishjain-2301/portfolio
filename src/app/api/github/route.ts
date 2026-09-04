import { fetchGitHubStats } from "@/lib/github";
import { siteConfig } from "@/lib/data";
import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  try {
    const stats = await fetchGitHubStats(siteConfig.githubUsername);
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch GitHub activity" },
      { status: 500 }
    );
  }
}
