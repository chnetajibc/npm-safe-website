import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link href="/" className="footer-brand"><ShieldCheck size={17} /> @hort/nps</Link>
        <p>Open source npm security toolkit</p>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link href="/docs">Documentation</Link>
          <Link href="/blogs">Blog</Link>
          <Link href="https://github.com/netaji/npm-safe" target="_blank" rel="noreferrer">GitHub</Link>
        </nav>
      </div>
    </footer>
  );
}
