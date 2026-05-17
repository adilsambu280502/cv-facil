import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Registro de fontes para garantir o ar Premium e compatibilidade ATS
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2', fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 50,
    backgroundColor: '#ffffff',
    fontFamily: 'Inter',
  },
  header: {
    marginBottom: 25,
    borderBottomWidth: 2,
    borderBottomColor: '#1a1a1a',
    paddingBottom: 15,
  },
  name: {
    fontSize: 26,
    fontWeight: 700,
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: 700,
    color: '#2563eb',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    fontSize: 9,
    color: '#4b5563',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 4,
    marginBottom: 10,
  },
  summary: {
    fontSize: 10,
    color: '#1f2937',
    lineHeight: 1.6,
    textAlign: 'justify',
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 5,
    paddingLeft: 5,
  },
  bullet: {
    width: 15,
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: '#1f2937',
    lineHeight: 1.5,
  },
  skillTag: {
    fontSize: 9,
    backgroundColor: '#f3f4f6',
    padding: '3 8',
    borderRadius: 4,
    marginRight: 5,
    marginBottom: 5,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  watermark: {
    position: 'absolute',
    top: '45%',
    left: '10%',
    transform: 'rotate(-45deg)',
    fontSize: 60,
    color: 'rgba(200, 200, 200, 0.2)',
    fontWeight: 700,
    zIndex: -1,
  }
});

interface CleanATSProps {
  data: any; // answers + result
}

export const CleanATS: React.FC<CleanATSProps> = ({ data }) => {
  const hasPaid = data.hasPaid;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {!hasPaid && <Text style={styles.watermark}>PREVIEW - CV FÁCIL</Text>}

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.title}>{data.title || 'Profissional de Elite'}</Text>
          <View style={styles.contactRow}>
            <Text>{data.email}</Text>
            <Text>• {data.phone}</Text>
            <Text>• {data.location}</Text>
            {data.linkedin && <Text>• LinkedIn: {data.linkedin}</Text>}
          </View>
        </View>

        {/* Perfil */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo Executivo</Text>
          <Text style={styles.summary}>
            {data.professionalSummary || data.activity}
          </Text>
        </View>

        {/* Experiência / Realizações */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experiência e Impacto</Text>
          {data.descriptionBullets && data.descriptionBullets.length > 0 ? (
            data.descriptionBullets.map((bullet: string, i: number) => (
              <View key={i} style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{bullet}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.summary}>{data.teamwork}</Text>
          )}
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Competências Técnicas</Text>
          <View style={styles.skillsContainer}>
            {(data.skills || []).map((skill: string, i: number) => (
              <Text key={i} style={styles.skillTag}>{skill}</Text>
            ))}
          </View>
        </View>

        {/* Educação */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Formação Académica</Text>
          <Text style={styles.summary}>{data.education}</Text>
        </View>

        {/* Rodapé institucional */}
        <View style={{ marginTop: 'auto', paddingTop: 20 }}>
          <Text style={{ fontSize: 8, color: '#9ca3af', textAlign: 'center' }}>
            Documento Otimizado para ATS (Applicant Tracking Systems)
          </Text>
          <Text style={{ fontSize: 7, color: '#d1d5db', textAlign: 'center', marginTop: 4 }}>
            Arquitetado por CV Fácil - A Plataforma de Carreira Nº1 em Angola
          </Text>
        </View>
      </Page>
    </Document>
  );
};
