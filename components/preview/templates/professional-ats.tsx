import { ResumeData } from "@/types/resume";

interface Props { data: ResumeData }

function fmt(d: string) {
  if (!d) return "";
  try { return new Date(d + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric" }); }
  catch { return d; }
}

export function AtsTemplate({ data }: Props) {
  const { personalInfo: p, summary, experience, education, skills, projects, certifications, languages, settings } = data;

  const adv = settings?.advanced;
  const sec = adv?.sections;
  const doc = adv?.document;

  const fsScale = doc?.fontSize === "small" ? 0.9 : doc?.fontSize === "large" ? 1.1 : 1;
  const lhRaw = doc?.lineHeight === "tight" ? 1.4 : doc?.lineHeight === "relaxed" ? 1.8 : 1.6;
  const marginClass = doc?.margin === "compact" ? "px-8 py-8" : doc?.margin === "spacious" ? "px-16 py-16" : "px-12 py-12";
  const spaceClass = doc?.margin === "compact" ? "mb-5" : doc?.margin === "spacious" ? "mb-8" : "mb-6";

  return (
    <main
      className={`bg-white text-[#000] ${marginClass}`}
      style={{
        fontFamily: "'Arial', 'Liberation Sans', sans-serif",
        fontSize: `${fsScale}rem`,
      }}
    >
      {/* Header — plain text only for ATS */}
      <header className="text-center border-b-[2px] border-black pb-5 mb-6">
        <h1 className="text-[26px] font-extrabold uppercase tracking-widest">{p.fullName || "YOUR NAME"}</h1>
        <address className="not-italic text-[11px] mt-2 font-medium tracking-wide">
          {[p.email, p.phone, p.location, p.linkedin, p.github, p.portfolio]
            .filter(Boolean)
            .join("  |  ")}
        </address>
      </header>

      {/* Summary */}
      {summary && sec?.summary?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[12px] font-extrabold uppercase border-b-[1.5px] border-black pb-1 mb-3 tracking-widest">{sec?.summary?.title || "PROFESSIONAL SUMMARY"}</h2>
          <p className="text-[11.5px] font-medium" style={{ lineHeight: lhRaw }}>{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && sec?.experience?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[12px] font-extrabold uppercase border-b-[1.5px] border-black pb-1 mb-3 tracking-widest">{sec?.experience?.title || "WORK EXPERIENCE"}</h2>
          <ul className="space-y-4">
            {experience.map((exp) => (
              <li key={exp.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="text-[12.5px] font-bold">{exp.role}</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    {fmt(exp.startDate)}{exp.startDate || exp.endDate ? " - " : ""}{exp.current ? "Present" : fmt(exp.endDate)}
                  </span>
                </div>
                <div className="text-[12px] font-bold italic">{exp.company}</div>
                {exp.description && (
                  <p className="text-[11px] font-medium mt-1.5 whitespace-pre-line" style={{ lineHeight: lhRaw }}>{exp.description}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && sec?.education?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[10.5px] font-bold uppercase border-b border-black pb-0.5 mb-2">{sec?.education?.title || "EDUCATION"}</h2>
          <ul className="space-y-2">
            {education.map((edu) => (
              <li key={edu.id}>
                <div className="flex justify-between">
                  <span className="text-[10.5px] font-bold">{edu.institution}</span>
                  <span className="text-[10px]">
                    {fmt(edu.startDate)}{edu.startDate || edu.endDate ? " - " : ""}{edu.current ? "Present" : fmt(edu.endDate)}
                  </span>
                </div>
                <div className="text-[10px]">
                  {edu.degree}{edu.field ? `, ${edu.field}` : ""}{edu.gpa ? ` | GPA: ${edu.gpa}` : ""}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && sec?.skills?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[12px] font-extrabold uppercase border-b-[1.5px] border-black pb-1 mb-3 tracking-widest">{sec?.skills?.title || "SKILLS"}</h2>
          <p className="text-[11.5px] font-medium" style={{ lineHeight: lhRaw }}>{skills.map(s => s.name).join(", ")}</p>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && sec?.projects?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[12px] font-extrabold uppercase border-b-[1.5px] border-black pb-1 mb-3 tracking-widest">{sec?.projects?.title || "PROJECTS"}</h2>
          <ul className="space-y-3">
            {projects.map((proj) => (
              <li key={proj.id}>
                <span className="text-[12px] font-bold">{proj.name}</span>
                {proj.technologies.length > 0 && (
                  <span className="text-[11px] font-medium italic"> | {proj.technologies.join(", ")}</span>
                )}
                {proj.description && <p className="text-[11px] font-medium mt-1 whitespace-pre-line" style={{ lineHeight: lhRaw }}>{proj.description}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {certifications.length > 0 && sec?.certifications?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[12px] font-extrabold uppercase border-b-[1.5px] border-black pb-1 mb-3 tracking-widest">{sec?.certifications?.title || "CERTIFICATIONS"}</h2>
          <ul className="space-y-1.5">
            {certifications.map((cert) => (
              <li key={cert.id} className="text-[11.5px] font-medium">
                <span className="font-bold">{cert.name}</span> — {cert.issuer}{cert.date ? ` (${fmt(cert.date)})` : ""}
              </li>
            ))}
          </ul>
        </section>
      )}

      {languages.length > 0 && sec?.languages?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[12px] font-extrabold uppercase border-b-[1.5px] border-black pb-1 mb-3 tracking-widest">{sec?.languages?.title || "LANGUAGES"}</h2>
          <p className="text-[11.5px] font-medium" style={{ lineHeight: lhRaw }}>{languages.map(l => `${l.name} (${l.proficiency})`).join(", ")}</p>
        </section>
      )}

      {!summary && experience.length === 0 && education.length === 0 && skills.length === 0 && (
        <div className="text-center py-12 text-[#999] text-[10px]">
          Fill in the editor to see your resume here.
        </div>
      )}
    </main>
  );
}
