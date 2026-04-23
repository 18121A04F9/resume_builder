"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  Save, Download, Loader2, Play, RotateCcw, ChevronLeft,
  Monitor, Eye, EyeOff, Maximize
} from "lucide-react";
import { ResumeForm } from "@/components/builder/resume-form";
import { ResumePreview } from "@/components/preview/resume-preview";
import { getDefaultResumeData } from "@/lib/resume-defaults";
import { TemplateId, ResumeData } from "@/types/resume";
import { debounce, cn, generateId } from "@/lib/utils";
import Link from "next/link";
import { usePdfExport } from "@/hooks/use-pdf-export";
import { motion } from "framer-motion";

const TEMPLATES: { id: TemplateId; label: string }[] = [
  { id: "modern",           label: "Modern" },
  { id: "minimal",          label: "Minimal" },
  { id: "professional-ats", label: "ATS Pro" },
  { id: "executive",        label: "Executive" },
  { id: "creative",         label: "Creative" },
  { id: "harvard",          label: "Harvard ATS" },
  { id: "two-column",       label: "Modern Tech" },
  { id: "functional",       label: "Functional" },
  { id: "combination",      label: "Combination" },
  { id: "general",          label: "General" },
  { id: "hybrid",           label: "Hybrid" },
  { id: "skills-based",     label: "Skills-Based" },
  { id: "traditional",      label: "Traditional" },
  { id: "basic",            label: "Basic" },
];

type CompileStatus = "idle" | "compiling" | "compiled" | "stale";

interface BuilderClientProps {
  userId: string;
}

