import Link from 'next/link';
import { getAllPosts } from '@/lib/markdown';
import { Calendar, ArrowRight } from 'lucide-react';

export default function BlogsPage() {
  const posts = getAllPosts('blogs');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Blog Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10" />
        <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Security Research</span>
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Deep dives into Node.js vulnerabilities, supply chain attacks, and how to secure your ecosystem.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <Link href={`/blogs/${post.slug}`} key={post.slug} className="group flex flex-col h-full">
              <article className="flex flex-col h-full p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-primary/50 transition-all duration-300 relative overflow-hidden">
                {/* Glow effect on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity" />
                
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
