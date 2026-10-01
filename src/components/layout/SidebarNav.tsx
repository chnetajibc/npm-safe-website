"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import type { MouseEvent } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type DocLink = { slug: string; title: string; category?: string };

export default function SidebarNav({ docs }: { docs: DocLink[] }) {
  const pathname = usePathname();
  const activeSlug = pathname.split('/').filter(Boolean).at(-1) ?? 'overview';

  const groupedDocs = docs.reduce((groups, doc) => {
    const category = doc.category || 'Overview';
    groups[category] ??= [];
    groups[category].push(doc);
    return groups;
  }, {} as Record<string, DocLink[]>);

  const activeTitle = docs.find((doc) => doc.slug === activeSlug)?.title ?? 'Documentation';
  const closeMobileMenu = (event: MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.closest('details')?.removeAttribute('open');
  };

  const renderLinks = () => Object.entries(groupedDocs).map(([category, items]) => (
    <div key={category}>
      <h4 className="font-semibold text-sm mb-3 text-foreground tracking-tight">{category}</h4>
      <ul className="flex flex-col gap-1">
        {items.map((doc) => {
          const active = activeSlug === doc.slug;
          return (
            <li key={doc.slug}>
              <Link
                href={`/docs/${doc.slug}`}
                onClick={closeMobileMenu}
                aria-current={active ? 'page' : undefined}
                className={twMerge(clsx('docs-sidebar-link', active && 'is-active'))}
              >
                {doc.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  ));

  return (
    <>
      <nav className="docs-nav-desktop" aria-label="Documentation pages">{renderLinks()}</nav>
      <details className="docs-nav-mobile">
        <summary>
          <span>Documentation</span>
          <span className="docs-nav-current">{activeTitle}</span>
          <ChevronDown size={16} aria-hidden="true" />
        </summary>
        <nav className="docs-nav-mobile-list" aria-label="Documentation pages">{renderLinks()}</nav>
      </details>
    </>
  );
}
