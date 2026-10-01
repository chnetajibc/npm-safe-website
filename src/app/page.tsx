import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  CircleCheck,
  GitBranch,
  Gauge,
  PackageCheck,
  Search,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import CommandCopy from "@/components/ui/CommandCopy";

const features = [
  {
    number: "01",
    icon: Search,
    title: "See the package behind the name",
    description:
      "Review the version, description, author, and source repository before the package is added to your project.",
    command: "nps install express",
    className: "feature-audit",
  },
  {
    number: "02",
    icon: Boxes,
    title: "Understand the dependency footprint",
    description:
      "See direct, transitive, and total dependency counts while you are deciding whether to add another dependency.",
    command: "nps install express --all",
    className: "feature-fix",
  },
  {
    number: "03",
    icon: Gauge,
    title: "Treat the health score as a signal",
    description:
      "See the available Snyk score and category breakdown. It adds context; it is not a safety verdict.",
    command: "nps install express --json",
    className: "feature-integrity",
  },
  {
    number: "04",
    icon: CircleCheck,
    title: "Preview before changing anything",
    description:
      "Run a dry run to inspect package information without installing. Otherwise, the default prompt is no.",
    command: "nps install express --dry-run",
    className: "feature-upgrade",
  },
  {
    number: "05",
    icon: Boxes,
    title: "Stay with your package manager",
    description:
      "Use nps with npm, pnpm, bun, or yarn. It detects the project manager or lets you choose with --pm.",
    command: "nps install express",
    className: "feature-ci",
  },
];

const steps = [
  { number: "1", title: "Install nps", detail: "Add the CLI with the package manager you prefer." },
  { number: "2", title: "Preview a package", detail: "See its information without installing anything." },
  { number: "3", title: "Choose what happens", detail: "Continue with your manager, or stop and investigate." },
];

