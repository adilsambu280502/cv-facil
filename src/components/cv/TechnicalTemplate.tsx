import React from "react";
import { 
  Lock 
} from "lucide-react";
import { Answers, TransformResult } from "../../types";

interface TemplateProps {
  answers: Answers;
  result: TransformResult;
  hasPaid: boolean;
}

export const TechnicalTemplate: React.FC<TemplateProps> = ({
  answers,
  result,
  hasPaid,
}) => {
  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] text-green-400 font-mono p-12">
      <div className="border border-green-500/30 p-8 h-full relative flex flex-col shadow-[0_0_30px_rgba(34,197,94,0.1)_inset]">
        <div className="absolute top-0 left-4 -mt-3 bg-[#0a0a0a] px-2 text-green-500 text-sm font-bold opacity-70">
          user@dev:~/resume$
        </div>

        <div className="flex justify-between items-start mb-12 border-b border-green-500/20 pb-8">
          <div>
            <h1 className="text-[40px] font-bold text-green-400 mb-2 tracking-tight">
              {answers.name || "O_MEU_NOME"}
            </h1>
            <h2 className="text-[16px] text-green-500/80">
              <span className="text-green-600 mr-2">
                &gt;
              </span>
              {result.title}
            </h2>
          </div>
          {answers.photo && (
            <div className="w-24 h-24 overflow-hidden border border-green-500/50 p-1 opacity-80 mix-blend-luminosity">
              <img
                src={answers.photo}
                alt="Profile"
                className="w-full h-full object-cover grayscale brightness-110 contrast-125 sepia-[0.3] hue-rotate-[70deg]"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col @md:flex-row gap-8 @md:gap-12">
          <div className="w-full @md:w-1/3 flex flex-col gap-6 @md:gap-8">
            <section>
              <h3 className="text-[12px] uppercase text-green-300 font-bold mb-4 opacity-80 tracking-widest border-b border-green-500/20 pb-2">
                ~/.config
              </h3>
              <div className="space-y-3 text-[12px] text-green-500">
                <div className="break-words">
                  <span className="opacity-50">email:</span>{" "}
                  {answers.email || "null"}
                </div>
                <div>
                  <span className="opacity-50">phone:</span>{" "}
                  {answers.phone || "null"}
                </div>
                <div>
                  <span className="opacity-50">loc:</span>{" "}
                  {answers.location || "null"}
                </div>
                {answers.website && (
                  <div className="break-words">
                    <span className="opacity-50">
                      website:
                    </span>{" "}
                    {answers.website}
                  </div>
                )}
                {answers.linkedin && (
                  <div className="break-words">
                    <span className="opacity-50">
                      linkedin:
                    </span>{" "}
                    {answers.linkedin}
                  </div>
                )}
                {answers.github && (
                  <div className="break-words">
                    <span className="opacity-50">
                      github:
                    </span>{" "}
                    {answers.github}
                  </div>
                )}
                {answers.facebook && (
                  <div className="break-words">
                    <span className="opacity-50">
                      facebook:
                    </span>{" "}
                    {answers.facebook}
                  </div>
                )}
                {answers.instagram && (
                  <div className="break-words">
                    <span className="opacity-50">
                      instagram:
                    </span>{" "}
                    {answers.instagram}
                  </div>
                )}
              </div>
            </section>

            <section>
              <h3 className="text-[12px] uppercase text-green-300 font-bold mb-4 opacity-80 tracking-widest border-b border-green-500/20 pb-2">
                ~/skills{" "}
                {!hasPaid && (
                  <Lock
                    size={12}
                    className="inline-block ml-1 opacity-50 relative -top-[1px]"
                  />
                )}
              </h3>
              <div className="flex flex-col gap-2 text-[12px]">
                {result.skills.map((skill) => (
                  <div key={skill} className="text-green-400">
                    <span className="text-green-600 mr-2">
                      *
                    </span>
                    {skill}
                  </div>
                ))}
              </div>
            </section>

            {answers.education && (
              <section>
                <h3 className="text-[12px] uppercase text-green-300 font-bold mb-4 opacity-80 tracking-widest border-b border-green-500/20 pb-2">
                  ~/education{" "}
                  {!hasPaid && (
                    <Lock
                      size={12}
                      className="inline-block ml-1 opacity-50 relative -top-[1px]"
                    />
                  )}
                </h3>
                <p className="text-[12px] text-green-500 leading-relaxed whitespace-pre-line">
                  {answers.education}
                </p>
              </section>
            )}

            {answers.languages && (
              <section className="mt-6">
                <h3 className="text-[12px] uppercase text-green-300 font-bold mb-4 opacity-80 tracking-widest border-b border-green-500/20 pb-2">
                  ~/languages{" "}
                  {!hasPaid && (
                    <Lock
                      size={12}
                      className="inline-block ml-1 opacity-50 relative -top-[1px]"
                    />
                  )}
                </h3>
                <p className="text-[12px] text-green-500 leading-relaxed whitespace-pre-line">
                  {answers.languages}
                </p>
              </section>
            )}

            {answers.programmingLanguages && (
              <section className="mt-6">
                <h3 className="text-[12px] uppercase text-green-300 font-bold mb-4 opacity-80 tracking-widest border-b border-green-500/20 pb-2">
                  ~/programming_languages{" "}
                  {!hasPaid && (
                    <Lock
                      size={12}
                      className="inline-block ml-1 opacity-50 relative -top-[1px]"
                    />
                  )}
                </h3>
                <p className="text-[12px] text-green-500 leading-relaxed whitespace-pre-line">
                  {answers.programmingLanguages}
                </p>
              </section>
            )}
          </div>

          <div className="w-full @md:flex-1 flex flex-col pt-6 @md:pt-0 border-t border-green-500/20 @md:border-t-0 mt-6 @md:mt-0">
            <section className="mb-10">
              <h3 className="text-[12px] uppercase text-green-300 font-bold mb-4 opacity-80 tracking-widest border-b border-green-500/20 pb-2">
                cat summary.txt
              </h3>
              <p className="text-[13px] leading-[1.8] text-green-400">
                {result.professionalSummary}
              </p>
            </section>

            <section>
              <h3 className="text-[12px] uppercase text-green-300 font-bold mb-6 opacity-80 tracking-widest border-b border-green-500/20 pb-2">
                ./execute_experience.sh{" "}
                {!hasPaid && (
                  <Lock
                    size={12}
                    className="inline-block ml-1 opacity-50 relative -top-[1px]"
                  />
                )}
              </h3>
              <div className="space-y-6 text-[13px]">
                {result.descriptionBullets.map((bullet, i) => (
                  <div key={i} className="flex">
                    <span className="text-green-600 mr-4 opacity-50 block w-4 text-right">
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    <p className="text-green-400 leading-relaxed flex-1">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
