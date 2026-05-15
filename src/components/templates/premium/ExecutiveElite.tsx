import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 50,
    backgroundColor: '#ffffff',
    fontFamily: 'Times-Roman', // Serif para um ar executivo e tradicional
  },
  header: {
    textAlign: 'center',
    marginBottom: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
    paddingBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 8,
    textTransform: 'uppercase',
    letterSpacing: 4,
  },
  contactBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    gap: 20,
    fontSize: 8,
    color: '#475569',
    borderTopWidth: 0.5,
    borderTopColor: '#e2e8f0',
    paddingTop: 10,
  },
  mainContent: {
    flexDirection: 'column',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 12,
    backgroundColor: '#f8fafc',
    padding: 4,
    textAlign: 'center',
  },
  content: {
    fontSize: 10,
    color: '#334155',
    lineHeight: 1.6,
    textAlign: 'justify',
  },
  experienceItem: {
    marginBottom: 15,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  company: {
    fontSize: 10,
    color: '#64748b',
    fontStyle: 'italic',
  },
  date: {
    fontSize: 9,
    color: '#94a3b8',
  },
  bulletList: {
    marginTop: 5,
    paddingLeft: 10,
  },
  bullet: {
    fontSize: 9,
    color: '#475569',
    marginBottom: 3,
  }
});

interface ExecutiveEliteProps {
  data: any;
}

export const ExecutiveElite: React.FC<ExecutiveEliteProps> = ({ data }) => {
  // Lógica de Designer para Executivos
  const totalLength = (data.activity?.length || 0) + (data.teamwork?.length || 0) + (data.problemSolving?.length || 0);
  const isTooLong = totalLength > 1500;
  const baseSize = isTooLong ? 9 : 10;
  const leading = isTooLong ? 1.4 : 1.6;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Centralizado */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.title}>{data.title || 'Líder Estratégico'}</Text>
          
          <View style={styles.contactBar}>
            <Text>{data.email}</Text>
            <Text>{data.phone}</Text>
            <Text>{data.location}</Text>
          </View>
        </View>

        {/* Sumário Executivo */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perfil Executivo</Text>
          <Text style={[styles.content, { fontSize: baseSize, lineHeight: leading }]}>
            {data.activity || 'Líder orientado a resultados com vasta experiência em gestão estratégica e entrega de valor organizacional.'}
          </Text>
        </View>

        {/* Experiência / Impacto */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experiência e Realizações</Text>
          <View style={styles.experienceItem}>
            <Text style={[styles.content, { fontSize: baseSize, lineHeight: leading }]}>
              {data.teamwork || 'Experiência comprovada na gestão de equipas de alto rendimento e coordenação de projetos complexos.'}
            </Text>
          </View>
          {data.problemSolving && (
            <View style={styles.experienceItem}>
              <Text style={[styles.jobTitle, { fontSize: baseSize, marginBottom: 4 }]}>Principais Conquistas</Text>
              <Text style={[styles.content, { fontSize: baseSize, lineHeight: leading }]}>{data.problemSolving}</Text>
            </View>
          )}
        </View>

        {/* Formação e Competências */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Formação & Expertise</Text>
          <Text style={[styles.content, { fontSize: baseSize }]}>
            <Text style={{ fontWeight: 'bold' }}>Educação: </Text>
            {data.education}
          </Text>
          <Text style={[styles.content, { marginTop: 8, fontSize: baseSize }]}>
            <Text style={{ fontWeight: 'bold' }}>Áreas de Domínio: </Text>
            {data.hardSkills}
          </Text>
        </View>

        {/* Footer */}
        <View style={{ marginTop: 'auto', textAlign: 'center', borderTopWidth: 0.5, borderTopColor: '#e2e8f0', paddingTop: 10 }}>
          <Text style={{ fontSize: 7, color: '#94a3b8', letterSpacing: 1 }}>
            CONFIDENCIAL — DOCUMENTO GERADO POR CV FÁCIL ARQUITETO DE CARREIRA
          </Text>
        </View>
      </Page>
    </Document>
  );
};
