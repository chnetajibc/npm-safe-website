import { getAllPosts } from '@/lib/markdown';
import SidebarNav from '@/components/layout/SidebarNav';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const docs = getAllPosts('docs');
  
  const docLinks = docs.map(doc => ({
    slug: doc.slug,
    title: doc.meta.title,
    category: doc.meta.category
  }));

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl flex flex-col md:flex-row gap-8 lg:gap-12">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 lg:w-72 flex-shrink-0">
        <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto pr-4 scrollbar-hide">
          <SidebarNav docs={docLinks} />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </div>
  );
}
