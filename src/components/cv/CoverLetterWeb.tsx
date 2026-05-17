import React from "react";
import { Answers, TransformResult } from "../../types";
import { CVLayoutWeb } from "./CVLayoutWeb";

interface Props {
  answers: Answers;
  result: TransformResult;
}

export const CoverLetterWeb: React.FC<Props> = ({ answers, result }) => {
  if (!result.coverLetter) return null;

  // Separar a carta de apresentação em parágrafos
  const paragraphs = result.coverLetter.split(/\n+/).filter((p) => p.trim().length > 0);

  return (
    <CVLayoutWeb answers={answers} result={result} rightTitle="Carta de Apresentação">
      {/* Data formatada ao estilo de Angola */}
      <div className="mb-6 text-right font-medium" style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "8pt", color: "#666" }}>
        Luanda, {new Date().toLocaleDateString("pt-AO", { day: "numeric", month: "long", year: "numeric" })}
      </div>

      {/* Saudação formal */}
      <div className="mb-5 font-bold text-slate-800" style={{ fontSize: "9.5pt", fontFamily: "Arial, Helvetica, sans-serif" }}>
        À equipa de recrutamento,
      </div>

      {/* Parágrafos da carta com justificação e entrelinhamento perfeito */}
      <div className="space-y-4 font-serif">
        {paragraphs
          .filter((p) => p !== "À equipa de recrutamento," && !p.startsWith("Melhores"))
          .map((para, i) => (
            <p key={i} className="text-justify leading-relaxed text-slate-700" style={{ fontSize: "9.5pt", textIndent: "1.5rem" }}>
              {para}
            </p>
          ))}
      </div>

      {/* Assinatura profissional elegante */}
      <div className="mt-10 space-y-1" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
        <div style={{ fontSize: "8.5pt", color: "#555" }}>
          Melhores cumprimentos,
        </div>
        <div
          style={{
            fontFamily: "Dancing Script, Brush Script MT, cursive",
            fontSize: "20pt",
            color: "#1a1a1a",
            lineHeight: 1.2,
            marginTop: "8px",
          }}
        >
          {answers.name}
        </div>
        <div style={{ fontSize: "8.5pt", color: "#555", fontWeight: 600 }}>
          {answers.name}
        </div>
      </div>
    </CVLayoutWeb>
  );
};
