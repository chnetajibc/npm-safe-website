"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { RotateCcw } from "lucide-react";

type Sample = {
  name: string;
  version: string;
  description: string;
  author: string;
  source: string;
  deps: [number, number, number];
  score: number;
  categories: [string, number][];
  note?: string;
};

const samples: Sample[] = [
  {
    name: "quick-slug",
    version: "2.4.1",
    description: "Turn any string into a URL-safe slug.",
    author: "Mara Ellison",
    source: "github.com/mellison/quick-slug",
    deps: [1, 0, 1],
    score: 92,
    categories: [["security", 95], ["popularity", 88], ["maintenance", 94], ["community", 90]],
  },
  {
    name: "ui-kit-pro",
    version: "5.0.3",
    description: "Every React component in one kit.",
    author: "Northlake Labs",
    source: "github.com/northlake/ui-kit-pro",
    deps: [38, 412, 450],
    score: 71,
    categories: [["security", 80], ["popularity", 90], ["maintenance", 55], ["community", 62]],
    note: "Large dependency tree. Maintenance score is low.",
  },
  {
    name: "old-parser",
    version: "0.9.2",
    description: "A fast CSV parser.",
    author: "unknown",
    source: "no repository listed",
    deps: [4, 17, 21],
    score: 38,
    categories: [["security", 41], ["popularity", 22], ["maintenance", 12], ["community", 30]],
    note: "Low health score. Look closer before continuing.",
  },
];

const TYPE_MS = 38;
const LOOKUP_MS = 650;
const ROW_MS = 110;
const DONE = 1e9;

function subscribeReducedMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const getReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getServerReducedMotion = () => false;

function Meter({ value }: { value: number }) {
  return <u aria-hidden="true"><s style={{ width: `${value}%` }} /></u>;
}

const tone = (value: number) => (value >= 80 ? "ok" : value >= 50 ? "warn" : "bad");

function Session({ sample, onReplay }: { sample: Sample; onReplay: () => void }) {
  const reduced = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getServerReducedMotion);
  const [elapsed, setElapsed] = useState(0);
  const [answer, setAnswer] = useState<null | { choice: "y" | "n"; at: number }>(null);

  const command = `nps install ${sample.name}`;
  const time = reduced ? DONE : elapsed;
  const typeEnd = command.length * TYPE_MS;
  const lookupEnd = typeEnd + 350 + LOOKUP_MS;

  // Card rows: title, description, blank, author, source, deps, blank, score, four categories, optional note.
  const rowCount = 12 + (sample.note ? 1 : 0);
  const rowsEnd = lookupEnd + rowCount * ROW_MS;
  const promptAt = rowsEnd + 250;
  const resultAt = answer ? answer.at + 380 : Infinity;
  // The clock pauses at the prompt and resumes once the visitor answers.
  const paused = answer === null ? time >= promptAt : time >= resultAt;
  const running = !reduced && !paused;

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setElapsed((value) => value + 40), 40);
    return () => window.clearInterval(id);
  }, [running]);

  const respond = (choice: "y" | "n") => {
    if (answer || time < promptAt) return;
    setAnswer({ choice, at: reduced ? 0 : elapsed });
  };

  const typed = command.slice(0, Math.min(command.length, Math.floor(time / TYPE_MS)));
  const typing = time < typeEnd;
  const showLookup = time >= typeEnd + 350 && time < lookupEnd;
  const revealed = time < lookupEnd ? 0 : Math.min(rowCount, Math.floor((time - lookupEnd) / ROW_MS) + 1);
  const row = (n: number) => revealed >= n;
  const showPrompt = time >= promptAt;
  const showResult = answer !== null && time >= resultAt;
  const [direct, transitive, total] = sample.deps;

  return (
    <div
      className="term-body"
      onKeyDown={(event) => {
        if (event.key.toLowerCase() === "y") respond("y");
        if (event.key.toLowerCase() === "n") respond("n");
      }}
    >
      <p className="term-line">
        <span className="term-prompt">$</span> {typed}
        {typing && <span className="term-cursor" aria-hidden="true" />}
      </p>
      {showLookup && <p className="term-line term-dim"><span className="term-spinner" aria-hidden="true" /> Looking up {sample.name}…</p>}

      {revealed > 0 && (
        <div className="term-card" aria-live="polite">
          {row(1) && <p className="term-title">{sample.name}<span>@{sample.version}</span></p>}
          {row(2) && <p className="term-desc">{sample.description}</p>}
          {row(4) && <p className="term-fact"><span>author</span><b>{sample.author}</b></p>}
          {row(5) && <p className="term-fact"><span>source</span><b>{sample.source}</b></p>}
          {row(6) && <p className="term-fact"><span>deps</span><b>{direct} direct · {transitive} transitive · {total} total</b></p>}
          {row(8) && (
            <p className="term-fact term-score">
              <span>health</span>
              <b className={`is-${tone(sample.score)}`}>{sample.score}<i>/100</i> <Meter value={sample.score} /></b>
            </p>
          )}
          {sample.categories.map(([label, value], index) => (
            row(9 + index) && (
              <p className="term-fact term-category" key={label}>
                <span>{label}</span>
                <b className={`is-${tone(value)}`}><Meter value={value} /> {value}</b>
              </p>
            )
          ))}
          {sample.note && row(13) && <p className={`term-note is-${tone(sample.score)}`}>! {sample.note}</p>}
        </div>
      )}

      {showPrompt && (
        <div className="term-prompt-row">
          <p className="term-line"><span className="term-ask">?</span> Install {sample.name}? <span className="term-dim">[y/N]</span> {answer && <span className="term-answer">{answer.choice}</span>}</p>
          {!answer && (
            <div className="term-choices">
              <button type="button" onClick={() => respond("y")} aria-label={`Yes, install ${sample.name}`}><kbd>y</kbd> Install</button>
              <button type="button" onClick={() => respond("n")} aria-label={`No, do not install ${sample.name}`}><kbd>n</kbd> Not yet</button>
            </div>
          )}
        </div>
      )}

      {showResult && answer && (
        <div aria-live="polite">
          {answer.choice === "y" ? (
            <p className="term-line term-result is-ok">✓ Handing off to your package manager.</p>
          ) : (
            <p className="term-line term-result is-bad">■ Stopped. Nothing was installed.</p>
          )}
          <button type="button" className="term-replay" onClick={onReplay}><RotateCcw size={13} /> Run it again</button>
        </div>
      )}
    </div>
  );
}

export default function HeroTerminal() {
  const [index, setIndex] = useState(0);
  const [run, setRun] = useState(0);
  const sample = samples[index];

  return (
    <div className="term-wrap">
      <div className="term" role="group" aria-label="Interactive example of an nps package review. Sample data.">
        <div className="term-bar">
          <span className="term-lights" aria-hidden="true"><i /><i /><i /></span>
          <span className="term-title-bar">~/my-project</span>
          <span className="term-badge">sample output</span>
        </div>
        <Session key={`${sample.name}-${run}`} sample={sample} onReplay={() => setRun((n) => n + 1)} />
      </div>

      <div className="term-picker" role="radiogroup" aria-label="Choose a sample package">
        <span>Try a different package</span>
        {samples.map((item, i) => (
          <button
            key={item.name}
            type="button"
            role="radio"
            aria-checked={i === index}
            className={i === index ? "is-active" : undefined}
            onClick={() => { setIndex(i); setRun((n) => n + 1); }}
          >
            <i className={`is-${tone(item.score)}`} aria-hidden="true" />{item.name}
          </button>
        ))}
      </div>
    </div>
  );
}
