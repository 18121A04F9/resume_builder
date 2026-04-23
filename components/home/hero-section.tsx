"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle, Sparkles } from "lucide-react";
import { ResumePreview } from "@/components/preview/resume-preview";
import { SAMPLE_RESUME } from "@/lib/sample-data";

/** Beautiful overlapping glass cards for the right-side Hero showcase */
function HeroShowcase() {
  const SCALE = 0.45;
  const W = 793.7 * SCALE;
  const H = 1122.5 * SCALE;

  return (
    <div className="relative w-full max-w-[500px] h-[580px] mx-auto hidden md:block perspective-1000">
      
      {/* Decorative Blur Background */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/40 rounded-full blur-[100px] -z-10" 
      />

      {/* Main Front Card Floating */}
      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="absolute top-10 left-1/2 -translate-x-1/2 origin-top z-10 shadow-2xl rounded-lg"
      >
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative rounded-xl overflow-hidden border border-border/60 bg-background shadow-2xl shadow-primary/20 flex flex-col items-center justify-start bg-[#f0f0f0] dark:bg-[#111]"
          style={{ width: W, height: H }}
        >
          {/* Top Glass Bar for aesthetic */}
          <div className="w-full h-8 bg-black/5 hover:bg-black/10 transition-colors backdrop-blur-md border-b border-border/50 flex items-center justify-between px-3 absolute top-0 inset-x-0 z-20">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <div className="w-2 h-2 rounded-full bg-green-400" />
            </div>
            <div className="text-[8px] font-semibold text-muted-foreground uppercase opacity-70">
              Live Preview
            </div>
          </div>

          <div
            className="origin-top mt-8 pointer-events-none select-none bg-white"
            style={{ 
              width: "210mm", height: "297mm",
              transform: `scale(${SCALE})`
            }}
          >
            <ResumePreview data={SAMPLE_RESUME} template="combination" />
          </div>

          {/* Compile Footer overlay */}
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none flex items-end justify-center pb-4 z-20">
            <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 20 }}
               className="bg-card/90 backdrop-blur-xl border border-border/80 shadow-xl shadow-primary/20 rounded-full px-5 py-2.5 flex items-center gap-2.5"
            >
               <Sparkles className="h-4 w-4 text-primary animate-pulse" />
               <span className="text-xs font-bold text-foreground tracking-wide">ATS Optimized Rating: <span className="text-green-500">100%</span></span>
            </motion.div>
          </div>

        </motion.div>
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-4 overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute -top-[500px] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-12 lg:gap-8 items-center">

          {/* LEFT — Typography & CTA */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start max-w-2xl mx-auto lg:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-widest mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                100% Free · No Registration Required
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[1.05] mb-6 text-foreground">
                Build a Resume<br className="hidden sm:block" />
                That Gets You{" "}
                <span className="gradient-text">Hired.</span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                A premium, completely free resume builder. Live previews, ATS-optimized layouts, and instant PDF exports. Stop fighting with formatting and start applying.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-8 w-full sm:w-auto justify-center lg:justify-start">
                <Link
                  href="/builder"
                  className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/25"
                >
                  Create My Resume
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/templates"
                  className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-border bg-card text-foreground font-semibold text-sm hover:border-muted-foreground/30 hover:bg-accent transition-all"
                >
                  View Templates
                </Link>
              </div>

              {/* Trust Checkmarks */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-xs font-medium text-muted-foreground/80">
                {[
                  "No watermarks",
                  "ATS friendly",
                  "Data stays local",
                ].map((item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-primary/80" />
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Animated Showcase */}
          <div className="relative justify-center lg:justify-end items-center hidden sm:flex">
            <HeroShowcase />
          </div>
        </div>

        {/* Company Logos Strip (Subtle) */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.8 }}
           className="mt-24 pt-8 border-t border-border flex flex-col items-center"
        >
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-6">
            Trusted by professionals hired at
          </p>
          <div className="flex flex-wrap justify-center gap-8 opacity-40 grayscale contrast-200">
             {/* Text-based mock logos for extreme minimalism */}
             {["Google", "Microsoft", "Amazon", "Meta", "Apple", "Netflix"].map((co) => (
                <span key={co} className="text-xl font-bold tracking-tighter text-foreground">{co}</span>
             ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
