"use client";

import { ResumeSettings, AdvancedSettings, SectionConfig } from "@/types/resume";
import { Check, Eye, EyeOff, Layout, Type, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  value: ResumeSettings;
  onChange: (v: ResumeSettings) => void;
}

const themeColors = [
  { id: "indigo", hex: "#6366f1", label: "Indigo" },
  { id: "purple", hex: "#a855f7", label: "Purple" },
  { id: "emerald", hex: "#10b981", label: "Emerald" },
  { id: "rose", hex: "#f43f5e", label: "Rose" },
  { id: "amber", hex: "#f59e0b", label: "Amber" },
  { id: "sky", hex: "#0ea5e9", label: "Sky Blue" },
  { id: "slate", hex: "#64748b", label: "Slate" },
  { id: "black", hex: "#000000", label: "Classic Black" },
];

const fontFamilies = [
  { id: "inter", name: "Inter (Modern Sans)", value: "sans-serif" },
  { id: "arial", name: "Arial (Classic Sans)", value: "Arial, sans-serif" },
  { id: "georgia", name: "Georgia (Elegant Serif)", value: "Georgia, serif" },
  { id: "times", name: "Times New Roman", value: "'Times New Roman', serif" },
  { id: "mono", name: "Monospace", value: "monospace" },
];

