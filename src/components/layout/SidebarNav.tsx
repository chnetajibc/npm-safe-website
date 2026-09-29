"use client";

import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type DocLink = { slug: string; title: string; category?: string };

export default function SidebarNav({ docs }: { docs: DocLink[] }) {
  const [activeSlug, setActiveSlug] = useState<string>('');

  useEffect(() => {
    // Determine the active section on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    docs.forEach((doc) => {
      const el = document.getElementById(doc.slug);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [docs]);

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
              const href = `/docs#${doc.slug}`;
              const isActive = activeSlug === doc.slug;

              return (
                <li key={doc.slug}>
                  <a
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(doc.slug);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                        // Update URL without a full navigation
                        window.history.pushState(null, '', href);
                        setActiveSlug(doc.slug);
                      }
                    }}
                    className={twMerge(
                      clsx(
                        "relative flex items-center pl-4 py-1.5 text-sm transition-colors cursor-pointer",
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
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
