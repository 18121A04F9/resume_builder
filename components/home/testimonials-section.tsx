"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer at Google",
    avatar: "PS",
    color: "bg-blue-500",
    quote:
      "ResumeForge helped me land my dream job in 3 weeks. The ATS Pro template got me past every automated filter. The compile feature is brilliant — feels like Overleaf but for resumes.",
  },
  {
    name: "Arjun Mehta",
    role: "Product Manager at Amazon",
    avatar: "AM",
    color: "bg-orange-500",
    quote:
      "I tried 4 different resume builders before this. ResumeForge is the only one that gives me a clean PDF without awkward spacing. The live preview is exactly what I needed.",
  },
  {
    name: "Sneha Patel",
    role: "UX Designer at Adobe",
    avatar: "SP",
    color: "bg-primary",
    quote:
      "The Creative template is stunning — perfect for design portfolios. Switched templates 3 times without losing any data. Completely free too, which is unreal.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
            Success stories
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Trusted by Professionals
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow"
            >
              {/* Quote marks */}
              <div className="text-3xl text-primary/20 font-serif leading-none">"</div>

              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {t.quote}
              </p>

              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className="text-primary text-sm">★</span>
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
