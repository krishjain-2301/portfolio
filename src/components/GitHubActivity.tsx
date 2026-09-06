"use client";

import "github-contrib-graph/styles.css";
import { GitHubContributionGraph } from "github-contrib-graph/react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";

const matrixTheme = {
  bgColor: "transparent",
  textColor: "rgba(180, 255, 200, 0.85)",
  inactiveTextColor: "rgba(0, 255, 65, 0.45)",
  linkHoverColor: "#5dff8a",
  cellLevel0: "#0a0a0a",
  cellLevel1: "#0f2e16",
  cellLevel2: "#145a22",
  cellLevel3: "#1a8630",
  cellLevel4: "#00ff41",
  cellBorderColor: "rgba(0, 255, 65, 0.1)",
  cellOutlineColor: "transparent",
  borderColor: "rgba(0, 255, 65, 0.12)",
  borderWidth: 0,
  cardPadding: 0,
  cardPaddingBlock: 0,
  cardRadius: 0,
  canvasPaddingTop: 0,
  canvasMarginInline: 0,
  cellGap: 3,
  cellRadius: 2,
  footerPadding: "12px 0 0",
  footerFontSize: 11,
  fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
};

function useResponsiveCellSize(
  containerRef: React.RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const update = () => {
      const width = container.clientWidth - 32;
      const weeks = 53;
      const labelWidth = 28;
      const gap = 3;
      const size = Math.floor((width - labelWidth) / weeks - gap);
      container.style.setProperty(
        "--gh-cell-size",
        `${Math.max(10, Math.min(size, 16))}px`
      );
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
}

export function GitHubActivity() {
  const calendarRef = useRef<HTMLDivElement>(null);
  useResponsiveCellSize(calendarRef);

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
            <p className="font-mono text-xs tracking-widest text-label uppercase">
              @{siteConfig.githubUsername}
            </p>
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
            <GitHubContributionGraph
              username={siteConfig.githubUsername}
              theme={matrixTheme}
              showHeader={false}
              showFooter={true}
              showThumbnail={false}
              showWeekdayLabels={true}
              dayLabels={["", "Mon", "", "Wed", "", "Fri", ""]}
              className="w-full"
              classNames={{
                root: "github-contrib-root",
                card: "github-contrib-card",
                canvas: "github-contrib-canvas",
                monthLabel: "github-contrib-label",
                dayLabel: "github-contrib-label",
                footer: "github-contrib-footer",
              }}
              loadingFallback={
                <div className="flex h-36 items-center justify-center font-mono text-sm text-secondary">
                  Loading activity graph...
                </div>
              }
              errorFallback={
                <div className="flex h-36 items-center justify-center font-mono text-sm text-secondary">
                  Unable to load GitHub activity.
                </div>
              }
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
