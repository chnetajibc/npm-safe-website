import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background py-8">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
        <div className="flex items-center gap-2 opacity-50">
          <ShieldCheck className="h-5 w-5" />
          <span className="font-semibold text-sm tracking-tight">@hort/nps</span>
        </div>
        <p className="text-center text-xs text-muted md:text-left">
          &copy; {new Date().getFullYear()} @hort/nps. MIT Licensed.
        </p>
      </div>
    </footer>
  );
}
