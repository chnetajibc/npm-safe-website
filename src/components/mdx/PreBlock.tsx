"use client";

import { useState, useRef } from "react";
import { Check, Copy } from "lucide-react";

export default function PreBlock({ children, ...props }: any) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = () => {
    if (preRef.current) {
      const text = preRef.current.innerText || "";
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative group my-4">
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 p-1.5 rounded bg-[#1e293b]/80 hover:bg-[#334155] border border-white/10 opacity-0 group-hover:opacity-100 transition-all z-10 text-white shadow-sm"
        aria-label="Copy code"
      >
        {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
      </button>
      <pre ref={preRef} {...props} className="overflow-x-auto rounded-lg !bg-[#0d1117] p-4 text-sm m-0 border border-white/5 relative">
        {children}
      </pre>
    </div>
  );
}
