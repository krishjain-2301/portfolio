"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";

export function About() {
  return (
    <section id="about" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="01."
          title="About Me"
          subtitle="Who I am and what drives me."
        />

        <div className="grid gap-12 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <p className="mb-6 text-lg leading-relaxed text-foreground/70">
              {siteConfig.about}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-muted">
                <MapPin size={16} className="text-accent/70" />
                {siteConfig.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <GraduationCap size={16} className="text-accent/70" />
                VIT Chennai
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glow-border matrix-card p-6">
              <h3 className="mb-4 font-mono text-xs tracking-widest text-accent/70 uppercase">
                Education
              </h3>
              <p className="mb-1 font-semibold text-foreground/90">
                {siteConfig.education.degree}
              </p>
              <p className="mb-3 text-sm text-muted">
                {siteConfig.education.school}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">{siteConfig.education.period}</span>
                <span className="rounded-md bg-accent/10 px-3 py-1 font-mono text-xs text-accent/80">
                  CGPA {siteConfig.education.cgpa}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
