"use client";

import { motion } from "framer-motion";
import { Award, Shield } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";

export function Achievements() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="05."
          title="Achievements & Certifications"
          subtitle="Competitions, CTF wins, and professional credentials."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="mb-6 flex items-center gap-2 font-mono text-xs tracking-widest text-accent/70 uppercase">
              <Award size={14} />
              CTF & Competitions
            </h3>
            <div className="space-y-4">
              {siteConfig.achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.event}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group flex items-center gap-4 matrix-card p-4 transition-all hover:border-accent/20"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/8 font-mono text-xs font-bold text-accent/70">
                    {achievement.title === "Rank 1" ? "#1" : "🏆"}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground/90">
                      {achievement.event}
                    </p>
                    <p className="text-sm text-muted">
                      {achievement.title} · {achievement.type}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-6 flex items-center gap-2 font-mono text-xs tracking-widest text-accent/70 uppercase">
              <Shield size={14} />
              Certifications
            </h3>
            <div className="space-y-4">
              {siteConfig.certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group flex items-center justify-between matrix-card p-4 transition-all hover:border-accent/20"
                >
                  <div>
                    <p className="font-semibold text-foreground/90">
                      {cert.name}
                    </p>
                    <p className="text-sm text-muted">{cert.issuer}</p>
                  </div>
                  <span className="rounded-md bg-surface-elevated px-3 py-1 font-mono text-xs text-muted">
                    {cert.year}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
