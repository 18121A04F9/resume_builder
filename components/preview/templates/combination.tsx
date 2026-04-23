import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Link2, GitBranch, Globe } from "lucide-react";

interface Props { data: ResumeData }

function fmt(d: string) {
  if (!d) return "";
  try { return new Date(d + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric" }); }
  catch { return d; }
}

export function CombinationTemplate({ data }: Props) {
  const { personalInfo: p, summary, experience, education, skills, projects, certifications, languages, settings } = data;
  const accent = settings?.themeColor || "#059669"; // Green tint

  const adv = settings?.advanced;
  const sec = adv?.sections;
  const doc = adv?.document;

  const fsScale = doc?.fontSize === "small" ? 0.9 : doc?.fontSize === "large" ? 1.1 : 1;
  const lhRaw = doc?.lineHeight === "tight" ? 1.4 : doc?.lineHeight === "relaxed" ? 1.8 : 1.6;
  const marginClass = doc?.margin === "compact" ? "px-8 py-8" : doc?.margin === "spacious" ? "px-14 py-14" : "px-10 py-10";
  const spaceClass = doc?.margin === "compact" ? "mb-4" : doc?.margin === "spacious" ? "mb-8" : "mb-6";

  return (
    <main
      className={`bg-white text-gray-900 ${marginClass}`}
      style={{
        fontFamily: settings?.fontFamily || "'Arial', sans-serif",
        fontSize: `${fsScale}rem`,
      }}
    >
      <header className="mb-7 flex justify-between items-end border-b-[3px] pb-4" style={{ borderColor: accent }}>
        <div>
          <h1 className="text-[34px] font-extrabold uppercase tracking-widest text-gray-900 leading-none">{p.fullName || "Your Name"}</h1>
          {p.headline && <p className="text-[14px] font-bold text-gray-600 mt-1.5 uppercase tracking-wide">{p.headline}</p>}
        </div>
        <address className="not-italic text-[11px] text-right font-semibold text-gray-600 space-y-1 mt-2">
          {p.email && <div className="flex items-center gap-1.5 justify-end">{p.email} <Mail className="h-3 w-3" style={{ color: accent }}/></div>}
          {p.phone && <div className="flex items-center gap-1.5 justify-end">{p.phone} <Phone className="h-3 w-3" style={{ color: accent }}/></div>}
          {p.location && <div className="flex items-center gap-1.5 justify-end">{p.location} <MapPin className="h-3 w-3" style={{ color: accent }}/></div>}
          {p.linkedin && <div className="flex items-center gap-1.5 justify-end">{p.linkedin} <Link2 className="h-3 w-3" style={{ color: accent }}/></div>}
          {p.github && <div className="flex items-center gap-1.5 justify-end">{p.github} <GitBranch className="h-3 w-3" style={{ color: accent }}/></div>}
          {p.portfolio && <div className="flex items-center gap-1.5 justify-end">{p.portfolio} <Globe className="h-3 w-3" style={{ color: accent }}/></div>}
        </address>
      </header>

      {/* Two-column top section */}
      <div className="grid grid-cols-[1fr_240px] gap-8 items-start mb-8">
        <div>
          {summary && sec?.summary?.visible !== false && (
            <section className={spaceClass}>
              <h2 className="text-[12.5px] font-extrabold uppercase tracking-widest mb-2" style={{ color: accent }}>{sec?.summary?.title || "Summary"}</h2>
              <p className="text-[12px] text-gray-700 font-medium" style={{ lineHeight: lhRaw }}>{summary}</p>
            </section>
          )}

          {projects.length > 0 && sec?.projects?.visible !== false && (
            <section className={spaceClass}>
              <h2 className="text-[12.5px] font-extrabold uppercase tracking-widest mb-2" style={{ color: accent }}>{sec?.projects?.title || "Key Projects"}</h2>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 className="text-[12px] font-bold text-gray-900">{proj.name}</h3>
                    <p className="text-[11.5px] font-medium text-gray-700 mt-1" style={{ lineHeight: lhRaw }}>{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="bg-gray-50/70 p-5 border border-gray-200 shadow-sm rounded-xl">
          {skills.length > 0 && sec?.skills?.visible !== false && (
            <section className="mb-5">
              <h2 className="text-[11.5px] font-extrabold uppercase tracking-widest mb-2.5" style={{ color: accent }}>{sec?.skills?.title || "Skills"}</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s.id} className="text-[10.5px] font-bold bg-white border border-gray-300 px-2.5 py-1 rounded-md shadow-sm text-gray-800">
                    {s.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && sec?.languages?.visible !== false && (
            <section className="mb-4">
              <h2 className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: accent }}>{sec?.languages?.title || "Languages"}</h2>
              <ul className="text-[9px] text-gray-700 space-y-0.5 font-medium">
                {languages.map(l => (
                  <li key={l.id}>{l.name} <span className="text-gray-400">({l.proficiency})</span></li>
                ))}
              </ul>
            </section>
          )}

          {certifications.length > 0 && sec?.certifications?.visible !== false && (
            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: accent }}>{sec?.certifications?.title || "Certifications"}</h2>
              <ul className="text-[9px] text-gray-700 space-y-1 font-medium">
                {certifications.map(c => (
                  <li key={c.id}>
                    <strong>{c.name}</strong><br/>
                    <span className="text-gray-500">{c.issuer}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      {/* Full width bottom section */}
      {experience.length > 0 && sec?.experience?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[12.5px] font-extrabold uppercase tracking-widest mb-4 border-b-2 border-gray-200 pb-1.5" style={{ color: accent }}>{sec?.experience?.title || "Experience"}</h2>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-[13px] font-bold text-gray-900">{exp.role}</h3>
                    <p className="text-[12px] font-semibold text-gray-600 mt-0.5">{exp.company}</p>
                  </div>
                  <span className="text-[10.5px] font-bold text-gray-600 whitespace-nowrap bg-gray-100 px-3 py-1 rounded-md uppercase tracking-wider">
                    {fmt(exp.startDate)}{exp.startDate || exp.endDate ? " - " : ""}{exp.current ? "Present" : fmt(exp.endDate)}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-[11.5px] font-medium text-gray-700 mt-2 whitespace-pre-line" style={{ lineHeight: lhRaw }}>{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && sec?.education?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[11px] font-bold uppercase tracking-wide mb-3 border-b border-gray-200 pb-1" style={{ color: accent }}>{sec?.education?.title || "Education"}</h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="text-[11px] font-bold text-gray-900">{edu.institution}</h3>
                  <p className="text-[10.5px] font-medium text-gray-800">{edu.degree}{edu.field ? `, ${edu.field}` : ""}</p>
                  {edu.gpa && <p className="text-[9.5px] text-gray-500 mt-0.5">GPA: {edu.gpa}</p>}
                </div>
                <span className="text-[9px] font-bold text-gray-500 whitespace-nowrap">
                  {fmt(edu.startDate)}{edu.startDate || edu.endDate ? " - " : ""}{edu.current ? "Present" : fmt(edu.endDate)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
