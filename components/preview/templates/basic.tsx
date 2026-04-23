import { ResumeData } from "@/types/resume";

interface Props { data: ResumeData }

function fmt(d: string) {
  if (!d) return "";
  try { return new Date(d + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric" }); }
  catch { return d; }
}

export function BasicTemplate({ data }: Props) {
  const { personalInfo: p, summary, experience, education, skills, projects, certifications, languages, settings } = data;

  const adv = settings?.advanced;
  const sec = adv?.sections;
  const doc = adv?.document;

  const fsScale = doc?.fontSize === "small" ? 0.9 : doc?.fontSize === "large" ? 1.1 : 1;
  const lhRaw = doc?.lineHeight === "tight" ? 1.4 : doc?.lineHeight === "relaxed" ? 1.8 : 1.6;
  const marginClass = doc?.margin === "compact" ? "px-8 py-8" : doc?.margin === "spacious" ? "px-16 py-16" : "px-12 py-10";
  const spaceClass = doc?.margin === "compact" ? "mb-4" : doc?.margin === "spacious" ? "mb-8" : "mb-6";

  return (
    <main
      className={`bg-white text-gray-900 ${marginClass}`}
      style={{
        fontFamily: "'Arial', sans-serif",
        fontSize: `${fsScale}rem`,
      }}
    >
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-1">{p.fullName || "Your Name"}</h1>
        {p.headline && <p className="text-[13px] text-gray-600 font-medium mb-2">{p.headline}</p>}
        <address className="not-italic text-[10px] text-gray-500 flex flex-wrap gap-x-4 gap-y-1">
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.location && <span>{p.location}</span>}
          {p.linkedin && <span>{p.linkedin}</span>}
          {p.portfolio && <span>{p.portfolio}</span>}
        </address>
      </header>

      {summary && sec?.summary?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[12px] font-bold text-gray-900 mb-1.5">{sec?.summary?.title || "Summary"}</h2>
          <p className="text-[10.5px] text-gray-700" style={{ lineHeight: lhRaw }}>{summary}</p>
        </section>
      )}

      {experience.length > 0 && sec?.experience?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[12px] font-bold text-gray-900 mb-2">{sec?.experience?.title || "Experience"}</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <h3 className="text-[11px] font-bold text-gray-900">{exp.role}</h3>
                <div className="flex justify-between items-center text-[10px] text-gray-500 mb-1">
                  <span>{exp.company}</span>
                  <span>{fmt(exp.startDate)}{exp.startDate || exp.endDate ? " - " : ""}{exp.current ? "Present" : fmt(exp.endDate)}</span>
                </div>
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
          <h2 className="text-[12px] font-bold text-gray-900 mb-2">{sec?.education?.title || "Education"}</h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <h3 className="text-[11px] font-bold text-gray-900">{edu.degree}{edu.field ? `, ${edu.field}` : ""}</h3>
                <div className="flex justify-between items-center text-[10px] text-gray-500">
                  <span>{edu.institution} {edu.gpa ? ` (GPA: ${edu.gpa})` : ""}</span>
                  <span>{fmt(edu.startDate)}{edu.startDate || edu.endDate ? " - " : ""}{edu.current ? "Present" : fmt(edu.endDate)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && sec?.skills?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[12px] font-bold text-gray-900 mb-1.5">{sec?.skills?.title || "Skills"}</h2>
          <p className="text-[10.5px] text-gray-700" style={{ lineHeight: lhRaw }}>{skills.map(s => s.name).join(", ")}</p>
        </section>
      )}

      {projects.length > 0 && sec?.projects?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[12px] font-bold text-gray-900 mb-2">{sec?.projects?.title || "Projects"}</h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="text-[11px] font-bold text-gray-900">{proj.name} {proj.technologies.length > 0 && <span className="font-normal text-gray-500">| {proj.technologies.join(", ")}</span>}</h3>
                {proj.description && <p className="text-[10.5px] text-gray-700 mt-0.5" style={{ lineHeight: lhRaw }}>{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {(certifications.length > 0 || languages.length > 0) && (
        <div className="grid grid-cols-2 gap-8">
          {certifications.length > 0 && sec?.certifications?.visible !== false && (
            <section>
              <h2 className="text-[12px] font-bold text-gray-900 mb-1.5">{sec?.certifications?.title || "Certifications"}</h2>
              <ul className="text-[10.5px] text-gray-700 space-y-0.5">
                {certifications.map(c => <li key={c.id}>{c.name} - {c.issuer}</li>)}
              </ul>
            </section>
          )}
          {languages.length > 0 && sec?.languages?.visible !== false && (
            <section>
              <h2 className="text-[12px] font-bold text-gray-900 mb-1.5">{sec?.languages?.title || "Languages"}</h2>
              <ul className="text-[10.5px] text-gray-700 space-y-0.5">
                {languages.map(l => <li key={l.id}>{l.name} ({l.proficiency})</li>)}
              </ul>
            </section>
          )}
        </div>
      )}
    </main>
  );
}
