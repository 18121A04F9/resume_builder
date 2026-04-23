"use client";

import Link from "next/link";
import { TemplateId, ResumeData } from "@/types/resume";
import { ResumePreview } from "@/components/preview/resume-preview";
import { Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { SAMPLE_RESUME } from "@/lib/sample-data";



const TEMPLATES: {
  id: TemplateId;
  name: string;
  description: string;
  badge?: string;
  accentColor: string;
}[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Bold accent-color header with pill skill badges. Great for tech and creative roles.",
    accentColor: "#6366f1",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Elegant serif layout. Timeless and universally appealing for any industry.",
    accentColor: "#374151",
  },
  {
    id: "professional-ats",
    name: "ATS Pro",
    description: "Plain-text optimized to score 100% with Applicant Tracking Systems.",
    badge: "Recommended",
    accentColor: "#059669",
  },
  {
    id: "executive",
    name: "Executive",
    description: "Deep slate header with uppercase typography. Perfect for senior leadership roles.",
    accentColor: "#1e293b",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Two-column sidebar layout with skill bars. Stands out for design & creative roles.",
    accentColor: "#7c3aed",
  },
  {
    id: "harvard",
    name: "Harvard ATS",
    description: "The definitive Ivy League standard. Highest density plain-text layout ideal for IB and Consulting.",
    badge: "Ivy League",
    accentColor: "#0f172a",
  },
  {
    id: "two-column",
    name: "Modern Tech",
    description: "Premium two-column layout with photo support. Excellent for Silicon Valley tech roles.",
    accentColor: "#0ea5e9",
  },
  {
    id: "functional",
    name: "Functional",
    description: "Places maximum emphasis linearly on skills, mapping core proficiencies before timelines.",
    badge: "Skills Focus",
    accentColor: "#2563eb",
  },
  {
    id: "combination",
    name: "Combination",
    description: "A hybrid chronological-functional model leveraging a two-column top section resolving into full-width history grids.",
    accentColor: "#059669",
  },
  {
    id: "general",
    name: "General",
    description: "A robust, universally applicable plain structure combining high aesthetic contrast with simple borders.",
    accentColor: "#dc2626",
  },
  {
    id: "hybrid",
    name: "Hybrid",
    description: "Thematic structure balancing technical expertise mapping with reverse chronology.",
    accentColor: "#0284c7",
  },
  {
    id: "skills-based",
    name: "Skills-Based",
    description: "Designed explicitly for career transitions, grouping achievements entirely under competencies.",
    accentColor: "#000000",
  },
  {
    id: "traditional",
    name: "Traditional",
    description: "Classic black and white model mapping traditional ATS node formatting exactly.",
    badge: "Strict ATS",
    accentColor: "#111827",
  },
  {
    id: "basic",
    name: "Basic",
    description: "Ultra-minimalist stripped-down structure for entry-level applications.",
    accentColor: "#475569",
  },
];

function TemplateThumbnail({ template, accentColor }: { template: TemplateId; accentColor: string }) {
  const sampleWithAccent: ResumeData = {
    ...SAMPLE_RESUME,
    settings: { ...SAMPLE_RESUME.settings, themeColor: accentColor },
  };

  const SCALE = 0.40;
  const W = 793.7 * SCALE;
  const H = 1122.5 * SCALE;

  return (
    <div className="w-full relative overflow-hidden bg-background flex justify-center py-6">
      <div style={{ width: W, height: H }} className="flex-shrink-0">
        <div 
          className="origin-top-left pointer-events-none select-none"
          style={{ 
            width: "210mm", height: "297mm",
            transform: `scale(${SCALE})`
          }}
        >
          <ResumePreview data={sampleWithAccent} template={template} />
        </div>
      </div>
    </div>
  );
}

export function TemplatesPageClient() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
          Resume Templates
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Choose Your Perfect{" "}
          <span className="gradient-text">Template</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Every template is crafted to be professional, ATS-ready, and fully
          customizable with your own colors and content.
        </p>
      </div>

      {/* Templates grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {TEMPLATES.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            className="group bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-black/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
          >
            {/* Live preview thumbnail */}
            <div className="relative border-b border-border/50 overflow-hidden bg-muted/30">
              <TemplateThumbnail template={t.id} accentColor={t.accentColor} />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-background/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <Link
                  href={`/builder?template=${t.id}`}
                  className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2 bg-background text-foreground font-semibold text-sm px-5 py-2.5 rounded-xl shadow-2xl border border-border/50"
                >
                  Use Template <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {t.badge && (
                <div
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-primary-foreground text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-lg"
                  style={{ background: t.accentColor }}
                >
                  <Zap className="h-3 w-3 fill-current" />
                  {t.badge}
                </div>
              )}
            </div>

            {/* Card info */}
            <div className="p-6 flex flex-col gap-3 flex-1 bg-card">
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full shadow-inner border border-black/10" style={{ background: t.accentColor }} />
                <h3 className="text-lg font-bold tracking-tight">{t.name}</h3>
              </div>
              <p className="text-muted-foreground text-[13px] leading-relaxed">{t.description}</p>
              <Link
                href={`/builder?template=${t.id}`}
                className="mt-auto flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-white transition-all hover:scale-[1.02] shadow-md hover:shadow-xl"
                style={{ background: t.accentColor }}
              >
                Use This Template
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
