import { getPostBySlug, getAllPosts } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';

export async function generateStaticParams() {
  const posts = getAllPosts('blogs');
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug, 'blogs');

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
      <Link href="/blogs" className="inline-flex items-center text-sm font-medium text-muted hover:text-primary transition-colors mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blogs
      </Link>
      
      <header className="mb-10 border-b border-border pb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          {post.meta.title}
        </h1>
        <div className="flex items-center text-muted gap-2">
          <Calendar className="h-4 w-4" />
          <time dateTime={post.meta.date}>
            {new Date(post.meta.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </time>
        </div>
      </header>

      <div className="prose prose-invert prose-lg max-w-none prose-headings:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
