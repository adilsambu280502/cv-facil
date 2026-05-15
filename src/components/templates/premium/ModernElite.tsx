import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Registro de fontes para um aspeto premium (opcional: usar fontes locais ou URLs)
// Font.register({ family: 'Inter', src: '...' });

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica', // Usando Helvetica como base segura
  },
  header: {
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#2563eb',
    paddingBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
    letterSpacing: -1,
  },
  title: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: 'bold',
    marginTop: 4,
    textTransform: 'uppercase',
  },
  contactRow: {
    flexDirection: 'row',
    marginTop: 10,
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
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e293b',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 4,
  },
  content: {
    fontSize: 10,
    color: '#334155',
    lineHeight: 1.5,
  },
  experienceItem: {
    marginBottom: 12,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  date: {
    fontSize: 9,
    color: '#94a3b8',
  },
  skillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillBadge: {
    backgroundColor: '#f8fafc',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 8,
    color: '#475569',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  }
});

interface ModernEliteProps {
  data: any;
  color?: string;
}

export const ModernElite: React.FC<ModernEliteProps> = ({ data, color = '#2563eb' }) => {
  // Lógica de Designer: Ajuste dinâmico de escala
  const totalContentLength = (data.activity?.length || 0) + (data.education?.length || 0) + (data.hardSkills?.length || 0);
  const isContentLong = totalContentLength > 1200;
  const contentFontSize = isContentLong ? 8.5 : 10;
  const contentLineHeight = isContentLong ? 1.3 : 1.5;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: color }]}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={[styles.title, { color }]}>{data.title || 'Profissional de Excelência'}</Text>
          
          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>{data.email}</Text>
            <Text style={styles.contactItem}>{data.phone}</Text>
            <Text style={styles.contactItem}>{data.location}</Text>
          </View>
        </View>

        {/* Perfil / Resumo */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perfil Profissional</Text>
          <Text style={[styles.content, { fontSize: contentFontSize, lineHeight: contentLineHeight }]}>
            {data.activity || 'Profissional altamente qualificado focado em entregar resultados de alto impacto.'}
          </Text>
        </View>

        {/* Competências */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Competências Chave</Text>
          <View style={styles.skillContainer}>
            {(data.hardSkills?.split(',') || []).map((skill: string, i: number) => (
              <View key={i} style={styles.skillBadge}>
                <Text style={{ fontSize: isContentLong ? 7 : 8 }}>{skill.trim()}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Formação */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Formação Académica</Text>
          <View style={styles.experienceItem}>
            <Text style={[styles.content, { fontSize: contentFontSize, lineHeight: contentLineHeight }]}>{data.education || 'Informação não fornecida.'}</Text>
          </View>
        </View>

        {/* Diferenciais de Especialista — Seção Dinâmica */}
        {data.problemSolving && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resolução de Problemas</Text>
            <Text style={[styles.content, { fontSize: contentFontSize, lineHeight: contentLineHeight }]}>{data.problemSolving}</Text>
          </View>
        )}

        {/* Footer / Nota de Autenticidade */}
        <View style={{ marginTop: 'auto', borderTopWidth: 1, borderTopColor: '#f1f5f9', pt: 10 }}>
          <Text style={{ fontSize: 7, color: '#94a3b8', textAlign: 'center' }}>
            Gerado pelo Arquiteto de Carreira — CV Fácil (cvfacil.ao)
          </Text>
        </View>
      </Page>
    </Document>
  );
};