export function BuilderClient({ userId }: BuilderClientProps) {
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("id");
  const templateParam = (searchParams.get("template") as TemplateId) || "modern";
  const previewRef = useRef<HTMLDivElement>(null);

  const [template, setTemplate] = useState<TemplateId>(templateParam);
  const [title, setTitle] = useState("Untitled Resume");
  const [resumeData, setResumeData] = useState<ResumeData>(getDefaultResumeData());
  const [compiledData, setCompiledData] = useState<ResumeData>(getDefaultResumeData());
  const [compileStatus, setCompileStatus] = useState<CompileStatus>("compiled");
  const [autoCompile, setAutoCompile] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [loading, setLoading] = useState(!!resumeId);
  const [previewScale, setPreviewScale] = useState(0.52);
  const [showPreview, setShowPreview] = useState(true);

  // Load existing resume
  useEffect(() => {
    if (!resumeId) return;
    setLoading(true);
    fetch(`/api/resumes/${resumeId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.resume) {
          setTitle(data.resume.title);
          setTemplate(data.resume.template);
          setResumeData(data.resume.data);
          setCompiledData(data.resume.data);
        }
      })
      .catch(() => toast.error("Failed to load resume"))
      .finally(() => setLoading(false));
  }, [resumeId]);

  useEffect(() => {
    if (!autoCompile) return;
    setCompileStatus("compiling");
    
    // Smooth debounced auto-compile using useEffect
    const t = setTimeout(() => {
      setCompiledData(resumeData);
      setCompileStatus("compiled");
    }, 600);
    
    return () => clearTimeout(t);
  }, [resumeData, autoCompile]);

  const compile = useCallback(() => {
    setCompileStatus("compiling");
    setTimeout(() => {
      setCompiledData(resumeData);
      setCompileStatus("compiled");
    }, 200);
  }, [resumeData]);

  const handleDataChange = useCallback(
    (data: ResumeData) => {
      setResumeData(data);
      if (!autoCompile) {
        setCompileStatus("stale");
      }
    },
    [autoCompile]
  );

  const saveResume = useCallback(async () => {
    setSaving(true);
    let savedToDb = false;

    try {
      if (userId !== "demo-user") {
        const body = { title, template, data: resumeData };
        const res = resumeId
          ? await fetch(`/api/resumes/${resumeId}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            })
          : await fetch("/api/resumes", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            });
        if (res.ok) savedToDb = true;
      }

      if (!savedToDb) {
        const stored = JSON.parse(localStorage.getItem("resumeforge_saves") || "{}");
        const id = resumeId || generateId();
        stored[id] = { title, template, data: resumeData, updatedAt: new Date().toISOString() };
        localStorage.setItem("resumeforge_saves", JSON.stringify(stored));
        await new Promise((r) => setTimeout(r, 300));
        if (!resumeId) {
          window.history.replaceState({}, "", `/builder?id=${id}&template=${template}`);
        }
      }

      setSavedAt(new Date());
      toast.success("Resume saved!");
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  }, [resumeId, title, template, resumeData, userId]);

  const printResume = usePdfExport(previewRef, title);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
        <Loader2 className="h-7 w-7 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-[calc(100vh-3.5rem)] bg-background overflow-hidden relative"
    >

      {/* ── Top Toolbar (Glassmorphic) ── */}
      <div className="no-print flex items-center gap-2 px-4 h-14 border-b border-border/60 bg-background/80 backdrop-blur-xl flex-shrink-0 z-40 relative shadow-sm">

        {/* Back */}
        <Link href="/" className="p-1 rounded hover:bg-accent transition-colors text-muted-foreground hover:text-foreground flex-shrink-0">
          <ChevronLeft className="h-4 w-4" />
        </Link>

        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-sm font-medium bg-transparent border-none outline-none w-36 text-foreground"
          placeholder="Resume title..."
        />

        <div className="h-4 w-px bg-border/50 mx-2 flex-shrink-0" />

        {/* Template Segmented Control */}
        <div className="flex items-center p-1 bg-muted/40 rounded-lg border border-border/40 flex-shrink-0 shadow-inner">
          {TEMPLATES.map((t) => {
            const isActive = template === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTemplate(t.id)}
                className={cn(
                  "relative px-4 py-1.5 rounded-md text-[11px] font-bold tracking-wide uppercase transition-colors outline-none",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="header-template-tab"
                    className="absolute inset-0 bg-background shadow-sm rounded-md border border-border/50"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{t.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex-1" />

        {/* Status indicator */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs">
          {compileStatus === "stale" && (
            <span className="flex items-center gap-1 text-amber-500">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
              Unsaved changes
            </span>
          )}
          {compileStatus === "compiled" && savedAt && (
            <span className="flex items-center gap-1 text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
              Saved {savedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
          {compileStatus === "compiling" && (
            <span className="flex items-center gap-1 text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" />
              Updating…
            </span>
          )}
        </div>

        {/* Auto toggle */}
        <button
          onClick={() => setAutoCompile(!autoCompile)}
          className={cn(
            "hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all",
            autoCompile ? "text-primary bg-primary/10 border border-primary/20" : "text-muted-foreground hover:bg-muted border border-transparent"
          )}
          title="Toggle auto-preview"
        >
          <RotateCcw className={cn("h-3.5 w-3.5", autoCompile && "text-primary animate-[spin_4s_linear_infinite]")} />
          Auto-Compile
        </button>

        <div className="h-4 w-px bg-border/50 flex-shrink-0 mx-2" />

        {/* Save */}
        <button
          onClick={saveResume}
          disabled={saving}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium border border-border hover:bg-accent transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
          <span className="hidden sm:block">Save</span>
        </button>

        {/* Export PDF */}
        <button
          onClick={() => printResume()}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Download className="h-3.5 w-3.5" />
          <span className="hidden sm:block">Export PDF</span>
        </button>

        {/* Mobile: toggle preview */}
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="flex md:hidden items-center gap-1 px-2 py-1.5 rounded border border-border text-xs"
        >
          {showPreview ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* ── Split layout ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Form panel */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={cn(
            "w-full md:w-[45%] lg:w-[42%] border-r border-border overflow-y-auto scrollbar-thin bg-card no-print flex-shrink-0",
            showPreview ? "hidden md:flex md:flex-col" : "flex flex-col"
          )}
        >
          <ResumeForm initialData={resumeData} onChange={handleDataChange} />
        </motion.div>

        {/* Preview panel Wrapper */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={cn(
            "relative flex-1 bg-[#e5e5e5] dark:bg-[#0c0c0c] flex flex-col",
            showPreview ? "flex" : "hidden md:flex"
          )}
        >
          {/* Scrollable Document Container */}
          <div className="flex-1 overflow-auto flex py-10 w-full relative justify-center">
            <div
              style={{
                transform: `scale(${previewScale})`,
                transformOrigin: "top center",
                marginBottom: `calc((${previewScale} - 1) * 297mm)`,
              }}
            >
              <div id="resume-print-root" ref={previewRef}>
                <ResumePreview data={compiledData} template={template} />
              </div>
            </div>
          </div>

          {/* Floating Controls Toolbar (Overlay) */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="no-print absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-5 bg-zinc-900 border border-zinc-800 shadow-[0_10px_40px_rgba(0,0,0,0.3)] rounded-full px-5 py-2.5"
          >
            {/* Zoom Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPreviewScale(0.55)}
                className="text-zinc-400 hover:text-white transition-colors"
                title="Fit to Screen"
              >
                <Maximize className="h-4 w-4" />
              </button>
              <div className="w-px h-4 bg-zinc-700 mx-1" />
              <button
                onClick={() => setPreviewScale(Math.max(0.3, previewScale - 0.05))}
                className="text-zinc-400 hover:text-white text-base font-bold w-6 text-center transition-colors"
              >−</button>
              <input
                type="range"
                min={30}
                max={100}
                step={5}
                value={Math.round(previewScale * 100)}
                onChange={(e) => setPreviewScale(Number(e.target.value) / 100)}
                className="w-24 h-1.5 rounded-full accent-blue-500 bg-zinc-700 appearance-none cursor-pointer"
              />
              <button
                onClick={() => setPreviewScale(Math.min(1, previewScale + 0.05))}
                className="text-zinc-400 hover:text-white text-base font-bold w-6 text-center transition-colors"
              >+</button>
              <span className="text-zinc-300 font-mono text-[10.5px] w-8 text-right font-semibold">
                {Math.round(previewScale * 100)}%
              </span>
            </div>

            <div className="w-px h-5 bg-zinc-700" />

            {/* Manual compile inline */}
            <button
              onClick={compile}
              disabled={compileStatus === "compiling"}
              className={cn(
                "flex items-center gap-1.5 px-4 py-1.5 text-[11px] font-bold tracking-wide uppercase rounded-full transition-all border",
                compileStatus === "compiling" ? "opacity-50 cursor-not-allowed bg-zinc-800 border-zinc-700 text-zinc-400" : "bg-blue-600 text-white border-blue-500 hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
              )}
            >
              {compileStatus === "compiling" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5 fill-current" />}
              Compile
            </button>
          </motion.div>

        </motion.div>
      </div>
    </motion.div>
  );
}
