import { getAllPosts } from '@/lib/markdown';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import PreBlock from '@/components/mdx/PreBlock';

export default function DocsPage() {
  const docs = getAllPosts('docs');

  return (
    <div className="flex flex-col gap-24 pb-32">
      {docs.map((doc) => (
        <section key={doc.slug} id={doc.slug} className="scroll-mt-32">
          <article className="max-w-3xl">
            <div className="prose prose-slate prose-lg max-w-none prose-headings:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
              <ReactMarkdown 
                rehypePlugins={[rehypeHighlight]}
                components={{
                  pre: PreBlock
                }}
              >
                {doc.content}
              </ReactMarkdown>
            </div>
          </article>
        </section>
      ))}
    </div>
  );
}
