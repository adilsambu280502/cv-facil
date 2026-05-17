import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 50,
    backgroundColor: '#ffffff',
    fontFamily: 'Times-Roman',
  },
  header: {
    textAlign: 'center',
    marginBottom: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
    paddingBottom: 20,
  },
  name: {
    fontSize: 26,
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
    lineHeight: 1.7,
    textAlign: 'justify',
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 6,
    paddingLeft: 10,
  },
  bullet: {
    width: 15,
    fontSize: 10,
    color: '#0f172a',
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: '#334155',
    lineHeight: 1.6,
  },
  skillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginTop: 5,
  },
  skillItem: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1e293b',
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

interface ExecutiveEliteProps {
  data: any;
}

export const ExecutiveElite: React.FC<ExecutiveEliteProps> = ({ data }) => {
  const hasPaid = data.hasPaid;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {!hasPaid && <Text style={styles.watermark}>PREVIEW - CV FÁCIL</Text>}

        {/* Header Centralizado */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.title}>{data.title || 'Líder Estratégico'}</Text>
          
          <View style={styles.contactBar}>
            <Text>{data.email}</Text>
            <Text>| {data.phone}</Text>
            <Text>| {data.location}</Text>
          </View>
        </View>

        {/* Perfil */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sumário Executivo</Text>
          <Text style={styles.content}>
            {data.professionalSummary || data.activity}
          </Text>
        </View>

        {/* Experiência / Realizações */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trajetória e Realizações</Text>
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

        {/* Expertise */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Competências Chave</Text>
          <View style={styles.skillRow}>
            {(data.skills || []).map((skill: string, i: number) => (
              <Text key={i} style={styles.skillItem}>
                {skill.toUpperCase()}{i < data.skills.length - 1 ? ' |' : ''}
              </Text>
            ))}
          </View>
        </View>

        {/* Formação */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Formação Académica</Text>
          <Text style={styles.content}>{data.education}</Text>
        </View>

        {/* Footer */}
        <View style={{ marginTop: 'auto', textAlign: 'center', borderTopWidth: 0.5, borderTopColor: '#e2e8f0', paddingTop: 10 }}>
          <Text style={{ fontSize: 7, color: '#94a3b8', textAlign: 'center' }}>
            Estruturado com CV Fácil – O teu currículo premium
          </Text>
        </View>
      </Page>
    </Document>
  );
};
