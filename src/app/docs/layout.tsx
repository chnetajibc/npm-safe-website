import Link from 'next/link';
import { getAllPosts } from '@/lib/markdown';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const docs = getAllPosts('docs');

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-24">
          <h3 className="font-semibold text-lg mb-4 text-foreground">Documentation</h3>
          <nav className="flex flex-col gap-2">
            {docs.map((doc) => (
              <Link
                key={doc.slug}
                href={`/docs/${doc.slug}`}
                className="text-muted hover:text-primary transition-colors text-sm font-medium py-1"
              >
                {doc.meta.title}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </div>
  );
}
