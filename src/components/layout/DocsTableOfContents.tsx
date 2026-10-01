"use client";

import { useEffect, useState } from 'react';

type Heading = { level: number; title: string; id: string };

export default function DocsTableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? '');

  useEffect(() => {
    if (headings.length === 0) return;

    let frame = 0;
    const updateActiveHeading = () => {
      frame = 0;
      const readLine = window.scrollY + 150;
      let currentId = headings[0].id;

      for (const heading of headings) {
        const element = document.getElementById(heading.id);
        if (element && element.getBoundingClientRect().top + window.scrollY <= readLine) {
          currentId = heading.id;
        }
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        currentId = headings[headings.length - 1].id;
      }

      setActiveId((current) => current === currentId ? current : currentId);
    };

    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(updateActiveHeading);
    };

    updateActiveHeading();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [headings]);

  return (
    <aside className="docs-toc">
      <p>ON THIS PAGE</p>
      <nav aria-label="On this page">
        {headings.map((heading) => (
          <a
            key={`${heading.id}-${heading.level}`}
            className={`${heading.level === 3 ? 'is-nested ' : ''}${activeId === heading.id ? 'is-active' : ''}`.trim()}
            href={`#${heading.id}`}
            aria-current={activeId === heading.id ? 'location' : undefined}
          >
            {heading.title}
          </a>
        ))}
      </nav>
    </aside>
  );
}
