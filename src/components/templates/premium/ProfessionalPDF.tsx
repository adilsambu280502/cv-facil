import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { Answers, TransformResult } from "../../../types";

interface Props {
  answers: Answers;
  result: TransformResult;
  hasPaid: boolean;
}

const c = {
  black: "#1a1a1a",
  darkGray: "#333333",
  midGray: "#555555",
  lightGray: "#888888",
  divider: "#cccccc",
  bgLight: "#f5f5f5",
  white: "#ffffff",
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: c.white,
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 40,
    fontFamily: "Times-Roman",
  },
  // ── WATERMARK
  watermark: {
    position: "absolute",
    top: "40%",
    left: "5%",
    fontSize: 55,
    color: "rgba(180,180,180,0.15)",
    transform: "rotate(-40deg)",
  },
  // ── HEADER
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 1.5,
    borderBottomColor: c.black,
    paddingBottom: 10,
    marginBottom: 14,
  },
  nameBlock: { flex: 1 },
  nameLight: {
    fontFamily: "Helvetica",
    fontSize: 22,
    fontWeight: 300,
    letterSpacing: 3,
    color: c.black,
    lineHeight: 1.1,
    textTransform: "uppercase",
  },
  nameBold: {
    fontFamily: "Helvetica-Bold",
    fontSize: 22,
    letterSpacing: 3,
    color: c.black,
    lineHeight: 1.1,
    textTransform: "uppercase",
  },
  titleLine: {
    fontFamily: "Helvetica",
    fontSize: 7,
    letterSpacing: 3,
    color: "#555",
    textTransform: "uppercase",
    marginTop: 5,
  },
  accentBar: {
    width: 22,
    height: 1.5,
    backgroundColor: c.black,
    marginTop: 4,
  },
  contactBlock: {
    alignItems: "flex-end",
  },
  contactRow: {
    fontFamily: "Helvetica",
    fontSize: 7.5,
    color: c.darkGray,
    marginBottom: 2,
  },
  contactBold: { fontFamily: "Helvetica-Bold" },
  addressTag: {
    backgroundColor: c.black,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 6,
  },
  addressText: {
    fontFamily: "Helvetica",
    fontSize: 7,
    color: c.white,
  },
  // ── BODY
  body: { flexDirection: "row", gap: 16 },
  leftCol: { width: "34%", paddingRight: 12 },
  rightCol: { flex: 1 },
  // ── LEFT SECTION TITLE
  leftSectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 7.5,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    color: c.black,
    lineHeight: 1.3,
  },
  leftDivider: {
    height: 1.2,
    backgroundColor: c.black,
    marginTop: 4,
    marginBottom: 8,
  },
  sectionBlock: { marginBottom: 14 },
  // ── LEFT CONTENT
  eduDegree: {
    fontFamily: "Helvetica-Bold",
    fontSize: 7.5,
    color: c.black,
    lineHeight: 1.3,
  },
  eduInstitution: {
    fontFamily: "Helvetica-Oblique",
    fontSize: 7,
    color: "#555",
    marginTop: 1,
  },
  eduPeriod: {
    fontFamily: "Helvetica",
    fontSize: 7,
    color: c.lightGray,
    marginTop: 1,
    marginBottom: 6,
  },
  skillRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  skillDash: {
    fontFamily: "Helvetica",
    fontSize: 7.5,
    color: c.black,
    marginRight: 4,
    lineHeight: 1.4,
  },
  skillText: {
    fontFamily: "Helvetica",
    fontSize: 7.5,
    color: c.darkGray,
    flex: 1,
    lineHeight: 1.4,
  },
  langText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: c.darkGray,
    marginBottom: 2,
  },
  projName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 7.5,
    color: c.black,
    textTransform: "uppercase",
  },
  projDesc: {
    fontFamily: "Helvetica",
    fontSize: 7.5,
    color: c.darkGray,
    lineHeight: 1.4,
    marginBottom: 5,
  },
  // ── RIGHT SECTION TITLE
  rightSectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    color: c.black,
  },
  rightDivider: {
    height: 0.8,
    backgroundColor: c.divider,
    marginTop: 4,
    marginBottom: 8,
  },
  summaryText: {
    fontFamily: "Times-Roman",
    fontSize: 8.5,
    color: c.darkGray,
    lineHeight: 1.6,
    textAlign: "justify",
  },
  // ── EXPERIENCE
  expRole: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    color: c.black,
    marginBottom: 2,
  },
  expMeta: {
    fontFamily: "Helvetica",
    fontSize: 7,
    color: c.midGray,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 3,
    paddingLeft: 2,
  },
  bulletDot: {
    fontFamily: "Helvetica",
    fontSize: 8,
    color: c.black,
    marginRight: 5,
    lineHeight: 1.4,
  },
  bulletText: {
    fontFamily: "Times-Roman",
    fontSize: 8,
    color: c.darkGray,
    flex: 1,
    lineHeight: 1.4,
  },
  expBlock: { marginBottom: 10 },
  // ── FOOTER
  footer: {
    borderTopWidth: 0.5,
    borderTopColor: "#e0e0e0",
    marginTop: "auto",
    paddingTop: 6,
    textAlign: "center",
  },
  footerText: {
    fontFamily: "Helvetica",
    fontSize: 6,
    color: "#aaa",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    textAlign: "center",
  },
});

