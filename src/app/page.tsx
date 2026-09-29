"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Zap, Terminal, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative overflow-hidden flex flex-col items-center justify-center py-24 md:py-32 bg-background">
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 text-center z-10"
        >
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8">
            <Zap className="mr-2 h-4 w-4" /> v1.0.0 is now live
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Keep your Node.js ecosystem <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300">
              Safe & Secure
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted mb-10">
            A fast, modular, and reliable tool to manage vulnerabilities, audit dependencies, and ensure your Node.js projects stay secure from day one.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/docs"
              className="px-8 py-3 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)]"
            >
              Get Started
            </Link>
            <Link
              href="https://github.com/netaji/npm-safe"
              target="_blank"
              className="px-8 py-3 rounded-md bg-transparent border border-border font-semibold hover:bg-border/50 transition-all"
            >
              View on GitHub
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 bg-background border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Why npm-safe?</h2>
            <p className="text-muted max-w-xl mx-auto">Built from the ground up for modern developer workflows, ensuring safety without compromising on speed.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Deep Security Audit",
                desc: "Automatically checks packages against the largest vulnerability databases.",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                desc: "Optimized for performance. Scans massive monorepos in milliseconds.",
              },
              {
                icon: Terminal,
                title: "CLI & API First",
                desc: "Integrate easily into your CI/CD pipelines with our intuitive CLI and APIs.",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="p-6 rounded-xl border border-border bg-border/20 backdrop-blur-sm hover:border-primary/50 transition-colors"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Command Section */}
      <section className="w-full py-20 bg-background/50 border-t border-border/50">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <h2 className="text-3xl font-bold tracking-tight mb-8">Ready to secure your app?</h2>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="w-full max-w-2xl bg-[#0d1117] border border-[#30363d] rounded-lg p-6 font-mono text-sm shadow-xl flex items-center justify-between"
          >
            <div className="flex flex-col gap-2">
              <div className="text-muted flex gap-2">
                <span className="text-green-500">$</span> npm i -g @hort/nps
              </div>
              <div className="text-muted flex gap-2">
                <span className="text-green-500">$</span> nps audit --fix
              </div>
            </div>
            <CheckCircle className="text-green-500 h-6 w-6 opacity-50" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
