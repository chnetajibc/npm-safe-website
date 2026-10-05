"use client";

import { useState } from "react";
import { Check, Copy, X } from "lucide-react";

export default function CommandCopy({ command, className = "" }: { command: string; className?: string }) {
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
    <div className={`copy-command ${className}`.trim()}>
      <code>
        <span aria-hidden="true">$</span>
        {command}
      </code>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={status === "copied" ? "Command copied" : status === "error" ? "Could not copy command" : "Copy command"}
        title={status === "error" ? "Clipboard unavailable. Select and copy the command." : undefined}
      >
        {status === "copied" ? <Check size={16} /> : status === "error" ? <X size={16} /> : <Copy size={16} />}
        <span>{status === "copied" ? "Copied" : status === "error" ? "Failed" : "Copy"}</span>
      </button>
      <span className="sr-only" aria-live="polite">
        {status === "copied" ? "Command copied to clipboard." : status === "error" ? "Clipboard unavailable. Select and copy the command." : ""}
      </span>
    </div>
  );
}