export function DesignSettingsForm({ value, onChange }: Props) {
  // Graceful fallback for older data that doesn't have settings
  const settings = value || { themeColor: "#6366f1", fontFamily: "inter" };
  const advanced = settings.advanced || {
    document: { fontSize: "medium", lineHeight: "normal", margin: "standard" },
    sections: {
      summary: { visible: true, title: "Professional Summary" },
      experience: { visible: true, title: "Work Experience" },
      education: { visible: true, title: "Education" },
      skills: { visible: true, title: "Skills" },
      projects: { visible: true, title: "Projects" },
      certifications: { visible: true, title: "Certifications" },
      languages: { visible: true, title: "Languages" }
    }
  } as AdvancedSettings;

  const updateAdvanced = (partial: Partial<AdvancedSettings>) => {
    onChange({ ...settings, advanced: { ...advanced, ...partial } });
  };

  const updateSection = (key: keyof AdvancedSettings["sections"], changes: Partial<SectionConfig>) => {
    updateAdvanced({
      sections: {
        ...advanced.sections,
        [key]: { ...advanced.sections[key], ...changes }
      }
    });
  };

  const updateDoc = (key: keyof AdvancedSettings["document"], val: string) => {
    updateAdvanced({
      document: { ...advanced.document, [key]: val }
    });
  };

  const sectionKeys: Array<{ key: keyof AdvancedSettings["sections"], label: string }> = [
    { key: "summary", label: "Summary" },
    { key: "experience", label: "Experience" },
    { key: "education", label: "Education" },
    { key: "skills", label: "Skills" },
    { key: "projects", label: "Projects" },
    { key: "certifications", label: "Certifications" },
    { key: "languages", label: "Languages" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="field-label">Theme Color</label>
        <p className="text-[10px] text-muted-foreground mb-3">
          Accent color used for headings, borders, and icons.
        </p>
        <div className="flex flex-wrap gap-2.5">
          {themeColors.map((color) => (
            <button
              key={color.id}
              onClick={() => onChange({ ...settings, themeColor: color.hex })}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-background",
                settings.themeColor === color.hex ? "ring-2 ring-primary ring-offset-2 scale-110" : "border border-border/50 shadow-sm"
              )}
              style={{ backgroundColor: color.hex }}
              title={color.label}
            >
              {settings.themeColor === color.hex && (
                <Check className={cn("h-4 w-4 drop-shadow-md", color.id === "black" ? "text-white" : "text-white")} />
              )}
            </button>
          ))}
          {/* Custom color picker */}
          <div className="relative">
            <input
              type="color"
              value={settings.themeColor}
              onChange={(e) => onChange({ ...settings, themeColor: e.target.value })}
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              title="Custom Color"
            />
            <div 
              className="w-8 h-8 rounded-full border border-border shadow-sm flex items-center justify-center pointer-events-none"
              style={{ 
                background: `linear-gradient(135deg, ${settings.themeColor} 50%, #fff 50%)`
              }}
            >
              <span className="text-white text-[10px] font-bold drop-shadow flex items-center justify-center pb-0.5 pl-0.5">+</span>
            </div>
          </div>
        </div>
      </div>

      <div className="field-group">
        <label className="field-label">Font Family</label>
        <div className="grid grid-cols-1 gap-2 mt-1">
          {fontFamilies.map((font) => (
            <button
              key={font.id}
              onClick={() => onChange({ ...settings, fontFamily: font.id })}
              className={cn(
                "w-full text-left px-3 py-2.5 rounded-lg border text-sm transition-all flex items-center justify-between",
                settings.fontFamily === font.id
                  ? "border-primary bg-primary/5 text-foreground font-medium"
                  : "border-border bg-card text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground"
              )}
              style={{ fontFamily: font.value }}
            >
              {font.name}
              {settings.fontFamily === font.id && <Check className="h-4 w-4 text-primary" />}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-border" />

      {/* ── Document Layout ── */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
          <Layout className="w-4 h-4 text-primary" /> Document Layout
        </h3>
        
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-3"><label className="field-label text-[10px]">Font Size</label></div>
          {["small", "medium", "large"].map((sz) => (
            <button
              key={sz}
              onClick={() => updateDoc("fontSize", sz)}
              className={cn("px-2 py-1.5 text-xs rounded-md border text-center capitalize transition-colors", advanced.document.fontSize === sz ? "bg-primary/10 border-primary text-primary font-medium" : "bg-card border-border text-muted-foreground hover:bg-muted")}
            >
              {sz}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-3"><label className="field-label text-[10px]">Padding Margin</label></div>
          {["compact", "standard", "spacious"].map((m) => (
            <button
              key={m}
              onClick={() => updateDoc("margin", m)}
              className={cn("px-2 py-1.5 text-xs rounded-md border text-center capitalize transition-colors", advanced.document.margin === m ? "bg-primary/10 border-primary text-primary font-medium" : "bg-card border-border text-muted-foreground hover:bg-muted")}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-3"><label className="field-label text-[10px]">Line Height</label></div>
          {["tight", "normal", "relaxed"].map((lh) => (
            <button
              key={lh}
              onClick={() => updateDoc("lineHeight", lh)}
              className={cn("px-2 py-1.5 text-xs rounded-md border text-center capitalize transition-colors", advanced.document.lineHeight === lh ? "bg-primary/10 border-primary text-primary font-medium" : "bg-card border-border text-muted-foreground hover:bg-muted")}
            >
              {lh}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-border" />

      {/* ── Section Management ── */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
          <Type className="w-4 h-4 text-primary" /> Sections & Titles
        </h3>
        <p className="text-[10px] text-muted-foreground">Rename sections or hide them directly from the final layout.</p>
        
        <div className="space-y-2.5">
          {sectionKeys.map(({ key, label }) => {
            const conf = advanced.sections[key];
            return (
              <div key={key} className={cn("flex items-center gap-3 p-2.5 rounded-lg border transition-colors", conf.visible ? "bg-card border-border" : "bg-muted/30 border-dashed border-border/50")}>
                <button
                  onClick={() => updateSection(key, { visible: !conf.visible })}
                  className={cn("flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-md transition-colors", conf.visible ? "bg-primary/10 text-primary hover:bg-primary/20" : "bg-muted text-muted-foreground hover:bg-muted/80")}
                  title={conf.visible ? "Hide Section" : "Show Section"}
                >
                  {conf.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <div className="flex-1">
                  <label className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground block mb-0.5">{label}</label>
                  <input
                    type="text"
                    value={conf.title || ""}
                    onChange={(e) => updateSection(key, { title: e.target.value })}
                    disabled={!conf.visible}
                    placeholder={label}
                    className={cn("w-full bg-transparent border-0 p-0 text-sm focus:ring-0", !conf.visible && "text-muted-foreground/50")}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
