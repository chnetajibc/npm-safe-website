"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

type Accent = {
  name: string;
  value: string;
};

const ACCENTS: Accent[] = [
  { name: "Cobalt", value: "#2b36f0" },
  { name: "Emerald", value: "#047857" },
  { name: "Ember", value: "#c2410c" },
  { name: "Grape", value: "#7c3aed" },
  { name: "Crimson", value: "#be123c" },
];

const STORAGE_KEY = "nps-accent";

function loadSaved(): string {
  if (typeof window === "undefined") return ACCENTS[0].value;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return ACCENTS.some((a) => a.value === saved)
      ? (saved as string)
      : ACCENTS[0].value;
  } catch {
    return ACCENTS[0].value;
  }
}

function applyAccent(value: string) {
  const root = document.documentElement;
  root.style.setProperty("--cobalt", value);
  // Dark-only site: text accents use a lightened mix so they stay readable on dark backgrounds.
  const soft = `color-mix(in srgb, ${value} 55%, white)`;
  root.style.setProperty("--primary", soft);
  root.style.setProperty("--secondary", soft);
}

export default function AccentSwitcher() {
  const [active, setActive] = useState<string>(loadSaved);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Sync the CSS variables + persistence with the latest selection.
  useEffect(() => {
    applyAccent(active);
    try {
      window.localStorage.setItem(STORAGE_KEY, active);
    } catch {
      // ignore persistence failures
    }
    window.dispatchEvent(new Event("nps-accent-change"));
  }, [active]);

  // Keep parallel instances (desktop + mobile nav) in agreement.
  useEffect(() => {
    const sync = () => setActive(loadSaved());
    window.addEventListener("storage", sync);
    window.addEventListener("nps-accent-change", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("nps-accent-change", sync);
    };
  }, []);

  // Close on outside click or Escape while the menu is open.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open ]);

  const current = ACCENTS.find((a) => a.value === active) ?? ACCENTS[0];

  const focusOption = (index: number) => {
    const clamped = (index + ACCENTS.length) % ACCENTS.length;
    optionRefs.current[clamped]?.focus();
  };

  const choose = (value: string) => {
    setActive(value);
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div
      className="accent-dropdown"
      ref={rootRef}
      suppressHydrationWarning
    >
      <button
        ref={triggerRef}
        type="button"
        className="accent-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Choose accent color, current: ${current.name}`}
        title="Choose accent color"
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        <i style={{ background: current.value }} aria-hidden="true" />
        <ChevronDown size={14} aria-hidden="true" />
      </button>
      {open && (
        <div className="accent-menu" role="menu" aria-label="Accent colors">
          {ACCENTS.map((accent, index) => {
            const isActive = accent.value === active;
            return (
              <button
                key={accent.value}
                ref={(element) => {
                  optionRefs.current[index] = element;
                }}
                type="button"
                role="menuitemradio"
                aria-checked={isActive}
                className={isActive ? "accent-option is-active" : "accent-option"}
                onClick={() => choose(accent.value)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    focusOption(index + 1);
                  }
                  if (event.key === "ArrowUp") {
                    event.preventDefault();
                    focusOption(index - 1);
                  }
                }}
              >
                <i style={{ background: accent.value }} aria-hidden="true" />
                <span>{accent.name}</span>
                {isActive && <Check size={14} strokeWidth={3} aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
