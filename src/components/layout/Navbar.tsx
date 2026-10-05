"use client";

import Link from "next/link";
import { ArrowUpRight, BookOpen, ChevronRight, Code, LayoutGrid, Menu, Newspaper, X } from "lucide-react";
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
          <span className="brand-icon" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m4 5 5 4-5 4" /><path d="M10.5 13.5H15" /></svg></span>
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
          <Link href="/docs/getting-started" className="nav-cta">Get started</Link>
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
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
            <span className="mobile-menu-label">{menuOpen ? "Close" : "Menu"}</span>
          </button>
          {menuOpen && <>
            <button className="mobile-menu-backdrop" type="button" aria-label="Close navigation menu" onClick={closeMenu} />
            <nav
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
              <div className="mobile-nav-heading">
                <div><h2>Where to?</h2></div>
                <span className="mobile-nav-version">@hort/nps</span>
              </div>
              <div className="mobile-nav-grid">
                <Link href="/docs" className="mobile-nav-link" onClick={closeMenu}>
                  <span className="mobile-nav-link-top"><BookOpen size={17} /><ChevronRight size={15} /></span>
                  <strong>Documentation</strong><small>Install and use the CLI</small>
                </Link>
                <Link href="/#features" className="mobile-nav-link" onClick={closeMenu}>
                  <span className="mobile-nav-link-top"><LayoutGrid size={17} /><ChevronRight size={15} /></span>
                  <strong>Features</strong><small>What nps shows you</small>
                </Link>
                <Link href="/blogs" className="mobile-nav-link" onClick={closeMenu}>
                  <span className="mobile-nav-link-top"><Newspaper size={17} /><ChevronRight size={15} /></span>
                  <strong>Blog</strong><small>Notes from the project</small>
                </Link>
                <Link href="https://github.com/abhishektumula/npm-safe" className="mobile-nav-link" onClick={closeMenu} target="_blank" rel="noreferrer">
                  <span className="mobile-nav-link-top"><Code size={17} /><ArrowUpRight size={14} /></span>
                  <strong>GitHub</strong><small>Browse the source</small>
                </Link>
              </div>
              <div className="mobile-nav-bottom">
                <div className="mobile-theme-row"><span><i /> Appearance</span><ThemeToggle /></div>
                <Link href="/docs/getting-started" className="mobile-cta" onClick={closeMenu}>Get started <ArrowUpRight size={15} /></Link>
              </div>
            </nav>
          </>}
        </div>
      </div>
    </header>
  );
}
