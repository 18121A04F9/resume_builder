import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Link2, GitBranch, Globe } from "lucide-react";

interface Props { data: ResumeData }

function formatDate(d: string) {
  if (!d) return "";
  try {
    return new Date(d + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric" });
  } catch { return d; }
}

function getSkillLevel(level?: string) {
  if (level === "Expert") return 5;
  if (level === "Advanced") return 4;
  if (level === "Intermediate") return 3;
  if (level === "Beginner") return 2;
  return 0; // fallback or 0 if none
}

function SectionHeading({ title, color }: { title: string; color: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <h2 className="text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color }}>{title}</h2>
      <div className="flex-1 h-px" style={{ background: color, opacity: 0.25 }} />
    </div>
  );
}

export function ModernTemplate({ data }: Props) {
  const { personalInfo: p, summary, experience, education, skills, projects, certifications, languages, settings } = data;
  const accent = settings?.themeColor || "#6366f1";

  const adv = settings?.advanced;
  const sec = adv?.sections;
  const doc = adv?.document;

  const fsScale = doc?.fontSize === "small" ? 0.9 : doc?.fontSize === "large" ? 1.1 : 1;
  const lhRaw = doc?.lineHeight === "tight" ? 1.4 : doc?.lineHeight === "relaxed" ? 1.8 : 1.6;
  const marginClass = doc?.margin === "compact" ? "py-4 px-6" : doc?.margin === "spacious" ? "py-10 px-14" : "py-6 px-10";
  const headerClass = doc?.margin === "compact" ? "pt-5 pb-4 px-6" : doc?.margin === "spacious" ? "pt-10 pb-8 px-14" : "pt-8 pb-6 px-10";

  return (
    <main
      className="font-sans text-[#1a1a1a] bg-white min-h-full"
      style={{
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
        fontSize: `${fsScale}rem`,
      }}
    >
      {/* ── Header ── */}
      <header className={headerClass} style={{ background: `linear-gradient(135deg, ${accent} 0%, ${accent}cc 100%)` }}>
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-[26px] font-bold text-white tracking-tight leading-tight">
              {p.fullName || <span className="opacity-40">Your Name</span>}
            </h1>
            {p.headline && (
              <p className="text-[12px] font-medium mt-0.5" style={{ color: "rgba(255,255,255,0.80)" }}>
                {p.headline}
              </p>
            )}

            {/* Contact row */}
            <address className="not-italic flex flex-wrap items-center gap-x-4 gap-y-1 mt-3">
              {p.email && (
                <span className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.9)" }}>
                  <Mail className="h-3 w-3 flex-shrink-0" />{p.email}
                </span>
              )}
              {p.phone && (
                <span className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.9)" }}>
                  <Phone className="h-3 w-3 flex-shrink-0" />{p.phone}
                </span>
              )}
              {p.location && (
                <span className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.9)" }}>
                  <MapPin className="h-3 w-3 flex-shrink-0" />{p.location}
                </span>
              )}
              {p.linkedin && (
                <span className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.9)" }}>
                  <Link2 className="h-3 w-3 flex-shrink-0" />{p.linkedin}
                </span>
              )}
              {p.github && (
                <span className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.9)" }}>
                  <GitBranch className="h-3 w-3 flex-shrink-0" />{p.github}
                </span>
              )}
              {p.portfolio && (
                <span className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.9)" }}>
                  <Globe className="h-3 w-3 flex-shrink-0" />{p.portfolio}
                </span>
              )}
            </address>
          </div>
          {p.photoUrl && (
            <div className="w-[72px] h-[72px] rounded-full overflow-hidden border-2 border-white/30 flex-shrink-0 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.photoUrl} alt="Profile Avatar" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </header>

      {/* ── Body ── */}
      <div className={`space-y-5 ${marginClass}`}>

        {/* Summary */}
        {summary && sec?.summary?.visible !== false && (
          <section>
            <SectionHeading title={sec?.summary?.title || "Professional Summary"} color={accent} />
            <p className="text-[12.5px] font-medium text-[#444]" style={{ lineHeight: lhRaw }}>{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && sec?.experience?.visible !== false && (
          <section>
            <SectionHeading title={sec?.experience?.title || "Work Experience"} color={accent} />
            <ul className="space-y-6">
              {experience.map((exp) => (
                <li key={exp.id} className="relative pl-5" style={{ borderLeft: `2.5px solid ${accent}40` }}>
                  {/* Timeline dot */}
                  <div className="absolute left-[-6px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-white" style={{ background: accent }} />
                  
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <h3 className="text-[13px] font-bold text-[#111]">{exp.role || "Job Title"}</h3>
                      <p className="text-[11.5px] font-bold mt-0.5" style={{ color: accent }}>{exp.company}</p>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#888] whitespace-nowrap flex-shrink-0 mt-0.5 text-right">
                      {formatDate(exp.startDate)}{exp.startDate || exp.endDate ? " – " : ""}{exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-[11.5px] font-medium text-[#555] mt-2 whitespace-pre-line" style={{ lineHeight: lhRaw }}>{exp.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && sec?.education?.visible !== false && (
          <section>
            <SectionHeading title={sec?.education?.title || "Education"} color={accent} />
            <ul className="space-y-5">
              {education.map((edu) => (
                <li key={edu.id} className="relative pl-5" style={{ borderLeft: `2.5px solid ${accent}40` }}>
                  <div className="absolute left-[-6px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-white" style={{ background: accent }} />
                  
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-[13px] font-bold text-[#111]">{edu.institution}</h3>
                      <p className="text-[11.5px] font-medium text-[#555] mt-1">
                        {edu.degree}{edu.field ? ` — ${edu.field}` : ""}{edu.gpa ? ` · GPA: ${edu.gpa}` : ""}
                      </p>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#888] whitespace-nowrap flex-shrink-0 mt-0.5 text-right">
                      {formatDate(edu.startDate)}{edu.startDate || edu.endDate ? " – " : ""}{edu.current ? "Present" : formatDate(edu.endDate)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && sec?.skills?.visible !== false && (
          <section>
            <SectionHeading title={sec?.skills?.title || "Skills"} color={accent} />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
              {skills.map((skill) => {
                const lvl = getSkillLevel(skill.level);
                return (
                  <div key={skill.id} className="flex justify-between items-center border-b border-gray-100 pb-1">
                    <span className="text-[11.5px] font-bold text-[#333]">{skill.name}</span>
                    {lvl > 0 && (
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: i < lvl ? accent : `${accent}30` }} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && sec?.projects?.visible !== false && (
          <section>
            <SectionHeading title={sec?.projects?.title || "Projects"} color={accent} />
            <div className="space-y-5">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-center gap-3">
                    <h3 className="text-[13px] font-bold text-[#111]">{proj.name}</h3>
                    {proj.url && <a href={proj.url} className="text-[10px] uppercase font-bold hover:underline" style={{ color: accent }}>↗ Live</a>}
                    {proj.github && <a href={proj.github} className="text-[10px] uppercase font-bold hover:underline" style={{ color: accent }}>↗ Git</a>}
                  </div>
                  {proj.technologies.length > 0 && (
                    <p className="text-[11px] font-bold mt-1" style={{ color: accent }}>
                      {proj.technologies.join(" · ")}
                    </p>
                  )}
                  {proj.description && (
                    <p className="text-[11.5px] font-medium text-[#555] mt-1.5 whitespace-pre-line" style={{ lineHeight: lhRaw }}>{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications + Languages side by side */}
        {(certifications.length > 0 || languages.length > 0) && (
          <div className="grid grid-cols-2 gap-6">
            {certifications.length > 0 && sec?.certifications?.visible !== false && (
              <section>
                <SectionHeading title={sec?.certifications?.title || "Certifications"} color={accent} />
                <div className="space-y-2">
                  {certifications.map((cert) => (
                    <div key={cert.id}>
                      <p className="text-[10px] font-semibold text-[#222]">{cert.name}</p>
                      <p className="text-[9.5px] text-[#777]">{cert.issuer}{cert.date ? ` · ${formatDate(cert.date)}` : ""}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {languages.length > 0 && sec?.languages?.visible !== false && (
              <section>
                <SectionHeading title={sec?.languages?.title || "Languages"} color={accent} />
                <div className="space-y-1.5">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between items-center">
                      <span className="text-[10px] font-medium text-[#222]">{lang.name}</span>
                      <span className="text-[9.5px] text-[#777]">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* Empty state prompt */}
        {!summary && experience.length === 0 && education.length === 0 && skills.length === 0 && (
          <div className="text-center py-12 text-[#bbb]">
            <p className="text-[11px]">Start filling in the form on the left to see your resume here.</p>
          </div>
        )}
      </div>
    </main>
  );
}
