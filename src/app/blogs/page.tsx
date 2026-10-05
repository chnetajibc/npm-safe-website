import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock3 } from 'lucide-react';
import { getAllPosts } from '@/lib/markdown';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Product notes and practical writing from the npm-safe project.',
  alternates: { canonical: '/blogs' },
};

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function BlogsPage() {
  const posts = getAllPosts('blogs');

  return (
    <main className="blogs-page">
      <div className="blogs-breadcrumb"><Link href="/">npm-safe</Link><span>/</span><span>Blog</span></div>
      <header className="blogs-header">
        <p>Writing from the nps project</p>
        <h1>Blog</h1>
        <p className="blogs-description">Product notes and practical thoughts on package decisions, supply-chain signals, and building nps.</p>
      </header>

      <section className="blogs-catalog" aria-label="All articles">
        <div className="blogs-catalog-heading">
          <h2>All articles</h2>
          <span>{posts.length} {posts.length === 1 ? 'article' : 'articles'}</span>
        </div>
        {posts.length > 0 ? (
          <div className="blogs-list">
            {posts.map((post) => (
              <Link className="blog-entry" href={`/blogs/${post.slug}`} key={post.slug}>
                <div className="blog-entry-meta">
                  <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
                  <span className="blog-entry-separator">·</span>
                  <span>{post.meta.category ?? 'Notes'}</span>
                  {post.meta.readTime && <span className="blog-entry-reading"><Clock3 size={13} /> {post.meta.readTime}</span>}
                </div>
                <h3>{post.meta.title}<ArrowRight size={17} aria-hidden="true" /></h3>
                <p>{post.meta.excerpt}</p>
                <span className="blog-entry-action">Read article <ArrowRight size={14} /></span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="blogs-empty">No articles yet. Check back soon.</p>
        )}
      </section>
    </main>
  );
}
