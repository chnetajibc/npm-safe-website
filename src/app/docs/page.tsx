export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl text-center">
      <h1 className="text-4xl font-extrabold tracking-tight mb-4">Documentation</h1>
      <p className="text-xl text-muted mb-8">Comprehensive guides and API references are coming soon!</p>
      <div className="p-8 rounded-xl border border-border bg-border/20 backdrop-blur-sm inline-block text-left">
        <code className="text-sm font-mono text-primary">npm install -g @hort/nps</code>
      </div>
    </div>
  );
}
