"use client";

import Link from 'next/link';
import { useState } from 'react';
import { GitBranch, ShieldCheck, Package, Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex flex-col items-center px-4 w-full">
      <div className="flex h-14 w-full max-w-5xl items-center justify-between rounded-full border border-white/10 bg-[#020817]/60 backdrop-blur-2xl px-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative z-20">
        <Link href="/" className="flex items-center gap-2 group" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="bg-primary/20 p-1.5 rounded-full group-hover:bg-primary/30 transition-colors">
            <ShieldCheck className="h-4 w-4 text-primary" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold tracking-tighter text-foreground">
              @hort/nps
            </span>
            <span className="hidden sm:inline-block text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              v1.0.0-beta
            </span>
          </div>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          <Link href="/docs" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
            Documentation
          </Link>
          <Link href="/blogs" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
            Blog
          </Link>
        </nav>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="https://www.npmjs.com/package/@hort/nps" target="_blank" rel="noreferrer" className="text-muted hover:text-foreground transition-colors flex items-center gap-2" title="View on NPM">
            <Package className="h-5 w-5" />
            <span className="sr-only">NPM</span>
          </Link>
          <Link href="https://github.com/netaji/npm-safe" target="_blank" rel="noreferrer" className="text-muted hover:text-foreground transition-colors flex items-center gap-2" title="View on GitHub">
            <GitBranch className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="/docs" className="inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 -mr-2 text-muted hover:text-foreground transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={twMerge(
          clsx(
            "md:hidden fixed inset-0 z-10 bg-background/98 backdrop-blur-2xl transition-all duration-300 flex flex-col",
            isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )
        )}
      >
        <div className="flex flex-col h-full pt-28 px-6 pb-8">
          <div className="flex flex-col gap-6 text-2xl font-semibold tracking-tight">
            <Link href="/docs" onClick={() => setIsMobileMenuOpen(false)} className="text-foreground hover:text-primary transition-colors border-b border-white/5 pb-6">
              Documentation
            </Link>
            <Link href="/blogs" onClick={() => setIsMobileMenuOpen(false)} className="text-foreground hover:text-primary transition-colors border-b border-white/5 pb-6">
              Blog
            </Link>
          </div>
          
          <div className="mt-auto flex flex-col gap-6">
            <div className="flex items-center gap-6">
              <Link href="https://www.npmjs.com/package/@hort/nps" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-muted hover:text-foreground transition-colors">
                <Package className="h-6 w-6" />
                <span className="font-medium">NPM</span>
              </Link>
              <Link href="https://github.com/netaji/npm-safe" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-muted hover:text-foreground transition-colors">
                <GitBranch className="h-6 w-6" />
                <span className="font-medium">GitHub</span>
              </Link>
            </div>
            <Link href="/docs" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center rounded-2xl text-lg font-bold transition-colors bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 py-4 flex items-center justify-center">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
