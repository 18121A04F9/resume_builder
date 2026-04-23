import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Link2, GitBranch, Globe } from "lucide-react";

interface Props { data: ResumeData }

function fmt(d: string) {
  if (!d) return "";
  try { return new Date(d + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric" }); }
  catch { return d; }
}

export function HarvardTemplate({ data }: Props) {
  const { personalInfo: p, summary, experience, education, skills, projects, certifications, languages, settings } = data;

  const adv = settings?.advanced;
  const sec = adv?.sections;
  const doc = adv?.document;

  const fsScale = doc?.fontSize === "small" ? 0.9 : doc?.fontSize === "large" ? 1.1 : 1;
  const lhRaw = doc?.lineHeight === "tight" ? 1.3 : doc?.lineHeight === "relaxed" ? 1.6 : 1.45;
  const marginClass = doc?.margin === "compact" ? "px-10 py-10" : doc?.margin === "spacious" ? "px-16 py-16" : "px-14 py-12";
  const spaceClass = doc?.margin === "compact" ? "mb-4" : doc?.margin === "spacious" ? "mb-8" : "mb-6";

  return (
    <main
      className={`bg-white text-black min-h-full ${marginClass}`}
      style={{
        fontFamily: "'Times New Roman', Times, serif",
        fontSize: `${fsScale}rem`,
      }}
    >
      <header className="text-center mb-6 border-b-2 border-black pb-4">
        <h1 className="text-[28px] font-bold uppercase tracking-widest">{p.fullName || "Your Name"}</h1>
        <address className="not-italic text-[12px] mt-2 space-x-1 flex flex-wrap justify-center items-center">
          {[
            p.email,
            p.phone,
            p.location,
            p.linkedin?.replace(/https?:\/\/(www\.)?/, ""),
            p.github?.replace(/https?:\/\/(www\.)?/, ""),
            p.portfolio?.replace(/https?:\/\/(www\.)?/, "")
          ].filter(Boolean).map((text, i, arr) => (
            <span key={i} className="text-black">
              {text}
              {i < arr.length - 1 && <span className="mx-1.5 opacity-60">|</span>}
            </span>
          ))}
        </address>
      </header>

      {summary && sec?.summary?.visible !== false && (
        <section className={spaceClass}>
          <p className="text-[12px] text-justify" style={{ lineHeight: lhRaw }}>{summary}</p>
        </section>
      )}

      {experience.length > 0 && sec?.experience?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[14px] font-bold border-b border-black pb-1 mb-3">{sec?.experience?.title || "Experience"}</h2>
          <ul className="space-y-4">
            {experience.map((exp) => (
              <li key={exp.id}>
                <div className="flex justify-between items-end mb-0.5">
                  <h3 className="text-[13px] font-bold">{exp.company}</h3>
                  <span className="text-[12px] font-bold">{exp.location || ""}</span>
                </div>
                <div className="flex justify-between items-start mb-1.5">
                  <span className="text-[12px] italic">{exp.role}</span>
                  <span className="text-[12px] font-bold">
                    {fmt(exp.startDate)}{exp.startDate || exp.endDate ? " - " : ""}{exp.current ? "Present" : fmt(exp.endDate)}
                  </span>
                </div>
                {exp.description && (
                  <ul className="list-disc leading-tight list-outside text-[12px] mt-1 pl-4 whitespace-pre-line text-justify" style={{ lineHeight: lhRaw }}>
                    {exp.description.split("\n").filter(Boolean).map((bullet, i) => (
                      <li key={i} className="pl-1 mb-1">
                        {bullet.replace(/^[^a-zA-Z0-9]+/, "") /* strip user bullets */}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {education.length > 0 && sec?.education?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[14px] font-bold border-b border-black pb-1 mb-3">{sec?.education?.title || "Education"}</h2>
          <ul className="space-y-3">
            {education.map((edu) => (
              <li key={edu.id}>
                <div className="flex justify-between items-end mb-0.5">
                  <h3 className="text-[13px] font-bold">{edu.institution}</h3>
                  <span className="text-[12px] font-bold">
                    {fmt(edu.startDate)}{edu.startDate || edu.endDate ? " - " : ""}{edu.current ? "Present" : fmt(edu.endDate)}
                  </span> 
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-[12px] italic">{edu.degree}{edu.field ? `, ${edu.field}` : ""}{edu.gpa ? ` (GPA: ${edu.gpa})` : ""}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {projects.length > 0 && sec?.projects?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[14px] font-bold border-b border-black pb-1 mb-3">{sec?.projects?.title || "Projects"}</h2>
          <ul className="space-y-3">
            {projects.map((proj) => (
              <li key={proj.id} className="text-[12px]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[13px] font-bold">{proj.name}</span>
                  {proj.technologies.length > 0 && <span className="italic">| {proj.technologies.join(", ")}</span>}
                </div>
                {proj.description && (
                  <ul className="list-disc leading-tight list-outside mt-1 pl-4 whitespace-pre-line text-justify" style={{ lineHeight: lhRaw }}>
                    {proj.description.split("\n").filter(Boolean).map((bullet, i) => (
                      <li key={i} className="pl-1 mb-1">
                        {bullet.replace(/^[^a-zA-Z0-9]+/, "")}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {skills.length > 0 && sec?.skills?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[14px] font-bold border-b border-black pb-1 mb-3">{sec?.skills?.title || "Skills"}</h2>
          <p className="text-[12px]" style={{ lineHeight: lhRaw }}>
            <span className="font-bold">Core Competencies:</span> {skills.map(s => s.name).join(", ")}
          </p>
        </section>
      )}

      {(certifications.length > 0 || languages.length > 0) && (
        <div className="grid grid-cols-2 gap-6">
          {certifications.length > 0 && sec?.certifications?.visible !== false && (
            <section className={spaceClass}>
              <h2 className="text-[14px] font-bold border-b border-black pb-1 mb-3">{sec?.certifications?.title || "Certifications"}</h2>
              <ul className="text-[12px] space-y-1">
                {certifications.map(c => (
                  <li key={c.id}>
                    <span className="font-bold">{c.name}</span>, {c.issuer} {c.date ? `(${fmt(c.date)})` : ""}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {languages.length > 0 && sec?.languages?.visible !== false && (
            <section className={spaceClass}>
              <h2 className="text-[14px] font-bold border-b border-black pb-1 mb-3">{sec?.languages?.title || "Languages"}</h2>
              <ul className="text-[12px] flex gap-x-4 gap-y-2 flex-wrap">
                {languages.map(l => (
                  <li key={l.id} className="whitespace-nowrap">
                    <span className="font-bold">{l.name}</span>: {l.proficiency}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </main>
  );
}
