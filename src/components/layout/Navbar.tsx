import Link from 'next/link';
import { GitBranch, ShieldCheck, Package } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 w-full">
      <div className="flex h-14 w-full max-w-5xl items-center justify-between rounded-full border border-white/10 bg-[#020817]/60 backdrop-blur-2xl px-6 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/20 p-1.5 rounded-full group-hover:bg-primary/30 transition-colors">
            <ShieldCheck className="h-4 w-4 text-primary" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold tracking-tighter text-foreground">
              @hort/nps
            </span>
            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              v1.0.0-beta
            </span>
          </div>
        </Link>
        <nav className="hidden md:flex gap-8">
          <Link href="/docs" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
            Documentation
          </Link>
          <Link href="/blogs" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
            Blog
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="https://www.npmjs.com/package/@hort/nps" target="_blank" rel="noreferrer" className="text-muted hover:text-foreground transition-colors flex items-center gap-2" title="View on NPM">
            <Package className="h-5 w-5" />
            <span className="sr-only">NPM</span>
          </Link>
          <Link href="https://github.com/netaji/npm-safe" target="_blank" rel="noreferrer" className="text-muted hover:text-foreground transition-colors flex items-center gap-2" title="View on GitHub">
            <GitBranch className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="/docs" className="hidden sm:inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
