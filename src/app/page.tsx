import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import CommandCopy from "@/components/ui/CommandCopy";
import HeroTerminal from "@/components/landing/HeroTerminal";
import PackageManagerDemo from "@/components/landing/PackageManagerDemo";

const facts = [
  {
    title: "Package",
    body: "Name, version, description, author, and the source repository it came from.",
  },
  {
    title: "Dependencies",
    body: "Direct, transitive, and total counts. Add the flag for names, a transitive sample, and the license.",
    flag: "--all",
  },
  {
    title: "Health score",
    body: "Snyk's score out of 100, split into security, popularity, maintenance, and community when it's available.",
  },
  {
    title: "Dry run",
    body: "Everything above, with nothing installed and nothing changed in your project.",
    flag: "--dry-run",
  },
  {
    title: "JSON",
    body: "The same facts as machine-readable output, for scripts and CI.",
    flag: "--json",
  },
];

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
        <div className="facts-intro">
          <h2>Everything on the label, before anything installs.</h2>
          <p>
            nps gathers public details in one screen, so the decision doesn&apos;t depend on how familiar a package name sounds.
          </p>
          <Link href="/docs/cli-reference" className="text-link">Commands and options <ArrowRight size={15} /></Link>
        </div>

        <div className="label" role="group" aria-label="What nps shows for each package">
          <div className="label-head">
            <h3>Package facts</h3>
            <p>Shown for every registry package</p>
          </div>
          <ul>
            {facts.map((fact) => (
              <li key={fact.title}>
                <div>
                  <h4>{fact.title}</h4>
                  <p>{fact.body}</p>
                </div>
                {fact.flag && <code>{fact.flag}</code>}
              </li>
            ))}
          </ul>
          <div className="label-foot">
            <h4>A signal, not a verdict</h4>
            <p>A low score is a reason to look closer, not an automatic block. A good score is not a guarantee. You decide.</p>
          </div>
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
