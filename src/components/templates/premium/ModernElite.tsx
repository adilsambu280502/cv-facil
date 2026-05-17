import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2', fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Inter',
  },
  header: {
    marginBottom: 30,
    borderBottomWidth: 3,
    paddingBottom: 20,
  },
  name: {
    fontSize: 30,
    fontWeight: 700,
    color: '#0f172a',
    letterSpacing: -1,
  },
  title: {
    fontSize: 14,
    fontWeight: 700,
    marginTop: 4,
    textTransform: 'uppercase',
  },
  contactRow: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 15,
  },
  contactItem: {
    fontSize: 9,
    color: '#64748b',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: '#1e293b',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 4,
  },
  content: {
    fontSize: 10,
    color: '#334155',
    lineHeight: 1.6,
  },
  experienceItem: {
    marginBottom: 15,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 4,
    paddingLeft: 8,
  },
  bullet: {
    width: 12,
    fontSize: 10,
    color: '#2563eb',
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: '#334155',
    lineHeight: 1.5,
  },
  skillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillBadge: {
    backgroundColor: '#f8fafc',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    fontSize: 9,
    color: '#475569',
    borderWidth: 1,
    borderColor: '#e2e8f0',
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

interface ModernEliteProps {
  data: any;
  color?: string;
}

export const ModernElite: React.FC<ModernEliteProps> = ({ data, color = '#2563eb' }) => {
  const hasPaid = data.hasPaid;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {!hasPaid && <Text style={styles.watermark}>PREVIEW - CV FÁCIL</Text>}

        {/* Header */}
        <View style={[styles.header, { borderBottomColor: color }]}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={[styles.title, { color }]}>{data.title || 'Profissional de Excelência'}</Text>
          
          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>{data.email}</Text>
            <Text style={styles.contactItem}>• {data.phone}</Text>
            <Text style={styles.contactItem}>• {data.location}</Text>
          </View>
        </View>

        {/* Perfil */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perfil Profissional</Text>
          <Text style={styles.content}>
            {data.professionalSummary || data.activity}
          </Text>
        </View>

        {/* Experiência / Impacto */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Realizações e Experiência</Text>
          {data.descriptionBullets && data.descriptionBullets.length > 0 ? (
            data.descriptionBullets.map((bullet: string, i: number) => (
              <View key={i} style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{bullet}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.content}>{data.teamwork}</Text>
          )}
        </View>

        {/* Competências */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Expertise Técnica</Text>
          <View style={styles.skillContainer}>
            {(data.skills || []).map((skill: string, i: number) => (
              <View key={i} style={styles.skillBadge}>
                <Text>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Formação */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Formação Académica</Text>
          <Text style={styles.content}>{data.education}</Text>
        </View>

        {/* Footer */}
        <View style={{ marginTop: 'auto', paddingTop: 10, borderTopWidth: 1, borderTopColor: '#f1f5f9' }}>
          <Text style={{ fontSize: 7, color: '#94a3b8', textAlign: 'center' }}>
            Estruturado com CV Fácil – O teu currículo premium
          </Text>
        </View>
      </Page>
    </Document>
  );
};
