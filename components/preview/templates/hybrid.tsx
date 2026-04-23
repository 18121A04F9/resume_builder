import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Link2, GitBranch, Globe } from "lucide-react";

interface Props { data: ResumeData }

function fmt(d: string) {
  if (!d) return "";
  try { return new Date(d + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric" }); }
  catch { return d; }
}

export function HybridTemplate({ data }: Props) {
  const { personalInfo: p, summary, experience, education, skills, projects, certifications, languages, settings } = data;
  const accent = settings?.themeColor || "#0284c7";

  const adv = settings?.advanced;
  const sec = adv?.sections;
  const doc = adv?.document;

  const fsScale = doc?.fontSize === "small" ? 0.9 : doc?.fontSize === "large" ? 1.1 : 1;
  const lhRaw = doc?.lineHeight === "tight" ? 1.4 : doc?.lineHeight === "relaxed" ? 1.8 : 1.6;
  const marginClass = doc?.margin === "compact" ? "px-6 py-6" : doc?.margin === "spacious" ? "px-14 py-14" : "px-10 py-10";
  const spaceClass = doc?.margin === "compact" ? "mb-4" : doc?.margin === "spacious" ? "mb-8" : "mb-6";

  return (
    <main
      className={`bg-white text-gray-900 ${marginClass}`}
      style={{
        fontFamily: settings?.fontFamily || "'Inter', sans-serif",
        fontSize: `${fsScale}rem`,
      }}
    >
      {/* Header aligned fully left */}
      <header className="mb-6 pb-4 border-b-4" style={{ borderColor: accent }}>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold uppercase tracking-tight text-gray-900 leading-none">{p.fullName || "Your Name"}</h1>
            {p.headline && <p className="text-sm font-bold uppercase tracking-widest mt-2" style={{ color: accent }}>{p.headline}</p>}
          </div>
          <address className="not-italic text-[9px] text-right font-medium text-gray-600 flex flex-col gap-1 mt-1">
            {p.email && <span className="flex items-center gap-1 justify-end">{p.email} <Mail className="h-2.5 w-2.5" style={{ color: accent }}/></span>}
            {p.phone && <span className="flex items-center gap-1 justify-end">{p.phone} <Phone className="h-2.5 w-2.5" style={{ color: accent }}/></span>}
            {p.location && <span className="flex items-center gap-1 justify-end">{p.location} <MapPin className="h-2.5 w-2.5" style={{ color: accent }}/></span>}
            {p.linkedin && <span className="flex items-center gap-1 justify-end">{p.linkedin} <Link2 className="h-2.5 w-2.5" style={{ color: accent }}/></span>}
          </address>
        </div>
      </header>

      {/* Thematic Hybrid Section mapping Summary + Skills side-by-side */}
      <div className="grid grid-cols-[1fr_minmax(200px,30%)] gap-8 items-start mb-6">
        <div>
          {summary && sec?.summary?.visible !== false && (
            <section className="mb-4">
              <h2 className="text-[12px] font-bold uppercase tracking-widest text-gray-800 mb-2">{sec?.summary?.title || "Professional Profile"}</h2>
              <p className="text-[11px] text-gray-700" style={{ lineHeight: lhRaw }}>{summary}</p>
            </section>
          )}
          {projects.length > 0 && sec?.projects?.visible !== false && (
            <section className="mb-4">
              <h2 className="text-[12px] font-bold uppercase tracking-widest text-gray-800 mb-2">{sec?.projects?.title || "Key Projects"}</h2>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="border-l-2 border-gray-200 pl-3">
                    <h3 className="text-[11px] font-bold">{proj.name}</h3>
                    {proj.technologies.length > 0 && <p className="text-[9px] text-gray-500 italic mt-0.5">{proj.technologies.join(", ")}</p>}
                    <p className="text-[10px] text-gray-700 mt-1" style={{ lineHeight: lhRaw }}>{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div>
          {skills.length > 0 && sec?.skills?.visible !== false && (
            <section className="mb-4">
              <h2 className="text-[12px] font-bold uppercase tracking-widest text-gray-800 mb-2">{sec?.skills?.title || "Expertise"}</h2>
              <ul className="text-[10px] text-gray-700 space-y-1 font-medium">
                {skills.map(s => (
                  <li key={s.id} className="flex justify-between border-b border-gray-100 pb-0.5">
                    <span>{s.name}</span>
                    <span style={{ color: accent }}>{s.level}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {certifications.length > 0 && sec?.certifications?.visible !== false && (
            <section className="mb-4">
              <h2 className="text-[12px] font-bold uppercase tracking-widest text-gray-800 mb-2">{sec?.certifications?.title || "Certifications"}</h2>
              <ul className="text-[10px] text-gray-700 space-y-1.5 font-medium">
                {certifications.map(c => (
                  <li key={c.id}>
                    <span className="block font-bold">{c.name}</span>
                    <span className="text-[9px] text-gray-500 italic">{c.issuer}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      {experience.length > 0 && sec?.experience?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[12px] font-bold uppercase tracking-widest border-b-2 border-gray-200 pb-1 mb-3 text-gray-800">{sec?.experience?.title || "Professional Experience"}</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-0.5">
                  <h3 className="text-[11.5px] font-bold text-gray-900">{exp.role}</h3>
                  <span className="text-[9.5px] font-bold uppercase tracking-wider" style={{ color: accent }}>
                    {fmt(exp.startDate)}{exp.startDate || exp.endDate ? " - " : ""}{exp.current ? "Present" : fmt(exp.endDate)}
                  </span>
                </div>
                <div className="text-[10.5px] text-gray-600 font-semibold mb-1.5">{exp.company} {exp.location ? ` | ${exp.location}` : ""}</div>
                {exp.description && (
                  <p className="text-[10.5px] text-gray-700 whitespace-pre-line" style={{ lineHeight: lhRaw }}>{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && sec?.education?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[12px] font-bold uppercase tracking-widest border-b-2 border-gray-200 pb-1 mb-3 text-gray-800">{sec?.education?.title || "Education"}</h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-0.5">
                  <h3 className="text-[11.5px] font-bold text-gray-900">{edu.institution}</h3>
                  <span className="text-[9.5px] font-bold uppercase tracking-wider text-gray-500">
                    {fmt(edu.startDate)}{edu.startDate || edu.endDate ? " - " : ""}{edu.current ? "Present" : fmt(edu.endDate)}
                  </span>
                </div>
                <div className="text-[10.5px] text-gray-700">{edu.degree}{edu.field ? `, ${edu.field}` : ""}</div>
                {edu.gpa && <div className="text-[9px] text-gray-500 font-medium mt-0.5">GPA: {edu.gpa}</div>}
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
