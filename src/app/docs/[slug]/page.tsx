import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { isValidElement, type ReactNode } from 'react';
import PreBlock from '@/components/mdx/PreBlock';
import DocsTableOfContents from '@/components/layout/DocsTableOfContents';
import { getAllPosts, getPostBySlug } from '@/lib/markdown';

type DocsRouteProps = { params: Promise<{ slug: string }> };
type Heading = { level: number; title: string; id: string };

function slugify(value: string) {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[`*_~]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-');
}

function textFromChildren(children: ReactNode): string {
  if (typeof children === 'string' || typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(textFromChildren).join('');
  if (isValidElement<{ children?: ReactNode }>(children)) return textFromChildren(children.props.children);
  return '';
}

function getHeadings(markdown: string): Heading[] {
  const counts = new Map<string, number>();
  return markdown.split('\n').flatMap((line) => {
    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) return [];
    const title = match[2].replace(/[`*_~]/g, '').trim();
    const base = slugify(title);
    const count = counts.get(base) ?? 0;
    counts.set(base, count + 1);
    return [{ level: match[1].length, title, id: count === 0 ? base : `${base}-${count}` }];
  });
}

export async function generateStaticParams() {
  return getAllPosts('docs').map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: DocsRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getPostBySlug(slug, 'docs');
  if (!doc) return {};

  return {
    title: doc.meta.title,
    description: doc.meta.description,
    alternates: { canonical: `/docs/${slug}` },
  };
}

export default async function DocsArticlePage({ params }: DocsRouteProps) {
  const { slug } = await params;
  const doc = getPostBySlug(slug, 'docs');
  if (!doc) notFound();

  const docs = getAllPosts('docs');
  const currentIndex = docs.findIndex((item) => item.slug === doc.slug);
  const previous = docs[currentIndex - 1];
  const next = docs[currentIndex + 1];
  const headings = getHeadings(doc.content);
  const headingCounts = new Map<string, number>();
  const makeHeading = (level: number) => {
    const HeadingComponent = ({ children }: { children?: ReactNode }) => {
      const title = textFromChildren(children);
      const base = slugify(title);
      const count = headingCounts.get(base) ?? 0;
      headingCounts.set(base, count + 1);
      const id = count === 0 ? base : `${base}-${count}`;
      const Tag = level === 2 ? 'h2' : 'h3';
      return <Tag id={id}>{children}</Tag>;
    };
    HeadingComponent.displayName = `DocsHeading${level}`;
    return HeadingComponent;
  };

  return (
    <div className="docs-reading-grid">
      <main className="docs-article-page">
        <div className="docs-breadcrumb"><BookOpen size={14} /><Link href="/docs/overview">Docs</Link><span>/</span><span>{doc.meta.title}</span></div>
        <header className="docs-page-header">
          <p>{doc.meta.category}</p>
          <h1>{doc.meta.title}</h1>
          <div>{doc.meta.description}</div>
        </header>
        <article className="docs-prose prose prose-lg max-w-none">
          <ReactMarkdown
            rehypePlugins={[rehypeHighlight]}
            components={{
              h2: makeHeading(2),
              h3: makeHeading(3),
              pre: PreBlock,
              a: ({ href, children, ...props }) => (
                <a href={href} {...props}>
                  {children}
                  {href?.startsWith('http') && <ArrowUpRight size={13} aria-hidden="true" />}
                </a>
              ),
            }}
          >
            {doc.content}
          </ReactMarkdown>
        </article>
        <nav className="docs-next-prev" aria-label="Documentation pages">
          {previous ? (
            <Link href={`/docs/${previous.slug}`} className="docs-page-direction">
              <span><ArrowLeft size={14} /> PREVIOUS</span><strong>{previous.meta.title}</strong>
            </Link>
          ) : <span />}
          {next && (
            <Link href={`/docs/${next.slug}`} className="docs-page-direction docs-page-direction-next">
              <span>NEXT <ArrowRight size={14} /></span><strong>{next.meta.title}</strong>
            </Link>
          )}
        </nav>
      </main>
      {headings.length > 0 && (
        <DocsTableOfContents headings={headings} />
      )}
    </div>
  );
}
