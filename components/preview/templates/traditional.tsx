import { ResumeData } from "@/types/resume";

interface Props { data: ResumeData }

function fmt(d: string) {
  if (!d) return "";
  try { return new Date(d + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric" }); }
  catch { return d; }
}

export function TraditionalTemplate({ data }: Props) {
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
      className={`bg-white text-black ${marginClass}`}
      style={{
        fontFamily: "'Times New Roman', Times, serif",
        fontSize: `${fsScale}rem`,
      }}
    >
      <header className="mb-4 text-center">
        <h1 className="text-2xl font-bold uppercase tracking-widest">{p.fullName || "Your Name"}</h1>
        {p.headline && <p className="text-xs uppercase tracking-widest mt-1 mb-2">{p.headline}</p>}
        <address className="not-italic text-[10.5px] mt-2 font-normal flex flex-wrap justify-center gap-x-3 gap-y-1">
          {[p.email, p.phone, p.location, p.linkedin, p.portfolio].filter(Boolean).map((v, i, arr) => (
            <span key={i}>
              {v}{i < arr.length - 1 && <span className="ml-3">|</span>}
            </span>
          ))}
        </address>
      </header>

      {summary && sec?.summary?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[11.5px] font-bold uppercase tracking-wider mb-1 border-b border-black pb-0.5">{sec?.summary?.title || "Summary"}</h2>
          <p className="text-[10.5px] text-justify" style={{ lineHeight: lhRaw }}>{summary}</p>
        </section>
      )}

      {experience.length > 0 && sec?.experience?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[11.5px] font-bold uppercase tracking-wider mb-2 border-b border-black pb-0.5">{sec?.experience?.title || "Experience"}</h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-end mb-0.5">
                  <h3 className="text-[11px] font-bold">{exp.role}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {fmt(exp.startDate)}{exp.startDate || exp.endDate ? " - " : ""}{exp.current ? "Present" : fmt(exp.endDate)}
                  </span>
                </div>
                <div className="text-[10.5px] font-bold italic mb-1">{exp.company}</div>
                {exp.description && (
                  <p className="text-[10.5px] whitespace-pre-line" style={{ lineHeight: lhRaw }}>{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && sec?.education?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[11.5px] font-bold uppercase tracking-wider mb-2 border-b border-black pb-0.5">{sec?.education?.title || "Education"}</h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-end">
                  <h3 className="text-[11px] font-bold">{edu.institution}</h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider">
                    {fmt(edu.startDate)}{edu.startDate || edu.endDate ? " - " : ""}{edu.current ? "Present" : fmt(edu.endDate)}
                  </span>
                </div>
                <div className="text-[10.5px]">
                  {edu.degree}{edu.field ? `, ${edu.field}` : ""} {edu.gpa ? ` | GPA: ${edu.gpa}` : ""}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && sec?.skills?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[11.5px] font-bold uppercase tracking-wider mb-1.5 border-b border-black pb-0.5">{sec?.skills?.title || "Skills"}</h2>
          <p className="text-[10.5px]" style={{ lineHeight: lhRaw }}>
            {skills.map(s => s.name).join(", ")}
          </p>
        </section>
      )}

      {projects.length > 0 && sec?.projects?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[11.5px] font-bold uppercase tracking-wider mb-2 border-b border-black pb-0.5">{sec?.projects?.title || "Projects"}</h2>
          <div className="space-y-2">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="text-[11px] font-bold">{proj.name}</h3>
                  {proj.technologies.length > 0 && <span className="text-[9.5px] italic">({proj.technologies.join(", ")})</span>}
                </div>
                {proj.description && <p className="text-[10.5px]" style={{ lineHeight: lhRaw }}>{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {(certifications.length > 0 || languages.length > 0) && (
        <div className="grid grid-cols-2 gap-8">
          {certifications.length > 0 && sec?.certifications?.visible !== false && (
            <section className={spaceClass}>
              <h2 className="text-[11.5px] font-bold uppercase tracking-wider mb-1.5 border-b border-black pb-0.5">{sec?.certifications?.title || "Certifications"}</h2>
              <ul className="text-[10.5px] space-y-0.5">
                {certifications.map(c => (
                  <li key={c.id}><strong>{c.name}</strong>, {c.issuer}</li>
                ))}
              </ul>
            </section>
          )}
          {languages.length > 0 && sec?.languages?.visible !== false && (
            <section className={spaceClass}>
              <h2 className="text-[11.5px] font-bold uppercase tracking-wider mb-1.5 border-b border-black pb-0.5">{sec?.languages?.title || "Languages"}</h2>
              <ul className="text-[10.5px] space-y-0.5">
                {languages.map(l => (
                  <li key={l.id}>{l.name} - {l.proficiency}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </main>
  );
}
