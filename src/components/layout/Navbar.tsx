"use client";

import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node) && !menuButtonRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

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
          <Link className="nav-external" href="https://github.com/abhishektumula/npm-safe" target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight size={13} />
          </Link>
          <ThemeToggle />
          <Link href="/docs/getting-started" className="nav-cta">Get started <span>↗</span></Link>
        </div>

        <div className="mobile-navigation">
          <button
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation-panel"
            className={`mobile-menu-toggle${menuOpen ? " is-open" : ""}`}
            onClick={() => setMenuOpen((open) => !open)}
            onKeyDown={(event) => {
              if (event.key === "Escape" && menuOpen) {
                closeMenu();
                menuButtonRef.current?.focus();
              }
            }}
            ref={menuButtonRef}
            type="button"
          >
            <span /><span />
          </button>
          {menuOpen && <nav
            aria-label="Mobile navigation"
            id="mobile-navigation-panel"
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                closeMenu();
                menuButtonRef.current?.focus();
              }
            }}
            ref={menuRef}
          >
            <div className="mobile-theme-row"><span>Appearance</span><ThemeToggle /></div>
            <Link href="/docs" onClick={closeMenu}>Documentation</Link>
            <Link href="/#features" onClick={closeMenu}>Features</Link>
            <Link href="/blogs" onClick={closeMenu}>Blog</Link>
            <Link href="https://github.com/abhishektumula/npm-safe" onClick={closeMenu} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></Link>
            <Link href="/docs/getting-started" className="mobile-cta" onClick={closeMenu}>Get started</Link>
          </nav>}
        </div>
      </div>
    </header>
  );
}
