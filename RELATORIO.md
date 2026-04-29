# Relatório de Arquitetura e Estratégia de Produto: CV Hoje

## 1. Análise crítica da ideia ou problema
A criação de um currículo é frequentemente um processo frustrante e burocrático, especialmente para jovens talentos ou profissionais que procuram destacar-se num mercado cada vez mais competitivo (com foco inicial em Angola e Países Africanos de Língua Oficial Portuguesa). Muitos bons candidatos são descartados precocemente pelos sistemas de recrutamento (ATS) ou pelos recrutadores na "revisão de 6 segundos", simplesmente por má formatação ou incapacidade de sintetizar as suas melhores valências.

A proposta de usar Inteligência Artificial (Gemini) para transformar pontos soltos sobre experiência, liderança e resolução de problemas num CV coerente, estruturado juntamente com uma carta de apresentação dedicada e uma simulação de recrutador, ataca exatamente esta dor do utilizador. Em vez de "editar um documento", o utilizador "conversa com um assistente de carreira".

## 2. Estratégia de produto recomendada
A visão do "CV Hoje" deve focar-se na jornada "**Do rascunho à candidatura em 5 minutos**".

- **Product-Led Growth (PLG) & Viralidade:** O produto em si tem de ser o motor de crescimento. A funcionalidade de "Partilhar CV" com um link público gera tráfego reverso orgânico. O botão de partilha deve ser o "Call to Action" mais apelativo após a geração do CV.
- **Onboarding Interativo e Conversacional:** Em vez de formulários penosos e estáticos, a captura de dados deve ser fluída com passos curtos (questions wizard), que exigem pouco esforço cognitivo, inspirando-se em fluxos como o do Typeform ou Duolingo.
- **Multicanal (Web & PWA):** A disponibilização como Progressive Web App (PWA) permite instalar e utilizar o serviço como uma app nativa diretamente no ecrã inicial do telemóvel sem o atrito das App Stores – o que é essencial para o público-alvo habituado a mobile (Mobile-First approach).
- **Monetização Freemium:** O plano base (Criação de CV Standard) atrai a massa de utilizadores (funil de entrada largo). As ferramentas "Premium" (exportação DOCX, temas avançados, cartas de apresentação impulsionadas por IA específicas por vaga) servem como alavanca de monetização.

## 3. Arquitetura técnica ideal
Uma arquitetura **Frontend pesada com serviços Serverless/BaaS**, otimizada para scale e baixo custo operacional inicial:

- **Client-Side Platform (SPA/PWA):** O código base serve as interfaces vitais, mas delega o processamento linguístico complexo para o serviço `GoogleGenAI` ou endpoints serverless da Google Cloud.
- **Service Workers & Offline Capabilities:** A implementação do `vite-plugin-pwa` permite pre-cache dos assets estáticos (fontes, scripts principais, ícones SVG). Isto garante que o PWA abra instantaneamente em redes 3G lentas ou ambientes offline.
- **Banco de Dados Realtime & Auth (Firebase):** Firestore como base de dados NoSQL (ideal para documentos flexíveis como perfis e CVs), com regras rígidas de segurança onde os `users` apenas acedem aos próprios dados. Autenticação via OAuth (Google/Apple) reduzindo barreiras de adesão.
- **State Management Local:** Utilização estado React (`useState`/`useRef`) para a sessão ativa, sem a necessidade prematura de Redux ou Zustand, minimizando o payload e o processamento client-side.

## 4. UX / UI recomendada
Design assente em princípios de **Confiança, Profissionalismo e Rapidez** (baseado num estilo Modern/SaaS):

