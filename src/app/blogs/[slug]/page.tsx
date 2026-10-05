import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock3 } from 'lucide-react';
import PreBlock from '@/components/mdx/PreBlock';
import { getAllPosts, getPostBySlug } from '@/lib/markdown';

type BlogRouteProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts('blogs').map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, 'blogs');
  if (!post) return {};

  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      type: 'article',
      publishedTime: post.meta.date,
    },
  };
}

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default async function BlogPostPage({ params }: BlogRouteProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug, 'blogs');
  if (!post) notFound();

  return (
    <main className="journal-article-page">
      <div className="journal-article-topline">
        <Link href="/blogs"><ArrowLeft size={15} /> All articles</Link>
        <span>Notes from nps</span>
      </div>

      <header className="journal-article-header">
        <p className="journal-article-category">{post.meta.category ?? 'Product notes'}</p>
        <h1>{post.meta.title}</h1>
        <p className="journal-article-excerpt">{post.meta.excerpt}</p>
        <div className="journal-article-byline">
          <span className="journal-author-mark">N</span>
          <span>From the nps project</span>
          <span className="journal-byline-divider" />
          <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
          {post.meta.readTime && <><span className="journal-byline-divider" /><span><Clock3 size={13} /> {post.meta.readTime}</span></>}
        </div>
      </header>

      <div className="journal-article-rule"><span>nps<span>.</span></span></div>

      <article className="journal-prose prose prose-lg max-w-none">
        <ReactMarkdown
          rehypePlugins={[rehypeHighlight]}
          components={{
            pre: PreBlock,
            a: ({ href, children, ...props }) => (
              <a href={href} {...props}>
                {children}
                {href?.startsWith('http') && <ArrowUpRight size={13} aria-hidden="true" />}
              </a>
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </article>

      <footer className="journal-article-footer">
        <div><span>Keep going</span><p>See how the install flow works in your own project.</p></div>
        <Link href="/docs">Read the quick start <ArrowRight size={15} /></Link>
      </footer>
    </main>
  );
}
