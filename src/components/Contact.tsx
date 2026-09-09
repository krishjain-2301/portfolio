"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";
import { XIcon } from "./XIcon";

const socialLinks = [
  {
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
    value: siteConfig.email,
  },
  {
    label: "GitHub",
    href: siteConfig.github,
    icon: Github,
    value: siteConfig.githubUsername,
  },
  {
    label: "LinkedIn",
    href: siteConfig.linkedin,
    icon: Linkedin,
    value: "kriishjaiin",
  },
  {
    label: "X",
    href: siteConfig.twitter,
    icon: XIcon,
    value: "krishvain",
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="07."
          title="Get In Touch"
          subtitle="Open to AI Red Teaming roles, security research, and collaboration."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glow-border matrix-card relative overflow-hidden p-8 sm:p-12"
        >
          <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-accent/5 blur-3xl" />

          <div className="relative text-center">
            <h3 className="mb-4 text-2xl font-bold text-foreground/90 sm:text-3xl">
              Let&apos;s build something{" "}
              <span className="gradient-text">secure</span>.
            </h3>
            <p className="mx-auto mb-10 max-w-lg text-muted">
              Whether it&apos;s AI red teaming, vulnerability research, or a
              security project — I&apos;d love to hear from you.
            </p>

            <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.label !== "Email" ? "_blank" : undefined}
                  rel={
                    link.label !== "Email" ? "noopener noreferrer" : undefined
                  }
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex flex-col items-center gap-3 rounded-xl border border-accent/8 bg-surface-elevated p-6 transition-all hover:border-accent/20"
                >
                  <link.icon
                    size={24}
                    className="text-muted transition-colors group-hover:text-accent"
                  />
                  <span className="font-mono text-xs tracking-wider text-muted uppercase">
                    {link.label}
                  </span>
                  <span className="text-sm text-foreground/70">{link.value}</span>
                </motion.a>
              ))}
            </div>

            <a
              href={`mailto:${siteConfig.email}?subject=Hello%20Krish!`}
              className="inline-flex items-center gap-2 rounded-lg bg-accent/90 px-8 py-3 font-mono text-sm font-semibold text-black transition-all hover:bg-accent hover:shadow-[0_0_24px_rgba(0,255,65,0.25)]"
            >
              <Send size={16} />
              Send a Message
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