- **Mobile-First por defeito:** Assumir que >80% do tráfego será via telemóvel. Zonas de toque com pelo menos 48px, teclado numérico/email nativo adequados, esconder painéis complexos em ecrãs menores utilizando Modals de ecrã inteiro.
- **Feedback & Micro-interações:** Adicionar animações nos botões de "Gerar CV" ou "A avaliar o teu CV" utilizando o Framer Motion. O design deve dar a sensação de estar a construir algo mágico ao vivo.
- **Dashboard Modular (Bento-grid styled):** Utilizar estrutura "Bento Box" para a dashboard para separar visualmente as seções de `Currículo`, `Estatísticas/Score` e `Cartas de Apresentação` – reduzindo a carga cognitiva.
- **Theming Dinâmico:** Capacidade de o utilizador alterar no ato a cor primária ou a tipografia (Ex: "Inter" para Moderno, "Playfair" para Executivo/Clássico, "JetBrains" para Técnico/IT).

## 5. Stack tecnológica
- **Core:** React 18+ com Vite (PWA Register Type `autoUpdate`).
- **Styling & UI:** Tailwind CSS v4 para utility-first styling e `lucide-react` para iconografia unificada.
- **Animações:** `motion/react` (Framer Motion).
- **Exportação & Geração de Documentos:** `html2canvas` & `jspdf` para exportação de alta fidelidade visual para PDF/Imagens. `docx` library para exportações de texto editável (uma feature que recrutadores corporativos adoram).
- **Inteligência Artificial:** SDK `@google/genai` utilizando modelos `gemini-2.5-flash` para processamento rápido e estruturado de arrays de informações em texto coerente.
- **Backend Infrastructure:** Firebase Ecosystem (Cloud Firestore, Authentication, Firebase Hosting para deploys ágeis com CDN global).

## 6. Riscos técnicos e Mitigações
1. **Latência de IA & Abandono de Funil:**
   - *Risco:* LLMs podem demorar 10 a 20+ segundos para compilar a informação.
   - *Mitigação:* Implementar um carregador interativo ("Skeleton loaders", "A extrair keywords...", "A formatar a experiência...") para prender a atenção.
2. **Qualidade do PDF no Telemóvel (html2canvas):**
   - *Risco:* Renderização no telemóvel com diferentes _pixel ratios_ e ecrãs estreitos pode comprometer a versão gerada do CV (corte de texto, quebras de página falhadas).
   - *Mitigação:* Usar um contentor de referência (ref) virtual ou em absoluto forçado às medidas A4 (`800px` approx), escalado devidamente via React/CSS, exclusivamente para o canvas desenhar o PDF de modo independente da ecrã do user.
3. **Segurança de PII (Personally Identifiable Information):**
   - *Risco:* Utilizadores colocam moradas detalhadas, telefones que fluem para a API da Google.
   - *Mitigação:* Anonimização de dados pré-AI, políticas de privacidade muito explícitas e claras de que o processamento AI não treina modelos externos.
4. **Quota Limiting (Firebase e API do Gemini):**
   - *Risco:* Picos de sucesso viral esgotam as quotas da cloud na Firebase ("Database Timeout") e da chave do Gemini de repente.
   - *Mitigação:* Caching agressivo da resposta LLM - se o user voltar a clicar em gerar sem mudar inputs, recuperar output de local storage / cache state em vez de um re-fetch caro.

## 7. Próximos passos e Evolução (Roadmap Q3/Q4)
1. **Refinamento da Autenticação / Supabase & Firebase:** Preparar regras sólidas (RLS no Supabase ou Security Rules no Firebase) se o produto decidir reter a base de dados em larga escala de utilizadores.
2. **Quality Assurance Mobile PWA:** Realizar testes de usabilidade intensivos do PWA em iOS e Android, validando o splash screen e ícones associados criados, além das transições nativas.
3. **Módulo "Job Matching" B2B:** Mais tarde, o projeto pode escalar conectando empresas diretamente. Os "scores" gerados para um CV face à vaga servem de algoritmo de pre-screening.
4. **Testes A/B no Onboarding:** Experimentar um Wizard de 3 passos rápidos versus um scroll vertical com auto-save para avaliar a taxa de conclusão (Conversion Rate).
