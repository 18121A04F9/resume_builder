"use client";

import { Certification } from "@/types/resume";
import { createEmptyCertification } from "@/lib/resume-defaults";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  value: Certification[];
  onChange: (v: Certification[]) => void;
}

export function CertificationsForm({ value, onChange }: Props) {
  const inputCls = "w-full text-sm px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all";
  const add = () => onChange([...value, createEmptyCertification()]);
  const remove = (id: string) => onChange(value.filter((i) => i.id !== id));
  const update = (id: string, partial: Partial<Certification>) => onChange(value.map((i) => (i.id === id ? { ...i, ...partial } : i)));

  return (
    <div>
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Certifications</h3>
      <div className="space-y-4">
        {value.map((cert) => (
          <div key={cert.id} className="p-4 border border-border rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{cert.name || "New Certification"}</span>
              <button onClick={() => remove(cert.id)} className="p-1 rounded text-destructive hover:bg-destructive/10"><Trash2 className="h-3.5 w-3.5" /></button>
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Certification Name</label>
              <input className={inputCls} value={cert.name} onChange={(e) => update(cert.id, { name: e.target.value })} placeholder="AWS Solutions Architect" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Issuer</label>
                <input className={inputCls} value={cert.issuer} onChange={(e) => update(cert.id, { issuer: e.target.value })} placeholder="Amazon Web Services" />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Date</label>
                <input type="month" className={inputCls} value={cert.date} onChange={(e) => update(cert.id, { date: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Credential URL (optional)</label>
              <input className={inputCls} value={cert.url || ""} onChange={(e) => update(cert.id, { url: e.target.value })} placeholder="https://credly.com/…" />
            </div>
          </div>
        ))}
        {value.length === 0 && <p className="text-sm text-muted-foreground text-center py-4 border-2 border-dashed border-border rounded-xl">No certifications added yet.</p>}
      </div>
      <button onClick={add} className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 text-sm text-muted-foreground hover:text-primary transition-all">
        <Plus className="h-4 w-4" />Add Certification
      </button>
    </div>
  );
}
