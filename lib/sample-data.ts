import { ResumeData } from "@/types/resume";

export const SAMPLE_RESUME: ResumeData = {
  personalInfo: {
    fullName: "Alexandra Chen",
    headline: "Senior Product Manager",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    email: "alex.chen@email.com",
    phone: "+1 (415) 555-0189",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexchen",
    github: "github.com/alexchen",
    portfolio: "alexchen.dev",
  },
  summary:
    "Results-driven product leader with 8+ years driving cross-functional teams to ship impactful features. Proven track record of growing user bases by 3x and reducing churn by 40% through data-informed decisions and user-centric design.",
  experience: [
    {
      id: "e1",
      company: "Stripe",
      role: "Senior Product Manager",
      startDate: "2021-03",
      endDate: "",
      current: true,
      description:
        "• Led 12-engineer team to launch Stripe Link, acquiring 2M users in 90 days\n• Defined roadmap for checkout optimization, increasing conversion by 22%",
      bullets: [],
    },
    {
      id: "e2",
      company: "Airbnb",
      role: "Product Manager II",
      startDate: "2018-06",
      endDate: "2021-02",
      current: false,
      description: "• Owned host onboarding; improved completion rate from 52% to 78%\n• Shipped Smart Pricing v2, earning $8M additional annual revenue",
      bullets: [],
    },
  ],
  education: [
    {
      id: "edu1",
      institution: "Stanford University",
      degree: "M.S.",
      field: "Computer Science",
      startDate: "2014-09",
      endDate: "2016-06",
      current: false,
      gpa: "3.9",
    },
    {
      id: "edu2",
      institution: "UC Berkeley",
      degree: "B.S.",
      field: "EECS",
      startDate: "2010-09",
      endDate: "2014-05",
      current: false,
    },
  ],
  skills: [
    { id: "s1", name: "Product Strategy", level: "Expert" },
    { id: "s2", name: "SQL & Analytics", level: "Advanced" },
    { id: "s3", name: "A/B Testing", level: "Expert" },
    { id: "s4", name: "Figma", level: "Intermediate" },
    { id: "s5", name: "Python", level: "Intermediate" },
  ],
  projects: [
    {
      id: "p1",
      name: "Stripe Link Checkout",
      description: "One-click checkout product serving 50M+ users globally",
      technologies: ["React", "TypeScript", "GraphQL"],
      url: "stripe.com/link",
    },
  ],
  certifications: [{ id: "c1", name: "Certified Scrum Product Owner", issuer: "Scrum Alliance", date: "2022-04" }],
  languages: [
    { id: "l1", name: "English", proficiency: "Native" },
    { id: "l2", name: "Mandarin", proficiency: "Fluent" },
  ],
  settings: { 
    themeColor: "#6366f1", 
    fontFamily: "inter",
    advanced: {
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
    }
  },
};
