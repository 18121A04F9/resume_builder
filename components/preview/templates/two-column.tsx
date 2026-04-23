import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Link2, GitBranch, Globe } from "lucide-react";

interface Props { data: ResumeData }

function fmt(d: string) {
  if (!d) return "";
  try { return new Date(d + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric" }); }
  catch { return d; }
}

export function TwoColumnTemplate({ data }: Props) {
  const { personalInfo: p, summary, experience, education, skills, projects, certifications, languages, settings } = data;

  const accent = settings?.themeColor || "#0ea5e9";
  const adv = settings?.advanced;
  const sec = adv?.sections;
  const doc = adv?.document;

  const fsScale = doc?.fontSize === "small" ? 0.9 : doc?.fontSize === "large" ? 1.1 : 1;
  const lhRaw = doc?.lineHeight === "tight" ? 1.4 : doc?.lineHeight === "relaxed" ? 1.8 : 1.6;
  const marginClass = doc?.margin === "compact" ? "px-8 py-8" : doc?.margin === "spacious" ? "px-12 py-12" : "px-10 py-10";
  const spaceClass = doc?.margin === "compact" ? "mb-5" : doc?.margin === "spacious" ? "mb-9" : "mb-7";

  return (
    <main
      className="bg-white flex min-h-full font-sans text-[#1a1a1a]"
      style={{
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
        fontSize: `${fsScale}rem`,
      }}
    >
      {/* ── Sidebar ── */}
      <aside className={`w-[30%] flex-shrink-0 bg-muted/30 border-r border-border text-[#1a1a1a] ${marginClass}`}>
        
        {p.photoUrl && (
          <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-sm mb-6 bg-white/50 p-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.photoUrl} alt="Avatar" className="w-full h-full object-cover rounded-[14px]" />
          </div>
        )}

        <h1 className="text-[24px] font-bold leading-tight mb-1 text-[#111]">
          {p.fullName || "Your Name"}
        </h1>
        {p.headline && (
          <p className="text-[12.5px] font-semibold mb-6" style={{ color: accent }}>{p.headline}</p>
        )}

        <address className="not-italic space-y-2 mb-8 text-[11px] font-medium">
          {p.email && <div className="flex items-center gap-2"><div style={{ color: accent }}><Mail className="w-3.5 h-3.5" /></div> {p.email}</div>}
          {p.phone && <div className="flex items-center gap-2"><div style={{ color: accent }}><Phone className="w-3.5 h-3.5" /></div> {p.phone}</div>}
          {p.location && <div className="flex items-center gap-2"><div style={{ color: accent }}><MapPin className="w-3.5 h-3.5" /></div> {p.location}</div>}
          {p.linkedin && <div className="flex items-center gap-2"><div style={{ color: accent }}><Link2 className="w-3.5 h-3.5" /></div> {p.linkedin}</div>}
          {p.github && <div className="flex items-center gap-2"><div style={{ color: accent }}><GitBranch className="w-3.5 h-3.5" /></div> {p.github}</div>}
          {p.portfolio && <div className="flex items-center gap-2"><div style={{ color: accent }}><Globe className="w-3.5 h-3.5" /></div> {p.portfolio}</div>}
        </address>

        {skills.length > 0 && sec?.skills?.visible !== false && (
          <section className="mb-8">
            <h2 className="text-[10px] uppercase font-bold tracking-widest mb-3 text-[#111]">{sec?.skills?.title || "Skills"}</h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span
                  key={s.id}
                  className="px-2 py-1 text-[9px] font-medium rounded-md"
                  style={{ background: `${accent}15`, color: accent }}
                >
                  {s.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {languages.length > 0 && sec?.languages?.visible !== false && (
          <section className="mb-8">
            <h2 className="text-[10px] uppercase font-bold tracking-widest mb-3 text-[#111]">{sec?.languages?.title || "Languages"}</h2>
            <ul className="space-y-1.5">
              {languages.map((l) => (
                <li key={l.id} className="flex justify-between text-[9.5px]">
                  <span className="font-semibold text-[#333]">{l.name}</span>
                  <span className="text-[#666]">{l.proficiency}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

      </aside>

      {/* ── Main Content ── */}
      <div className={`flex-1 ${marginClass}`}>
        
        {summary && sec?.summary?.visible !== false && (
          <section className={spaceClass}>
            <h2 className="text-[14px] font-bold uppercase tracking-widest border-b-[2.5px] border-[#111] pb-1.5 mb-3">{sec?.summary?.title || "Profile"}</h2>
            <p className="text-[12px] text-[#444] font-medium" style={{ lineHeight: lhRaw }}>{summary}</p>
          </section>
        )}

        {experience.length > 0 && sec?.experience?.visible !== false && (
          <section className={spaceClass}>
            <h2 className="text-[14px] font-bold uppercase tracking-widest border-b-[2.5px] border-[#111] pb-1.5 mb-5">{sec?.experience?.title || "Experience"}</h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-4" style={{ borderLeft: `2.5px solid ${accent}40` }}>
                  {/* Timeline Node */}
                  <div className="absolute left-[-5.5px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-white" style={{ background: accent }} />
                  
                  <div className="flex justify-between items-start">
                    <h3 className="text-[13.5px] font-bold text-[#111]">{exp.role}</h3>
                    <span className="text-[11px] font-bold text-white px-2.5 py-0.5 rounded-full whitespace-nowrap ml-2 uppercase tracking-wider" style={{ background: accent }}>
                      {fmt(exp.startDate)}{exp.startDate || exp.endDate ? " – " : ""}{exp.current ? "Present" : fmt(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-[12px] font-bold text-[#555] mt-1 mb-2">{exp.company}</p>
                  {exp.description && (
                    <p className="text-[11.5px] font-medium text-[#444] whitespace-pre-line" style={{ lineHeight: lhRaw }}>{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && sec?.education?.visible !== false && (
          <section className={spaceClass}>
            <h2 className="text-[14px] font-bold uppercase tracking-widest border-b-[2.5px] border-[#111] pb-1.5 mb-5">{sec?.education?.title || "Education"}</h2>
            <div className="space-y-5">
              {education.map((edu) => (
                <div key={edu.id} className="relative pl-4" style={{ borderLeft: `2.5px solid ${accent}40` }}>
                   <div className="absolute left-[-5.5px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-white" style={{ background: accent }} />
                   <h3 className="text-[13px] font-bold text-[#111]">{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</h3>
                   <div className="flex justify-between items-start mt-1">
                     <p className="text-[11.5px] font-semibold text-[#555]">{edu.institution}</p>
                     <span className="text-[11px] font-bold text-[#888] whitespace-nowrap ml-2 uppercase tracking-wider">
                       {fmt(edu.startDate)}{edu.startDate || edu.endDate ? " – " : ""}{edu.current ? "Present" : fmt(edu.endDate)}
                     </span>
                   </div>
                   {edu.gpa && <p className="text-[11px] font-medium text-[#666] mt-0.5">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && sec?.projects?.visible !== false && (
          <section className={spaceClass}>
            <h2 className="text-[12px] font-bold uppercase tracking-widest border-b-2 border-[#111] pb-1.5 mb-4">{sec?.projects?.title || "Projects"}</h2>
            <div className="grid grid-cols-1 gap-4">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-muted/10 p-3 rounded-lg border border-border/50">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[11px] font-bold text-[#111]">{proj.name}</h3>
                    {proj.url && <a href={proj.url} className="text-[8.5px] hover:underline" style={{ color: accent }}>Live ↗</a>}
                  </div>
                  {proj.technologies.length > 0 && (
                    <p className="text-[9px] text-[#666] mb-1.5 italic font-medium">{proj.technologies.join(" • ")}</p>
                  )}
                  {proj.description && (
                    <p className="text-[10px] text-[#444]" style={{ lineHeight: lhRaw }}>{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {certifications.length > 0 && sec?.certifications?.visible !== false && (
          <section>
            <h2 className="text-[12px] font-bold uppercase tracking-widest border-b-2 border-[#111] pb-1.5 mb-3">{sec?.certifications?.title || "Certifications"}</h2>
            <div className="flex flex-wrap gap-4">
              {certifications.map((cert) => (
                <div key={cert.id} className="min-w-[45%]">
                  <p className="text-[10px] font-bold text-[#222]">{cert.name}</p>
                  <p className="text-[9.5px] text-[#666]">{cert.issuer}{cert.date ? ` (${fmt(cert.date)})` : ""}</p>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
