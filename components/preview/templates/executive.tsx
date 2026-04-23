import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Link2, GitBranch, Globe } from "lucide-react";

interface Props { data: ResumeData }

function fmt(d: string) {
  if (!d) return "";
  try { return new Date(d + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric" }); }
  catch { return d; }
}

export function ExecutiveTemplate({ data }: Props) {
  const { personalInfo: p, summary, experience, education, skills, projects, certifications, languages, settings } = data;
  const accent = "#1e293b"; // deep slate — no user color, executive is always classic

  const adv = settings?.advanced;
  const sec = adv?.sections;
  const doc = adv?.document;

  const fsScale = doc?.fontSize === "small" ? 0.9 : doc?.fontSize === "large" ? 1.1 : 1;
  const lhRaw = doc?.lineHeight === "tight" ? 1.4 : doc?.lineHeight === "relaxed" ? 1.8 : 1.6;
  const marginClass = doc?.margin === "compact" ? "px-8 py-8" : doc?.margin === "spacious" ? "px-14 py-12" : "px-10 py-10";
  const spaceClass = doc?.margin === "compact" ? "mb-5" : doc?.margin === "spacious" ? "mb-9" : "mb-7";

  return (
    <main
      className="bg-white text-[#1e293b]"
      style={{
        fontFamily: "'Times New Roman', 'Georgia', serif",
        fontSize: `${fsScale}rem`,
      }}
    >

      {/* Two-tone header */}
      <header style={{ background: accent }} className="px-10 pt-8 pb-6">
        <div className="flex justify-between items-start gap-6">
          <div className="flex-1">
            <h1 className="text-[32px] font-extrabold tracking-widest text-white uppercase leading-none">
              {p.fullName || "Your Name"}
            </h1>
            {p.headline && (
              <p className="text-[13px] font-bold tracking-[0.2em] uppercase mt-2 text-white/70">
                {p.headline}
              </p>
            )}
            <address
              className="not-italic mt-3 pt-3 flex flex-wrap gap-x-5 gap-y-1"
              style={{ borderTop: "1px solid rgba(255,255,255,0.15)", fontFamily: "Arial, sans-serif" }}
            >
              {p.email && <span className="flex items-center gap-1.5 text-[10.5px] text-white/80"><Mail className="h-3 w-3" />{p.email}</span>}
              {p.phone && <span className="flex items-center gap-1.5 text-[10.5px] text-white/80"><Phone className="h-3 w-3" />{p.phone}</span>}
              {p.location && <span className="flex items-center gap-1.5 text-[10.5px] text-white/80"><MapPin className="h-3 w-3" />{p.location}</span>}
              {p.linkedin && <span className="flex items-center gap-1.5 text-[10.5px] text-white/80"><Link2 className="h-3 w-3" />{p.linkedin}</span>}
              {p.github && <span className="flex items-center gap-1.5 text-[10.5px] text-white/80"><GitBranch className="h-3 w-3" />{p.github}</span>}
              {p.portfolio && <span className="flex items-center gap-1.5 text-[10.5px] text-white/80"><Globe className="h-3 w-3" />{p.portfolio}</span>}
            </address>
          </div>
          {p.photoUrl && (
            <div className="w-[100px] h-[100px] border border-white/20 shadow-md flex-shrink-0 bg-[#0f172a] p-1.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.photoUrl} alt="Executive Avatar" className="w-full h-full object-cover grayscale opacity-90 mix-blend-screen" />
            </div>
          )}
        </div>
      </header>

      {/* Body */}
      <div className={`${marginClass} space-y-5`} style={{ fontFamily: "Arial, sans-serif" }}>

        {summary && sec?.summary?.visible !== false && (
          <section className={spaceClass}>
            <h2 className="text-[11px] uppercase tracking-[0.25em] font-extrabold text-[#64748b] border-b border-[#e2e8f0] pb-1.5 mb-3">{sec?.summary?.title || "Executive Summary"}</h2>
            <p className="text-[12px] text-[#374151]" style={{ lineHeight: lhRaw }}>{summary}</p>
          </section>
        )}

        {experience.length > 0 && sec?.experience?.visible !== false && (
          <section className={spaceClass}>
            <h2 className="text-[11px] uppercase tracking-[0.25em] font-extrabold text-[#64748b] border-b border-[#e2e8f0] pb-1.5 mb-4">{sec?.experience?.title || "Professional Experience"}</h2>
            <ul className="space-y-6">
              {experience.map((exp) => (
                <li key={exp.id}>
                  <div className="flex justify-between items-start mb-0.5">
                    <div>
                      <h3 className="text-[13.5px] font-extrabold text-[#0f172a] uppercase tracking-wide">{exp.role}</h3>
                      <p className="text-[12px] font-semibold text-[#475569] italic mt-0.5">{exp.company}</p>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#94a3b8] whitespace-nowrap text-right ml-2 mt-0.5">
                      {fmt(exp.startDate)}{exp.startDate || exp.endDate ? " – " : ""}{exp.current ? "Present" : fmt(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-[11.5px] text-[#4b5563] mt-2 whitespace-pre-line" style={{ lineHeight: lhRaw }}>{exp.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {education.length > 0 && sec?.education?.visible !== false && (
          <section className={spaceClass}>
            <h2 className="text-[11px] uppercase tracking-[0.25em] font-extrabold text-[#64748b] border-b border-[#e2e8f0] pb-1.5 mb-4">{sec?.education?.title || "Education"}</h2>
            <ul className="space-y-3">
              {education.map((edu) => (
                <li key={edu.id} className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-[13px] font-extrabold text-[#0f172a] tracking-wide">{edu.institution}</h3>
                    <p className="text-[11.5px] text-[#475569] italic mt-0.5">{edu.degree}{edu.field ? `, ${edu.field}` : ""}</p>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#94a3b8] whitespace-nowrap text-right ml-2 mt-0.5">
                    {fmt(edu.startDate)}{edu.startDate || edu.endDate ? " – " : ""}{edu.current ? "Present" : fmt(edu.endDate)}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {skills.length > 0 && sec?.skills?.visible !== false && (
          <section className={spaceClass}>
            <h2 className="text-[11px] uppercase tracking-[0.25em] font-extrabold text-[#64748b] border-b border-[#e2e8f0] pb-1.5 mb-4">{sec?.skills?.title || "Core Competencies"}</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-1.5">
              {skills.map((s) => (
                <li key={s.id} className="flex items-center gap-2 text-[11.5px] font-semibold text-[#374151]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#64748b] flex-shrink-0" />
                  {s.name}
                </li>
              ))}
            </ul>
          </section>
        )}

        {projects.length > 0 && sec?.projects?.visible !== false && (
          <section className={spaceClass}>
            <h2 className="text-[11px] uppercase tracking-[0.25em] font-extrabold text-[#64748b] border-b border-[#e2e8f0] pb-1.5 mb-4">{sec?.projects?.title || "Projects"}</h2>
            <ul className="space-y-3">
              {projects.map((proj) => (
                <li key={proj.id}>
                  <h3 className="text-[13px] font-extrabold text-[#0f172a]">{proj.name}</h3>
                  {proj.description && <p className="text-[11.5px] text-[#4b5563] mt-1" style={{ lineHeight: lhRaw }}>{proj.description}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {(certifications.length > 0 || languages.length > 0) && (
          <div className="grid grid-cols-2 gap-6">
            {certifications.length > 0 && sec?.certifications?.visible !== false && (
              <section className={spaceClass}>
                <h2 className="text-[9px] uppercase tracking-[0.22em] font-bold text-[#64748b] border-b border-[#e2e8f0] pb-1 mb-2">{sec?.certifications?.title || "Certifications"}</h2>
                {certifications.map((c) => <p key={c.id} className="text-[10px] text-[#374151] mb-1"><strong>{c.name}</strong>, {c.issuer}</p>)}
              </section>
            )}
            {languages.length > 0 && sec?.languages?.visible !== false && (
              <section className={spaceClass}>
                <h2 className="text-[9px] uppercase tracking-[0.22em] font-bold text-[#64748b] border-b border-[#e2e8f0] pb-1 mb-2">{sec?.languages?.title || "Languages"}</h2>
                {languages.map((l) => <p key={l.id} className="text-[10px] text-[#374151] mb-0.5">{l.name} <span className="text-[#94a3b8]">({l.proficiency})</span></p>)}
              </section>
            )}
          </div>
        )}

        {!summary && experience.length === 0 && education.length === 0 && (
          <div className="text-center py-12 text-[#94a3b8] text-[11px]">Fill in the editor to build your resume.</div>
        )}
      </div>
    </main>
  );
}
