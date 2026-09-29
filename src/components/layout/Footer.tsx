import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-6 md:py-0">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6">
        <p className="text-center text-sm leading-loose text-muted md:text-left">
          Built by the open-source community. Code available on{' '}
          <Link
            href="https://github.com/netaji/npm-safe"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </Link>.
        </p>
      </div>
    </footer>
  );
}
