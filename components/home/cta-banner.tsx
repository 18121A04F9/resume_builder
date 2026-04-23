"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl border border-primary/20 bg-card p-10 md:p-16 text-center"
        >
          {/* Subtle glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-primary/10 blur-3xl -z-0" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Free forever — no catch
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Ready to Build Your Resume?
            </h2>
            <p className="text-muted-foreground text-base mb-8 max-w-md mx-auto">
              Join thousands of professionals who built their careers with ResumeForge.
              Start in seconds — no credit card, no sign-up required.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/builder"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/35"
              >
                Start Building for Free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-border bg-background text-foreground font-semibold text-sm hover:bg-accent transition-all"
              >
                Browse Templates
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