const execStyles = StyleSheet.create({
  page: {
    backgroundColor: c.white,
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 40,
    fontFamily: "Helvetica",
  },
  watermark: {
    position: "absolute",
    top: "40%",
    left: "5%",
    fontSize: 55,
    color: "rgba(180,180,180,0.15)",
    transform: "rotate(-40deg)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    paddingBottom: 12,
    marginBottom: 16,
  },
  nameBlock: { flex: 1 },
  nameLight: {
    fontFamily: "Helvetica",
    fontSize: 22,
    fontWeight: 300,
    letterSpacing: 2,
    color: c.black,
    lineHeight: 1.1,
    textTransform: "uppercase",
  },
  nameBold: {
    fontFamily: "Helvetica-Bold",
    fontSize: 22,
    letterSpacing: 2,
    color: c.black,
    lineHeight: 1.1,
    textTransform: "uppercase",
  },
  titleLine: {
    fontFamily: "Helvetica-Bold",
    fontSize: 7.5,
    letterSpacing: 2,
    color: "#475569",
    textTransform: "uppercase",
    marginTop: 4,
  },
  accentBar: {
    width: 28,
    height: 1.5,
    backgroundColor: c.black,
    marginTop: 5,
  },
  contactBox: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#f1f5f9",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: "flex-end",
    maxWidth: 200,
  },
  contactRow: {
    fontFamily: "Helvetica",
    fontSize: 7.5,
    color: c.darkGray,
    marginBottom: 2,
  },
  contactLabel: {
    fontFamily: "Helvetica-Bold",
    color: "#94a3b8",
  },
  contactValue: {
    fontFamily: "Helvetica-Bold",
    color: "#1e293b",
  },
  addressTag: {
    backgroundColor: c.black,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 4,
  },
  addressText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 6.5,
    color: c.white,
  },
  body: { flexDirection: "row", gap: 20 },
  leftColWide: { flex: 1, paddingRight: 10 },
  rightColNarrow: { width: "38%", borderLeftWidth: 1, borderLeftColor: "#f1f5f9", paddingLeft: 12 },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: c.black,
    lineHeight: 1.3,
  },
  divider: {
    height: 1,
    backgroundColor: c.black,
    marginTop: 3,
    marginBottom: 8,
  },
  rightDivider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginTop: 3,
    marginBottom: 8,
  },
  summaryText: {
    fontFamily: "Helvetica",
    fontSize: 8,
    color: "#475569",
    lineHeight: 1.5,
    textAlign: "justify",
    marginBottom: 12,
  },
  expBlock: { 
    position: "relative",
    paddingLeft: 12,
    borderLeftWidth: 1.5,
    borderLeftColor: "#e2e8f0",
    marginBottom: 12,
  },
  timelineDot: {
    position: "absolute",
    left: -4,
    top: 2,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#94a3b8",
    borderWidth: 1,
    borderColor: c.white,
  },
  expRole: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    color: c.black,
  },
  expMeta: {
    fontFamily: "Helvetica-Bold",
    fontSize: 7,
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 2,
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 2.5,
  },
  bulletDot: {
    fontFamily: "Helvetica",
    fontSize: 6,
    color: "#94a3b8",
    marginRight: 4,
    lineHeight: 1.4,
  },
  bulletText: {
    fontFamily: "Helvetica",
    fontSize: 7.5,
    color: "#475569",
    flex: 1,
    lineHeight: 1.4,
  },
  eduDegree: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: c.black,
    lineHeight: 1.3,
  },
  eduInstitution: {
    fontFamily: "Helvetica-Oblique",
    fontSize: 7,
    color: "#475569",
    marginTop: 1,
  },
  eduPeriod: {
    fontFamily: "Helvetica-Bold",
    fontSize: 6.5,
    color: "#94a3b8",
    marginTop: 1,
    marginBottom: 8,
  },
  listRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 3,
  },
  listDot: {
    fontFamily: "Helvetica",
    fontSize: 6,
    color: "#94a3b8",
    marginRight: 4,
    marginTop: 1,
  },
  listText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 7.5,
    color: "#475569",
    flex: 1,
    lineHeight: 1.3,
  },
  footer: {
    borderTopWidth: 0.5,
    borderTopColor: "#e2e8f0",
    marginTop: "auto",
    paddingTop: 6,
    textAlign: "center",
  },
  footerText: {
    fontFamily: "Helvetica",
    fontSize: 6,
    color: "#aaa",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    textAlign: "center",
  },
});

