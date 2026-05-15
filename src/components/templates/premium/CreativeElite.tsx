import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  sidebar: {
    width: '30%',
    backgroundColor: '#1e293b',
    color: '#ffffff',
    padding: 30,
    height: '100%',
  },
  main: {
    width: '70%',
    padding: 40,
    backgroundColor: '#ffffff',
  },
  photoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#38bdf8',
    alignSelf: 'center',
    overflow: 'hidden',
  },
  sidebarTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 10,
    marginTop: 20,
    color: '#38bdf8',
    borderBottomWidth: 0.5,
    borderBottomColor: '#334155',
    paddingBottom: 5,
  },
  sidebarText: {
    fontSize: 8,
    lineHeight: 1.6,
    color: '#cbd5e1',
    marginBottom: 8,
  },
  name: {
    fontSize: 28,
    fontWeight: 'black',
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: -1,
  },
  jobTitle: {
    fontSize: 12,
    color: '#38bdf8',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 3,
    marginBottom: 30,
  },
  mainSectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#38bdf8',
    paddingLeft: 10,
  },
  content: {
    fontSize: 9,
    color: '#475569',
    lineHeight: 1.5,
    marginBottom: 20,
    textAlign: 'justify',
  },
  skillBadge: {
    backgroundColor: '#334155',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 5,
    marginRight: 5,
  },
  skillText: {
    fontSize: 7,
    color: '#ffffff',
    fontWeight: 'bold',
  }
});

interface CreativeEliteProps {
  data: any;
}

export const CreativeElite: React.FC<CreativeEliteProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Sidebar Esquerda */}
      <View style={styles.sidebar}>
        {data.photo && (
           <View style={styles.photoContainer}>
             {/* Em produção, usaríamos Image aqui */}
           </View>
        )}
        
        <Text style={styles.sidebarTitle}>Contacto</Text>
        <Text style={styles.sidebarText}>{data.phone}</Text>
        <Text style={styles.sidebarText}>{data.email}</Text>
        <Text style={styles.sidebarText}>{data.location}</Text>

        <Text style={styles.sidebarTitle}>Educação</Text>
        <Text style={styles.sidebarText}>{data.education || 'Informação Académica'}</Text>

        <Text style={styles.sidebarTitle}>Skills</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {(data.hardSkills?.split(',') || []).map((s: string, i: number) => (
            <View key={i} style={styles.skillBadge}>
              <Text style={styles.skillText}>{s.trim()}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sidebarTitle}>Línguas</Text>
        <Text style={styles.sidebarText}>{data.languages || 'Português'}</Text>
      </View>

      {/* Conteúdo Principal Direita */}
      <View style={styles.main}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.jobTitle}>{data.title || 'Criativo de Vanguarda'}</Text>

        <View>
          <Text style={styles.mainSectionTitle}>Sobre Mim</Text>
          <Text style={styles.content}>{data.activity || 'Profissional criativo apaixonado por inovação e impacto visual.'}</Text>
        </View>

        <View>
          <Text style={styles.mainSectionTitle}>Visão e Trabalho</Text>
          <Text style={styles.content}>{data.teamwork || 'Focado na colaboração e excelência criativa.'}</Text>
        </View>

        {data.problemSolving && (
          <View>
            <Text style={styles.mainSectionTitle}>Diferencial</Text>
            <Text style={styles.content}>{data.problemSolving}</Text>
          </View>
        )}

        {/* Footer Automático */}
        <View style={{ marginTop: 'auto', borderTopWidth: 0.5, borderTopColor: '#e2e8f0', paddingTop: 10 }}>
          <Text style={{ fontSize: 6, color: '#94a3b8', textAlign: 'right' }}>
            GERADO POR CV FÁCIL — TECNOLOGIA ARQUITETO DE CARREIRA
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);
