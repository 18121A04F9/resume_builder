import { ResumeData } from "@/types/resume";
import { generateId } from "@/lib/utils";

export function getDefaultResumeData(): ResumeData {
  return {
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      portfolio: "",
      headline: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    settings: {
      themeColor: "#6366f1", // default: indigo
      fontFamily: "inter",
    },
  };
}

export function createEmptyExperience() {
  return {
    id: generateId(),
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    bullets: [""],
  };
}

export function createEmptyEducation() {
  return {
    id: generateId(),
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    current: false,
    gpa: "",
    description: "",
  };
}

export function createEmptyProject() {
  return {
    id: generateId(),
    name: "",
    description: "",
    url: "",
    github: "",
    technologies: [],
    startDate: "",
    endDate: "",
  };
}

export function createEmptyCertification() {
  return {
    id: generateId(),
    name: "",
    issuer: "",
    date: "",
    url: "",
    expiryDate: "",
  };
}

export function createEmptyLanguage() {
  return {
    id: generateId(),
    name: "",
    proficiency: "Conversational" as const,
  };
}

export function createEmptySkill() {
  return {
    id: generateId(),
    name: "",
    level: "Intermediate" as const,
  };
}
