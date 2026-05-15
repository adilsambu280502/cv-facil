import React, { RefObject, useState } from "react";
import html2canvas from "html2canvas";
import { pdf } from "@react-pdf/renderer";
import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  HeadingLevel, 
  AlignmentType 
} from "docx";
import { saveAs } from "file-saver";
import { Answers, TransformResult } from "../types";
import { ModernElite } from "../components/templates/premium/ModernElite";
import { ExecutiveElite } from "../components/templates/premium/ExecutiveElite";
import { CreativeElite } from "../components/templates/premium/CreativeElite";
import { CleanATS } from "../components/templates/premium/CleanATS";

export const useExport = (
  cvRef: RefObject<HTMLDivElement | null>,
  answers: Answers,
  result: TransformResult | null
) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    if (!result) return false;
    setIsExporting(true);
    try {
      // Usando o novo motor de renderização Pro Max dinâmico
      const templateProps = { 
        data: { ...answers, ...result },
        color: answers.color || '#2563eb'
      };

      const doc = React.createElement(
        answers.template === "executive" ? ExecutiveElite : 
        answers.template === "creative" ? CreativeElite :
        answers.template === "technical" || answers.template === "minimalist" ? CleanATS :
        ModernElite, 
        templateProps
      );
      
      const blob = await pdf(doc).toBlob();
      saveAs(blob, answers.name ? `${answers.name}_CV_Profissional.pdf` : "CV_Facil.pdf");
      return true;
    } catch (err) {
      console.error("Error generating Premium PDF:", err);
      // Fallback para o método antigo se necessário (opcional)
      return false;
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportImage = async () => {
    if (!cvRef.current) return;
    setIsExporting(true);
    try {
      await new Promise((r) => setTimeout(r, 300));
      const canvas = await html2canvas(cvRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const filename = answers.name ? answers.name + "_CV.png" : "CV.png";
      saveAs(imgData, filename);
      return true;
    } catch (err) {
      console.error("Error generating Image:", err);
      return false;
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportDOCX = async () => {
    if (!result) return false;
    setIsExporting(true);
    try {
      const doc = new Document({
        title: `CV - ${answers.name}`,
        creator: "CV Fácil",
        description: "Currículo Profissional Otimizado",
        sections: [
          {
            properties: {},
            children: [
              // HEADER - NAME
              new Paragraph({
                text: (answers.name || "CURRÍCULO PROFISSIONAL").toUpperCase(),
                heading: HeadingLevel.TITLE,
                alignment: AlignmentType.CENTER,
                spacing: { after: 120 },
              }),
              
              // HEADER - TITLE
              new Paragraph({
                text: (result.title || "").toUpperCase(),
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.CENTER,
                spacing: { after: 200 },
              }),

              // CONTACT INFO
              new Paragraph({
                children: [
                  new TextRun({ text: answers.email || "", bold: true }),
                  new TextRun({ text: answers.phone ? ` | ${answers.phone}` : "" }),
                  new TextRun({ text: answers.location ? ` | ${answers.location}` : "" }),
                  new TextRun({ text: answers.linkedin ? ` | LinkedIn: ${answers.linkedin}` : "" }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 400 },
              }),

              // SUMMARY
              new Paragraph({
                text: "PERFIL PROFISSIONAL",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 200, after: 120 },
              }),
              new Paragraph({
                text: result.professionalSummary || "",
                alignment: AlignmentType.JUSTIFIED,
                spacing: { after: 400 },
              }),

              // EXPERIENCE
              new Paragraph({
                text: "EXPERIÊNCIA E REALIZAÇÕES",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 200, after: 120 },
              }),
              ...(result.descriptionBullets || []).map(
                (bullet) =>
                  new Paragraph({
                    text: bullet,
                    bullet: { level: 0 },
                    spacing: { after: 100 },
                  }),
              ),

              // EDUCATION
              new Paragraph({
                text: "EDUCAÇÃO E FORMAÇÃO",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 400, after: 120 },
              }),
              new Paragraph({
                text: answers.education || "Informação não fornecida.",
                spacing: { after: 400 },
              }),

              // SKILLS
              new Paragraph({
                text: "COMPETÊNCIAS TÉCNICAS E SOFT SKILLS",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 200, after: 120 },
              }),
              new Paragraph({
                text: (result.skills || []).join(" • "),
                spacing: { after: 400 },
              }),

              // LANGUAGES
              new Paragraph({
                text: "IDIOMAS",
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 200, after: 120 },
              }),
              new Paragraph({
                text: answers.languages || "Português",
                spacing: { after: 400 },
              }),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${answers.name || "CV"}_Hoje.docx`);
      return true;
    } catch (err) {
      console.error("Error generating DOCX:", err);
      return false;
    } finally {
      setIsExporting(false);
    }
  };

  return {
    isExporting,
    handleExportPDF,
    handleExportImage,
    handleExportDOCX
  };
};
