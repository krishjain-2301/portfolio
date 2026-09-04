"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, Flame, Shield, Target, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import type { TryHackMeStats } from "@/lib/tryhackme";
import { siteConfig } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";

export function TryHackMeProfile() {
  const fallback = siteConfig.tryHackMe;
  const [stats, setStats] = useState<TryHackMeStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tryhackme")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: TryHackMeStats | null) => {
        if (data && !("error" in data)) setStats(data);
      })
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  const profile = stats ?? {
    username: fallback.username,
    profileUrl: fallback.profileUrl,
    title: fallback.title,
    rank: fallback.rank,
    level: String(fallback.level),
    badges: fallback.badges,
    streak: fallback.streak,
    completedRooms: fallback.completedRooms,
    recentRooms: fallback.recentRooms,
  };

  const statCards = [
    { label: "Rank", value: profile.rank, icon: Trophy },
    { label: "Level", value: profile.level, icon: Target },
    { label: "Badges", value: String(profile.badges), icon: Award },
    { label: "Streak", value: String(profile.streak), icon: Flame },
  ];

  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="04."
          title="TryHackMe Profile"
          subtitle="Hands-on offensive and defensive security labs — synced from TryHackMe."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="matrix-card glow-border overflow-hidden p-6 sm:p-8"
        >
          <div className="mb-8 flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="font-mono text-lg font-semibold text-foreground">
                {profile.username}
              </p>
              <p className="font-mono text-sm text-accent-bright">{profile.title}</p>
              <p className="mt-1 text-xs text-secondary">Student · India</p>
              {loading && (
                <p className="mt-2 text-xs text-label">Syncing profile...</p>
              )}
            </div>

            <a
              href={profile.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-accent/20 px-4 py-2 font-mono text-xs text-accent transition-colors hover:border-accent/40 hover:text-accent-bright"
            >
              View Profile
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {statCards.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="matrix-card flex flex-col items-center gap-2 p-4 text-center"
              >
                <Icon size={16} className="text-accent" />
                <span className="font-mono text-lg font-bold text-accent-bright">
                  {value}
                </span>
                <span className="text-xs text-label">{label}</span>
              </div>
            ))}
          </div>

          {(profile.recentRooms ?? []).length > 0 && (
            <>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-mono text-xs tracking-widest text-label uppercase">
                  <Shield size={14} />
                  Recent Completed Rooms
                </h3>
                <span className="font-mono text-xs text-secondary">
                  {profile.completedRooms} rooms completed
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {(profile.recentRooms ?? []).map((room) => (
                  <div
                    key={room.name}
                    className="matrix-card flex h-full flex-col p-4"
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <h4 className="font-semibold text-foreground">
                        {room.name}
                      </h4>
                      <span className="rounded border border-accent/20 px-2 py-0.5 font-mono text-[10px] text-accent-bright">
                        {room.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-secondary">{room.description}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
