"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export default function CommandCopy({ command, className }: { command: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={twMerge(clsx("flex items-center justify-between px-6 py-4 rounded-full bg-white/5 border border-white/10 text-foreground font-mono text-sm backdrop-blur-md gap-4", className))}>
      <div className="flex items-center overflow-x-auto scrollbar-hide">
        <span className="text-muted mr-3 select-none">$</span>
        <span className="whitespace-nowrap">{command}</span>
      </div>
      <button
        onClick={handleCopy}
        className="p-1.5 rounded-md hover:bg-white/10 text-muted hover:text-foreground transition-colors flex-shrink-0"
        aria-label="Copy command"
      >
        {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}
