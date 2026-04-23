"use client";

import { useState } from "react";
import { Education } from "@/types/resume";
import { createEmptyEducation } from "@/lib/resume-defaults";
import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  value: Education[];
  onChange: (v: Education[]) => void;
}

export function EducationForm({ value, onChange }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);

  const add = () => {
    const item = createEmptyEducation();
    onChange([...value, item]);
    setOpenId(item.id);
  };

  const remove = (id: string) => {
    onChange(value.filter((e) => e.id !== id));
    if (openId === id) setOpenId(null);
  };

  const update = (id: string, partial: Partial<Education>) =>
    onChange(value.map((e) => (e.id === id ? { ...e, ...partial } : e)));

  return (
    <div className="space-y-2">
      {value.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">No education added yet.</p>
        </div>
      )}

      {value.map((edu, idx) => {
        const isOpen = openId === edu.id;
        const label = edu.institution || `Education ${idx + 1}`;

        return (
          <div key={edu.id} className="border border-border rounded-lg overflow-hidden bg-card">
            <div
              className="flex items-center gap-2 px-3 py-2.5 cursor-pointer hover:bg-accent/50 transition-colors select-none"
              onClick={() => setOpenId(isOpen ? null : edu.id)}
            >
              <GripVertical className="h-3.5 w-3.5 text-muted-foreground/40 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-foreground/90">{label}</p>
                {edu.degree && <p className="text-xs text-muted-foreground truncate">{edu.degree}{edu.field ? ` — ${edu.field}` : ""}</p>}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); remove(edu.id); }}
                className="p-1 rounded hover:bg-destructive/10 hover:text-destructive transition-colors text-muted-foreground"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              {isOpen ? <ChevronUp className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />}
            </div>

            {isOpen && (
              <div className="px-3 pb-3 pt-2 border-t border-border">
                <div className="field-group">
                  <label className="field-label">Institution</label>
                  <input className="field-input" placeholder="MIT" value={edu.institution}
                    onChange={(e) => update(edu.id, { institution: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-x-3">
                  <div className="field-group">
                    <label className="field-label">Degree</label>
                    <input className="field-input" placeholder="B.S. / M.S. / Ph.D." value={edu.degree}
                      onChange={(e) => update(edu.id, { degree: e.target.value })} />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Field of Study</label>
                    <input className="field-input" placeholder="Computer Science" value={edu.field}
                      onChange={(e) => update(edu.id, { field: e.target.value })} />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Start Date</label>
                    <input className="field-input" type="month" value={edu.startDate}
                      onChange={(e) => update(edu.id, { startDate: e.target.value })} />
                  </div>
                  <div className="field-group">
                    <label className="field-label">End Date</label>
                    <input className="field-input" type="month" value={edu.endDate} disabled={edu.current}
                      onChange={(e) => update(edu.id, { endDate: e.target.value })} />
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3 -mt-1">
                  <input type="checkbox" id={`edu-current-${edu.id}`}
                    className="h-3.5 w-3.5 accent-primary cursor-pointer"
                    checked={edu.current}
                    onChange={(e) => update(edu.id, { current: e.target.checked })} />
                  <label htmlFor={`edu-current-${edu.id}`} className="text-xs text-muted-foreground cursor-pointer">Currently studying here</label>
                </div>

                <div className="field-group">
                  <label className="field-label">GPA (optional)</label>
                  <input className="field-input" placeholder="3.8 / 4.0" value={edu.gpa ?? ""}
                    onChange={(e) => update(edu.id, { gpa: e.target.value })} />
                </div>
              </div>
            )}
          </div>
        );
      })}

      <button
        onClick={add}
        className={cn(
          "w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-dashed border-border",
          "text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all"
        )}
      >
        <Plus className="h-4 w-4" />
        Add Education
      </button>
    </div>
  );
}
