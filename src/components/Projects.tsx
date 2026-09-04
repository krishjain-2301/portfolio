"use client";

import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";

export function Projects() {
  return (
    <section id="projects" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="05."
          title="Featured Projects"
          subtitle="Tools and platforms I've built in AI security and cybersecurity."
        />

        <div className="grid auto-rows-fr gap-6 lg:grid-cols-3">
          {siteConfig.projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="group card-hover matrix-card relative flex h-full min-h-[420px] flex-col overflow-hidden"
            >
              <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-accent/5 blur-2xl transition-all group-hover:bg-accent/8" />

              <div className="relative flex h-full flex-col p-6 sm:p-8">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <Star size={14} className="text-accent/60" />
                      <span className="font-mono text-xs text-accent/60 uppercase">
                        Featured
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground/90 sm:text-2xl">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted">{project.subtitle}</p>
                  </div>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded-lg border border-accent/10 p-2 text-muted transition-all hover:border-accent/25 hover:text-accent"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>

                <p className="mb-4 text-sm text-foreground/60 sm:text-base">
                  {project.description}
                </p>

                <ul className="mb-6 flex-1 space-y-2">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2 text-sm text-muted"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/50" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-surface-elevated px-2.5 py-1 font-mono text-[10px] text-muted uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
