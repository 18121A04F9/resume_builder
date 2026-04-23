import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Link2, GitBranch, Globe } from "lucide-react";

interface Props { data: ResumeData }

function fmt(d: string) {
  if (!d) return "";
  try { return new Date(d + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric" }); }
  catch { return d; }
}

export function FunctionalTemplate({ data }: Props) {
  const { personalInfo: p, summary, experience, education, skills, projects, certifications, languages, settings } = data;
  const accent = settings?.themeColor || "#2563eb";

  const adv = settings?.advanced;
  const sec = adv?.sections;
  const doc = adv?.document;

  const fsScale = doc?.fontSize === "small" ? 0.9 : doc?.fontSize === "large" ? 1.1 : 1;
  const lhRaw = doc?.lineHeight === "tight" ? 1.4 : doc?.lineHeight === "relaxed" ? 1.8 : 1.6;
  const marginClass = doc?.margin === "compact" ? "px-6 py-6" : doc?.margin === "spacious" ? "px-14 py-14" : "px-10 py-10";
  const spaceClass = doc?.margin === "compact" ? "mb-3" : doc?.margin === "spacious" ? "mb-6" : "mb-5";

  return (
    <main
      className={`bg-white text-gray-900 ${marginClass}`}
      style={{
        fontFamily: settings?.fontFamily || "'Inter', sans-serif",
        fontSize: `${fsScale}rem`,
      }}
    >
      <header className="mb-6 flex flex-col items-center border-b-4 pb-4" style={{ borderColor: accent }}>
        <h1 className="text-3xl font-extrabold uppercase tracking-wide" style={{ color: accent }}>{p.fullName || "Your Name"}</h1>
        {p.headline && <p className="text-sm font-semibold tracking-widest mt-1 text-gray-500 uppercase">{p.headline}</p>}
        <address className="not-italic text-xs flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3 font-medium text-gray-600">
          {[p.email, p.phone, p.location, p.linkedin, p.github, p.portfolio].filter(Boolean).map((v, i) => (
            <span key={i} className="flex items-center gap-1">
              {v}
            </span>
          ))}
        </address>
      </header>

      {summary && sec?.summary?.visible !== false && (
        <section className={spaceClass}>
          <p className="text-[11px] text-justify font-medium text-gray-700" style={{ lineHeight: lhRaw }}>{summary}</p>
        </section>
      )}

      {skills.length > 0 && sec?.skills?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[12px] font-bold uppercase tracking-wider mb-2 border-b-2 border-gray-200 pb-1" style={{ color: accent }}>{sec?.skills?.title || "Core Proficiencies"}</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[10px] text-gray-700 font-semibold">
            {skills.map((s) => (
              <div key={s.id} className="flex justify-between items-center">
                <span>✓ {s.name}</span>
                {s.level && <span className="text-gray-400 italic text-[9px]">{s.level}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && sec?.projects?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[12px] font-bold uppercase tracking-wider mb-2 border-b-2 border-gray-200 pb-1" style={{ color: accent }}>{sec?.projects?.title || "Key Achievements & Projects"}</h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="text-[11px] font-bold">{proj.name}</h3>
                {proj.technologies.length > 0 && (
                  <p className="text-[9px] text-gray-500 italic mb-0.5">{proj.technologies.join(" • ")}</p>
                )}
                <p className="text-[10px] text-gray-700" style={{ lineHeight: lhRaw }}>{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {experience.length > 0 && sec?.experience?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[12px] font-bold uppercase tracking-wider mb-2 border-b-2 border-gray-200 pb-1" style={{ color: accent }}>{sec?.experience?.title || "Work History"}</h2>
          <div className="space-y-2 text-[10.5px]">
            {experience.map((exp) => (
              <div key={exp.id} className="flex justify-between items-start">
                <div>
                  <span className="font-bold">{exp.role}</span> — <span className="italic text-gray-600">{exp.company}</span>
                </div>
                <span className="text-[9px] text-gray-500 whitespace-nowrap ml-4">
                  {fmt(exp.startDate)}{exp.startDate || exp.endDate ? " - " : ""}{exp.current ? "Present" : fmt(exp.endDate)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && sec?.education?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[12px] font-bold uppercase tracking-wider mb-2 border-b-2 border-gray-200 pb-1" style={{ color: accent }}>{sec?.education?.title || "Education"}</h2>
          <div className="space-y-2 text-[10.5px]">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <span className="font-bold">{edu.institution}</span>
                  <p className="text-gray-600 italic text-[10px]">{edu.degree}{edu.field ? `, ${edu.field}` : ""}</p>
                </div>
                <span className="text-[9px] text-gray-500 whitespace-nowrap ml-4">
                  {fmt(edu.startDate)}{edu.startDate || edu.endDate ? " - " : ""}{edu.current ? "Present" : fmt(edu.endDate)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {(certifications.length > 0 || languages.length > 0) && (
        <div className="grid grid-cols-2 gap-4">
          {certifications.length > 0 && sec?.certifications?.visible !== false && (
            <section className={spaceClass}>
              <h2 className="text-[11px] font-bold uppercase tracking-wider mb-1.5 border-b-2 border-gray-200 pb-1" style={{ color: accent }}>{sec?.certifications?.title || "Certifications"}</h2>
              <ul className="text-[10px] text-gray-700 space-y-0.5">
                {certifications.map(c => (
                  <li key={c.id}>• <strong>{c.name}</strong>, {c.issuer}</li>
                ))}
              </ul>
            </section>
          )}
          {languages.length > 0 && sec?.languages?.visible !== false && (
            <section className={spaceClass}>
              <h2 className="text-[11px] font-bold uppercase tracking-wider mb-1.5 border-b-2 border-gray-200 pb-1" style={{ color: accent }}>{sec?.languages?.title || "Languages"}</h2>
              <ul className="text-[10px] text-gray-700 space-y-0.5">
                {languages.map(l => (
                  <li key={l.id}>• {l.name} ({l.proficiency})</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </main>
  );
}
