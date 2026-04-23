import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Link2, GitBranch, Globe } from "lucide-react";

interface Props { data: ResumeData }

function fmt(d: string) {
  if (!d) return "";
  try { return new Date(d + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric" }); }
  catch { return d; }
}

export function CreativeTemplate({ data }: Props) {
  const { personalInfo: p, summary, experience, education, skills, projects, certifications, languages, settings } = data;
  const accent = settings?.themeColor || "#7c3aed";

  const adv = settings?.advanced;
  const sec = adv?.sections;
  const doc = adv?.document;

  const fsScale = doc?.fontSize === "small" ? 0.9 : doc?.fontSize === "large" ? 1.1 : 1;
  const lhRaw = doc?.lineHeight === "tight" ? 1.4 : doc?.lineHeight === "relaxed" ? 1.8 : 1.6;
  const marginClass = doc?.margin === "compact" ? "px-6 py-6" : doc?.margin === "spacious" ? "px-10 py-10" : "px-8 py-8";
  const spaceClass = doc?.margin === "compact" ? "mb-4" : doc?.margin === "spacious" ? "mb-8" : "mb-6";

  return (
    <main
      className="bg-white flex min-h-full"
      style={{
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
        fontSize: `${fsScale}rem`,
      }}
    >

      {/* ── Left sidebar ── */}
      <aside className="w-[32%] flex-shrink-0 min-h-full px-6 py-8 text-white" style={{ background: accent }}>

        {/* Avatar circle */}
        <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold mb-5 overflow-hidden shadow-lg border-2 border-white/20">
          {p.photoUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={p.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            (p.fullName || "?")[0]?.toUpperCase()
          )}
        </div>

        <h1 className="text-[20px] font-bold leading-tight mb-1 text-white">
          {p.fullName || "Your Name"}
        </h1>
        {p.headline && (
          <p className="text-[11px] uppercase tracking-widest text-white/60 mb-6 font-semibold">{p.headline}</p>
        )}

        {/* Contact */}
        <address className="not-italic space-y-2 mb-6 block">
          <p className="text-[10px] uppercase tracking-widest font-bold text-white/50 mb-2 block border-b border-white/20 pb-1">Contact</p>
          {p.email && <p className="flex items-center gap-2 text-[10.5px] text-white/90"><Mail className="h-3 w-3 flex-shrink-0" />{p.email}</p>}
          {p.phone && <p className="flex items-center gap-2 text-[10.5px] text-white/90"><Phone className="h-3 w-3 flex-shrink-0" />{p.phone}</p>}
          {p.location && <p className="flex items-center gap-2 text-[10.5px] text-white/90"><MapPin className="h-3 w-3 flex-shrink-0" />{p.location}</p>}
          {p.linkedin && <p className="flex items-center gap-2 text-[10.5px] text-white/90"><Link2 className="h-3 w-3 flex-shrink-0" />{p.linkedin}</p>}
          {p.github && <p className="flex items-center gap-2 text-[10.5px] text-white/90"><GitBranch className="h-3 w-3 flex-shrink-0" />{p.github}</p>}
          {p.portfolio && <p className="flex items-center gap-2 text-[10.5px] text-white/90"><Globe className="h-3 w-3 flex-shrink-0" />{p.portfolio}</p>}
        </address>

        {/* Skills */}
        {skills.length > 0 && sec?.skills?.visible !== false && (
          <section className={spaceClass}>
            <h2 className="text-[10px] uppercase tracking-widest font-bold text-white/50 mb-2 block border-b border-white/20 pb-1">{sec?.skills?.title || "Skills"}</h2>
            <ul className="space-y-2.5">
              {skills.map((s) => (
                <li key={s.id}>
                  <div className="flex justify-between mb-1">
                    <span className="text-[11px] text-white/90 font-medium">{s.name}</span>
                    <span className="text-[9.5px] text-white/50 font-bold">{s.level || ""}</span>
                  </div>
                  <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white/90 rounded-full shadow-sm"
                      style={{
                        width: s.level === "Expert" ? "95%" : s.level === "Advanced" ? "80%" : s.level === "Intermediate" ? "60%" : "40%"
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Languages */}
        {languages.length > 0 && sec?.languages?.visible !== false && (
          <section className={spaceClass}>
            <h2 className="text-[10px] uppercase tracking-widest font-bold text-white/50 mb-2 block border-b border-white/20 pb-1">{sec?.languages?.title || "Languages"}</h2>
            <ul className="space-y-1">
              {languages.map((l) => (
                <li key={l.id} className="flex justify-between text-[11px] mb-1">
                  <span className="text-white/90 font-medium">{l.name}</span>
                  <span className="text-white/50 font-bold text-[9.5px]">{l.proficiency}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {certifications.length > 0 && sec?.certifications?.visible !== false && (
          <section>
            <h2 className="text-[10px] uppercase tracking-widest font-bold text-white/50 mb-2 block border-b border-white/20 pb-1">{sec?.certifications?.title || "Certifications"}</h2>
            <ul className="space-y-1.5">
              {certifications.map((c) => (
                <li key={c.id} className="text-[11px] text-white/90 font-medium mb-1 leading-tight">{c.name}</li>
              ))}
            </ul>
          </section>
        )}
      </aside>

      {/* ── Main content ── */}
      <div className={`flex-1 ${marginClass}`}>

        {summary && sec?.summary?.visible !== false && (
          <section className={spaceClass}>
            <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: accent }}>{sec?.summary?.title || "About Me"}</h2>
            <p className="text-[11.5px] text-[#4b5563]" style={{ lineHeight: lhRaw }}>{summary}</p>
          </section>
        )}

        {experience.length > 0 && sec?.experience?.visible !== false && (
          <section className={spaceClass}>
            <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: accent }}>{sec?.experience?.title || "Experience"}</h2>
            <ul className="space-y-6">
              {experience.map((exp) => (
                <li key={exp.id} className="relative pl-4" style={{ borderLeft: `2.5px solid ${accent}30` }}>
                  <div
                    className="absolute left-[-5.5px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-white"
                    style={{ background: accent }}
                  />
                  <div className="flex justify-between items-start mb-0.5">
                    <h3 className="text-[13px] font-bold text-[#111827]">{exp.role}</h3>
                    <span className="text-[10px] font-bold text-[#9ca3af] whitespace-nowrap ml-2 text-right uppercase tracking-wider">
                      {fmt(exp.startDate)}{exp.startDate || exp.endDate ? " – " : ""}{exp.current ? "Present" : fmt(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-[11px] font-bold mb-1.5" style={{ color: accent }}>{exp.company}</p>
                  {exp.description && (
                    <p className="text-[11px] text-[#4b5563] whitespace-pre-line" style={{ lineHeight: lhRaw }}>{exp.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {education.length > 0 && sec?.education?.visible !== false && (
          <section className={spaceClass}>
            <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: accent }}>{sec?.education?.title || "Education"}</h2>
            <ul className="space-y-3">
              {education.map((edu) => (
                <li key={edu.id} className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-[12px] font-bold text-[#111827]">{edu.institution}</h3>
                    <p className="text-[11px] text-[#4b5563] font-medium mt-0.5">{edu.degree}{edu.field ? ` — ${edu.field}` : ""}</p>
                  </div>
                  <span className="text-[10px] font-bold text-[#9ca3af] whitespace-nowrap text-right ml-2 uppercase tracking-wider">
                    {fmt(edu.startDate)}{edu.startDate || edu.endDate ? " – " : ""}{edu.current ? "Present" : fmt(edu.endDate)}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {projects.length > 0 && sec?.projects?.visible !== false && (
          <section className={spaceClass}>
            <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: accent }}>{sec?.projects?.title || "Projects"}</h2>
            <ul className="space-y-4">
              {projects.map((proj) => (
                <li key={proj.id}>
                  <h3 className="text-[12px] font-bold text-[#111827]">{proj.name}</h3>
                  {proj.technologies.length > 0 && (
                    <ul className="flex flex-wrap gap-1.5 my-1.5">
                      {proj.technologies.map((t, i) => (
                        <li key={i} className="text-[9.5px] font-semibold px-2 py-0.5 rounded" style={{ background: `${accent}15`, color: accent }}>{t}</li>
                      ))}
                    </ul>
                  )}
                  {proj.description && <p className="text-[11px] text-[#4b5563]" style={{ lineHeight: lhRaw }}>{proj.description}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {!summary && experience.length === 0 && education.length === 0 && (
          <div className="flex items-center justify-center h-40 text-[#d1d5db] text-[11px]">
            Fill in the editor to see your resume here.
          </div>
        )}
      </div>
    </main>
  );
}
