import { ResumeData } from "@/types/resume";

interface Props { data: ResumeData }

function fmt(d: string) {
  if (!d) return "";
  try { return new Date(d + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric" }); }
  catch { return d; }
}

export function SkillsBasedTemplate({ data }: Props) {
  const { personalInfo: p, summary, experience, education, skills, projects, certifications, languages, settings } = data;
  const accent = settings?.themeColor || "#000000"; // Default monochromatic

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
        fontFamily: settings?.fontFamily || "'Arial', sans-serif",
        fontSize: `${fsScale}rem`,
      }}
    >
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-black uppercase tracking-widest text-gray-900">{p.fullName || "Your Name"}</h1>
        {p.headline && <p className="text-sm font-bold tracking-widest mt-1 text-gray-500 uppercase">{p.headline}</p>}
        <address className="not-italic text-[10px] mt-2 font-medium text-gray-600 flex justify-center gap-x-3 gap-y-1 flex-wrap">
          {[p.email, p.phone, p.location, p.linkedin, p.portfolio].filter(Boolean).map((v, i) => (
             <span key={i}>{v}</span>
          ))}
        </address>
        <div className="mt-4 border-b-2" style={{ borderColor: accent }} />
      </header>

      {summary && sec?.summary?.visible !== false && (
        <section className={spaceClass}>
          <p className="text-[11px] text-gray-800 text-center font-medium" style={{ lineHeight: lhRaw }}>{summary}</p>
        </section>
      )}

      {skills.length > 0 && sec?.skills?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[13.5px] font-bold uppercase tracking-wider mb-3 text-gray-900" style={{ color: accent }}>{sec?.skills?.title || "Core Competencies"}</h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {skills.map((s) => (
              <div key={s.id}>
                <h3 className="text-[11px] font-bold text-gray-900 mb-1">{s.name}</h3>
                <p className="text-[9.5px] text-gray-600" style={{ lineHeight: lhRaw }}>Demonstrated proficiency in {s.name.toLowerCase()} utilized to drive results, optimize processes, and deliver high-impact solutions. {s.level ? `Evaluated as ${s.level} level.` : ""}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && sec?.projects?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[13.5px] font-bold uppercase tracking-wider mb-3 text-gray-900" style={{ color: accent }}>{sec?.projects?.title || "Selected Achievements"}</h2>
          <div className="space-y-4">
            {projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="text-[11.5px] font-bold text-gray-900">{proj.name}</h3>
                <p className="text-[10px] text-gray-700 mt-1 whitespace-pre-line" style={{ lineHeight: lhRaw }}>{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {experience.length > 0 && sec?.experience?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[13.5px] font-bold uppercase tracking-wider mb-2 text-gray-900" style={{ color: accent }}>{sec?.experience?.title || "Work History"}</h2>
          <div className="space-y-1">
            {experience.map((exp) => (
              <div key={exp.id} className="flex justify-between items-center text-[10.5px]">
                <div>
                  <span className="font-bold">{exp.role}</span>, <span className="italic text-gray-700">{exp.company}</span>
                </div>
                <span className="text-[9px] font-bold text-gray-500 uppercase">
                  {fmt(exp.startDate)}{exp.startDate || exp.endDate ? " - " : ""}{exp.current ? "Present" : fmt(exp.endDate)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && sec?.education?.visible !== false && (
        <section>
          <h2 className="text-[13.5px] font-bold uppercase tracking-wider mb-2 text-gray-900" style={{ color: accent }}>{sec?.education?.title || "Education"}</h2>
          <div className="space-y-1">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-center text-[10.5px]">
                <div>
                  <span className="font-bold">{edu.degree}{edu.field ? `, ${edu.field}` : ""}</span>, <span className="italic text-gray-700">{edu.institution}</span>
                </div>
                <span className="text-[9px] font-bold text-gray-500 uppercase">
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
