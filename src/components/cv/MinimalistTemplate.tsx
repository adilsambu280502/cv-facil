import React from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Linkedin, 
  Github, 
  Facebook, 
  Instagram, 
  Twitter, 
  Lock 
} from "lucide-react";
import { Answers, TransformResult } from "../../types";
import { PremiumSection } from "../ui/PremiumSection";

interface TemplateProps {
  answers: Answers;
  result: TransformResult;
  hasPaid: boolean;
  onShare?: {
    linkedin: () => void;
    twitter: () => void;
    facebook: () => void;
  };
}

export const MinimalistTemplate: React.FC<TemplateProps> = ({
  answers,
  result,
  hasPaid,
  onShare
}) => {
  return (
    <>
      <header
        className="border-b-2 pb-6 mb-8 flex flex-row justify-between items-end gap-4 relative"
        style={{ borderColor: "var(--cv-primary)" }}
      >
        <div>
          <h1
            className="text-[40px] font-black leading-none tracking-tight mb-2"
            style={{ color: "var(--cv-primary)" }}
          >
            {answers.name || "O Meu Nome"}
          </h1>
          <h2 className="text-[22px] font-bold text-gray-600 tracking-tight">
            {result.title}
          </h2>
        </div>
        <div className="flex flex-col gap-3 items-end">
          <div
            className="flex items-center gap-2 justify-end text-gray-400 transition-colors mb-4"
            data-html2canvas-ignore="true"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider mr-2 text-gray-300">
              Partilhar
            </span>
            <button
              onClick={onShare?.linkedin}
              className="w-8 h-8 rounded-full bg-gray-50 hover:bg-[#0a66c2]/10 text-gray-400 hover:text-[#0a66c2] flex items-center justify-center transition-all shadow-sm border border-gray-100"
              title="Partilhar no LinkedIn"
            >
              <Linkedin size={14} />
            </button>
            <button
              onClick={onShare?.twitter}
              className="w-8 h-8 rounded-full bg-gray-50 hover:bg-[#1da1f2]/10 text-gray-400 hover:text-[#1da1f2] flex items-center justify-center transition-all shadow-sm border border-gray-100"
              title="Partilhar no Twitter"
            >
              <Twitter size={14} />
            </button>
            <button
              onClick={onShare?.facebook}
              className="w-8 h-8 rounded-full bg-gray-50 hover:bg-[#1877f2]/10 text-gray-400 hover:text-[#1877f2] flex items-center justify-center transition-all shadow-sm border border-gray-100"
              title="Partilhar no Facebook"
            >
              <Facebook size={14} />
            </button>
          </div>
          <div className="flex flex-col gap-2 text-[13px] text-gray-600 items-end">
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-gray-400" />
              <span>{answers.email || "O teu email"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-gray-400" />
              <span>{answers.phone || "O teu telefone"}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-gray-400" />
              <span>{answers.location || "A tua localização"}</span>
            </div>
            {answers.website && (
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-gray-400" />
                <span>{answers.website.replace(/^https?:\/\//, "")}</span>
              </div>
            )}
            {answers.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin size={14} className="text-gray-400" />
                <span>{answers.linkedin}</span>
              </div>
            )}
            {answers.github && (
              <div className="flex items-center gap-2">
                <Github size={14} className="text-gray-400" />
                <span>{answers.github}</span>
              </div>
            )}
            {answers.facebook && (
              <div className="flex items-center gap-2">
                <Facebook size={14} className="text-gray-400" />
                <span>{answers.facebook}</span>
              </div>
            )}
            {answers.instagram && (
              <div className="flex items-center gap-2">
                <Instagram size={14} className="text-gray-400" />
                <span>{answers.instagram}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <section className="mb-8">
        <h3 className="text-[13px] font-bold uppercase tracking-[2px] text-gray-900 mb-4">
          Resumo Profissional
        </h3>
        <p className="text-[14px] text-gray-700 leading-[1.8]">
          {result.professionalSummary}
        </p>
      </section>

      <PremiumSection hasPaid={hasPaid} title="Plano Entrevista">
        <section className="mb-0">
          <h3
            className="text-[13px] font-bold uppercase tracking-[2px] text-gray-900 mb-4"
            style={{ color: "var(--cv-primary)" }}
          >
            Experiência Relevante{" "}
            {!hasPaid && (
              <Lock
                size={14}
                className="inline-block ml-1.5 opacity-50 relative -top-[1px]"
              />
            )}
          </h3>
          <div className="mb-2">
            <div className="flex justify-between items-baseline mb-2">
              <h4 className="text-[15px] font-bold text-gray-900">
                {result.title}
              </h4>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              {result.descriptionBullets.map((bullet, i) => (
                <li
                  key={i}
                  className="text-[14px] text-gray-700 leading-[1.7] pl-1"
                >
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </PremiumSection>

      <section className="mb-8">
        <h3 className="text-[13px] font-bold uppercase tracking-[2px] text-gray-900 mb-4">
          Competências{" "}
          {!hasPaid && (
            <Lock
              size={14}
              className="inline-block ml-1.5 opacity-50 relative -top-[1px]"
            />
          )}
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {result.skills.map((skill) => (
            <div
              key={skill}
              className="bg-gray-100 text-gray-800 px-3 py-1.5 rounded text-[13px] font-semibold border border-gray-200"
            >
              {skill}
            </div>
          ))}
        </div>
      </section>

      {answers.education && (
        <PremiumSection hasPaid={hasPaid} title="Plano Entrevista">
          <section className="mb-0">
            <h3
              className="text-[13px] font-bold uppercase tracking-[2px] text-gray-900 mb-4"
              style={{ color: "var(--cv-primary)" }}
            >
              Formação Académica{" "}
              {!hasPaid && (
                <Lock
                  size={14}
                  className="inline-block ml-1.5 opacity-50 relative -top-[1px]"
                />
              )}
            </h3>
            <p className="text-[14px] text-gray-700 leading-[1.7] whitespace-pre-line">
              {answers.education}
            </p>
          </section>
        </PremiumSection>
      )}

      {answers.languages && (
        <PremiumSection hasPaid={hasPaid} title="Plano Entrevista">
          <section className="mb-0">
            <h3
              className="text-[13px] font-bold uppercase tracking-[2px] text-gray-900 mb-4"
              style={{ color: "var(--cv-primary)" }}
            >
              Idiomas{" "}
              {!hasPaid && (
                <Lock
                  size={14}
                  className="inline-block ml-1.5 opacity-50 relative -top-[1px]"
                />
              )}
            </h3>
            <p className="text-[14px] text-gray-700 leading-[1.7] whitespace-pre-line">
              {answers.languages}
            </p>
          </section>
        </PremiumSection>
      )}

      {result.atsKeywords && result.atsKeywords.length > 0 && (
        <PremiumSection hasPaid={hasPaid} title="Plano Entrevista">
          <section className="mt-8">
            <h3
              className="text-[10px] font-bold uppercase tracking-[2px] text-gray-400 mb-3"
              style={{
                color: "var(--cv-primary)",
                opacity: 0.7,
              }}
            >
              Filtros ATS (Automáticos){" "}
              {!hasPaid && (
                <Lock
                  size={14}
                  className="inline-block ml-1.5 opacity-50 relative -top-[1px]"
                />
              )}
            </h3>
            <div className="flex flex-wrap gap-2">
              {result.atsKeywords.map((keyword, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-gray-100/80 text-gray-700 text-[11px] font-medium rounded-md border border-gray-200/60"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </section>
        </PremiumSection>
      )}
    </>
  );
};
