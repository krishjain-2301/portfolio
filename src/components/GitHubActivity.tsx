"use client";

import "react-activity-calendar/tooltips.css";
import { motion } from "framer-motion";
import { ActivityCalendar } from "react-activity-calendar";
import { ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { GitHubStats } from "@/lib/github";
import { siteConfig } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";

function useCalendarBlockSize(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [blockSize, setBlockSize] = useState(13);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const update = () => {
      const width = container.clientWidth - 24;
      const weeks = 53;
      const margin = 3;
      const labelWidth = 30;
      const size = Math.floor((width - labelWidth) / weeks - margin);
      setBlockSize(Math.max(11, Math.min(size, 20)));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(container);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [containerRef]);

  return blockSize;
}

export function GitHubActivity() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const calendarRef = useRef<HTMLDivElement>(null);
  const blockSize = useCalendarBlockSize(calendarRef);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => res.json())
      .then((data: GitHubStats) => setStats(data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="activity" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="03."
          title="GitHub Activity"
          subtitle="Live contribution graph synced from my GitHub profile."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="matrix-card glow-border overflow-hidden p-6 sm:p-8"
        >
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-mono text-xs tracking-widest text-label uppercase">
                @{siteConfig.githubUsername}
              </p>
              <p className="mt-1 text-sm text-secondary">
                {loading
                  ? "Syncing contributions..."
                  : `${stats?.totalContributions.toLocaleString() ?? "—"} contributions in the last year`}
              </p>
            </div>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-accent/20 px-4 py-2 font-mono text-xs text-accent transition-colors hover:border-accent/40 hover:text-accent-bright"
            >
              View Profile
              <ExternalLink size={14} />
            </a>
          </div>

          <div
            ref={calendarRef}
            className="github-calendar-full w-full rounded-xl border border-accent/10 bg-black/40 p-4"
          >
            {loading ? (
              <div className="flex h-36 items-center justify-center font-mono text-sm text-secondary">
                Loading activity graph...
              </div>
            ) : stats ? (
              <ActivityCalendar
                data={stats.contributions}
                theme={{
                  light: ["#0a0a0a", "#0f2e16", "#145a22", "#1a8630", "#00ff41"],
                  dark: ["#0a0a0a", "#0f2e16", "#145a22", "#1a8630", "#00ff41"],
                }}
                colorScheme="dark"
                blockSize={blockSize}
                blockMargin={3}
                fontSize={12}
                showWeekdayLabels={["mon", "wed", "fri"]}
                showTotalCount={false}
                style={{ color: "rgba(180, 255, 200, 0.85)", width: "100%" }}
              />
            ) : (
              <div className="flex h-36 items-center justify-center font-mono text-sm text-secondary">
                Unable to load GitHub activity.
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
