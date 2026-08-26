import { siteConfig } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-accent/10 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js.
        </p>
        <p className="font-mono text-xs text-muted">
          <span className="text-accent/70">$</span> echo &quot;Stay curious, stay
          secure.&quot;
          <span className="cursor-blink ml-0.5 inline-block h-3 w-1.5 bg-accent/70" />
        </p>
      </div>
    </footer>
  );
}
