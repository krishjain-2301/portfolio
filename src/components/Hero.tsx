"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/lib/data";

function XIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const roles = [
  "AI Red Teamer",
  "LLM Security Researcher",
  "Cybersecurity Engineer",
  "CTF Competitor",
];

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 pt-20">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/5 px-4 py-1.5"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent/70" />
          <span className="font-mono text-xs tracking-wider text-accent/80 uppercase">
            Available for opportunities
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-4 text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl"
        >
          <span className="gradient-text glow-text">{siteConfig.name}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-6"
        >
          <p className="font-mono text-base text-accent/60 sm:text-lg">
            {siteConfig.title}
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mx-auto mb-8 max-w-2xl text-lg text-foreground/60"
        >
          {siteConfig.tagline} Pursuing a career at the intersection of
          offensive security and AI safety.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mb-12 flex flex-wrap items-center justify-center gap-3"
        >
          {roles.map((role, i) => (
            <motion.span
              key={role}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="rounded-lg border border-accent/10 bg-surface px-4 py-2 font-mono text-xs text-foreground/70"
            >
              {role}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="rounded-lg bg-accent/90 px-8 py-3 font-mono text-sm font-semibold text-black transition-all hover:bg-accent hover:shadow-[0_0_24px_rgba(0,255,65,0.25)]"
          >
            View Projects
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-2 rounded-lg border border-accent/15 bg-surface px-6 py-3 font-mono text-sm text-foreground/80 transition-all hover:border-accent/30 hover:bg-surface-elevated"
          >
            <Mail size={16} />
            Get in Touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex items-center justify-center gap-6"
        >
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-accent"
            aria-label="GitHub"
          >
            <Github size={22} />
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-accent"
            aria-label="LinkedIn"
          >
            <Linkedin size={22} />
          </a>
          <a
            href={siteConfig.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-accent"
            aria-label="X"
          >
            <XIcon />
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-muted transition-colors hover:text-accent"
            aria-label="Email"
          >
            <Mail size={22} />
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted transition-colors hover:text-accent"
        aria-label="Scroll to about"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown size={24} />
        </motion.div>
      </motion.a>
    </section>
  );
}
