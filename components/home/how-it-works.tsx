"use client";

import { motion } from "framer-motion";
import { FileText, Edit, Download } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: FileText,
    title: "Select your aesthetic",
    desc: "Start with one of our premium, ATS-optimized layouts. Whether you're a designer or an executive, we have a starting point.",
  },
  {
    num: "02",
    icon: Edit,
    title: "Input your data",
    desc: "Use our lightning-fast split screen editor. The preview updates instantly as you type, giving you absolute control over spacing.",
  },
  {
    num: "03",
    icon: Download,
    title: "Export to PDF",
    desc: "Click 'Export' to generate a mathematically perfect A4 PDF instantly. No watermarks. No subscriptions. Just your data.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-32 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-4">
            The Process
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter">
            Three steps.<br />Zero friction.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-20 relative">
          {/* Subtle Connector line */}
          <div className="hidden md:block absolute top-[28px] left-[20%] right-[20%] h-[1px] bg-border/50" />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative flex flex-col items-center text-center"
            >
              {/* Floating Number Indicator */}
              <div className="text-[100px] font-extrabold text-foreground/[0.03] absolute -top-16 select-none pointer-events-none">
                {step.num}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 rounded-full bg-card border border-border shadow-sm flex items-center justify-center mb-8 relative z-10">
                <step.icon className="h-5 w-5 text-foreground" />
              </div>

              <h3 className="text-lg font-bold mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
