"use client";

import { Language } from "@/types/resume";
import { createEmptyLanguage } from "@/lib/resume-defaults";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  value: Language[];
  onChange: (v: Language[]) => void;
}

const proficiencyLevels = ["Basic", "Conversational", "Fluent", "Native"] as const;

export function LanguagesForm({ value, onChange }: Props) {
  const inputCls = "w-full text-sm px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all";
  const add = () => onChange([...value, createEmptyLanguage()]);
  const remove = (id: string) => onChange(value.filter((i) => i.id !== id));
  const update = (id: string, partial: Partial<Language>) => onChange(value.map((i) => (i.id === id ? { ...i, ...partial } : i)));

  return (
    <div>
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Languages</h3>
      <div className="space-y-3">
        {value.map((lang) => (
          <div key={lang.id} className="flex items-center gap-3 p-3 border border-border rounded-xl">
            <input className={inputCls} value={lang.name} onChange={(e) => update(lang.id, { name: e.target.value })} placeholder="English" />
            <select value={lang.proficiency} onChange={(e) => update(lang.id, { proficiency: e.target.value as Language["proficiency"] })} className="text-sm px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 min-w-[130px]">
              {proficiencyLevels.map((l) => <option key={l}>{l}</option>)}
            </select>
            <button onClick={() => remove(lang.id)} className="p-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors flex-shrink-0"><Trash2 className="h-3.5 w-3.5" /></button>
          </div>
        ))}
        {value.length === 0 && <p className="text-sm text-muted-foreground text-center py-4 border-2 border-dashed border-border rounded-xl">No languages added yet.</p>}
      </div>
      <button onClick={add} className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 text-sm text-muted-foreground hover:text-primary transition-all">
        <Plus className="h-4 w-4" />Add Language
      </button>
    </div>
  );
}
