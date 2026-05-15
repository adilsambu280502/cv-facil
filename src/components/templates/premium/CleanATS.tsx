import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 60,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica', // Fonte padrão ATS
  },
  header: {
    marginBottom: 30,
    textAlign: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    fontSize: 9,
    color: '#333333',
    marginBottom: 5,
  },
  section: {
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 3,
    marginBottom: 10,
  },
  content: {
    fontSize: 10,
    color: '#000000',
    lineHeight: 1.5,
    textAlign: 'justify',
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 10,
    textAlign: 'right',
  }
});

interface CleanATSProps {
  data: any;
}

export const CleanATS: React.FC<CleanATSProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Centralizado para ATS */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.name}</Text>
        <View style={styles.contactRow}>
          <Text>{data.email}</Text>
          <Text>{data.phone}</Text>
          <Text>{data.location}</Text>
        </View>
        <View style={styles.contactRow}>
          <Text>LinkedIn: {data.linkedin || 'N/A'}</Text>
          <Text>GitHub: {data.github || 'N/A'}</Text>
        </View>
      </View>

      {/* Perfil Profissional */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sumário Profissional</Text>
        <Text style={styles.content}>
          {data.activity || 'Profissional dedicado focado em excelência técnica e resultados práticos.'}
        </Text>
      </View>

      {/* Experiência / Impacto */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experiência e Competências</Text>
        <Text style={styles.content}>
          {data.teamwork || 'Experiência em colaboração e entrega de projetos de alta qualidade.'}
        </Text>
        {data.problemSolving && (
          <View style={{ marginTop: 10 }}>
             <Text style={styles.jobTitle}>Principais Realizações:</Text>
             <Text style={styles.content}>{data.problemSolving}</Text>
          </View>
        )}
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Habilidades Técnicas</Text>
        <Text style={styles.content}>
          {data.hardSkills || 'Informação não fornecida.'}
        </Text>
      </View>

      {/* Educação */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Formação Académica</Text>
        <Text style={styles.content}>{data.education || 'Informação Académica'}</Text>
      </View>

      {/* Footer Minimalista */}
      <View style={{ marginTop: 'auto', borderTopWidth: 0.5, borderTopColor: '#cccccc', paddingTop: 10 }}>
        <Text style={{ fontSize: 7, color: '#666666', textAlign: 'center' }}>
          DOCUMENTO OTIMIZADO PARA ATS — GERADO POR CV FÁCIL
        </Text>
      </View>
    </Page>
  </Document>
);
