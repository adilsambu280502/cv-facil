import React from "react";
import { Answers } from "../../types";
import { TransformResult } from "../../types";

interface Props {
  answers: Answers;
  result: TransformResult;
  hasPaid: boolean;
  cvRef?: React.RefObject<HTMLDivElement>;
}

export const ProfessionalCVWeb: React.FC<Props> = ({ answers, result }) => {
  const isEntryLevel = result.layoutStrategy?.profileType === "entry_level";
  const hasExperience = result.transformedExperience?.length > 0;
  const hasProjects = result.projects?.length > 0;
  const hasLanguages = result.languages?.length > 0;

  const nameParts = answers.name?.trim().split(/\s+/) || [];
  const firstName = nameParts[0] || "";
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

  if (answers.template === "executive") {
    return (
      <div
        className="w-full bg-white text-[#1a1a1a] p-10 rounded-[32px] shadow-sm border border-slate-100"
        style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "10pt", lineHeight: "1.5" }}
      >
        {/* ── HEADER ─────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-8 pb-5 mb-6 border-b border-slate-100">
          {/* Nome e Título */}
          <div className="flex-1">
            <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "26pt", fontWeight: 300, letterSpacing: "0.1em", lineHeight: 1.1, color: "#1a1a1a", textTransform: "uppercase" }}>
              {firstName}
            </div>
            <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "26pt", fontWeight: 900, letterSpacing: "0.1em", lineHeight: 1.1, color: "#1a1a1a", textTransform: "uppercase" }}>
              {lastName}
            </div>
            <div className="mt-3 text-slate-500 font-black tracking-[0.2em] text-[8pt] uppercase">
              {result.title}
            </div>
            <div className="mt-2 w-12 h-[2px] bg-[#1a1a1a]" />
          </div>

          {/* Contactos Shaded Box */}
          <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-4 text-right max-w-xs shrink-0" style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "8.5pt", color: "#333" }}>
            {answers.phone && (
              <div className="mb-1"><span className="font-extrabold text-slate-400 text-[8pt] uppercase mr-1">Tlf:</span> <span className="font-bold text-slate-800">{answers.phone}</span></div>
            )}
            {answers.email && (
              <div className="mb-1"><span className="font-extrabold text-slate-400 text-[8pt] uppercase mr-1">Email:</span> <span className="font-bold text-slate-800 break-all">{answers.email}</span></div>
            )}
            {answers.linkedin && (
              <div className="mb-1"><span className="font-extrabold text-slate-400 text-[8pt] uppercase mr-1">In:</span> <span className="font-bold text-slate-800">{answers.linkedin.replace(/https?:\/\/(www\.)?linkedin\.com\/in\//, "")}</span></div>
            )}
            {answers.location && (
              <div className="mt-2 bg-[#1a1a1a] text-white px-3 py-1 rounded-lg text-center" style={{ fontSize: "7.5pt" }}>
                <span className="font-bold">{answers.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* ── CORPO: 2 COLUNAS (ESPELHADO) ───────────────── */}
        <div className="flex gap-8">
          {/* ── COLUNA ESQUERDA (LARGA: 62%) ───────────────── */}
          <div className="flex-1">
            {/* Resumo Profissional */}
            {result.professionalSummary && (
              <div className="mb-6">
                <RightSectionTitle>Perfil Profissional</RightSectionTitle>
                <p className="text-[9.2pt] text-slate-600 leading-relaxed text-justify whitespace-pre-line font-medium">
                  {result.professionalSummary}
                </p>
              </div>
            )}

            {/* Experiência Profissional */}
            {hasExperience && (
              <div className="mb-6">
                <RightSectionTitle>Experiência Profissional</RightSectionTitle>
                <div className="space-y-6">
                  {result.transformedExperience.map((exp, i) => (
                    <div key={i} className="relative pl-5 border-l-2 border-slate-200">
                      {/* Indicador de Linha do Tempo */}
                      <div className="absolute -left-[6px] top-1.5 w-[10px] h-[10px] rounded-full bg-slate-400 border border-white" />
                      
                      <div className="font-extrabold text-[10pt] text-[#1a1a1a]">{exp.role}</div>
                      <div className="flex items-center gap-2 text-[8pt] text-slate-400 font-black mt-1 mb-2.5 uppercase tracking-wide">
                        <span className="text-slate-700">{exp.company}</span>
                        {exp.period && <><span>|</span><span>{exp.period}</span></>}
                      </div>
                      <div className="space-y-1.5">
                        {exp.responsibilities.map((r, j) => (
                          <div key={j} className="flex gap-2 items-start text-[8.5pt] text-slate-600 font-medium">
                            <span className="flex-shrink-0 mt-1 text-[6pt] text-slate-400">•</span>
                            <span className="leading-relaxed">{r}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── COLUNA DIREITA (ESTREITA: 38%) ──────────────── */}
          <div className="w-[38%] flex-shrink-0 border-l border-slate-100 pl-6" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
            {/* Formação Académica */}
            {result.transformedEducation?.length > 0 && (
              <div className="mb-6">
                <SectionTitle>Formação Académica</SectionTitle>
                <div className="space-y-4">
                  {result.transformedEducation.map((edu, i) => (
                    <div key={i}>
                      <div className="font-extrabold text-[8.5pt] text-[#1a1a1a] leading-snug">{edu.degree}</div>
                      <div className="text-[7.5pt] text-[#444] mt-0.5 italic">{edu.institution}</div>
                      <div className="text-[7.5pt] text-slate-400 font-bold mt-0.5">{edu.period}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Competências Principais */}
            {result.skills?.length > 0 && (
              <div className="mb-6">
                <SectionTitle>Competências Principais</SectionTitle>
                <div className="space-y-1.5">
                  {result.skills.map((skill, i) => (
                    <div key={i} className="flex gap-2 items-start text-[8pt] text-slate-600 font-bold">
                      <span className="text-slate-400 flex-shrink-0">•</span>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Idiomas */}
            {hasLanguages && (
              <div className="mb-6">
                <SectionTitle>Idiomas</SectionTitle>
                <div className="space-y-1.5">
                  {result.languages.map((lang, i) => (
                    <div key={i} className="flex gap-2 items-start text-[8pt] text-slate-600 font-bold">
                      <span className="text-slate-400 flex-shrink-0">•</span>
                      <span>{lang}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── RODAPÉ ─────────────────────────────────────── */}
        <div className="mt-8 pt-3 border-t border-[#e0e0e0] text-center" style={{ fontFamily: "system-ui, -apple-system, sans-serif", fontSize: "7pt", color: "#aaa", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          Estruturado com CV Fácil – O teu currículo premium
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full bg-white text-[#1a1a1a]"
      style={{ fontFamily: "'Times New Roman', Georgia, serif", fontSize: "10pt", lineHeight: "1.4" }}
    >
      {/* ── HEADER ─────────────────────────────────────── */}
      <div className="flex items-start gap-8 pb-4 mb-5 border-b border-[#1a1a1a]">
        {/* Nome */}
        <div className="flex-1">
          <div style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "28pt", fontWeight: 300, letterSpacing: "0.12em", lineHeight: 1.1, color: "#1a1a1a", textTransform: "uppercase" }}>
            {firstName}
          </div>
          <div style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "28pt", fontWeight: 700, letterSpacing: "0.12em", lineHeight: 1.1, color: "#1a1a1a", textTransform: "uppercase" }}>
            {lastName}
          </div>
          <div className="mt-3" style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "8pt", letterSpacing: "0.25em", color: "#444", textTransform: "uppercase" }}>
            {result.title}
          </div>
          <div className="mt-1 w-8 h-[2px] bg-[#1a1a1a]" />
        </div>

        {/* Contactos */}
        <div className="text-right" style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "8.5pt", color: "#333" }}>
          {answers.phone && (
            <div className="mb-1"><span className="font-bold">Contacto:</span> {answers.phone}</div>
          )}
          {answers.email && (
            <div className="mb-1"><span className="font-bold">E-mail:</span> {answers.email}</div>
          )}
          {answers.linkedin && (
            <div className="mb-1"><span className="font-bold">Linkedin:</span> {answers.linkedin}</div>
          )}
          {answers.github && (
            <div className="mb-1"><span className="font-bold">GitHub:</span> {answers.github}</div>
          )}
          {answers.website && (
            <div className="mb-1"><span className="font-bold">Portfólio:</span> {answers.website}</div>
          )}
          {answers.location && (
            <div className="mt-3 bg-[#1a1a1a] text-white px-4 py-1.5" style={{ fontSize: "8pt" }}>
              <span className="font-bold">Endereço:</span> {answers.location}
            </div>
          )}
        </div>
      </div>

      {/* ── CORPO: 2 COLUNAS ───────────────────────────── */}
      <div className="flex gap-8">
        {/* ── COLUNA ESQUERDA ──────────────────────────── */}
        <div className="w-[34%] flex-shrink-0" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>

          {/* Formação Académica */}
          {result.transformedEducation?.length > 0 && (
            <div className="mb-6">
              <SectionTitle>Formação<br />Académica</SectionTitle>
              <div className="space-y-4">
                {result.transformedEducation.map((edu, i) => (
                  <div key={i}>
                    <div className="font-bold text-[8.5pt] text-[#1a1a1a] leading-snug">{edu.degree}</div>
                    <div className="text-[7.5pt] text-[#444] mt-0.5 italic">{edu.institution}</div>
                    <div className="text-[7.5pt] text-[#666] mt-0.5">{edu.period}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Competências e Softwares */}
          {result.skills?.length > 0 && (
            <div className="mb-6">
              <SectionTitle>Competências<br />e Softwares</SectionTitle>
              <div className="space-y-1.5">
                {result.skills.map((skill, i) => (
                  <div key={i} className="flex gap-2 items-start text-[8pt] text-[#333]">
                    <span className="text-[#1a1a1a] mt-0.5 flex-shrink-0">–</span>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ideias / Projetos (só entry_level) */}
          {isEntryLevel && hasProjects && (
            <div className="mb-6">
              <SectionTitle>Ideias<br />Desenvolvidas</SectionTitle>
              <div className="space-y-3">
                {result.projects.map((proj, i) => (
                  <div key={i} className="text-[8pt] text-[#333]">
                    <span className="font-bold text-[#1a1a1a] uppercase">{proj.name}</span>
                    {" – "}
                    <span>{proj.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Idiomas */}
          {hasLanguages && (
            <div className="mb-6">
              <SectionTitle>Idioma</SectionTitle>
              <div className="space-y-1">
                {result.languages.map((lang, i) => (
                  <div key={i} className="text-[8.5pt] text-[#333] font-medium">{lang}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── COLUNA DIREITA ───────────────────────────── */}
        <div className="flex-1" style={{ fontFamily: "'Times New Roman', Georgia, serif" }}>

          {/* Resumo Profissional */}
          {result.professionalSummary && (
            <div className="mb-6">
              <RightSectionTitle>Resumo Profissional</RightSectionTitle>
              <p className="text-[8.5pt] text-[#333] leading-relaxed text-justify">
                {result.professionalSummary}
              </p>
            </div>
          )}

          {/* Experiência Profissional (experienced/operational) */}
          {!isEntryLevel && hasExperience && (
            <div className="mb-6">
              <RightSectionTitle>Experiência Profissional</RightSectionTitle>
              <div className="space-y-5">
                {result.transformedExperience.map((exp, i) => (
                  <div key={i}>
                    <div className="font-bold text-[9pt] text-[#1a1a1a]">{exp.role}</div>
                    <div className="flex items-center gap-2 text-[7.5pt] text-[#555] mt-0.5 mb-2">
                      <span className="uppercase font-semibold tracking-wide">{exp.company}</span>
                      {exp.period && <><span>|</span><span>{exp.period}</span></>}
                    </div>
                    <div className="space-y-1">
                      {exp.responsibilities.map((r, j) => (
                        <div key={j} className="flex gap-2 items-start text-[8pt] text-[#333]">
                          <span className="flex-shrink-0 mt-0.5">•</span>
                          <span className="leading-snug">{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actividade Prática (entry_level — valoriza projectos e experiências informais) */}
          {isEntryLevel && hasExperience && (
            <div className="mb-6">
              <RightSectionTitle>Actividade e Experiência Prática</RightSectionTitle>
              <div className="space-y-5">
                {result.transformedExperience.map((exp, i) => (
                  <div key={i}>
                    <div className="font-bold text-[9pt] text-[#1a1a1a]">{exp.role}</div>
                    <div className="flex items-center gap-2 text-[7.5pt] text-[#555] mt-0.5 mb-2">
                      <span className="uppercase font-semibold tracking-wide">{exp.company}</span>
                      {exp.period && <><span>|</span><span>{exp.period}</span></>}
                    </div>
                    <div className="space-y-1">
                      {exp.responsibilities.map((r, j) => (
                        <div key={j} className="flex gap-2 items-start text-[8pt] text-[#333]">
                          <span className="flex-shrink-0 mt-0.5">•</span>
                          <span className="leading-snug">{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projetos (experienced) — abaixo da experiência */}
          {!isEntryLevel && hasProjects && (
            <div className="mb-6">
              <RightSectionTitle>Projectos e Realizações</RightSectionTitle>
              <div className="space-y-3">
                {result.projects.map((proj, i) => (
                  <div key={i} className="text-[8.5pt] text-[#333]">
                    <span className="font-bold text-[#1a1a1a]">{proj.name}</span>
                    <span className="mx-2">–</span>
                    <span>{proj.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── RODAPÉ ─────────────────────────────────────── */}
      <div className="mt-8 pt-3 border-t border-[#e0e0e0] text-center" style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "7pt", color: "#aaa", letterSpacing: "0.15em", textTransform: "uppercase" }}>
        Estruturado com CV Fácil – O teu currículo premium
      </div>
    </div>
  );
};

// ── Componentes auxiliares de tipografia ──────────────────────────

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mb-3">
    <div
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: "9pt",
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "#1a1a1a",
        lineHeight: 1.3,
      }}
    >
      {children}
    </div>
    <div className="mt-1.5 h-[1.5px] bg-[#1a1a1a] w-full" />
    <div className="mt-3" />
  </div>
);

const RightSectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mb-3">
    <div
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: "11pt",
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "#1a1a1a",
      }}
    >
      {children}
    </div>
    <div className="mt-1.5 h-[1px] bg-[#ccc] w-full" />
    <div className="mt-3" />
  </div>
);
