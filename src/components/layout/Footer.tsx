import Link from 'next/link';
import { ShieldCheck, Heart } from 'lucide-react';

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
        
        <div className="flex items-center gap-1.5 text-xs text-muted">
          <span>Built with</span>
          <Heart className="h-3 w-3 text-red-500/70 fill-red-500/70" />
          <span>by</span>
          <a 
            href="mailto:chnetajibc@gmail.com" 
            className="text-foreground font-medium hover:text-primary transition-colors"
          >
            CH Netaji Bhadraiahnath Chowdary
          </a>
        </div>
      </div>
    </footer>
  );
}
