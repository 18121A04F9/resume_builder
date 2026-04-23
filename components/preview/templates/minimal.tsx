import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Link2, GitBranch, Globe } from "lucide-react";

interface Props { data: ResumeData }

function fmt(d: string) {
  if (!d) return "";
  try { return new Date(d + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric" }); }
  catch { return d; }
}

export function MinimalTemplate({ data }: Props) {
  const { personalInfo: p, summary, experience, education, skills, projects, certifications, languages, settings } = data;

  const adv = settings?.advanced;
  const sec = adv?.sections;
  const doc = adv?.document;

  const fsScale = doc?.fontSize === "small" ? 0.9 : doc?.fontSize === "large" ? 1.1 : 1;
  const lhRaw = doc?.lineHeight === "tight" ? 1.5 : doc?.lineHeight === "relaxed" ? 1.9 : 1.7;
  const marginClass = doc?.margin === "compact" ? "px-10 py-8" : doc?.margin === "spacious" ? "px-16 py-14" : "px-12 py-12";
  const spaceClass = doc?.margin === "compact" ? "mb-5" : doc?.margin === "spacious" ? "mb-10" : "mb-7";

  return (
    <main
      className={`bg-white text-[#1a1a1a] min-h-full ${marginClass}`}
      style={{
        fontFamily: "'Georgia', serif",
        fontSize: `${fsScale}rem`,
      }}
    >

      {/* Header */}
      <header className="text-center border-b-[2px] border-[#1a1a1a] pb-4 mb-5">
        {p.photoUrl && (
          <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.photoUrl} alt="Avatar" className="w-full h-full object-cover grayscale" />
          </div>
        )}
        <h1 className="text-[32px] font-extrabold tracking-[0.05em] uppercase text-[#111]">
          {p.fullName || "Your Name"}
        </h1>
        {p.headline && (
          <p className="text-[13px] tracking-[0.1em] font-semibold uppercase text-[#555] mt-1">{p.headline}</p>
        )}
        <address className="not-italic flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-2.5" style={{ fontFamily: "sans-serif" }}>
          {[
            p.email && <><Mail className="h-3 w-3" />{p.email}</>,
            p.phone && <><Phone className="h-3 w-3" />{p.phone}</>,
            p.location && <><MapPin className="h-3 w-3" />{p.location}</>,
            p.linkedin && <><Link2 className="h-3 w-3" />{p.linkedin}</>,
            p.github && <><GitBranch className="h-3 w-3" />{p.github}</>,
            p.portfolio && <><Globe className="h-3 w-3" />{p.portfolio}</>,
          ].filter(Boolean).map((item, i) => (
            <span key={i} className="flex items-center gap-1.5 text-[11px] font-medium text-[#555]">{item}</span>
          ))}
        </address>
      </header>

      {/* Summary */}
      {summary && sec?.summary?.visible !== false && (
        <section className={spaceClass}>
          {sec?.summary?.title && <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#333] border-b border-[#333] pb-1.5 mb-4">{sec.summary.title}</h2>}
          <p className="text-[12.5px] text-[#222] font-medium" style={{ lineHeight: lhRaw }}>{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && sec?.experience?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#333] border-b border-[#333] pb-1.5 mb-4">{sec?.experience?.title || "Experience"}</h2>
          <ul className="space-y-6">
            {experience.map((exp) => (
              <li key={exp.id} className="grid grid-cols-[1fr_auto] gap-4">
                <div>
                  <h3 className="text-[14px] font-bold text-[#111]">{exp.role}</h3>
                  <p className="text-[12.5px] font-semibold text-[#444] mt-0.5">{exp.company}</p>
                  {exp.description && (
                    <p className="text-[12px] text-[#333] mt-2 whitespace-pre-line" style={{ lineHeight: lhRaw }}>{exp.description}</p>
                  )}
                </div>
                <span className="text-[10.5px] font-bold text-[#666] whitespace-nowrap text-right mt-1 uppercase tracking-widest">
                  {fmt(exp.startDate)}{exp.startDate || exp.endDate ? " – " : ""}{exp.current ? "Present" : fmt(exp.endDate)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && sec?.education?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#333] border-b border-[#333] pb-1.5 mb-4">{sec?.education?.title || "Education"}</h2>
          <ul className="space-y-4">
            {education.map((edu) => (
              <li key={edu.id} className="grid grid-cols-[1fr_auto] gap-4">
                <div>
                  <h3 className="text-[13px] font-bold text-[#111]">{edu.institution}</h3>
                  <p className="text-[12px] font-semibold text-[#444] mt-1">{edu.degree}{edu.field ? `, ${edu.field}` : ""}</p>
                </div>
                <span className="text-[10.5px] font-bold text-[#666] whitespace-nowrap text-right mt-1 uppercase tracking-widest">
                  {fmt(edu.startDate)}{edu.startDate || edu.endDate ? " – " : ""}{edu.current ? "Present" : fmt(edu.endDate)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && sec?.skills?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#333] border-b border-[#333] pb-1.5 mb-4">{sec?.skills?.title || "Skills"}</h2>
          <div className="flex flex-wrap gap-x-2 gap-y-1.5" style={{ fontFamily: "sans-serif" }}>
            {skills.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2">
                <span className="text-[12px] font-bold text-[#222]">{s.name}</span>
                {i < skills.length - 1 && <span className="text-[#999] text-[18px] leading-none mb-1">·</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && sec?.projects?.visible !== false && (
        <section className={spaceClass}>
          <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#333] border-b border-[#333] pb-1.5 mb-4">{sec?.projects?.title || "Projects"}</h2>
          <ul className="space-y-4">
            {projects.map((proj) => (
              <li key={proj.id}>
                <h3 className="text-[13px] font-bold text-[#111]">
                  {proj.name}
                  {proj.technologies.length > 0 && (
                    <span className="font-normal italic text-[#666]"> — {proj.technologies.join(", ")}</span>
                  )}
                </h3>
                {proj.description && <p className="text-[12px] text-[#333] mt-1 whitespace-pre-line" style={{ lineHeight: lhRaw }}>{proj.description}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {(certifications.length > 0 || languages.length > 0) && (
        <div className="grid grid-cols-2 gap-8">
          {certifications.length > 0 && sec?.certifications?.visible !== false && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#333] border-b border-[#333] pb-1.5 mb-4">{sec?.certifications?.title || "Certifications"}</h2>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="text-[12.5px] font-bold text-[#111]">{cert.name}</p>
                    <p className="text-[11.5px] italic text-[#666]">{cert.issuer}{cert.date ? `, ${fmt(cert.date)}` : ""}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          {languages.length > 0 && sec?.languages?.visible !== false && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#333] border-b border-[#333] pb-1.5 mb-4">{sec?.languages?.title || "Languages"}</h2>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between text-[12px] font-semibold">
                    <span className="text-[#111]">{lang.name}</span>
                    <span className="italic text-[#666]">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {!summary && experience.length === 0 && education.length === 0 && skills.length === 0 && (
        <div className="text-center py-12 text-[#bbb] italic text-[11px]">
          Fill in the editor to see your resume here.
        </div>
      )}
    </main>
  );
}
