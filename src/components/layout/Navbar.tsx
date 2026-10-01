import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="site-nav">
        <Link href="/" className="site-brand" aria-label="npm-safe home">
          <span className="brand-icon"><ShieldCheck size={17} strokeWidth={2.2} /></span>
          <span className="brand-name">npm-safe</span>
          <span className="brand-package">@hort/nps</span>
        </Link>

        <nav className="desktop-links" aria-label="Main navigation">
          <Link href="/docs">Docs</Link>
          <Link href="/#features">Features</Link>
          <Link href="/blogs">Blog</Link>
        </nav>

        <div className="nav-actions">
          <Link className="nav-external" href="https://github.com/netaji/npm-safe" target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight size={13} />
          </Link>
          <ThemeToggle />
          <Link href="/docs#getting-started" className="nav-cta">Get started <span>↗</span></Link>
        </div>

        <details className="mobile-navigation">
          <summary aria-label="Navigation menu"><span /><span /></summary>
          <nav aria-label="Mobile navigation">
            <div className="mobile-theme-row"><span>Appearance</span><ThemeToggle /></div>
            <Link href="/docs">Documentation</Link>
            <Link href="/#features">Features</Link>
            <Link href="/blogs">Blog</Link>
            <Link href="https://github.com/netaji/npm-safe" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></Link>
            <Link href="/docs#getting-started" className="mobile-cta">Get started</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
