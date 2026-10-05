"use client";

import { useRef, useState, type KeyboardEvent } from "react";

const managers = [
  { id: "npm", lockfile: "package-lock.json", runs: "npm install express" },
  { id: "pnpm", lockfile: "pnpm-lock.yaml", runs: "pnpm add express" },
  { id: "bun", lockfile: "bun.lock", runs: "bun add express" },
  { id: "yarn", lockfile: "yarn.lock", runs: "yarn add express" },
];

export default function PackageManagerDemo() {
  const [active, setActive] = useState(1);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = managers[active];

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (active + step + managers.length) % managers.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="pm">
      <div className="pm-tabs" role="tablist" aria-label="Package manager" onKeyDown={onKeyDown}>
        {managers.map((manager, index) => (
          <button
            key={manager.id}
            ref={(node) => { tabs.current[index] = node; }}
            type="button"
            role="tab"
            id={`pm-tab-${manager.id}`}
            aria-selected={index === active}
            aria-controls="pm-panel"
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
          >
            {manager.id}
          </button>
        ))}
      </div>

      <div className="pm-panel" role="tabpanel" id="pm-panel" aria-labelledby={`pm-tab-${current.id}`}>
        <div className="pm-step">
          <span>Your project has</span>
          <code key={current.id}>{current.lockfile}</code>
        </div>
        <div className="pm-step">
          <span>You run</span>
          <code><em>$</em> nps install express</code>
        </div>
        <div className="pm-step is-last">
          <span>After you confirm, nps runs</span>
          <code key={current.id}><em>$</em> {current.runs}</code>
        </div>
      </div>

      <p className="pm-note">Using a different manager than the lockfile suggests? Add <code>--pm {current.id}</code>.</p>
    </div>
  );
}
