import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import CommandCopy from "@/components/ui/CommandCopy";
import HeroTerminal from "@/components/landing/HeroTerminal";
import PackageManagerDemo from "@/components/landing/PackageManagerDemo";

const scoreParts: [string, number][] = [
  ["security", 80],
  ["popularity", 90],
  ["maintenance", 55],
  ["community", 62],
];

const batch = [
  { name: "quick-slug", score: 92, tone: "ok" },
  { name: "ui-kit-pro", score: 71, tone: "warn" },
  { name: "old-parser", score: 38, tone: "bad" },
];

function DependencyDots({ direct, transitive }: { direct: number; transitive: number }) {
  return (
    <div className="dots" aria-hidden="true">
      {Array.from({ length: direct + transitive }, (_, i) => (
        <i key={i} className={i < direct ? "is-direct" : undefined} />
      ))}
    </div>
  );
}

const steps = [
  { title: "Install nps once", command: "npm install --global @hort/nps" },
  { title: "Look at a package", command: "nps install express --dry-run" },
  { title: "Decide to install", command: "nps install express" },
];

export default function Home() {
  return (
    <div className="landing">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>Read the label before you install.</h1>
            <p className="hero-lede">
              <code>nps</code> shows a package&apos;s version, author, source, dependency count, and health score, then asks before your package manager installs it.
            </p>
            <div className="hero-actions">
              <Link href="/docs/getting-started" className="btn btn-solid">
                Get started <ArrowRight size={17} />
              </Link>
              <Link href="https://github.com/abhishektumula/npm-safe" className="btn btn-ghost" target="_blank" rel="noreferrer">
                View on GitHub <ArrowUpRight size={16} />
              </Link>
            </div>
            <CommandCopy command="npm install --global @hort/nps" className="hero-copy-command" />
          </div>
          <HeroTerminal />
        </div>
        <div className="hero-barcode" aria-hidden="true" />
      </section>

      <section className="statement" aria-label="Why nps exists">
        <p>
          <span>Adding a dependency takes one line. Deciding whether it belongs takes a dozen browser tabs. </span>
          <strong>nps puts the useful facts in your terminal, right before the install.</strong>
        </p>
        <Link href="/blogs/why-nps-exists" className="text-link">Why nps exists <ArrowRight size={15} /></Link>
      </section>

      <section className="facts" id="features">
        <div className="facts-head">
          <h2>Everything on the label, before anything installs.</h2>
          <div>
            <p>nps gathers public details into one screen, so the decision doesn&apos;t depend on how familiar a package name sounds.</p>
            <Link href="/docs/cli-reference" className="text-link">Commands and options <ArrowRight size={15} /></Link>
          </div>
        </div>

        <div className="bento">
          <article className="tile tile-deps">
            <header>
              <h3>See how much comes with it</h3>
              <code>--all</code>
            </header>
            <p>Direct, transitive, and total dependency counts, so a one-line install doesn&apos;t surprise you with four hundred more.</p>
            <div className="deps-compare" role="img" aria-label="Sample comparison: quick-slug has 1 dependency in total. ui-kit-pro has 38 direct and 412 transitive, 450 in total.">
              <figure>
                <DependencyDots direct={1} transitive={0} />
                <figcaption><strong>quick-slug</strong><span>1 dependency</span></figcaption>
              </figure>
              <figure>
                <DependencyDots direct={38} transitive={412} />
                <figcaption><strong>ui-kit-pro</strong><span>38 direct, 412 transitive</span></figcaption>
              </figure>
            </div>
          </article>

          <article className="tile tile-score">
            <header>
              <h3>One score, four parts</h3>
            </header>
            <p>Snyk&apos;s health score out of 100, broken into what it&apos;s made of when the data is available.</p>
            <div className="score" role="img" aria-label="Sample health score of 71 out of 100: security 80, popularity 90, maintenance 55, community 62.">
              <div className="score-number">71<span>/100</span></div>
              <ul>
                {scoreParts.map(([label, value]) => (
                  <li key={label}>
                    <span>{label}</span>
                    <u><s style={{ width: `${value}%` }} className={value >= 80 ? "is-ok" : "is-warn"} /></u>
                    <b>{value}</b>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <article className="tile tile-dry">
            <header>
              <h3>Look without touching anything</h3>
              <code>--dry-run</code>
            </header>
            <p>Get the full review and stop there. Nothing is installed and your project files stay as they are.</p>
            <div className="mini-term">
              <p><em>$</em> nps install ui-kit-pro --dry-run</p>
              <p className="dim">Showing package information only.</p>
              <p className="ok">✓ Nothing was installed.</p>
            </div>
          </article>

          <article className="tile tile-batch">
            <header>
              <h3>Review several at once</h3>
            </header>
            <p>Install more than one package and nps lines them up as compact rows, so you can compare before you confirm.</p>
            <ul className="batch">
              {batch.map((item) => (
                <li key={item.name}>
                  <i className={`is-${item.tone}`} aria-hidden="true" />
                  <code>{item.name}</code>
                  <b>{item.score}<span>/100</span></b>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="verdict">
          <div>
            <h3>A signal, not a verdict</h3>
            <p>A low score is a reason to look closer, not an automatic block. A good score is not a guarantee. You decide.</p>
          </div>
          <p>Need the facts in a script? Add <code>--json</code> for machine-readable output.</p>
        </div>
      </section>

      <section className="managers">
        <div className="managers-inner">
          <div className="managers-copy">
            <h2>Keep the package manager you already use.</h2>
            <p>
              nps checks your lockfiles and <code>packageManager</code> field, then hands the install to npm, pnpm, bun, or yarn. No lockfile migration, no new workflow.
            </p>
          </div>
          <PackageManagerDemo />
        </div>

        <ol className="steps">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span className="step-index">{index + 1}</span>
              <h3>{step.title}</h3>
              <code>{step.command}</code>
            </li>
          ))}
        </ol>
      </section>

      <section className="closer">
        <div className="closer-inner">
          <h2>Look first. Install second.</h2>
          <p>Setup is one command. Nothing changes in your project until you say yes.</p>
          <CommandCopy command="npm install --global @hort/nps" className="closer-command" />
          <div className="closer-links">
            <Link href="/docs/getting-started" className="btn btn-solid">Read the getting started guide <ArrowRight size={17} /></Link>
            <Link href="https://www.npmjs.com/package/@hort/nps" className="btn btn-ghost" target="_blank" rel="noreferrer">@hort/nps on npm <ArrowUpRight size={16} /></Link>
          </div>
        </div>
        <div className="closer-mark" aria-hidden="true">nps</div>
      </section>
    </div>
  );
}