export const ProfessionalPDF: React.FC<Props> = ({ answers, result, hasPaid }) => {
  const nameParts = (answers.name || "").split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ");
  const isEntryLevel = result.layoutStrategy?.profileType === "entry_level";

  if (answers.template === "executive") {
    return (
      <Document>
        <Page size="A4" style={execStyles.page}>
          {!hasPaid && <Text style={execStyles.watermark}>PREVIEW — CV FÁCIL</Text>}

          {/* ── HEADER ── */}
          <View style={execStyles.header}>
            <View style={execStyles.nameBlock}>
              <Text style={execStyles.nameLight}>{firstName}</Text>
              <Text style={execStyles.nameBold}>{lastName}</Text>
              <Text style={execStyles.titleLine}>{result.title}</Text>
              <View style={execStyles.accentBar} />
            </View>
            <View style={execStyles.contactBox}>
              {answers.phone && (
                <Text style={execStyles.contactRow}>
                  <Text style={execStyles.contactLabel}>TLF: </Text>
                  <Text style={execStyles.contactValue}>{answers.phone}</Text>
                </Text>
              )}
              {answers.email && (
                <Text style={execStyles.contactRow}>
                  <Text style={execStyles.contactLabel}>EMAIL: </Text>
                  <Text style={execStyles.contactValue}>{answers.email}</Text>
                </Text>
              )}
              {answers.linkedin && (
                <Text style={execStyles.contactRow}>
                  <Text style={execStyles.contactLabel}>IN: </Text>
                  <Text style={execStyles.contactValue}>{answers.linkedin.replace(/https?:\/\/(www\.)?linkedin\.com\/in\//, "")}</Text>
                </Text>
              )}
              {answers.location && (
                <View style={execStyles.addressTag}>
                  <Text style={execStyles.addressText}>{answers.location}</Text>
                </View>
              )}
            </View>
          </View>

          {/* ── BODY: 2 COLUNAS (ESPELHADO) ── */}
          <View style={execStyles.body}>
            {/* ── COLUNA ESQUERDA (LARGA) ── */}
            <View style={execStyles.leftColWide}>
              {/* Resumo Profissional */}
              {result.professionalSummary && (
                <View style={{ marginBottom: 12 }}>
                  <Text style={execStyles.sectionTitle}>Perfil Profissional</Text>
                  <View style={execStyles.rightDivider} />
                  <Text style={execStyles.summaryText}>{result.professionalSummary}</Text>
                </View>
              )}

              {/* Experiência */}
              {result.transformedExperience?.length > 0 && (
                <View style={{ marginBottom: 12 }}>
                  <Text style={execStyles.sectionTitle}>Experiência Profissional</Text>
                  <View style={execStyles.rightDivider} />
                  {result.transformedExperience.map((exp, i) => (
                    <View key={i} style={execStyles.expBlock}>
                      <View style={execStyles.timelineDot} />
                      <Text style={execStyles.expRole}>{exp.role}</Text>
                      <Text style={execStyles.expMeta}>
                        {exp.company}{exp.period ? `  |  ${exp.period}` : ""}
                      </Text>
                      {exp.responsibilities.map((r, j) => (
                        <View key={j} style={execStyles.bulletRow}>
                          <Text style={execStyles.bulletDot}>•</Text>
                          <Text style={execStyles.bulletText}>{r}</Text>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              )}
            </View>

            {/* ── COLUNA DIREITA (ESTREITA) ── */}
            <View style={execStyles.rightColNarrow}>
              {/* Formação Académica */}
              {result.transformedEducation?.length > 0 && (
                <View style={{ marginBottom: 12 }}>
                  <Text style={execStyles.sectionTitle}>Formação Académica</Text>
                  <View style={execStyles.divider} />
                  {result.transformedEducation.map((edu, i) => (
                    <View key={i}>
                      <Text style={execStyles.eduDegree}>{edu.degree}</Text>
                      <Text style={execStyles.eduInstitution}>{edu.institution}</Text>
                      <Text style={execStyles.eduPeriod}>{edu.period}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Competências Principais */}
              {result.skills?.length > 0 && (
                <View style={{ marginBottom: 12 }}>
                  <Text style={execStyles.sectionTitle}>Competências Principais</Text>
                  <View style={execStyles.divider} />
                  {result.skills.map((skill, i) => (
                    <View key={i} style={execStyles.listRow}>
                      <Text style={execStyles.listDot}>•</Text>
                      <Text style={execStyles.listText}>{skill}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Idiomas */}
              {result.languages?.length > 0 && (
                <View style={{ marginBottom: 12 }}>
                  <Text style={execStyles.sectionTitle}>Idiomas</Text>
                  <View style={execStyles.divider} />
                  {result.languages.map((lang, i) => (
                    <View key={i} style={execStyles.listRow}>
                      <Text style={execStyles.listDot}>•</Text>
                      <Text style={execStyles.listText}>{lang}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* ── FOOTER ── */}
          <View style={execStyles.footer}>
            <Text style={execStyles.footerText}>
              {!hasPaid ? "Estruturado com CV Fácil – O teu currículo premium" : ""}
            </Text>
          </View>
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {!hasPaid && <Text style={styles.watermark}>PREVIEW — CV FÁCIL</Text>}

        {/* ── HEADER ── */}
        <View style={styles.header}>
          <View style={styles.nameBlock}>
            <Text style={styles.nameLight}>{firstName}</Text>
            <Text style={styles.nameBold}>{lastName}</Text>
            <Text style={styles.titleLine}>{result.title}</Text>
            <View style={styles.accentBar} />
          </View>
          <View style={styles.contactBlock}>
            {answers.phone && (
              <Text style={styles.contactRow}>
                <Text style={styles.contactBold}>Contacto: </Text>{answers.phone}
              </Text>
            )}
            {answers.email && (
              <Text style={styles.contactRow}>
                <Text style={styles.contactBold}>E-mail: </Text>{answers.email}
              </Text>
            )}
            {answers.linkedin && (
              <Text style={styles.contactRow}>
                <Text style={styles.contactBold}>Linkedin: </Text>{answers.linkedin}
              </Text>
            )}
            {answers.github && (
              <Text style={styles.contactRow}>
                <Text style={styles.contactBold}>GitHub: </Text>{answers.github}
              </Text>
            )}
            {answers.website && (
              <Text style={styles.contactRow}>
                <Text style={styles.contactBold}>Portfólio: </Text>{answers.website}
              </Text>
            )}
            {answers.location && (
              <View style={styles.addressTag}>
                <Text style={styles.addressText}>
                  <Text style={{ fontFamily: "Helvetica-Bold" }}>Endereço: </Text>
                  {answers.location}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* ── BODY: 2 COLUNAS ── */}
        <View style={styles.body}>

          {/* ── COLUNA ESQUERDA ── */}
          <View style={styles.leftCol}>

            {/* Formação Académica */}
            {result.transformedEducation?.length > 0 && (
              <View style={styles.sectionBlock}>
                <Text style={styles.leftSectionTitle}>{"Formação\nAcadémica"}</Text>
                <View style={styles.leftDivider} />
                {result.transformedEducation.map((edu, i) => (
                  <View key={i}>
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                    <Text style={styles.eduInstitution}>{edu.institution}</Text>
                    <Text style={styles.eduPeriod}>{edu.period}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Competências */}
            {result.skills?.length > 0 && (
              <View style={styles.sectionBlock}>
                <Text style={styles.leftSectionTitle}>{"Competências\ne Softwares"}</Text>
                <View style={styles.leftDivider} />
                {result.skills.map((skill, i) => (
                  <View key={i} style={styles.skillRow}>
                    <Text style={styles.skillDash}>–</Text>
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Projetos (entry_level — na coluna esquerda) */}
            {isEntryLevel && result.projects?.length > 0 && (
              <View style={styles.sectionBlock}>
                <Text style={styles.leftSectionTitle}>{"Ideias\nDesenvolvidas"}</Text>
                <View style={styles.leftDivider} />
                {result.projects.map((proj, i) => (
                  <View key={i}>
                    <Text style={styles.projName}>{proj.name}</Text>
                    <Text style={styles.projDesc}>{proj.description}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Idiomas */}
            {result.languages?.length > 0 && (
              <View style={styles.sectionBlock}>
                <Text style={styles.leftSectionTitle}>Idioma</Text>
                <View style={styles.leftDivider} />
                {result.languages.map((lang, i) => (
                  <Text key={i} style={styles.langText}>{lang}</Text>
                ))}
              </View>
            )}
          </View>

          {/* ── COLUNA DIREITA ── */}
          <View style={styles.rightCol}>

            {/* Resumo Profissional */}
            {result.professionalSummary && (
              <View style={styles.sectionBlock}>
                <Text style={styles.rightSectionTitle}>Resumo Profissional</Text>
                <View style={styles.rightDivider} />
                <Text style={styles.summaryText}>{result.professionalSummary}</Text>
              </View>
            )}

            {/* Experiência */}
            {result.transformedExperience?.length > 0 && (
              <View style={styles.sectionBlock}>
                <Text style={styles.rightSectionTitle}>
                  {isEntryLevel ? "Actividade e Experiência Prática" : "Experiência Profissional"}
                </Text>
                <View style={styles.rightDivider} />
                {result.transformedExperience.map((exp, i) => (
                  <View key={i} style={styles.expBlock}>
                    <Text style={styles.expRole}>{exp.role}</Text>
                    <Text style={styles.expMeta}>
                      {exp.company}{exp.period ? `  |  ${exp.period}` : ""}
                    </Text>
                    {exp.responsibilities.map((r, j) => (
                      <View key={j} style={styles.bulletRow}>
                        <Text style={styles.bulletDot}>•</Text>
                        <Text style={styles.bulletText}>{r}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}

            {/* Projetos (experienced — na coluna direita) */}
            {!isEntryLevel && result.projects?.length > 0 && (
              <View style={styles.sectionBlock}>
                <Text style={styles.rightSectionTitle}>Projectos e Realizações</Text>
                <View style={styles.rightDivider} />
                {result.projects.map((proj, i) => (
                  <View key={i} style={{ marginBottom: 5 }}>
                    <Text style={[styles.expRole, { fontSize: 8 }]}>{proj.name}</Text>
                    <Text style={styles.projDesc}>{proj.description}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* ── FOOTER ── */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {!hasPaid ? "Estruturado com CV Fácil – O teu currículo premium" : ""}
          </Text>
        </View>
      </Page>
    </Document>
  );
};
