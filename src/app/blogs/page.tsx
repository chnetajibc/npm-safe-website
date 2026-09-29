import Link from 'next/link';
import { getAllPosts } from '@/lib/markdown';
import { Calendar } from 'lucide-react';

export default function BlogsPage() {
  const posts = getAllPosts('blogs');

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Blog</h1>
        <p className="text-xl text-muted">Latest updates, tutorials, and security deep dives.</p>
      </div>

      <div className="grid gap-8">
        {posts.map((post) => (
          <Link href={`/blogs/${post.slug}`} key={post.slug} className="block group">
            <article className="p-6 rounded-xl border border-border bg-border/20 backdrop-blur-sm hover:border-primary/50 transition-colors">
              <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                {post.meta.title}
              </h2>
              <div className="flex items-center text-sm text-muted mb-4 gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.meta.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
              <p className="text-muted leading-relaxed">
                {post.meta.excerpt}
              </p>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
