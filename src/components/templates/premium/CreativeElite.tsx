import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2', fontWeight: 700 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2', fontWeight: 900 },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    fontFamily: 'Inter',
  },
  sidebar: {
    width: '32%',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    padding: 25,
    height: '100%',
  },
  main: {
    width: '68%',
    padding: 35,
    backgroundColor: '#ffffff',
  },
  photoContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#38bdf8',
    alignSelf: 'center',
    overflow: 'hidden',
    backgroundColor: '#1e293b',
  },
  sidebarTitle: {
    fontSize: 9,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 10,
    marginTop: 20,
    color: '#38bdf8',
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
    paddingBottom: 4,
  },
  sidebarText: {
    fontSize: 8,
    lineHeight: 1.6,
    color: '#cbd5e1',
    marginBottom: 6,
  },
  name: {
    fontSize: 32,
    fontWeight: 900,
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: -1.5,
    lineHeight: 1,
  },
  jobTitle: {
    fontSize: 12,
    color: '#38bdf8',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 3,
    marginTop: 8,
    marginBottom: 35,
  },
  mainSectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#38bdf8',
    paddingLeft: 10,
  },
  content: {
    fontSize: 9,
    color: '#334155',
    lineHeight: 1.6,
    marginBottom: 20,
    textAlign: 'justify',
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  bullet: {
    width: 12,
    fontSize: 10,
    color: '#38bdf8',
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: '#334155',
    lineHeight: 1.5,
  },
  skillBadge: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 6,
    marginRight: 6,
  },
  skillText: {
    fontSize: 7,
    color: '#ffffff',
    fontWeight: 700,
  },
  watermark: {
    position: 'absolute',
    top: '45%',
    left: '25%',
    transform: 'rotate(-45deg)',
    fontSize: 50,
    color: 'rgba(200, 200, 200, 0.15)',
    fontWeight: 700,
    zIndex: -1,
  }
});

interface CreativeEliteProps {
  data: any;
}

export const CreativeElite: React.FC<CreativeEliteProps> = ({ data }) => {
  const hasPaid = data.hasPaid;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {!hasPaid && <Text style={styles.watermark}>PREVIEW - CV FÁCIL</Text>}

        {/* Sidebar Esquerda */}
        <View style={styles.sidebar}>
          {data.photo && (
             <View style={styles.photoContainer}>
               <Image src={data.photo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
             </View>
          )}
          
          <Text style={styles.sidebarTitle}>Contacto</Text>
          <Text style={styles.sidebarText}>{data.phone}</Text>
          <Text style={styles.sidebarText}>{data.email}</Text>
          <Text style={styles.sidebarText}>{data.location}</Text>

          <Text style={styles.sidebarTitle}>Especialidades</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {(data.skills || []).map((s: string, i: number) => (
              <View key={i} style={styles.skillBadge}>
                <Text style={styles.skillText}>{s}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sidebarTitle}>Idiomas</Text>
          <Text style={styles.sidebarText}>{data.languages || 'Português'}</Text>

          <View style={{ marginTop: 'auto' }}>
            <Text style={{ fontSize: 6, color: '#64748b', textAlign: 'center' }}>
              cvfacil.ao
            </Text>
          </View>
        </View>

        {/* Conteúdo Principal Direita */}
        <View style={styles.main}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.jobTitle}>{data.title || 'Criativo de Impacto'}</Text>

          <View>
            <Text style={styles.mainSectionTitle}>Perfil & Visão</Text>
            <Text style={styles.content}>
              {data.professionalSummary || data.activity}
            </Text>
          </View>

          <View>
            <Text style={styles.mainSectionTitle}>Experiência e Projetos</Text>
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

          <View style={{ marginTop: 10 }}>
            <Text style={styles.mainSectionTitle}>Formação</Text>
            <Text style={styles.content}>{data.education}</Text>
          </View>

          {/* Footer Automático */}
          <View style={{ marginTop: 'auto', paddingTop: 10 }}>
            <Text style={{ fontSize: 7, color: '#94a3b8', textAlign: 'center' }}>
              Arquitetura de Carreira Premium - CV Fácil
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
