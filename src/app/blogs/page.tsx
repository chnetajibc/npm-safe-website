import Link from 'next/link';
import { getAllPosts } from '@/lib/markdown';
import { Calendar, ArrowRight } from 'lucide-react';

export default function BlogsPage() {
  const posts = getAllPosts('blogs');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Blog Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-[#e8eddf] via-background to-background -z-10" />
        <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 md:mb-6">
            Insights & <span className="text-primary">Security Research</span>
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto">
            Deep dives into Node.js vulnerabilities, supply chain attacks, and how to secure your ecosystem.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 md:py-20 container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link href={`/blogs/${post.slug}`} key={post.slug} className="group flex flex-col h-full">
              <article className="flex flex-col h-full p-8 border border-border bg-white/50 hover:bg-white/80 hover:border-primary/40 transition-colors duration-200 relative overflow-hidden">
                <div className="flex items-center text-xs font-medium text-primary mb-6 gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.meta.date}>
                    {new Date(post.meta.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </time>
                </div>
                
                <h2 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors leading-snug">
                  {post.meta.title}
                </h2>
                
                <p className="text-muted leading-relaxed mb-8 flex-1">
                  {post.meta.excerpt}
                </p>
                
                <div className="flex items-center text-sm font-semibold text-foreground group-hover:text-primary transition-colors mt-auto">
                  Read Article <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
