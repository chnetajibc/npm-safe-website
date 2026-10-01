import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Bug,
  Boxes,
  Braces,
  CircleCheck,
  GitBranch,
  LockKeyhole,
  PackageCheck,
  ScanSearch,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import CommandCopy from "@/components/ui/CommandCopy";

const features = [
  {
    number: "01",
    icon: ScanSearch,
    title: "Trace the whole dependency tree",
    description:
      "Audit direct and transitive packages, cross-reference vulnerability sources, and see which dependency path brought an issue into your project.",
    command: "nps audit",
    className: "feature-audit",
  },
  {
    number: "02",
    icon: Bug,
    title: "Move from finding to fixing",
    description:
      "Use the automatic fix flow for compatible updates and lockfile patches, with semver in mind.",
    command: "nps audit --fix",
    className: "feature-fix",
  },
  {
    number: "03",
    icon: LockKeyhole,
    title: "Check package integrity",
    description:
      "Verify installed package contents against npm registry signatures and look for unexpected changes after installation.",
    command: "nps verify --strict",
    className: "feature-integrity",
  },
  {
    number: "04",
    icon: Braces,
    title: "Review major upgrades",
    description:
      "When a safe patch is not enough, inspect breaking changes and choose major-version upgrades in an interactive workflow.",
    command: "nps update",
    className: "feature-upgrade",
  },
  {
    number: "05",
    icon: Boxes,
    title: "Bring security into CI",
    description:
      "Export audit data as JSON for your reporting tools, and use strict verification to fail a pipeline on signature mismatches.",
    command: "nps audit --json",
    className: "feature-ci",
  },
];

const steps = [
  { number: "1", title: "Install", detail: "Add the CLI globally with npm." },
  { number: "2", title: "Audit", detail: "Run it in your Node.js project." },
  { number: "3", title: "Act", detail: "Fix, verify, or wire checks into CI." },
];

