"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { TemplateId, ResumeData } from "@/types/resume";
import { ResumePreview } from "@/components/preview/resume-preview";
import { SAMPLE_RESUME } from "@/lib/sample-data";

const templates: { id: TemplateId; name: string; badge?: string; accentColor: string }[] = [
  { id: "modern",           name: "Modern",       badge: "Popular",      accentColor: "#16a34a" },
  { id: "minimal",          name: "Minimal",      badge: "Clean",        accentColor: "#525252" },
  { id: "professional-ats", name: "ATS Pro",      badge: "ATS Friendly", accentColor: "#0284c7" },
  { id: "creative",         name: "Creative",     badge: "Bold",         accentColor: "#7c3aed" },
  { id: "executive",        name: "Executive",    badge: "Scholarly",    accentColor: "#1e293b" },
];

function MiniTemplateThumbnail({ template, accentColor }: { template: TemplateId; accentColor: string }) {
  const sampleWithAccent: ResumeData = {
    ...SAMPLE_RESUME,
    settings: { ...SAMPLE_RESUME.settings, themeColor: accentColor },
  };

  const SCALE = 0.24;
  const W = 793.7 * SCALE;
  const H = 1122.5 * SCALE;

  return (
    <div className="w-full relative overflow-hidden bg-white/5 flex items-center justify-center py-4">
      <div style={{ width: W, height: H }} className="flex-shrink-0">
        <div 
          className="origin-top-left"
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

export function TemplatesPreview() {
  const router = useRouter();
  
  return (
    <section className="py-24 px-4 bg-background border-y border-border/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-3">
              Resume Templates
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-foreground">
              Built to get you hired
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-lg">
              We mathematically analyzed thousands of successful resumes. Our 5 resulting templates bypass ATS algorithms while looking beautiful to human recruiters.
            </p>
          </div>
          <Link
            href="/templates"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary/80 transition-colors flex-shrink-0"
          >
            View all templates <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {templates.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div 
                onClick={() => router.push(`/builder?template=${t.id}`)}
                className="block cursor-pointer"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') router.push(`/builder?template=${t.id}`) }}
              >
                <div className="rounded-xl overflow-hidden border border-border group-hover:border-primary/50 group-hover:shadow-[0_4px_20px_rgba(var(--primary-rgb),0.15)] group-hover:-translate-y-1 transition-all duration-300">
                  <MiniTemplateThumbnail template={t.id} accentColor={t.accentColor} />
                </div>
                <div className="mt-3 flex items-center justify-between px-1">
                  <span className="text-sm font-bold text-foreground">{t.name}</span>
                  {t.badge && (
                    <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                      {t.badge}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
