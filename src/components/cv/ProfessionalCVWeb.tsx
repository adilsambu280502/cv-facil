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
