"use client";

import { useRef, KeyboardEvent } from "react";
import { Skill } from "@/types/resume";
import { createEmptySkill } from "@/lib/resume-defaults";
import { X } from "lucide-react";

interface Props {
  value: Skill[];
  onChange: (v: Skill[]) => void;
}

const levelColors: Record<string, string> = {
  Beginner:     "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  Intermediate: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  Advanced:     "bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
  Expert:       "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
};

const LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"] as const;

export function SkillsForm({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const addSkill = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed || value.some((s) => s.name.toLowerCase() === trimmed.toLowerCase())) return;
    onChange([...value, { ...createEmptySkill(), name: trimmed }]);
  };

  const remove = (id: string) => onChange(value.filter((s) => s.id !== id));

  const updateLevel = (id: string, level: Skill["level"]) =>
    onChange(value.map((s) => (s.id === id ? { ...s, level } : s)));

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(e.currentTarget.value);
      e.currentTarget.value = "";
    }
  };

  return (
    <div>
      {/* Input */}
      <div className="field-group">
        <label className="field-label">Add Skills</label>
        <input
          ref={inputRef}
          className="field-input"
          placeholder="Type a skill and press Enter  (e.g. React, TypeScript, AWS…)"
          onKeyDown={handleKeyDown}
        />
        <p className="text-[10px] text-muted-foreground">Press Enter or comma to add each skill</p>
      </div>

      {/* Skill tags */}
      {value.length > 0 && (
        <div className="space-y-1.5 mt-3">
          {value.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center gap-2 p-2 rounded-lg border border-border bg-card group"
            >
              <span className="flex-1 text-sm font-medium text-foreground">{skill.name}</span>

              {/* Level pills */}
              <div className="flex items-center gap-1">
                {LEVELS.map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => updateLevel(skill.id, lvl)}
                    className={`text-[9px] px-2 py-0.5 rounded-full font-medium transition-all ${
                      skill.level === lvl
                        ? levelColors[lvl]
                        : "text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>

              <button
                onClick={() => remove(skill.id)}
                className="p-0.5 rounded hover:text-destructive transition-colors text-muted-foreground/50 opacity-0 group-hover:opacity-100"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {value.length === 0 && (
        <div className="text-center py-6 text-muted-foreground text-sm">
          No skills added yet. Type above to get started.
        </div>
      )}
    </div>
  );
}
