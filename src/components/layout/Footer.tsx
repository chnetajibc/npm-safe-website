import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link href="/" className="footer-wordmark">nps<span>.</span></Link>
          <p>Package context before install. Open source, early release.</p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link href="/docs">Documentation</Link>
          <Link href="/blogs">Blog</Link>
          <Link href="https://github.com/abhishektumula/npm-safe" target="_blank" rel="noreferrer">GitHub</Link>
          <Link href="https://www.npmjs.com/package/@hort/nps" target="_blank" rel="noreferrer">npm</Link>
        </nav>
      </div>
    </footer>
  );
}
