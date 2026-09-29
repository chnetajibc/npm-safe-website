import { getPostBySlug, getAllPosts } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { ArrowRight } from 'lucide-react';

export async function generateStaticParams() {
  const docs = getAllPosts('docs');
  return docs.map((doc) => ({
    slug: doc.slug,
  }));
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const doc = getPostBySlug(resolvedParams.slug, 'docs');

  if (!doc) {
    notFound();
  }

  return (
    <article className="max-w-3xl">
      <div className="prose prose-invert prose-lg max-w-none prose-headings:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-pre:border prose-pre:border-border prose-pre:bg-[#0d1117]">
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{doc.content}</ReactMarkdown>
      </div>
      
      <div className="mt-16 pt-8 border-t border-border flex justify-between items-center text-sm text-muted">
        <p>Was this page helpful?</p>
        <button className="flex items-center hover:text-primary transition-colors">
          Give Feedback <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
