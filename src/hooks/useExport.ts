import React, { RefObject, useState } from "react";
import html2canvas from "html2canvas";
import { pdf } from "@react-pdf/renderer";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
} from "docx";
import { saveAs } from "file-saver";
import { Answers, TransformResult } from "../types";
import { ProfessionalPDF } from "../components/templates/premium/ProfessionalPDF";
import { useCV } from "../context/CVContext";

export const useExport = (
  cvRef: RefObject<HTMLDivElement | null>,
  answers: Answers,
  result: TransformResult | null
) => {
  const [isExporting, setIsExporting] = useState(false);
  const { hasPaid } = useCV();

  // ─── PDF VECTORIAL (react-pdf) ─────────────────────────────────
  const handleExportPDF = async () => {
    if (!result) return false;
    setIsExporting(true);
    await new Promise((r) => setTimeout(r, 600));

    try {
      const doc = React.createElement(ProfessionalPDF, {
        answers,
        result,
        hasPaid,
      });

      const blob = await pdf(doc).toBlob();
      const filename = answers.name
        ? `${answers.name.replace(/\s+/g, "_")}_CV_CVFacil.pdf`
        : "CV_Facil.pdf";
      saveAs(blob, filename);
      return true;
    } catch (err) {
      console.error("Erro ao gerar PDF:", err);
      return false;
    } finally {
      setIsExporting(false);
    }
  };

  // ─── IMAGEM PNG (html2canvas) ──────────────────────────────────
  const handleExportImage = async () => {
    if (!cvRef.current) return;
    setIsExporting(true);
    try {
      await new Promise((r) => setTimeout(r, 300));
      const canvas = await html2canvas(cvRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/png");
      const filename = answers.name
        ? `${answers.name.replace(/\s+/g, "_")}_CV.png`
        : "CV.png";
      saveAs(imgData, filename);
      return true;
    } catch (err) {
      console.error("Erro ao gerar imagem:", err);
      return false;
    } finally {
      setIsExporting(false);
    }
  };

  // ─── WORD DOCX ─────────────────────────────────────────────────
  const handleExportDOCX = async () => {
    if (!result) return false;
    setIsExporting(true);
    try {
      const experienceParagraphs = (result.transformedExperience || []).flatMap(
        (exp) => [
          new Paragraph({
            text: `${exp.role} — ${exp.company} (${exp.period})`,
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 200, after: 80 },
          }),
          ...exp.responsibilities.map(
            (r) =>
              new Paragraph({
                text: r,
                bullet: { level: 0 },
                spacing: { after: 80 },
              })
          ),
        ]
      );

      const educationParagraphs = (result.transformedEducation || []).flatMap(
        (edu) => [
          new Paragraph({
            children: [
              new TextRun({ text: edu.degree, bold: true }),
              new TextRun({ text: `\n${edu.institution}` }),
              new TextRun({ text: `\n${edu.period}`, color: "666666" }),
            ],
            spacing: { after: 120 },
          }),
        ]
      );

      const projectParagraphs = (result.projects || []).map(
        (proj) =>
          new Paragraph({
            children: [
              new TextRun({ text: proj.name.toUpperCase(), bold: true }),
              new TextRun({ text: ` — ${proj.description}` }),
            ],
            spacing: { after: 100 },
          })
      );

      const doc = new Document({
        title: `CV - ${answers.name}`,
        creator: "CV Fácil",
        description: "Currículo Profissional de Elite - CV Fácil",
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                text: (answers.name || "CURRÍCULO").toUpperCase(),
                heading: HeadingLevel.TITLE,
                alignment: AlignmentType.CENTER,
                spacing: { after: 80 },
              }),
              new Paragraph({
                text: (result.title || "").toUpperCase(),
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.CENTER,
                spacing: { after: 160 },
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: answers.email || "" }),
                  new TextRun({ text: answers.phone ? `  |  ${answers.phone}` : "" }),
                  new TextRun({ text: answers.location ? `  |  ${answers.location}` : "" }),
                  new TextRun({ text: answers.linkedin ? `  |  ${answers.linkedin}` : "" }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 400 },
              }),

              new Paragraph({ text: "RESUMO PROFISSIONAL", heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 120 } }),
              new Paragraph({ text: result.professionalSummary || "", alignment: AlignmentType.JUSTIFIED, spacing: { after: 400 } }),

              new Paragraph({ text: "EXPERIÊNCIA PROFISSIONAL", heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 120 } }),
              ...experienceParagraphs,

              ...(result.projects?.length > 0 ? [
                new Paragraph({ text: "PROJECTOS E REALIZAÇÕES", heading: HeadingLevel.HEADING_2, spacing: { before: 400, after: 120 } }),
                ...projectParagraphs,
              ] : []),

              new Paragraph({ text: "FORMAÇÃO ACADÉMICA", heading: HeadingLevel.HEADING_2, spacing: { before: 400, after: 120 } }),
              ...educationParagraphs,

              new Paragraph({ text: "COMPETÊNCIAS", heading: HeadingLevel.HEADING_2, spacing: { before: 400, after: 120 } }),
              new Paragraph({ text: (result.skills || []).join("  •  "), spacing: { after: 200 } }),

              ...(result.languages?.length > 0 ? [
                new Paragraph({ text: "IDIOMAS", heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 120 } }),
                new Paragraph({ text: result.languages.join("\n"), spacing: { after: 200 } }),
              ] : []),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${(answers.name || "CV").replace(/\s+/g, "_")}_CVFacil.docx`);
      return true;
    } catch (err) {
      console.error("Erro ao gerar DOCX:", err);
      return false;
    } finally {
      setIsExporting(false);
    }
  };

  return { isExporting, handleExportPDF, handleExportImage, handleExportDOCX };
};
