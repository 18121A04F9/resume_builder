"use client";

import { motion } from "framer-motion";
import {
  Zap, Eye, Download, Shield, Layout, Palette,
} from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "Real-time Live Preview",
    description: "Your resume updates instantly as you type. A split-screen editor provides immediate visual feedback, just like professional document creation tools.",
  },
  {
    icon: Download,
    title: "Instant PDF Export",
    description: "Download a print-ready A4 PDF of your resume instantly. No watermarks, no paywalls, perfectly scaled for physical printing.",
  },
  {
    icon: Shield,
    title: "ATS-Optimized Layouts",
    description: "Templates mathematically designed to pass Applicant Tracking Systems. Our ATS Pro template uses plain-text node structures that parsers read flawlessly.",
  },
  {
    icon: Layout,
    title: "5 Premium Templates",
    description: "Executive, Creative, Minimal, ATS, and Modern. No clunky generic themes—just professionally curated aesthetics tailored for modern hiring.",
  },
  {
    icon: Palette,
    title: "Deep Design Controls",
    description: "Pick your exact hex accent color, swap between premium typography fonts (Inter, Georgia, Mono), and dial your spacing density.",
  },
  {
    icon: Zap,
    title: "Cloud Auto-Save",
    description: "Never lose a comma. Data is saved directly to your browser's local sandbox or cloud account simultaneously, ensuring complete reliability.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 px-4 bg-muted/40 border-y border-border/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-foreground">
              Everything you need.<br className="hidden sm:block" />
              Nothing you don't.
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              We stripped away the clutter, the upsells, and the confusing interfaces. 
              The result is a surgically precise tool designed to do exactly one thing: Output the perfect PDF.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative"
            >
              <div className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center mb-5 group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)] transition-all duration-300">
                <feature.icon className="h-4 w-4 text-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-sm font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
