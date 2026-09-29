import Link from 'next/link';
import { GitBranch, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/20 p-1.5 rounded-lg group-hover:bg-primary/30 transition-colors">
            <ShieldCheck className="h-5 w-5 text-primary" />
          </div>
          <span className="text-xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            @hort/nps
          </span>
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
          <Link href="https://github.com/netaji/npm-safe" target="_blank" rel="noreferrer" className="text-muted hover:text-foreground transition-colors flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="/docs" className="hidden sm:inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
