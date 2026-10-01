"use client";

import { useState } from "react";
import { Check, Copy, X } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export default function CommandCopy({ command, className }: { command: string; className?: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 2200);
  };

  return (
    <div className={twMerge(clsx("flex items-center justify-between px-6 py-4 rounded-full bg-white/5 border border-white/10 text-foreground font-mono text-sm backdrop-blur-md gap-4", className))}>
      <div className="flex items-center overflow-x-auto scrollbar-hide">
        <span className="text-muted mr-3 select-none">$</span>
        <span className="whitespace-nowrap">{command}</span>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="p-1.5 rounded-md hover:bg-white/10 text-muted hover:text-foreground transition-colors flex-shrink-0"
        aria-label={status === "copied" ? "Command copied" : status === "error" ? "Could not copy command" : "Copy command"}
        title={status === "error" ? "Clipboard unavailable. Select and copy the command." : undefined}
      >
        {status === "copied" ? <Check className="h-4 w-4 text-emerald-400" /> : status === "error" ? <X className="h-4 w-4 text-red-400" /> : <Copy className="h-4 w-4" />}
      </button>
      <span className="sr-only" aria-live="polite">
        {status === "copied" ? "Command copied to clipboard." : status === "error" ? "Clipboard unavailable. Select and copy the command." : ""}
      </span>
    </div>
  );
}
