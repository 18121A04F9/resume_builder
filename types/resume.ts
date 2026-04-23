export type TemplateId = "modern" | "minimal" | "professional-ats" | "executive" | "creative" | "harvard" | "two-column" | "functional" | "combination" | "general" | "hybrid" | "skills-based" | "traditional" | "basic";

export interface SectionConfig {
  visible: boolean;
  title?: string;
  columns?: 1 | 2;
}

export interface DocumentConfig {
  fontSize: "small" | "medium" | "large";
  lineHeight: "tight" | "normal" | "relaxed";
  margin: "compact" | "standard" | "spacious";
}

export interface AdvancedSettings {
  document: DocumentConfig;
  sections: {
    summary: SectionConfig;
    experience: SectionConfig;
    education: SectionConfig;
    skills: SectionConfig;
    projects: SectionConfig;
    certifications: SectionConfig;
    languages: SectionConfig;
  };
}

export interface ResumeSettings {
  themeColor: string;
  fontFamily: string;
  advanced?: AdvancedSettings;
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
  headline?: string;
  photoUrl?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  bullets: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa?: string;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url?: string;
  github?: string;
  technologies: string[];
  startDate?: string;
  endDate?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
  expiryDate?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: "Basic" | "Conversational" | "Fluent" | "Native";
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  settings: ResumeSettings;
}

export interface Resume {
  id: string;
  title: string;
  template: TemplateId;
  data: ResumeData;
  createdAt: string;
  updatedAt: string;
}

export interface ResumeFormValues extends ResumeData {
  title: string;
  template: TemplateId;
}
