"use client";

import { motion } from "framer-motion";

export function SectionHeader({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <span className="font-mono text-sm text-accent/60">{number}</span>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground/90 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 max-w-xl text-muted">{subtitle}</p>
      )}
    </motion.div>
  );
}