export default function Home() {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-wrap">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-mark" /> npm security, in your terminal</p>
            <h1>Know what’s in your tree.<br /><span>Keep it safe.</span></h1>
            <p className="hero-description">
              Find vulnerable npm dependencies, understand where they came from, and take action without leaving your workflow.
            </p>
            <div className="hero-actions">
              <Link href="/docs#getting-started" className="button-primary">
                Get started <ArrowRight size={17} />
              </Link>
              <Link href="https://github.com/netaji/npm-safe" className="button-quiet" target="_blank" rel="noreferrer">
                Explore on GitHub <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="hero-proof">
              <span><CircleCheck size={15} /> Open source</span>
              <span><Terminal size={15} /> Works from your CLI</span>
              <span><PackageCheck size={15} /> Built for npm projects</span>
            </div>
          </div>

          <div className="hero-terminal" aria-label="Example npm-safe commands">
            <div className="terminal-topbar">
              <div className="terminal-lights" aria-hidden="true"><i /><i /><i /></div>
              <span>your-project <span className="terminal-path">/ security</span></span>
              <span className="terminal-label">SHELL</span>
            </div>
            <div className="terminal-body">
              <p className="terminal-kicker">Start with an audit</p>
              <div className="terminal-command"><span>$</span> nps audit</div>
              <div className="terminal-rule" />
              <p className="terminal-kicker">Apply compatible fixes</p>
              <div className="terminal-command"><span>$</span> nps audit --fix</div>
              <div className="terminal-rule" />
              <p className="terminal-kicker">Verify installed packages</p>
              <div className="terminal-command"><span>$</span> nps verify</div>
              <div className="terminal-footer"><BadgeCheck size={15} /> One focused toolkit for npm project security</div>
            </div>
            <div className="terminal-stamp" aria-hidden="true"><ShieldCheck size={20} /></div>
          </div>
        </div>
        <div className="hero-bottomline"><span>DEPENDENCY HEALTH</span><span>01 — 05</span></div>
      </section>

      <section className="intro-strip" aria-label="Product summary">
        <div className="intro-mark"><ShieldCheck size={24} /></div>
        <p><strong>Security work should fit the way you build.</strong> Audit, fix, verify, and keep moving.</p>
        <Link href="/docs#features" className="text-link">See how it works <ArrowDownRight size={15} /></Link>
      </section>

      <section className="features-section" id="features">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A practical security toolkit</p>
            <h2>From dependency<br className="mobile-break" /> <span>risk to resolution.</span></h2>
          </div>
          <p className="section-summary">Get a clearer picture of your npm dependencies, then choose the right next step for your project.</p>
        </div>

        <div className="feature-grid">
          {features.map(({ number, icon: Icon, title, description, command, className }) => (
            <article className={`feature-card ${className}`} key={number}>
              <div className="feature-card-top"><span className="feature-number">{number} / 05</span><Icon size={19} strokeWidth={1.8} /></div>
              <div className="feature-copy">
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <div className={`feature-visual visual-${number}`} aria-hidden="true">
                {number === "01" && (
                  <div className="dependency-map">
                    <span className="graph-root">your app</span>
                    <span className="graph-link graph-link-one" />
                    <span className="graph-link graph-link-two" />
                    <span className="graph-node graph-direct"><i />direct dependency</span>
                    <span className="graph-node graph-transitive"><i />transitive package</span>
                    <span className="graph-tag">advisory path</span>
                  </div>
                )}
                {number === "02" && (
                  <div className="version-compare">
                    <div><small>INSTALLED</small><strong>Current version</strong></div>
                    <ArrowRight size={17} />
                    <div className="version-target"><small>COMPATIBLE UPDATE</small><strong>Semver-safe fix</strong></div>
                  </div>
                )}
                {number === "03" && (
                  <div className="integrity-compare">
                    <span><PackageCheck size={17} /> Installed package</span>
                    <span className="integrity-connector" />
                    <span><ShieldCheck size={17} /> Registry signature</span>
                  </div>
                )}
                {number === "04" && (
                  <div className="upgrade-panel">
                    <div className="upgrade-panel-title"><Terminal size={13} /> UPGRADE REVIEW</div>
                    <div><span className="upgrade-check">✓</span> Inspect changed APIs</div>
                    <div><span className="upgrade-choice">↳</span> Choose a major update</div>
                  </div>
                )}
                {number === "05" && (
                  <div className="pipeline-visual">
                    <span className="pipeline-command">nps audit --json</span>
                    <ArrowRight size={18} />
                    <span className="pipeline-result"><Braces size={17} /> structured JSON</span>
                    <ArrowRight size={18} />
                    <span className="pipeline-result">CI workflow</span>
                  </div>
                )}
              </div>
              <div className="feature-command"><span>$</span>{command}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="workflow-section">
        <div className="workflow-aside">
          <p className="eyebrow">A shorter path to safer releases</p>
          <h2>Security checks<br />that fit <span>your flow.</span></h2>
          <p>Start locally, learn what needs attention, and carry the same checks into your delivery pipeline.</p>
          <Link href="/docs" className="text-link">Browse the documentation <ArrowRight size={15} /></Link>
        </div>
        <div className="workflow-steps">
          {steps.map((step) => (
            <div className="workflow-step" key={step.number}>
              <span className="step-number">{step.number}</span>
              <div><h3>{step.title}</h3><p>{step.detail}</p></div>
              {step.number === "1" && <code>npm install -g @hort/nps</code>}
              {step.number === "2" && <code>nps audit</code>}
              {step.number === "3" && <code>nps verify --strict</code>}
            </div>
          ))}
        </div>
      </section>

      <section className="install-section" id="install">
        <div className="install-copy">
          <p className="eyebrow">Ready when you are</p>
          <h2>Make your next<br />install a <span>safer one.</span></h2>
          <p>Install @hort/nps, run your first audit, and explore the commands from the getting started guide.</p>
          <Link href="/docs#getting-started" className="button-light">Read the getting started guide <ArrowRight size={16} /></Link>
        </div>
        <div className="install-code">
          <div className="install-code-label"><Terminal size={15} /> TERMINAL</div>
          <CommandCopy command="npm install -g @hort/nps" className="install-copy-command" />
          <p>Then run <code>nps audit</code> inside your project.</p>
        </div>
        <div className="install-decoration" aria-hidden="true">nps<span>.</span></div>
      </section>

      <section className="more-section">
        <div><GitBranch size={18} /><span>Open source. Made for the npm ecosystem.</span></div>
        <Link href="https://www.npmjs.com/package/@hort/nps" target="_blank" rel="noreferrer">View @hort/nps on npm <ArrowUpRight size={15} /></Link>
      </section>
    </div>
  );
}
