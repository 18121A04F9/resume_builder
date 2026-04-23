import { ResumeData } from "@/types/resume";

interface Props { data: ResumeData }

function fmt(d: string) {
  if (!d) return "";
  try { return new Date(d + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric" }); }
  catch { return d; }
}

export function GeneralTemplate({ data }: Props) {
  const { personalInfo: p, summary, experience, education, skills, projects, certifications, languages, settings } = data;
  const accent = settings?.themeColor || "#2563eb"; 

  const adv = settings?.advanced;
  const sec = adv?.sections;
  const doc = adv?.document;

  const fsScale = doc?.fontSize === "small" ? 0.9 : doc?.fontSize === "large" ? 1.1 : 1;
  const lhRaw = doc?.lineHeight === "tight" ? 1.4 : doc?.lineHeight === "relaxed" ? 1.8 : 1.6;
  const marginClass = doc?.margin === "compact" ? "px-8 py-8" : doc?.margin === "spacious" ? "px-16 py-14" : "px-12 py-10";
  const spaceClass = doc?.margin === "compact" ? "mb-4" : doc?.margin === "spacious" ? "mb-8" : "mb-6";

  return (
    <main
      className={`bg-white text-gray-900 ${marginClass}`}
      style={{
        fontFamily: settings?.fontFamily || "'Helvetica Neue', Helvetica, Arial, sans-serif",
        fontSize: `${fsScale}rem`,
      }}
    >
      <header className="mb-6 pb-4 border-b-2" style={{ borderColor: accent }}>
        <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">{p.fullName || "Your Name"}</h1>
        {p.headline && <p className="text-[14px] text-gray-500 font-medium mt-1">{p.headline}</p>}
        
        <div className="flex flex-wrap gap-4 mt-3 text-[10.5px] text-gray-600 font-medium">
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.location && <span>{p.location}</span>}
          {p.linkedin && <span>{p.linkedin}</span>}
          {p.portfolio && <span>{p.portfolio}</span>}
        </div>
      </header>

      {summary && sec?.summary?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[13px] font-bold uppercase mb-2 text-gray-800 tracking-wider">
            {sec?.summary?.title || "Summary"}
          </h2>
          <p className="text-[11px] text-gray-700" style={{ lineHeight: lhRaw }}>{summary}</p>
        </section>
      )}

      {experience.length > 0 && sec?.experience?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[13px] font-bold uppercase mb-3 text-gray-800 tracking-wider">
            {sec?.experience?.title || "Experience"}
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-[12px] font-bold text-gray-900">{exp.role}</h3>
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                    {fmt(exp.startDate)}{exp.startDate || exp.endDate ? " - " : ""}{exp.current ? "Present" : fmt(exp.endDate)}
                  </span>
                </div>
                <div className="text-[11px] text-gray-600 font-medium mb-1.5" style={{ color: accent }}>{exp.company}</div>
                {exp.description && (
                  <p className="text-[11px] text-gray-700 whitespace-pre-line" style={{ lineHeight: lhRaw }}>{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && sec?.education?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[13px] font-bold uppercase mb-3 text-gray-800 tracking-wider">
            {sec?.education?.title || "Education"}
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <h3 className="text-[12px] font-bold text-gray-900">{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</h3>
                  <div className="text-[11px] text-gray-600 mt-0.5" style={{ color: accent }}>{edu.institution}</div>
                </div>
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider text-right">
                  {fmt(edu.startDate)}{edu.startDate || edu.endDate ? " - " : ""}{edu.current ? "Present" : fmt(edu.endDate)}
                  {edu.gpa && <span className="block italic font-medium lowercase">gpa: {edu.gpa}</span>}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && sec?.skills?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[13px] font-bold uppercase mb-2 text-gray-800 tracking-wider">
            {sec?.skills?.title || "Skills"}
          </h2>
          <p className="text-[11px] text-gray-700" style={{ lineHeight: lhRaw }}>
            {skills.map(s => s.name).join(" • ")}
          </p>
        </section>
      )}

      {projects.length > 0 && sec?.projects?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[13px] font-bold uppercase mb-3 text-gray-800 tracking-wider">
            {sec?.projects?.title || "Projects"}
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-[12px] font-bold text-gray-900">{proj.name}</h3>
                  {proj.technologies.length > 0 && <span className="text-[9.5px] italic text-gray-500">| {proj.technologies.join(", ")}</span>}
                </div>
                {proj.description && <p className="text-[11px] text-gray-700" style={{ lineHeight: lhRaw }}>{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {(certifications.length > 0 || languages.length > 0) && (
        <div className="grid grid-cols-2 gap-8">
          {certifications.length > 0 && sec?.certifications?.visible !== false && (
            <section className={spaceClass}>
              <h2 className="text-[13px] font-bold uppercase mb-2 text-gray-800 tracking-wider">
                {sec?.certifications?.title || "Certifications"}
              </h2>
              <ul className="text-[11px] text-gray-700 space-y-1">
                {certifications.map(c => (
                  <li key={c.id}><strong>{c.name}</strong> – {c.issuer}</li>
                ))}
              </ul>
            </section>
          )}
          {languages.length > 0 && sec?.languages?.visible !== false && (
            <section className={spaceClass}>
              <h2 className="text-[13px] font-bold uppercase mb-2 text-gray-800 tracking-wider">
                {sec?.languages?.title || "Languages"}
              </h2>
              <ul className="text-[11px] text-gray-700 space-y-1">
                {languages.map(l => (
                  <li key={l.id}>{l.name} <span className="italic text-gray-500 pl-1">({l.proficiency})</span></li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </main>
  );
}
