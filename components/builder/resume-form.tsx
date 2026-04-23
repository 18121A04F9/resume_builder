"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResumeData } from "@/types/resume";
import { PersonalInfoForm } from "./form-sections/personal-info";
import { DesignSettingsForm } from "./form-sections/design-settings";
import { SummaryForm } from "./form-sections/summary";
import { WorkExperienceForm } from "./form-sections/work-experience";
import { EducationForm } from "./form-sections/education";
import { SkillsForm } from "./form-sections/skills";
import { ProjectsForm } from "./form-sections/projects";
import { CertificationsForm } from "./form-sections/certifications";
import { LanguagesForm } from "./form-sections/languages";
import { cn } from "@/lib/utils";
import {
  User, Briefcase, GraduationCap, Wrench, FolderOpen,
  Award, Globe, AlignLeft, Palette
} from "lucide-react";

const tabs = [
  { id: "personal", label: "Personal", icon: User },
  { id: "summary", label: "Summary", icon: AlignLeft },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "certs", label: "Certs", icon: Award },
  { id: "languages", label: "Languages", icon: Globe },
];

interface ResumeFormProps {
  initialData: ResumeData;
  onChange: (data: ResumeData) => void;
}

export function ResumeForm({ initialData, onChange }: ResumeFormProps) {
  const [activeTab, setActiveTab] = useState("personal");
  const [data, setData] = useState<ResumeData>(initialData);

  const update = (partial: Partial<ResumeData>) => {
    const next = { ...data, ...partial };
    setData(next);
    onChange(next);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* ── Liquid Pill Tab Bar ── */}
      <div className="flex flex-wrap gap-1.5 p-3 border-b border-border/60 bg-muted/20">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative px-3 py-1.5 rounded-full text-xs font-medium transition-colors outline-none",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="builder-active-tab"
                  className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <tab.icon className={cn("h-3.5 w-3.5", isActive ? "text-primary" : "opacity-70")} />
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Tab content with staggered motion ── */}
      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-8 scrollbar-thin relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {activeTab === "personal" && <PersonalInfoForm value={data.personalInfo} onChange={(v) => update({ personalInfo: v })} />}
            {activeTab === "summary" && <SummaryForm value={data.summary} onChange={(v) => update({ summary: v })} />}
            {activeTab === "experience" && <WorkExperienceForm value={data.experience} onChange={(v) => update({ experience: v })} />}
            {activeTab === "education" && <EducationForm value={data.education} onChange={(v) => update({ education: v })} />}
            {activeTab === "skills" && <SkillsForm value={data.skills} onChange={(v) => update({ skills: v })} />}
            {activeTab === "projects" && <ProjectsForm value={data.projects} onChange={(v) => update({ projects: v })} />}
            {activeTab === "certs" && <CertificationsForm value={data.certifications} onChange={(v) => update({ certifications: v })} />}
            {activeTab === "languages" && <LanguagesForm value={data.languages} onChange={(v) => update({ languages: v })} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