export default function Home() {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-wrap">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-mark" /> package context, before install</p>
            <h1>Look before<br />you <span>install.</span></h1>
            <p className="hero-description">
              See package details, dependency counts, and an available health signal before adding a new dependency. Keep your usual package manager and decide whether to continue.
            </p>
            <div className="hero-actions">
              <Link href="/docs/getting-started" className="button-primary">
                Get started <ArrowRight size={17} />
              </Link>
              <Link href="https://github.com/abhishektumula/npm-safe" className="button-quiet" target="_blank" rel="noreferrer">
                Explore on GitHub <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="hero-proof">
              <span><CircleCheck size={15} /> Open source</span>
              <span><Terminal size={15} /> A small CLI step</span>
              <span><PackageCheck size={15} /> npm · pnpm · bun</span>
            </div>
          </div>

          <div className="hero-terminal" aria-label="Example nps package review">
            <div className="terminal-topbar">
              <div className="terminal-lights" aria-hidden="true"><i /><i /><i /></div>
              <span>before-install <span className="terminal-path">/ package review</span></span>
              <span className="terminal-label">NPS</span>
            </div>
            <div className="terminal-body">
              <p className="terminal-kicker">Ask for a package summary</p>
              <div className="terminal-command"><span>$</span> nps install express</div>
              <div className="terminal-rule" />
              <p className="terminal-kicker">Inspect without installing</p>
              <div className="terminal-command"><span>$</span> nps install express --dry-run</div>
              <div className="terminal-rule" />
              <p className="terminal-kicker">Then choose what happens</p>
              <div className="terminal-command"><span>?</span> Continue with install? [y/N]</div>
              <div className="terminal-footer"><PackageCheck size={15} /> Your package manager installs only after you confirm</div>
            </div>
            <div className="terminal-stamp" aria-hidden="true"><ShieldCheck size={20} /></div>
          </div>
        </div>
          <div className="hero-bottomline"><span>PACKAGE CONTEXT BEFORE INSTALL</span><span>V0.1</span></div>
      </section>

      <section className="intro-strip" aria-label="Product summary">
        <div className="intro-mark"><ShieldCheck size={24} /></div>
        <p><strong>One extra look at the point of decision.</strong> Package context first; your call after.</p>
        <Link href="/docs/overview" className="text-link">See how it works <ArrowDownRight size={15} /></Link>
      </section>

      <section className="features-section" id="features">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The first useful slice</p>
            <h2>Useful context.<br className="mobile-break" /> <span>Your decision.</span></h2>
          </div>
          <p className="section-summary">nps is an early install wrapper, not a security verdict. It brings a few public package details together before the install starts.</p>
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
                    <span className="graph-root">express</span>
                    <span className="graph-link graph-link-one" />
                    <span className="graph-link graph-link-two" />
                    <span className="graph-node graph-direct"><i />author · source</span>
                    <span className="graph-node graph-transitive"><i />version · description</span>
                    <span className="graph-tag">package details</span>
                  </div>
                )}
                {number === "02" && (
                  <div className="version-compare">
                    <div><small>DIRECT</small><strong>1 dependency</strong></div>
                    <ArrowRight size={17} />
                    <div className="version-target"><small>TOTAL</small><strong>Tree overview</strong></div>
                  </div>
                )}
                {number === "03" && (
                  <div className="integrity-compare">
                    <span><Gauge size={17} /> Snyk health signal</span>
                    <span className="integrity-connector" />
                    <span><CircleCheck size={17} /> One input to your review</span>
                  </div>
                )}
                {number === "04" && (
                  <div className="upgrade-panel">
                    <div className="upgrade-panel-title"><Terminal size={13} /> SAFE PREVIEW</div>
                    <div><span className="upgrade-check">✓</span> Show package information</div>
                    <div><span className="upgrade-choice">↳</span> No project changes</div>
                  </div>
                )}
                {number === "05" && (
                  <div className="pipeline-visual">
                    <span className="pipeline-command">nps install express</span>
                    <ArrowRight size={18} />
                    <span className="pipeline-result"><PackageCheck size={17} /> package summary</span>
                    <ArrowRight size={18} />
                    <span className="pipeline-result">[y/N]</span>
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
          <p className="eyebrow">No lockfile migration</p>
          <h2>Keep your<br /><span>usual tools.</span></h2>
          <p>nps checks your project for its package manager, or you can choose it directly. It adds context before the install and leaves the final choice with you.</p>
          <Link href="/docs" className="text-link">Browse the documentation <ArrowRight size={15} /></Link>
        </div>
        <div className="workflow-steps">
          {steps.map((step) => (
            <div className="workflow-step" key={step.number}>
              <span className="step-number">{step.number}</span>
              <div><h3>{step.title}</h3><p>{step.detail}</p></div>
              {step.number === "1" && <code>npm install -g @hort/nps</code>}
              {step.number === "2" && <code>nps install express --dry-run</code>}
              {step.number === "3" && <code>nps install express</code>}
            </div>
          ))}
        </div>
      </section>

      <section className="install-section" id="install">
        <div className="install-copy">
          <p className="eyebrow">Ready when you are</p>
          <h2>Take a look<br />before you <span>install.</span></h2>
          <p>Install the nps command, preview package information, then let it hand off to npm, pnpm, bun, or yarn when you confirm.</p>
          <Link href="/docs/getting-started" className="button-light">Read the getting started guide <ArrowRight size={16} /></Link>
        </div>
        <div className="install-code">
          <div className="install-code-label"><Terminal size={15} /> INSTALL THE CLI</div>
          <CommandCopy command="npm install --global @hort/nps" className="install-copy-command" />
          <p>Then preview a package with <code>nps install express --dry-run</code>.</p>
        </div>
        <div className="install-decoration" aria-hidden="true">nps<span>.</span></div>
      </section>

      <section className="more-section">
        <div><GitBranch size={18} /><span>Open source. Package context before install.</span></div>
        <Link href="https://www.npmjs.com/package/@hort/nps" target="_blank" rel="noreferrer">View @hort/nps on npm <ArrowUpRight size={15} /></Link>
      </section>
    </div>
  );
}
