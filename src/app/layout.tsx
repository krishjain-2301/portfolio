import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Krish Jain | AI Red Teaming & Cybersecurity",
  description:
    "Portfolio of Krish Jain — Cybersecurity student specializing in AI Red Teaming, LLM security, and offensive security.",
  keywords: [
    "Krish Jain",
    "Cybersecurity",
    "AI Red Teaming",
    "LLM Security",
    "Portfolio",
  ],
  authors: [{ name: "Krish Jain" }],
  openGraph: {
    title: "Krish Jain | AI Red Teaming & Cybersecurity",
    description:
      "Cybersecurity student at VIT Chennai pursuing a career in AI Red Teaming.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
