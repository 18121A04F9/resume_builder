"use client";

import { Project } from "@/types/resume";
import { createEmptyProject } from "@/lib/resume-defaults";
import { Plus, Trash2, X, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { generateId } from "@/lib/utils";

interface Props {
  value: Project[];
  onChange: (v: Project[]) => void;
}

export function ProjectsForm({ value, onChange }: Props) {
  const [expanded, setExpanded] = useState<string | null>(value[0]?.id || null);
  const [techInput, setTechInput] = useState<Record<string, string>>({});
  const inputCls = "w-full text-sm px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all";

  const add = () => { const item = createEmptyProject(); onChange([...value, item]); setExpanded(item.id); };
  const remove = (id: string) => onChange(value.filter((i) => i.id !== id));
  const update = (id: string, partial: Partial<Project>) => onChange(value.map((i) => (i.id === id ? { ...i, ...partial } : i)));
  
  const addTech = (projectId: string) => {
    const tech = (techInput[projectId] || "").trim();
    if (!tech) return;
    const project = value.find((p) => p.id === projectId);
    if (project) update(projectId, { technologies: [...project.technologies, tech] });
    setTechInput((prev) => ({ ...prev, [projectId]: "" }));
  };
  
  const removeTech = (projectId: string, tech: string) => {
    const project = value.find((p) => p.id === projectId);
    if (project) update(projectId, { technologies: project.technologies.filter((t) => t !== tech) });
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Projects</h3>
      <div className="space-y-3">
        {value.map((proj) => (
          <div key={proj.id} className="border border-border rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-muted/40 cursor-pointer hover:bg-muted/60 transition-colors" onClick={() => setExpanded(expanded === proj.id ? null : proj.id)}>
              <span className="text-sm font-medium truncate">{proj.name || "New Project"}</span>
              <div className="flex items-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); remove(proj.id); }} className="p-1 rounded text-destructive hover:bg-destructive/10"><Trash2 className="h-3.5 w-3.5" /></button>
                {expanded === proj.id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
              </div>
            </div>
            {expanded === proj.id && (
              <div className="p-4 space-y-3">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Project Name</label>
                  <input className={inputCls} value={proj.name} onChange={(e) => update(proj.id, { name: e.target.value })} placeholder="ResumeForge" />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Description</label>
                  <textarea rows={3} className={inputCls + " resize-none"} value={proj.description} onChange={(e) => update(proj.id, { description: e.target.value })} placeholder="Built a full-stack resume builder that..." />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Live URL</label>
                    <input className={inputCls} value={proj.url || ""} onChange={(e) => update(proj.id, { url: e.target.value })} placeholder="https://myproject.com" />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">GitHub URL</label>
                    <input className={inputCls} value={proj.github || ""} onChange={(e) => update(proj.id, { github: e.target.value })} placeholder="github.com/user/project" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Technologies</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      className={inputCls}
                      value={techInput[proj.id] || ""}
                      onChange={(e) => setTechInput((prev) => ({ ...prev, [proj.id]: e.target.value }))}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech(proj.id))}
                      placeholder="React, Next.js…"
                    />
                    <button onClick={() => addTech(proj.id)} className="px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.technologies.map((tech) => (
                      <span key={tech} className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {tech} <button onClick={() => removeTech(proj.id, tech)}><X className="h-3 w-3" /></button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={add} className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 text-sm text-muted-foreground hover:text-primary transition-all">
        <Plus className="h-4 w-4" />Add Project
      </button>
    </div>
  );
}
