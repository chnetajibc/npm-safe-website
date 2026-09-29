import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background py-8 mt-auto">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row px-4 max-w-6xl">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2 opacity-80">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <span className="font-semibold text-sm tracking-tight">@hort/nps</span>
          </div>
          <p className="text-xs text-muted text-center md:text-left">
            &copy; {new Date().getFullYear()} @hort/nps. MIT Licensed.
          </p>
        </div>
      </div>
    </footer>
  );
}
