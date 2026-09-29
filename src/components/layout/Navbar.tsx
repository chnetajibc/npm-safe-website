import Link from 'next/link';
import { GitBranch } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tighter">npm-safe</span>
        </Link>
        <nav className="hidden md:flex gap-6">
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
            <span className="text-sm font-medium hidden md:block">GitHub</span>
            <span className="sr-only">GitHub</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
