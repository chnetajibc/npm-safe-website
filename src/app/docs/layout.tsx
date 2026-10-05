import { getAllPosts } from '@/lib/markdown';
import SidebarNav from '@/components/layout/SidebarNav';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const docs = getAllPosts('docs');
  const docLinks = docs.map((doc) => ({
    slug: doc.slug,
    title: doc.meta.title,
    category: doc.meta.category,
  }));

  return (
    <div className="docs-layout">
      <aside className="docs-sidebar">
        <div className="docs-sidebar-sticky">
          <p className="docs-sidebar-title">In this guide</p>
          <SidebarNav docs={docLinks} />
          <div className="docs-sidebar-note">
            <span className="docs-sidebar-dot" />
            <p>Early release<br /><strong>@hort/nps 0.1.x</strong></p>
          </div>
        </div>
      </aside>
      <main className="docs-main">{children}</main>
    </div>
  );
}
