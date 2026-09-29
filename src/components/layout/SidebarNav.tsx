"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type DocLink = { slug: string; title: string; category?: string };

export default function SidebarNav({ docs }: { docs: DocLink[] }) {
  const pathname = usePathname();

  // Group docs by category (defaulting to 'Overview' if none provided)
  const groupedDocs = docs.reduce((acc, doc) => {
    const cat = doc.category || 'Overview';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(doc);
    return acc;
  }, {} as Record<string, DocLink[]>);

  return (
    <nav className="flex flex-col gap-6">
      {Object.entries(groupedDocs).map(([category, items]) => (
        <div key={category}>
          <h4 className="font-semibold text-sm mb-3 text-foreground tracking-tight flex items-center gap-1">
            {category}
          </h4>
          <ul className="flex flex-col gap-2 border-l border-border/50 ml-1">
            {items.map((doc) => {
              const href = `/docs/${doc.slug}`;
              const isActive = pathname === href;

              return (
                <li key={doc.slug}>
                  <Link
                    href={href}
                    className={twMerge(
                      clsx(
                        "relative flex items-center pl-4 py-1.5 text-sm transition-colors",
                        isActive
                          ? "text-primary font-medium"
                          : "text-muted hover:text-foreground"
                      )
                    )}
                  >
                    {isActive && (
                      <span className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-primary rounded-r" />
                    )}
                    {doc.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
