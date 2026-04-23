"use client";

import { useState } from "react";
import { WorkExperience } from "@/types/resume";
import { createEmptyExperience } from "@/lib/resume-defaults";
import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  value: WorkExperience[];
  onChange: (v: WorkExperience[]) => void;
}

export function WorkExperienceForm({ value, onChange }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);

  const add = () => {
    const item = createEmptyExperience();
    onChange([...value, item]);
    setOpenId(item.id);
  };

  const remove = (id: string) => {
    onChange(value.filter((e) => e.id !== id));
    if (openId === id) setOpenId(null);
  };

  const update = (id: string, partial: Partial<WorkExperience>) => {
    onChange(value.map((e) => (e.id === id ? { ...e, ...partial } : e)));
  };

  return (
    <div className="space-y-2">
      {value.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">No experience added yet.</p>
          <p className="text-xs mt-1">Add your work history to stand out.</p>
        </div>
      )}

      {value.map((exp, idx) => {
        const isOpen = openId === exp.id;
        const label = exp.role && exp.company
          ? `${exp.role} @ ${exp.company}`
          : exp.role || exp.company || `Experience ${idx + 1}`;

        return (
          <div key={exp.id} className="border border-border rounded-lg overflow-hidden bg-card">
            {/* Accordion header */}
            <div
              className="flex items-center gap-2 px-3 py-2.5 cursor-pointer hover:bg-accent/50 transition-colors select-none"
              onClick={() => setOpenId(isOpen ? null : exp.id)}
            >
              <GripVertical className="h-3.5 w-3.5 text-muted-foreground/40 flex-shrink-0 cursor-grab" />
              <span className="flex-1 text-sm font-medium truncate text-foreground/90">{label}</span>
              <button
                onClick={(e) => { e.stopPropagation(); remove(exp.id); }}
                className="p-1 rounded hover:bg-destructive/10 hover:text-destructive transition-colors text-muted-foreground"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              {isOpen
                ? <ChevronUp className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
              }
            </div>

            {/* Accordion body */}
            {isOpen && (
              <div className="px-3 pb-3 pt-1 border-t border-border space-y-0">
                <div className="grid grid-cols-2 gap-x-3">
                  <div className="field-group">
                    <label className="field-label">Job Title</label>
                    <input className="field-input" placeholder="Software Engineer" value={exp.role}
                      onChange={(e) => update(exp.id, { role: e.target.value })} />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Company</label>
                    <input className="field-input" placeholder="Acme Corp" value={exp.company}
                      onChange={(e) => update(exp.id, { company: e.target.value })} />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Start Date</label>
                    <input className="field-input" type="month" value={exp.startDate}
                      onChange={(e) => update(exp.id, { startDate: e.target.value })} />
                  </div>
                  <div className="field-group">
                    <label className="field-label">End Date</label>
                    <input className="field-input" type="month" value={exp.endDate} disabled={exp.current}
                      onChange={(e) => update(exp.id, { endDate: e.target.value })} />
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3 -mt-1">
                  <input
                    type="checkbox"
                    id={`current-${exp.id}`}
                    className="h-3.5 w-3.5 rounded accent-primary cursor-pointer"
                    checked={exp.current}
                    onChange={(e) => update(exp.id, { current: e.target.checked, endDate: e.target.checked ? "" : exp.endDate })}
                  />
                  <label htmlFor={`current-${exp.id}`} className="text-xs text-muted-foreground cursor-pointer select-none">
                    I currently work here
                  </label>
                </div>

                <div className="field-group">
                  <label className="field-label">Description / Achievements</label>
                  <textarea
                    className="field-input resize-none"
                    rows={5}
                    placeholder={"• Led development of...\n• Improved performance by...\n• Collaborated with..."}
                    value={exp.description}
                    onChange={(e) => update(exp.id, { description: e.target.value })}
                  />
                  <p className="text-[10px] text-muted-foreground">Use bullet points (•) for better ATS compatibility</p>
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
          "text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5",
          "transition-all duration-150"
        )}
      >
        <Plus className="h-4 w-4" />
        Add Experience
      </button>
    </div>
  );
}
