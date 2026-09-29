"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Zap, Terminal, Lock, Activity, ChevronRight } from "lucide-react";
import CommandCopy from "@/components/ui/CommandCopy";

export default function Home() {
  return (
    <div className="flex flex-col items-center overflow-hidden">
      {/* Hero Section */}
      <section className="w-full relative min-h-[80vh] flex flex-col items-center justify-center pt-12 pb-16 md:pt-24 md:pb-24">
        {/* Background Gradients */}
        <div className="absolute top-0 inset-x-0 h-full w-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-secondary/15 blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[40%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto px-4 text-center z-10 max-w-4xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
            Secure your Node.js <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-blue-400">
              ecosystem instantly.
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-muted mb-12 font-medium">
            The next-generation security suite for npm. Prevent supply chain attacks, automate vulnerability fixes, and verify package integrity at the speed of light.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link
              href="/docs"
              className="group flex items-center justify-center px-8 py-4 rounded-full bg-foreground text-background font-semibold hover:bg-foreground/90 transition-all text-lg shadow-[0_0_40px_rgba(255,255,255,0.1)] flex-shrink-0"
            >
              Read the Docs
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <CommandCopy command="npm i -g @hort/nps" />
          </div>

          {/* Terminal Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="w-full max-w-4xl mx-auto rounded-xl border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-2xl shadow-2xl overflow-hidden text-left"
          >
            <div className="flex items-center px-4 py-3 border-b border-white/10 bg-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="mx-auto text-xs font-mono text-muted">bash - @hort/nps</div>
            </div>
            <div className="p-6 font-mono text-sm md:text-base leading-relaxed overflow-x-auto">
              <div className="flex gap-4">
                <span className="text-green-400">➜</span>
                <span className="text-blue-400">~/project</span>
                <span className="text-foreground">nps audit --fix</span>
              </div>
              <div className="mt-2 text-muted">
                [1/3] Analyzing dependencies (428 packages)...
              </div>
              <div className="text-muted">
                [2/3] Cross-referencing NVD and GitHub Advisories...
              </div>
              <div className="text-muted mb-2">
                [3/3] Applying smart patches...
              </div>
              <div className="text-green-400 mb-2">
                ✔ Fixed 14 vulnerabilities (3 High, 11 Moderate)
              </div>
              <div className="text-foreground border-l-2 border-green-500 pl-4 py-1 my-2 bg-green-500/10">
                Supply chain verified. 0 tampering detected.
              </div>
              <div className="flex gap-4 mt-4">
                <span className="text-green-400">➜</span>
                <span className="text-blue-400">~/project</span>
                <span className="w-2 h-5 bg-white/50 animate-pulse" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Bento Grid Features Section */}
      <section className="w-full py-16 md:py-24 bg-background relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 md:mb-6">Engineered for absolute security</h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Everything you need to sleep soundly at night, built into a single, blazing-fast CLI.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 - Large */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -mr-20 -mt-20 transition-opacity group-hover:opacity-100 opacity-50" />
              <Shield className="h-10 w-10 text-primary mb-6" />
              <h3 className="text-3xl font-bold mb-4">Deep Vulnerability Scanning</h3>
              <p className="text-muted text-lg max-w-md leading-relaxed">
                We don't just check your direct dependencies. `nps` deeply analyzes transitive paths and resolves lockfile conflicts automatically, fixing vulnerabilities that native tools can't.
              </p>
            </motion.div>

            {/* Feature 2 - Small */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <Lock className="h-10 w-10 text-purple-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Tamper Proof</h3>
              <p className="text-muted leading-relaxed">
                Cryptographically verify package integrity against registry signatures to prevent supply chain attacks.
              </p>
            </motion.div>

            {/* Feature 3 - Small */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <Zap className="h-10 w-10 text-yellow-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Lightning Fast</h3>
              <p className="text-muted leading-relaxed">
                Built with performance in mind. Scan and fix massive enterprise monorepos in milliseconds, not minutes.
              </p>
            </motion.div>

            {/* Feature 4 - Large */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2 p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors relative overflow-hidden group"
            >
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -ml-20 -mb-20 transition-opacity group-hover:opacity-100 opacity-50" />
              <Activity className="h-10 w-10 text-blue-400 mb-6" />
              <h3 className="text-3xl font-bold mb-4">CI/CD Native</h3>
              <p className="text-muted text-lg max-w-md leading-relaxed">
                Export audits to structured JSON. Enforce strict policies that automatically fail builds if unsigned or vulnerable code is pushed to production.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Developers Section */}
      <section className="w-full py-16 md:py-24 bg-background border-t border-white/5 relative z-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Meet the Creators</h2>
            <p className="text-muted text-lg">Built by the open-source community, for the open-source community.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 max-w-3xl mx-auto">
            {/* Netaji */}
            <a href="https://github.com/chnetajibc" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-3 pr-8 rounded-full border border-border/50 bg-white/[0.01] hover:bg-white/[0.03] hover:border-border transition-all group w-full sm:w-auto">
              <img src="https://github.com/chnetajibc.png" alt="Netaji" className="w-14 h-14 rounded-full border border-white/10 group-hover:border-primary/50 transition-colors" />
              <div className="text-left">
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">CH Netaji Bhadraiahnath</h3>
                <p className="text-xs text-muted mt-0.5">Core Contributor</p>
              </div>
            </a>

            {/* Abhishek */}
            <a href="https://github.com/abhishektumula" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-3 pr-8 rounded-full border border-border/50 bg-white/[0.01] hover:bg-white/[0.03] hover:border-border transition-all group w-full sm:w-auto">
              <img src="https://github.com/abhishektumula.png" alt="Abhishek" className="w-14 h-14 rounded-full border border-white/10 group-hover:border-primary/50 transition-colors" />
              <div className="text-left">
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Abhishek Tumula</h3>
                <p className="text-xs text-muted mt-0.5">Core Contributor</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
